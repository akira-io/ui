'use client';

"use client";
import {
  Toggle
} from "./chunk-GR67YVDF.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./chunk-VSDPJW6I.js";
import {
  Label
} from "./chunk-JKKXBCNI.js";
import {
  Input,
  Separator
} from "./chunk-OTLBSTHU.js";
import {
  Button,
  cn,
  fieldSurface,
  focusRing
} from "./chunk-33SBGSQF.js";

// src/components/ui/editor/content.tsx
import { EditorContent as TiptapContent } from "@tiptap/react";

// src/components/ui/editor/context.tsx
import { createContext, useContext } from "react";
var EditorContext = createContext(null);
var EditorContextProvider = EditorContext.Provider;
function useEditorContext() {
  const context = useContext(EditorContext);
  if (context === null) {
    throw new Error("Editor parts must be used inside <Editor>.");
  }
  return context;
}

// src/components/ui/editor/content.tsx
import { jsx } from "react/jsx-runtime";
function EditorContent({
  className,
  slotName = "editor-content"
}) {
  const { editor, placeholder } = useEditorContext();
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-placeholder": placeholder,
      "data-empty": editor.isEmpty ? "" : void 0,
      className: cn(
        "data-empty:before:top-3 data-empty:before:left-4 data-empty:before:text-sm data-empty:before:font-medium relative w-full data-empty:before:pointer-events-none data-empty:before:absolute data-empty:before:text-muted-foreground data-empty:before:content-[attr(data-placeholder)]",
        className
      ),
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx(TiptapContent, { editor })
    }
  );
}

// src/components/ui/editor/controls.tsx
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Undo2
} from "lucide-react";

// src/components/ui/editor/toolbar.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function EditorToolbar({
  children,
  className,
  slotName = "editor-toolbar"
}) {
  const { labels } = useEditorContext();
  return /* @__PURE__ */ jsx2(
    "div",
    {
      role: "toolbar",
      "aria-label": labels.toolbarLabel,
      "aria-orientation": "horizontal",
      className: cn("gap-1 flex flex-wrap items-center", className),
      "data-slot": slotName,
      children
    }
  );
}
function EditorControl({
  label,
  icon: Icon,
  pressed = false,
  disabled = false,
  onActivate,
  className,
  slotName = "editor-control"
}) {
  const { editable } = useEditorContext();
  return /* @__PURE__ */ jsx2(
    Toggle,
    {
      size: "sm",
      "aria-label": label,
      title: label,
      pressed,
      disabled: disabled || !editable,
      onPressedChange: onActivate,
      className,
      slotName,
      children: /* @__PURE__ */ jsx2(Icon, { "aria-hidden": "true" })
    }
  );
}

// src/components/ui/editor/controls.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var MARK_ICONS = {
  bold: Bold,
  italic: Italic,
  strike: Strikethrough,
  code: Code
};
function EditorMark({ mark, label, className }) {
  const { editor, labels } = useEditorContext();
  const names = {
    bold: labels.boldLabel,
    italic: labels.italicLabel,
    strike: labels.strikeLabel,
    code: labels.codeLabel
  };
  return /* @__PURE__ */ jsx3(
    EditorControl,
    {
      label: label ?? names[mark],
      icon: MARK_ICONS[mark],
      pressed: editor.isActive(mark),
      disabled: !editor.can().toggleMark(mark),
      onActivate: () => editor.chain().focus().toggleMark(mark).run(),
      className
    }
  );
}
var HEADING_ICONS = {
  1: Heading1,
  2: Heading2,
  3: Heading3,
  4: Heading4,
  5: Heading5,
  6: Heading6
};
function EditorHeading({ level, label, className }) {
  const { editor, labels } = useEditorContext();
  return /* @__PURE__ */ jsx3(
    EditorControl,
    {
      label: label ?? labels.headingLabel(level),
      icon: HEADING_ICONS[level],
      pressed: editor.isActive("heading", { level }),
      disabled: !editor.can().toggleNode("heading", "paragraph", { level }),
      onActivate: () => editor.chain().focus().toggleHeading({ level }).run(),
      className
    }
  );
}
function EditorList({ variant, label, className }) {
  const { editor, labels } = useEditorContext();
  const name = variant === "bullet" ? "bulletList" : "orderedList";
  return /* @__PURE__ */ jsx3(
    EditorControl,
    {
      label: label ?? (variant === "bullet" ? labels.bulletListLabel : labels.orderedListLabel),
      icon: variant === "bullet" ? List : ListOrdered,
      pressed: editor.isActive(name),
      disabled: !editor.can().toggleList(name, "listItem"),
      onActivate: () => variant === "bullet" ? editor.chain().focus().toggleBulletList().run() : editor.chain().focus().toggleOrderedList().run(),
      className
    }
  );
}
function EditorBlockquote({ label, className }) {
  const { editor, labels } = useEditorContext();
  return /* @__PURE__ */ jsx3(
    EditorControl,
    {
      label: label ?? labels.blockquoteLabel,
      icon: Quote,
      pressed: editor.isActive("blockquote"),
      disabled: !editor.can().toggleWrap("blockquote"),
      onActivate: () => editor.chain().focus().toggleBlockquote().run(),
      className
    }
  );
}
function EditorHistory({
  action,
  label,
  className,
  slotName = "editor-history"
}) {
  const { editor, labels, editable } = useEditorContext();
  const undoing = action === "undo";
  const available = undoing ? editor.can().undo() : editor.can().redo();
  const Icon = undoing ? Undo2 : Redo2;
  return /* @__PURE__ */ jsx3(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "icon-sm",
      "aria-label": label ?? (undoing ? labels.undoLabel : labels.redoLabel),
      title: label ?? (undoing ? labels.undoLabel : labels.redoLabel),
      disabled: !available || !editable,
      onClick: () => undoing ? editor.chain().focus().undo().run() : editor.chain().focus().redo().run(),
      className,
      slotName,
      children: /* @__PURE__ */ jsx3(Icon, { "aria-hidden": "true" })
    }
  );
}

