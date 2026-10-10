import { Extensions } from '@tiptap/core';

interface TaskListOptions {
    checkboxLabel?: (text: string, checked: boolean) => string;
}
declare function taskListExtensions({ checkboxLabel, }?: TaskListOptions): Extensions;

export { type TaskListOptions, taskListExtensions };
