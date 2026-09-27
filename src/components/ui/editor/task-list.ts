import type { Extensions } from '@tiptap/core';
import { TaskItem, TaskList } from '@tiptap/extension-list';

export interface TaskListOptions {
    checkboxLabel?: (text: string, checked: boolean) => string;
}

export function taskListExtensions({
    checkboxLabel,
}: TaskListOptions = {}): Extensions {
    return [
        TaskList,
        TaskItem.configure({
            nested: true,
            ...(checkboxLabel && {
                a11y: {
                    checkboxLabel: (node) =>
                        checkboxLabel(
                            node.textContent,
                            node.attrs.checked === true,
                        ),
                },
            }),
        }),
    ];
}
