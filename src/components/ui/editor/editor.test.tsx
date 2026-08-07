// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { JSONContent, Editor as TiptapEditor } from '@tiptap/core';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { EditorContent } from '@/components/ui/editor/content';
import { Editor } from '@/components/ui/editor/editor';
import {
    caretAtEnd,
    ControlledEditor,
    ExposeEditor as Expose,
    surface,
    typeInto,
} from '../../../../tests/fixtures/editor';
import { supportProseMirrorLayout } from '../../../../tests/helpers/prosemirror';

supportProseMirrorLayout();

afterEach(cleanup);

async function mounted(): Promise<HTMLElement> {
    await screen.findByRole('textbox');

    return surface();
}

function content(): HTMLElement | null {
    return document.querySelector('[data-slot="editor-content"]');
}

describe('the editor value', () => {
    it('reports the html document as the reader types', async () => {
        const user = userEvent.setup();
        const seen: string[] = [];
        let editor: TiptapEditor | null = null;

        render(
            <ControlledEditor
                onValue={(value) => seen.push(value)}
                onReady={(instance) => (editor = instance)}
            />,
        );

        await mounted();
        await caretAtEnd(editor!);
        await typeInto(user, 'ing');

        await waitFor(() => expect(seen.at(-1)).toBe('<p>Drafting</p>'));
    });

    it('leaves the caret where the reader left it between keystrokes', async () => {
        const user = userEvent.setup();
        let editor: TiptapEditor | null = null;

        render(
            <ControlledEditor
                initial="<p>Draft</p>"
                onReady={(instance) => (editor = instance)}
            />,
        );

        await mounted();
        await caretAtEnd(editor!);
        await typeInto(user, 'abc');

        await waitFor(() => expect(editor!.getHTML()).toBe('<p>Draftabc</p>'));
        expect(editor!.state.selection.from).toBe(
            editor!.state.doc.content.size - 1,
        );
    });

    it('reports a json document when the caller asks for one', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        let editor: TiptapEditor | null = null;

        function JsonEditor() {
            const [value, setValue] = useState<JSONContent>({
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [{ type: 'text', text: 'Draft' }],
                    },
                ],
            });

            return (
                <Editor
                    output="json"
                    value={value}
                    label="Body"
                    onChange={(next) => {
                        setValue(next);
                        onChange(next);
                    }}
                >
                    <Expose onReady={(instance) => (editor = instance)} />
                    <EditorContent />
                </Editor>
            );
        }

        render(<JsonEditor />);
        await mounted();
        await caretAtEnd(editor!);
        await typeInto(user, 'ed');

        await waitFor(() => expect(onChange).toHaveBeenCalled());
        expect(onChange.mock.calls.at(-1)?.[0]).toMatchObject({
            type: 'doc',
            content: [
                {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Drafted' }],
                },
            ],
        });
    });

    it('takes a document handed to it from outside', async () => {
        function ExternalValue() {
            const [value, setValue] = useState('<p>First</p>');

            return (
                <>
                    <button
                        type="button"
                        onClick={() => setValue('<p>Second</p>')}
                    >
                        Load
                    </button>
                    <Editor value={value} label="Body" onChange={setValue}>
                        <EditorContent />
                    </Editor>
                </>
            );
        }

        const user = userEvent.setup();
        render(<ExternalValue />);

        expect((await mounted()).textContent).toBe('First');

        await user.click(screen.getByRole('button', { name: 'Load' }));

        await waitFor(() => expect(surface().textContent).toBe('Second'));
    });
});

describe('the editor states', () => {
    it('refuses edits while disabled', async () => {
        const user = userEvent.setup();
        const onValue = vi.fn();
        let editor: TiptapEditor | null = null;

        render(
            <ControlledEditor
                disabled
                onValue={onValue}
                onReady={(instance) => (editor = instance)}
            />,
        );

        const editable = await mounted();
        await caretAtEnd(editor!);
        editable.focus();
        await typeInto(user, 'nope');

        expect(editable.getAttribute('contenteditable')).toBe('false');
        expect(editor!.getHTML()).toBe('<p>Draft</p>');
        expect(onValue).not.toHaveBeenCalled();
        expect(
            document
                .querySelector('[data-slot="editor"]')
                ?.getAttribute('data-disabled'),
        ).toBe('');
    });

    it('refuses edits while read only', async () => {
        const user = userEvent.setup();
        const onValue = vi.fn();
        let editor: TiptapEditor | null = null;

        render(
            <ControlledEditor
                readOnly
                onValue={onValue}
                onReady={(instance) => (editor = instance)}
            />,
        );

        const editable = await mounted();
        await caretAtEnd(editor!);
        editable.focus();
        await typeInto(user, 'nope');

        expect(editable.getAttribute('contenteditable')).toBe('false');
        expect(editor!.getHTML()).toBe('<p>Draft</p>');
        expect(onValue).not.toHaveBeenCalled();
        expect(
            document
                .querySelector('[data-slot="editor"]')
                ?.getAttribute('data-disabled'),
        ).toBeNull();
    });

    it('shows the placeholder only while the document is empty', async () => {
        const user = userEvent.setup();
        let editor: TiptapEditor | null = null;

        render(
            <ControlledEditor
                initial=""
                placeholder="Say something"
                onReady={(instance) => (editor = instance)}
            />,
        );

        await mounted();

        expect(content()?.getAttribute('data-placeholder')).toBe(
            'Say something',
        );
        expect(content()?.getAttribute('data-empty')).toBe('');

        await caretAtEnd(editor!);
        await typeInto(user, 'a');

        await waitFor(() =>
            expect(content()?.getAttribute('data-empty')).toBeNull(),
        );
    });
});

describe('the editor schema', () => {
    it('drops markup the schema does not know, so a stored script never mounts', async () => {
        let editor: TiptapEditor | null = null;

        render(
            <ControlledEditor
                initial='<p>Safe</p><script>window.stolen = 1</script><img src="x" onerror="steal()">'
                onReady={(instance) => (editor = instance)}
            />,
        );

        const editable = await mounted();

        expect(editable.querySelector('script')).toBeNull();
        expect(editable.innerHTML).not.toContain('onerror');
        expect(editor!.getHTML()).toBe('<p>Safe</p>');
    });

    it('refuses a javascript url on a link', async () => {
        render(
            <ControlledEditor initial='<p><a href="javascript:steal()">tap</a></p>' />,
        );

        expect((await mounted()).innerHTML).not.toContain('javascript:');
    });
});
