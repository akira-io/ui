// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { EditorContent } from '@/components/ui/editor/content';
import { Editor } from '@/components/ui/editor/editor';
import { defaultEditorExtensions } from '@/components/ui/editor/extensions';
import { editorProse } from '@/components/ui/editor/prose';
import { taskListExtensions } from '@/components/ui/editor/task-list';
import { surface } from '../../../../tests/fixtures/editor';
import { supportProseMirrorLayout } from '../../../../tests/helpers/prosemirror';

supportProseMirrorLayout();

afterEach(cleanup);

const CHECKLIST =
    '<ul data-type="taskList"><li data-type="taskItem" data-checked="true"><p>Reply to the customer</p></li><li data-type="taskItem" data-checked="false"><p>Close the ticket</p></li></ul>';

function noop(): void {}

function renderChecklist(): void {
    render(
        <Editor
            value={CHECKLIST}
            onChange={noop}
            extensions={[...defaultEditorExtensions(), ...taskListExtensions()]}
        >
            <EditorContent />
        </Editor>,
    );
}

describe('a task list in the editor', () => {
    it('renders each item with its own checkbox, checked as stored', async () => {
        renderChecklist();

        await waitFor(() =>
            expect(
                surface().querySelectorAll('ul[data-type="taskList"] > li'),
            ).toHaveLength(2),
        );

        const boxes = [
            ...surface().querySelectorAll<HTMLInputElement>(
                'ul[data-type="taskList"] input[type="checkbox"]',
            ),
        ];

        expect(boxes.map((box) => box.checked)).toEqual([true, false]);
    });

    it('drops the bullet and the indent a bullet list keeps', () => {
        expect(editorProse).toContain('[&_ul[data-type=taskList]]:list-none');
        expect(editorProse).toContain('[&_ul[data-type=taskList]]:pl-0');
    });

    it('lays each item out as a row with the checkbox on the first line of text', () => {
        expect(editorProse).toContain('[&_ul[data-type=taskList]>li]:flex');
        expect(editorProse).toContain(
            '[&_ul[data-type=taskList]>li>label]:h-[1lh]',
        );
        expect(editorProse).toContain(
            '[&_ul[data-type=taskList]>li>label]:items-center',
        );
    });

    it('greys and strikes through a checked item', () => {
        expect(editorProse).toContain(
            '[&_ul[data-type=taskList]>li[data-checked=true]>div]:text-muted-foreground',
        );
        expect(editorProse).toContain(
            '[&_ul[data-type=taskList]>li[data-checked=true]>div]:line-through',
        );
    });

    it('keeps the text inline with the checkbox, without paragraph margins', () => {
        expect(editorProse).toContain(
            '[&_ul[data-type=taskList]>li>div]:flex-1',
        );
        expect(editorProse).toContain(
            '[&_ul[data-type=taskList]>li>div>p]:my-0',
        );
    });

    it('applies every prose rule to the editing surface', async () => {
        renderChecklist();

        await waitFor(() => expect(surface().className).toContain(editorProse));
    });

    it('renders an item nested inside another', async () => {
        render(
            <Editor
                value='<ul data-type="taskList"><li data-type="taskItem" data-checked="false"><p>Parent</p><ul data-type="taskList"><li data-type="taskItem" data-checked="true"><p>Child</p></li></ul></li></ul>'
                onChange={noop}
                extensions={[
                    ...defaultEditorExtensions(),
                    ...taskListExtensions(),
                ]}
            >
                <EditorContent />
            </Editor>,
        );

        await waitFor(() =>
            expect(
                surface().querySelectorAll(
                    'ul[data-type="taskList"] > li ul[data-type="taskList"] > li',
                ),
            ).toHaveLength(1),
        );
    });
});

describe('the task list extensions', () => {
    it('let items nest', () => {
        const [, item] = taskListExtensions();

        expect(item.name).toBe('taskItem');
        expect(item.options.nested).toBe(true);
    });

    it('keep the Tiptap checkbox name when the app hands none', async () => {
        renderChecklist();

        expect(
            await screen.findByRole('checkbox', {
                name: 'Task item checkbox for Reply to the customer',
            }),
        ).toBeDefined();
    });

    it('name each checkbox with the label the app hands them', async () => {
        render(
            <Editor
                value={CHECKLIST}
                onChange={noop}
                extensions={[
                    ...defaultEditorExtensions(),
                    ...taskListExtensions({
                        checkboxLabel: (text, checked) =>
                            `${checked ? 'Concluída' : 'Por fazer'}: ${text}`,
                    }),
                ]}
            >
                <EditorContent />
            </Editor>,
        );

        await waitFor(() =>
            expect(
                screen.getByRole('checkbox', {
                    name: 'Concluída: Reply to the customer',
                }),
            ).toBeDefined(),
        );
        expect(
            screen.getByRole('checkbox', {
                name: 'Por fazer: Close the ticket',
            }),
        ).toBeDefined();
    });
});