// src/components/ui/editor/editor.tsx
import { useEditor } from "@tiptap/react";
import { useEffect, useMemo, useRef, useState } from "react";

// src/components/ui/editor/extensions.ts
import StarterKit from "@tiptap/starter-kit";
var SAFE_PROTOCOLS = ["http", "https", "mailto", "tel"];
function isSafeEditorUrl(url) {
  const protocol = /^([a-z][a-z0-9+.-]*):/i.exec(url.trim())?.[1];
  return protocol === void 0 || SAFE_PROTOCOLS.includes(protocol.toLowerCase());
}
function defaultEditorExtensions() {
  return [
    StarterKit.configure({
      link: {
        openOnClick: false,
        autolink: true,
        protocols: SAFE_PROTOCOLS,
        isAllowedUri: (url) => isSafeEditorUrl(url),
        HTMLAttributes: {
          rel: "noopener noreferrer nofollow",
          target: "_blank"
        }
      }
    })
  ];
}

// src/components/ui/editor/labels.ts
var editorLabels = {
  toolbarLabel: "Formatting",
  boldLabel: "Bold",
  italicLabel: "Italic",
  strikeLabel: "Strikethrough",
  codeLabel: "Code",
  headingLabel: (level) => `Heading ${level}`,
  bulletListLabel: "Bullet list",
  orderedListLabel: "Numbered list",
  blockquoteLabel: "Quote",
  undoLabel: "Undo",
  redoLabel: "Redo",
  linkLabel: "Link",
  linkDialogTitle: "Link",
  linkDialogDescription: "Point the selected text at an address.",
  linkUrlLabel: "Address",
  linkUrlPlaceholder: "https://example.com",
  linkApplyLabel: "Apply",
  linkRemoveLabel: "Remove",
  linkCancelLabel: "Cancel"
};

// src/components/ui/editor/editor.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var editorProse = "text-sm font-medium leading-relaxed [&_p]:my-2 [&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-3 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-normal [&_pre]:my-3 [&_pre]:rounded-xl [&_pre]:bg-muted [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_hr]:my-4 [&_hr]:border-border";
var editingSurface = `${fieldSurface} ${focusRing} ${editorProse} min-h-32 w-full px-4 py-3 selection:bg-primary selection:text-primary-foreground`;
function read(editor, output) {
  return output === "json" ? editor.getJSON() : editor.getHTML();
}
function isSameDocument(left, right) {
  if (typeof left === "string" && typeof right === "string") {
    return left === right;
  }
  return JSON.stringify(left) === JSON.stringify(right);
}
function Editor({
  value,
  onChange,
  output = "html",
  extensions,
  labels = editorLabels,
  placeholder,
  label,
  disabled = false,
  readOnly = false,
  className,
  children,
  slotName = "editor"
}) {
  const [revision, setRevision] = useState(0);
  const editable = !disabled && !readOnly;
  const emit = useRef(onChange);
  emit.current = onChange;
  const emitted = useRef(null);
  const extensionSet = useMemo(
    () => extensions ?? defaultEditorExtensions(),
    [extensions]
  );
  const editor = useEditor(
    {
      extensions: extensionSet,
      content: value,
      editable,
      immediatelyRender: false,
      editorProps: {
        attributes: {
          "data-slot": "editor-surface",
          role: "textbox",
          "aria-multiline": "true",
          ...label === void 0 ? {} : { "aria-label": label },
          class: editingSurface
        }
      },
      onUpdate: ({ editor: instance }) => {
        const next = read(instance, output);
        emitted.current = next;
        emit.current(next);
      }
    },
    [extensionSet]
  );
  useEffect(() => {
    if (editor === null) {
      return;
    }
    const rerender = () => setRevision((revision2) => revision2 + 1);
    editor.on("transaction", rerender);
    return () => {
      editor.off("transaction", rerender);
    };
  }, [editor]);
  useEffect(() => {
    editor?.setEditable(editable, false);
  }, [editor, editable]);
  useEffect(() => {
    if (editor === null) {
      return;
    }
    const echoed = emitted.current !== null && isSameDocument(emitted.current, value);
    if (echoed || isSameDocument(read(editor, output), value)) {
      return;
    }
    emitted.current = null;
    editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value, output]);
  const context = useMemo(
    () => editor === null ? null : { editor, labels, editable, placeholder },
    [editor, labels, editable, placeholder, revision]
  );
  if (context === null) {
    return null;
  }
  return /* @__PURE__ */ jsx4(EditorContextProvider, { value: context, children: /* @__PURE__ */ jsx4(
    "div",
    {
      "data-disabled": disabled ? "" : void 0,
      "data-readonly": readOnly ? "" : void 0,
      className: cn(
        "gap-2 flex w-full flex-col data-disabled:opacity-50",
        className
      ),
      "data-slot": slotName,
      children
    }
  ) });
}

