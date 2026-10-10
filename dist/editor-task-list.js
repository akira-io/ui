// src/components/ui/editor/task-list.ts
import { TaskItem, TaskList } from "@tiptap/extension-list";
function taskListExtensions({
  checkboxLabel
} = {}) {
  return [
    TaskList,
    TaskItem.configure({
      nested: true,
      ...checkboxLabel && {
        a11y: {
          checkboxLabel: (node) => checkboxLabel(
            node.textContent,
            node.attrs.checked === true
          )
        }
      }
    })
  ];
}
export {
  taskListExtensions
};
//# sourceMappingURL=editor-task-list.js.map