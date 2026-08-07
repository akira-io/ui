// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Editor as TiptapEditor } from '@tiptap/core';
import { useState } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    EditorBlockquote,
    EditorHeading,
    EditorHistory,
    EditorList,
    EditorMark,
} from '@/components/ui/editor/controls';
import { editorLabels } from '@/components/ui/editor/labels';
import { EditorLink } from '@/components/ui/editor/link';
import { RichTextEditor } from '@/components/ui/editor/rich-text-editor';
import {
    caretAtEnd,
    ControlledEditor,
    surface,
    typeInto,
} from '../../../../tests/fixtures/editor';
import { supportProseMirrorLayout } from '../../../../tests/helpers/prosemirror';

supportProseMirrorLayout();

const portugueseLabels = {
    ...editorLabels,
    toolbarLabel: 'Formatação',
    boldLabel: 'Negrito',
};

afterEach(cleanup);

function control(name: string): HTMLElement {
    return screen.getByRole('button', { name });
}

async function editorWithToolbar(): Promise<TiptapEditor> {
    let editor: TiptapEditor | null = null;

    render(
        <ControlledEditor onReady={(instance) => (editor = instance)}>
            <EditorMark mark="bold" />
            <EditorMark mark="italic" />
            <EditorHeading level={2} />
            <EditorList variant="bullet" />
            <EditorBlockquote />
            <EditorLink />
            <EditorHistory action="undo" />
        </ControlledEditor>,
    );

    await screen.findByRole('textbox');

    return editor!;
}

describe('the toolbar controls', () => {
    it('applies a mark to the selection and reports it as active', async () => {
        const user = userEvent.setup();
        const editor = await editorWithToolbar();

        editor.commands.setTextSelection({ from: 1, to: 6 });
        await user.click(control('Bold'));

        await waitFor(() =>
            expect(editor.getHTML()).toBe('<p><strong>Draft</strong></p>'),
        );
        await waitFor(() =>
            expect(control('Bold').getAttribute('aria-pressed')).toBe('true'),
        );
    });

    it('drops the mark again when the control is pressed twice', async () => {
        const user = userEvent.setup();
        const editor = await editorWithToolbar();

        editor.commands.setTextSelection({ from: 1, to: 6 });
        await user.click(control('Bold'));
        await waitFor(() => expect(editor.getHTML()).toContain('<strong>'));

        await user.click(control('Bold'));

        await waitFor(() => expect(editor.getHTML()).toBe('<p>Draft</p>'));
        expect(control('Bold').getAttribute('aria-pressed')).toBe('false');
    });

    it('turns the block into a heading and reports the level as active', async () => {
        const user = userEvent.setup();
        const editor = await editorWithToolbar();

        editor.commands.setTextSelection({ from: 1, to: 6 });
        await user.click(control('Heading 2'));

        await waitFor(() =>
            expect(editor.getHTML()).toContain('<h2>Draft</h2>'),
        );
        expect(control('Heading 2').getAttribute('aria-pressed')).toBe('true');
    });

    it('wraps the block in a list', async () => {
        const user = userEvent.setup();
        const editor = await editorWithToolbar();

        editor.commands.setTextSelection({ from: 1, to: 6 });
        await user.click(control('Bullet list'));

        await waitFor(() =>
            expect(editor.getHTML()).toContain(
                '<ul><li><p>Draft</p></li></ul>',
            ),
        );
        expect(control('Bullet list').getAttribute('aria-pressed')).toBe(
            'true',
        );
    });

    it('wraps the block in a quote', async () => {
        const user = userEvent.setup();
        const editor = await editorWithToolbar();

        editor.commands.setTextSelection({ from: 1, to: 6 });
        await user.click(control('Quote'));

        await waitFor(() =>
            expect(editor.getHTML()).toContain(
                '<blockquote><p>Draft</p></blockquote>',
            ),
        );
        expect(control('Quote').getAttribute('aria-pressed')).toBe('true');
    });

    it('disables undo until there is something to undo', async () => {
        const user = userEvent.setup();
        const editor = await editorWithToolbar();

        expect(control('Undo').hasAttribute('disabled')).toBe(true);

        await caretAtEnd(editor);
        await typeInto(user, 'ed');

        await waitFor(() =>
            expect(control('Undo').hasAttribute('disabled')).toBe(false),
        );

        await user.click(control('Undo'));

        await waitFor(() => expect(editor.getHTML()).toBe('<p>Draft</p>'));
    });

    it('disables every control while the editor is disabled', async () => {
        render(
            <ControlledEditor disabled>
                <EditorMark mark="bold" />
                <EditorHistory action="redo" />
            </ControlledEditor>,
        );

        await screen.findByRole('textbox');

        expect(control('Bold').hasAttribute('disabled')).toBe(true);
        expect(control('Redo').hasAttribute('disabled')).toBe(true);
    });

    it('takes the labels a consumer hands it', async () => {
        function Translated() {
            const [value, setValue] = useState('<p>Rascunho</p>');

            return (
                <RichTextEditor
                    value={value}
                    onChange={setValue}
                    labels={portugueseLabels}
                />
            );
        }

        render(<Translated />);
        await screen.findByRole('textbox');

        expect(control('Negrito')).toBeDefined();
        expect(
            screen.getByRole('toolbar', { name: 'Formatação' }),
        ).toBeDefined();
    });
});

describe('the toolbar keyboard path', () => {
    it('walks the controls and lands on the editing surface', async () => {
        const user = userEvent.setup();

        render(
            <ControlledEditor>
                <EditorMark mark="bold" />
                <EditorMark mark="italic" />
            </ControlledEditor>,
        );

        await screen.findByRole('textbox');
        document.body.focus();

        await user.tab();
        expect(document.activeElement).toBe(control('Bold'));

        await user.tab();
        expect(document.activeElement).toBe(control('Italic'));

        await user.tab();
        expect(document.activeElement).toBe(surface());
    });

    it('presses a control with the keyboard', async () => {
        const user = userEvent.setup();
        let editor: TiptapEditor | null = null;

        render(
            <ControlledEditor onReady={(instance) => (editor = instance)}>
                <EditorMark mark="italic" />
            </ControlledEditor>,
        );

        await screen.findByRole('textbox');
        editor!.commands.setTextSelection({ from: 1, to: 6 });

        await user.tab();
        await user.keyboard('{Enter}');

        await waitFor(() => expect(editor!.getHTML()).toContain('<em>'));
    });
});