// src/components/ui/editor/link.tsx
import { Link2 } from "lucide-react";
import { useId, useState as useState2 } from "react";
import { Fragment, jsx as jsx5, jsxs } from "react/jsx-runtime";
function EditorLink({
  label,
  className,
  slotName = "editor-link-dialog"
}) {
  const { editor, labels, editable } = useEditorContext();
  const [open, setOpen] = useState2(false);
  const [href, setHref] = useState2("");
  const attached = editor.isActive("link");
  const fieldId = useId();
  function openDialog() {
    setHref(editor.getAttributes("link").href ?? "");
    setOpen(true);
  }
  function apply() {
    if (!isSafeEditorUrl(href)) {
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: href.trim() }).run();
    setOpen(false);
  }
  function remove() {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setOpen(false);
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx5(
      EditorControl,
      {
        label: label ?? labels.linkLabel,
        icon: Link2,
        pressed: attached,
        disabled: !editable,
        onActivate: openDialog,
        className
      }
    ),
    /* @__PURE__ */ jsx5(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(DialogContent, { slotName, children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx5(DialogTitle, { children: labels.linkDialogTitle }),
        /* @__PURE__ */ jsx5(DialogDescription, { children: labels.linkDialogDescription })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "gap-2 flex flex-col", children: [
        /* @__PURE__ */ jsx5(Label, { htmlFor: fieldId, children: labels.linkUrlLabel }),
        /* @__PURE__ */ jsx5(
          Input,
          {
            id: fieldId,
            slotName: "editor-link-url",
            value: href,
            placeholder: labels.linkUrlPlaceholder,
            onChange: (event) => setHref(event.target.value),
            onKeyDown: (event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                apply();
              }
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        attached && /* @__PURE__ */ jsx5(
          Button,
          {
            type: "button",
            variant: "ghost",
            onClick: remove,
            children: labels.linkRemoveLabel
          }
        ),
        /* @__PURE__ */ jsx5(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setOpen(false),
            children: labels.linkCancelLabel
          }
        ),
        /* @__PURE__ */ jsx5(
          Button,
          {
            type: "button",
            onClick: apply,
            disabled: href.trim() === "",
            children: labels.linkApplyLabel
          }
        )
      ] })
    ] }) })
  ] });
}

// src/components/ui/editor/rich-text-editor.tsx
import { jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
function RichTextEditor(props) {
  return /* @__PURE__ */ jsxs2(Editor, { ...props, children: [
    /* @__PURE__ */ jsxs2(EditorToolbar, { children: [
      /* @__PURE__ */ jsx6(EditorMark, { mark: "bold" }),
      /* @__PURE__ */ jsx6(EditorMark, { mark: "italic" }),
      /* @__PURE__ */ jsx6(EditorMark, { mark: "strike" }),
      /* @__PURE__ */ jsx6(Separator, { orientation: "vertical", className: "mx-1 h-6" }),
      /* @__PURE__ */ jsx6(EditorHeading, { level: 2 }),
      /* @__PURE__ */ jsx6(EditorHeading, { level: 3 }),
      /* @__PURE__ */ jsx6(Separator, { orientation: "vertical", className: "mx-1 h-6" }),
      /* @__PURE__ */ jsx6(EditorList, { variant: "bullet" }),
      /* @__PURE__ */ jsx6(EditorList, { variant: "ordered" }),
      /* @__PURE__ */ jsx6(EditorBlockquote, {}),
      /* @__PURE__ */ jsx6(EditorMark, { mark: "code" }),
      /* @__PURE__ */ jsx6(EditorLink, {}),
      /* @__PURE__ */ jsx6(Separator, { orientation: "vertical", className: "mx-1 h-6" }),
      /* @__PURE__ */ jsx6(EditorHistory, { action: "undo" }),
      /* @__PURE__ */ jsx6(EditorHistory, { action: "redo" })
    ] }),
    /* @__PURE__ */ jsx6(EditorContent, {})
  ] });
}
export {
  Editor,
  EditorBlockquote,
  EditorContent,
  EditorControl,
  EditorHeading,
  EditorHistory,
  EditorLink,
  EditorList,
  EditorMark,
  EditorToolbar,
  RichTextEditor,
  defaultEditorExtensions,
  editorLabels,
  isSafeEditorUrl,
  useEditorContext
};
//# sourceMappingURL=editor.js.map