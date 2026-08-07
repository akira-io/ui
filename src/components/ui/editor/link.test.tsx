// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Editor as TiptapEditor } from '@tiptap/core';
import { afterEach, describe, expect, it } from 'vitest';

import { EditorLink } from '@/components/ui/editor/link';
import {
    ControlledEditor,
    ExposeEditor,
} from '../../../../tests/fixtures/editor';
import { supportProseMirrorLayout } from '../../../../tests/helpers/prosemirror';

supportProseMirrorLayout();

afterEach(cleanup);

function control(name: string): HTMLElement {
    return screen.getByRole('button', { name });
}

async function editorWithLink(): Promise<TiptapEditor> {
    let editor: TiptapEditor | null = null;

    render(
        <ControlledEditor onReady={(instance) => (editor = instance)}>
            <EditorLink />
        </ControlledEditor>,
    );

    await screen.findByRole('textbox');

    return editor!;
}

describe('the link dialog', () => {
    it('collects the address in the library dialog and applies it', async () => {
        const user = userEvent.setup();
        const editor = await editorWithLink();

        editor.commands.setTextSelection({ from: 1, to: 6 });
        await user.click(control('Link'));

        const dialog = await screen.findByRole('dialog');
        expect(dialog).toBeDefined();

        await user.type(
            screen.getByLabelText('Address'),
            'https://akira-io.com',
        );
        await user.click(screen.getByRole('button', { name: 'Apply' }));

        await waitFor(() =>
            expect(editor.getHTML()).toContain('href="https://akira-io.com"'),
        );
    });

    it('reopens on an existing link and removes it', async () => {
        const user = userEvent.setup();
        let editor: TiptapEditor | null = null;

        render(
            <ControlledEditor initial='<p><a href="https://akira-io.com">Draft</a></p>'>
                <ExposeEditor onReady={(instance) => (editor = instance)} />
                <EditorLink />
            </ControlledEditor>,
        );

        await screen.findByRole('textbox');
        editor!.commands.setTextSelection({ from: 1, to: 6 });

        await waitFor(() =>
            expect(control('Link').getAttribute('aria-pressed')).toBe('true'),
        );

        await user.click(control('Link'));

        expect(screen.getByLabelText<HTMLInputElement>('Address').value).toBe(
            'https://akira-io.com',
        );

        await user.click(screen.getByRole('button', { name: 'Remove' }));

        await waitFor(() => expect(editor!.getHTML()).toBe('<p>Draft</p>'));
    });

    it('refuses an address the schema would not allow', async () => {
        const user = userEvent.setup();
        const editor = await editorWithLink();

        editor.commands.setTextSelection({ from: 1, to: 6 });
        await user.click(control('Link'));
        await user.type(
            await screen.findByLabelText('Address'),
            'javascript:steal()',
        );
        await user.click(screen.getByRole('button', { name: 'Apply' }));

        expect(editor.getHTML()).toBe('<p>Draft</p>');
        expect(screen.getByRole('dialog')).toBeDefined();
    });
});
