# Editor

The editor is a composable rich text field built on [Tiptap](https://tiptap.dev). It ships from its own
entry point, `@akira-io/ui/editor`, and nothing in it is re-exported from the package root.

```tsx
import { RichTextEditor } from '@akira-io/ui/editor';
```

## Installing the peers

Tiptap is an optional peer dependency, so `npm install @akira-io/ui` never pulls it in and an app that
does not import the editor pays nothing for it. Install the four packages yourself when you use the editor:

```bash
bun add @tiptap/core @tiptap/pm @tiptap/react @tiptap/starter-kit
```

`@tiptap/starter-kit` carries the marks, lists, link and history extensions the default toolbar drives.
An app that supplies its own extension set still needs `@tiptap/core`, `@tiptap/pm` and `@tiptap/react`.

## The preassembled editor

`RichTextEditor` is the default composition: the standard toolbar and the content area, controlled through
`value` and `onChange`.

```tsx
import { RichTextEditor } from '@akira-io/ui/editor';
import { useState } from 'react';

function Description() {
    const [body, setBody] = useState('<p>Draft</p>');

    return (
        <RichTextEditor
            value={body}
            onChange={setBody}
            label="Description"
            placeholder="Describe the project"
        />
    );
}
```

Its toolbar is bold, italic, strikethrough, headings 2 and 3, bullet and ordered lists, quote, inline code,
the link dialog, undo and redo. It adds no editing behaviour of its own; it is exactly the tree below.

## Composing your own toolbar

`Editor` mounts Tiptap once and publishes it through context, so the parts read the selection wherever
they sit in the tree and appear in whatever order you place them.

```tsx
import {
    Editor,
    EditorBlockquote,
    EditorContent,
    EditorHeading,
    EditorHistory,
    EditorLink,
    EditorList,
    EditorMark,
    EditorToolbar,
} from '@akira-io/ui/editor';

<Editor value={body} onChange={setBody} label="Description">
    <EditorToolbar>
        <EditorMark mark="bold" />
        <EditorHeading level={2} />
        <EditorList variant="bullet" />
        <EditorBlockquote />
        <EditorLink />
        <EditorHistory action="undo" />
    </EditorToolbar>
    <EditorContent />
</Editor>;
```

Every control reflects the state at the cursor and disables itself when its command cannot run there.
`EditorLink` opens the library's `Dialog` to collect the address; it never calls the browser's `prompt`.

| Export | What it is |
| --- | --- |
| `Editor` | Mounts Tiptap, owns the controlled value, and provides the context. |
| `EditorContent` | The editing surface. Carries the same field styling and focus ring as `Input` and `Textarea`. |
| `EditorToolbar` | A `role="toolbar"` row. Its controls are in the normal tab order. |
| `EditorMark` | `mark="bold" \| "italic" \| "strike" \| "code"`. |
| `EditorHeading` | `level={1..6}`. |
| `EditorList` | `variant="bullet" \| "ordered"`. |
| `EditorBlockquote` | Wraps the block in a quote. |
| `EditorLink` | The link control and its dialog. |
| `EditorHistory` | `action="undo" \| "redo"`. |
| `EditorControl` | The button the controls are built from, for a control the set does not cover. |
| `useEditorContext()` | `{ editor, labels, editable, placeholder }` for a part of your own. |
| `defaultEditorExtensions()` | The default extension set, to extend or replace. |
| `isSafeEditorUrl(url)` | The protocol check the link dialog applies. |
| `editorLabels` | The English defaults, as the `EditorLabels` shape. |

## Props

`EditorProps`:

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `value` | `string` when `output` is `html`, `JSONContent` when it is `json` | Yes | |
| `onChange` | `(value: string) => void` or `(value: JSONContent) => void` | Yes | Emits the shape `output` names. |
| `output` | `'html' \| 'json'` | No | Defaults to `html`. |
| `extensions` | `Extensions` | No | Defaults to `defaultEditorExtensions()`. |
| `labels` | `EditorLabels` | No | Every accessible name and every word in the link dialog. |
| `label` | `string` | No | The accessible name of the editing surface. Fixed at mount. |
| `placeholder` | `string` | No | Shown while the document is empty. |
| `disabled` | `boolean` | No | Stops editing and dims the whole tree, as on the other form controls. |
| `readOnly` | `boolean` | No | Stops editing without dimming anything. |
| `className` | `string` | No | |

`RichTextEditor` takes the same props without `children`.

The component is controlled and binds to no form library. Wire it through `Controller`, Inertia's
`useForm`, or plain state.

## Translating it

Every accessible name and every word in the link dialog is an `EditorLabels` field with an English default,
so a Portuguese app hands over its own:

```tsx
import { editorLabels } from '@akira-io/ui/editor';

const labels = {
    ...editorLabels,
    toolbarLabel: 'Formatação',
    boldLabel: 'Negrito',
    linkDialogTitle: 'Ligação',
};

<RichTextEditor value={body} onChange={setBody} labels={labels} />;
```

## The HTML the editor gives you, and the HTML you give it

Content arriving from a server is untrusted, and the editor treats it that way. Tiptap parses incoming
HTML with ProseMirror's parser against the schema the extensions declare: a tag with no rule in that schema
never becomes a node, and an attribute no node declares never survives. A stored `<script>` is dropped
rather than mounted, an `onerror` attribute never reaches the DOM, and the link extension is configured to
accept only `http`, `https`, `mailto` and `tel`, so a `javascript:` address is refused both on paste and in
the link dialog. The document the editor renders is built from the parsed nodes, never from the raw string.

That covers what the editor renders. It does not cover what your application renders elsewhere. When you
take the HTML this component emits and put it back on a page with `dangerouslySetInnerHTML`, you are
outside the editor's schema and the string is only as safe as the pipeline it travelled through. Sanitize
on the way out, in the consuming application, as the acceptance criteria for this component say.

## The prose styling

The editing surface draws its type, quotes, code and links from the semantic tokens, so a brand preset
recolours the written content along with everything else. There is no palette of its own to keep in step.

---

[← Blocks](08-blocks.md) · Next: [Code →](10-code.md)
