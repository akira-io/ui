'use client';

"use client";
import {
  CopyButton
} from "./chunk-4DMNLMQR.js";
import {
  useUiLabels
} from "./chunk-ZZDRO234.js";
import {
  Button,
  cn,
  compactRadius,
  controlFill,
  elevatedSurface,
  focusRing,
  nestedSurfaceReset
} from "./chunk-33SBGSQF.js";

// src/components/ui/code.tsx
import { jsx } from "react/jsx-runtime";
function Code({
  className,
  slotName = "code",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "code",
    {
      className: cn(
        compactRadius,
        controlFill,
        "px-1.5 py-0.5 font-mono font-medium text-[0.875em] text-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/code-block.tsx
import * as React2 from "react";

// src/components/ui/code-block-header.tsx
import { FileCode } from "lucide-react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function CodeBlockHeader({
  filename,
  language,
  code,
  copyLabel,
  copiedLabel,
  slotName = "code-block-header"
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "gap-2 px-4 py-2 flex items-center border-b border-border",
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx2(FileCode, { className: "size-4 shrink-0 text-muted-foreground" }),
        /* @__PURE__ */ jsx2(
          "span",
          {
            "data-slot": "code-block-filename",
            className: "text-sm font-medium truncate text-foreground",
            children: filename
          }
        ),
        language !== void 0 && /* @__PURE__ */ jsx2(
          "span",
          {
            "data-slot": "code-block-language",
            className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
            children: language
          }
        ),
        /* @__PURE__ */ jsx2(
          CopyButton,
          {
            value: code,
            copyLabel,
            copiedLabel,
            className: "ml-auto text-muted-foreground"
          }
        )
      ]
    }
  );
}

// src/hooks/use-highlighted-code.ts
import * as React from "react";

// src/lib/shiki.ts
var LIGHT_THEME = "github-light";
var DARK_THEME = "github-dark";
var pending = null;
function loadCodeToHtml() {
  pending ??= import("shiki").then((module) => module.codeToHtml).catch(() => null);
  return pending;
}
async function highlightCode(code, language) {
  const codeToHtml = await loadCodeToHtml();
  if (!codeToHtml) {
    return null;
  }
  try {
    return await codeToHtml(code, {
      lang: language,
      themes: { light: LIGHT_THEME, dark: DARK_THEME },
      defaultColor: false
    });
  } catch {
    return null;
  }
}

// src/hooks/use-highlighted-code.ts
function useHighlightedCode(code, language, html) {
  const [highlighted, setHighlighted] = React.useState(
    html ?? null
  );
  React.useEffect(() => {
    if (html !== void 0) {
      setHighlighted(html);
      return;
    }
    if (language === void 0) {
      setHighlighted(null);
      return;
    }
    let active = true;
    highlightCode(code, language).then((result) => {
      if (active) {
        setHighlighted(result);
      }
    });
    return () => {
      active = false;
    };
  }, [code, language, html]);
  return highlighted;
}

// src/lib/code-lines.ts
var LINE_OPEN = '<span class="line">';
var SPAN_CLOSE = "</span>";
function splitSourceLines(code) {
  return code.replace(/\n$/, "").split("\n");
}
function parseLineRanges(spec) {
  const lines = /* @__PURE__ */ new Set();
  if (spec === void 0) {
    return lines;
  }
  if (Array.isArray(spec)) {
    for (const line of spec) {
      lines.add(line);
    }
    return lines;
  }
  for (const part of spec.split(",")) {
    const [from, to] = part.split("-").map((bound) => Number.parseInt(bound.trim(), 10));
    if (Number.isNaN(from)) {
      continue;
    }
    const last = to === void 0 || Number.isNaN(to) ? from : to;
    for (let line = from; line <= last; line += 1) {
      lines.add(line);
    }
  }
  return lines;
}
function closingSpan(html, from) {
  let depth = 0;
  let cursor = from;
  while (cursor < html.length) {
    const open = html.indexOf("<span", cursor);
    const close = html.indexOf(SPAN_CLOSE, cursor);
    if (close === -1) {
      return -1;
    }
    if (open !== -1 && open < close) {
      depth += 1;
      cursor = open + 5;
      continue;
    }
    if (depth === 0) {
      return close;
    }
    depth -= 1;
    cursor = close + SPAN_CLOSE.length;
  }
  return -1;
}
function splitHighlightedLines(html) {
  const lines = [];
  let cursor = html.indexOf(LINE_OPEN);
  while (cursor !== -1) {
    const start = cursor + LINE_OPEN.length;
    const end = closingSpan(html, start);
    if (end === -1) {
      return null;
    }
    lines.push(html.slice(start, end));
    cursor = html.indexOf(LINE_OPEN, end);
  }
  return lines.length > 0 ? lines : null;
}

// src/components/ui/code-block.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var codeBlockLabels = {
  copyLabel: "Copy",
  copiedLabel: "Copied",
  expandLabel: "Expand",
  collapseLabel: "Collapse"
};
function CodeBlock({
  code,
  language,
  html,
  filename,
  lineNumbers = false,
  highlightLines,
  maxHeight,
  copyLabel,
  copiedLabel,
  expandLabel,
  collapseLabel,
  className,
  slotName = "code-block",
  ...props
}) {
  const labels = useUiLabels("codeBlock", codeBlockLabels, {
    copyLabel,
    copiedLabel,
    expandLabel,
    collapseLabel
  });
  const highlighted = useHighlightedCode(code, language, html);
  const lines = React2.useMemo(() => splitSourceLines(code), [code]);
  const markup = React2.useMemo(
    () => highlighted === null ? null : splitHighlightedLines(highlighted),
    [highlighted]
  );
  const emphasised = React2.useMemo(
    () => parseLineRanges(highlightLines),
    [highlightLines]
  );
  const bodyRef = React2.useRef(null);
  const [expanded, setExpanded] = React2.useState(false);
  const [clipped, setClipped] = React2.useState(false);
  React2.useEffect(() => {
    const body = bodyRef.current;
    if (!body || maxHeight === void 0 || expanded) {
      return;
    }
    setClipped(body.scrollHeight > body.clientHeight + 1);
  }, [maxHeight, expanded, lines, markup]);
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: cn(
        elevatedSurface,
        nestedSurfaceReset,
        "relative overflow-hidden bg-card",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        filename === void 0 ? /* @__PURE__ */ jsx3(
          CopyButton,
          {
            value: code,
            copyLabel: labels.copyLabel,
            copiedLabel: labels.copiedLabel,
            className: "top-2 right-2 absolute z-10 text-muted-foreground"
          }
        ) : /* @__PURE__ */ jsx3(
          CodeBlockHeader,
          {
            filename,
            language,
            code,
            copyLabel: labels.copyLabel,
            copiedLabel: labels.copiedLabel
          }
        ),
        /* @__PURE__ */ jsx3(
          "div",
          {
            ref: bodyRef,
            "data-slot": "code-block-body",
            style: { maxHeight: expanded ? void 0 : maxHeight },
            className: "py-4 font-mono text-sm leading-6 overflow-auto rounded-[inherit]",
            children: /* @__PURE__ */ jsx3("pre", { className: "w-max min-w-full", children: /* @__PURE__ */ jsx3("code", { "data-slot": "code-block-code", children: lines.map((line, index) => /* @__PURE__ */ jsx3(
              CodeBlockLine,
              {
                number: index + 1,
                line,
                markup: markup?.[index],
                lineNumbers,
                emphasised: emphasised.has(index + 1)
              },
              index
            )) }) })
          }
        ),
        clipped && /* @__PURE__ */ jsx3(
          CodeBlockExpander,
          {
            expanded,
            expandLabel: labels.expandLabel,
            collapseLabel: labels.collapseLabel,
            onToggle: () => setExpanded((open) => !open)
          }
        )
      ]
    }
  );
}
function CodeBlockLine({
  number,
  line,
  markup,
  lineNumbers,
  emphasised,
  slotName = "code-block-line"
}) {
  return /* @__PURE__ */ jsxs2(
    "span",
    {
      "data-highlighted": emphasised ? "" : void 0,
      className: cn(
        "min-h-6 px-4 grid w-full data-highlighted:bg-accent",
        lineNumbers ? "grid-cols-[2.5rem_1fr]" : "grid-cols-1"
      ),
      "data-slot": slotName,
      children: [
        lineNumbers && /* @__PURE__ */ jsx3(
          "span",
          {
            "data-slot": "code-block-gutter",
            "aria-hidden": "true",
            className: "pr-4 text-right text-muted-foreground select-none",
            children: number
          }
        ),
        markup === void 0 ? /* @__PURE__ */ jsx3("span", { "data-slot": "code-block-source", children: line }) : /* @__PURE__ */ jsx3(
          "span",
          {
            "data-slot": "code-block-source",
            dangerouslySetInnerHTML: { __html: markup }
          }
        )
      ]
    }
  );
}
function CodeBlockExpander({
  expanded,
  expandLabel,
  collapseLabel,
  onToggle,
  slotName = "code-block-expander"
}) {
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: "inset-x-0 bottom-0 pt-10 pb-2 absolute flex justify-center",
      "data-slot": slotName,
      children: [
        !expanded && /* @__PURE__ */ jsx3(
          "span",
          {
            "aria-hidden": "true",
            className: "inset-0 pointer-events-none absolute bg-gradient-to-t from-card to-transparent"
          }
        ),
        /* @__PURE__ */ jsx3(
          Button,
          {
            type: "button",
            variant: "secondary",
            size: "sm",
            onClick: onToggle,
            children: expanded ? collapseLabel : expandLabel
          }
        )
      ]
    }
  );
}

// src/components/ui/json-viewer.tsx
import * as React4 from "react";

// src/components/ui/json-node.tsx
import { ChevronRight } from "lucide-react";
import * as React3 from "react";

// src/lib/json-value.ts
var CIRCULAR_MARKER = "[Circular]";
function jsonKind(value) {
  if (value === null) {
    return "null";
  }
  if (Array.isArray(value)) {
    return "array";
  }
  switch (typeof value) {
    case "string":
      return "string";
    case "number":
      return Number.isFinite(value) ? "number" : "unsupported";
    case "boolean":
      return "boolean";
    case "object":
      return "object";
    default:
      return "unsupported";
  }
}
function isBranch(kind) {
  return kind === "object" || kind === "array";
}
function entriesOf(value) {
  if (Array.isArray(value)) {
    return value.map((item, index) => [String(index), item]);
  }
  if (value !== null && typeof value === "object") {
    return Object.entries(value);
  }
  return [];
}
function serialisable(value, ancestors) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (value === null || typeof value !== "object") {
    return value;
  }
  if (ancestors.includes(value)) {
    return CIRCULAR_MARKER;
  }
  const trail = [...ancestors, value];
  if (Array.isArray(value)) {
    return value.map((item) => serialisable(item, trail));
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      serialisable(item, trail)
    ])
  );
}
function stringifyJson(value) {
  return JSON.stringify(serialisable(value, []), null, 2) ?? "null";
}

// src/components/ui/json-node.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var LEAF_CLASS = {
  string: "text-success",
  number: "text-primary",
  boolean: "text-destructive",
  null: "text-muted-foreground",
  object: "text-foreground",
  array: "text-foreground",
  unsupported: "text-muted-foreground italic"
};
var BRACKETS = {
  object: ["{", "}"],
  array: ["[", "]"]
};
function leafText(value, kind) {
  if (kind === "string") {
    return `"${String(value)}"`;
  }
  if (kind === "null") {
    return "null";
  }
  return String(value);
}
function JsonKey({
  name,
  slotName = "json-viewer-key"
}) {
  return /* @__PURE__ */ jsxs3("span", { className: "font-medium text-foreground", "data-slot": slotName, children: [
    name,
    ":"
  ] });
}
function JsonNode({
  name,
  value,
  depth,
  initialDepth,
  ancestors,
  labels,
  slotName = "json-viewer-node"
}) {
  const kind = jsonKind(value);
  const branch = isBranch(kind);
  const circular = branch && ancestors.includes(value);
  const [open, setOpen] = React3.useState(depth < initialDepth);
  const entries = React3.useMemo(
    () => branch && !circular ? entriesOf(value) : [],
    [branch, circular, value]
  );
  const trail = React3.useMemo(
    () => branch ? [...ancestors, value] : ancestors,
    [branch, ancestors, value]
  );
  if (!branch || circular) {
    return /* @__PURE__ */ jsxs3("div", { className: "gap-2 py-0.5 pl-5 flex", "data-slot": slotName, children: [
      name !== void 0 && /* @__PURE__ */ jsx4(JsonKey, { name }),
      circular ? /* @__PURE__ */ jsx4(
        "span",
        {
          "data-slot": "json-viewer-circular",
          className: "text-muted-foreground italic",
          children: labels.circularLabel
        }
      ) : /* @__PURE__ */ jsx4(
        "span",
        {
          "data-slot": "json-viewer-value",
          className: cn("break-all", LEAF_CLASS[kind]),
          children: leafText(value, kind)
        }
      )
    ] });
  }
  const [opening, closing] = BRACKETS[kind === "array" ? "array" : "object"];
  return /* @__PURE__ */ jsxs3("div", { "data-slot": slotName, children: [
    /* @__PURE__ */ jsxs3(
      "button",
      {
        type: "button",
        "data-slot": "json-viewer-toggle",
        "aria-expanded": open,
        "aria-label": open ? labels.collapseLabel : labels.expandLabel,
        onClick: () => setOpen((current) => !current),
        className: cn(
          "gap-2 rounded-xl py-0.5 flex w-full cursor-pointer items-center text-left hover:bg-accent",
          focusRing
        ),
        children: [
          /* @__PURE__ */ jsx4(
            ChevronRight,
            {
              "aria-hidden": "true",
              className: cn(
                "size-3.5 shrink-0 text-muted-foreground transition-transform",
                open && "rotate-90"
              )
            }
          ),
          name !== void 0 && /* @__PURE__ */ jsx4(JsonKey, { name }),
          /* @__PURE__ */ jsx4("span", { className: "text-muted-foreground", children: opening }),
          !open && /* @__PURE__ */ jsxs3(Fragment, { children: [
            /* @__PURE__ */ jsx4(
              "span",
              {
                "data-slot": "json-viewer-summary",
                className: "text-xs font-medium text-muted-foreground",
                children: labels.entriesLabel(entries.length)
              }
            ),
            /* @__PURE__ */ jsx4("span", { className: "text-muted-foreground", children: closing })
          ] })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxs3("div", { className: "ml-1.5 pl-3 border-l border-border", children: [
      entries.map(([key, item]) => /* @__PURE__ */ jsx4(
        JsonNode,
        {
          name: key,
          value: item,
          depth: depth + 1,
          initialDepth,
          ancestors: trail,
          labels
        },
        key
      )),
      /* @__PURE__ */ jsx4("div", { className: "pl-5 text-muted-foreground", children: closing })
    ] })
  ] });
}

// src/components/ui/json-viewer.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var jsonViewerLabels = {
  copyLabel: "Copy",
  copiedLabel: "Copied",
  expandLabel: "Expand",
  collapseLabel: "Collapse",
  circularLabel: "Circular reference",
  entriesLabel: (count) => `${count} ${count === 1 ? "entry" : "entries"}`
};
function JsonViewer({
  value,
  initialDepth = 1,
  maxHeight,
  copyLabel,
  copiedLabel,
  expandLabel,
  collapseLabel,
  circularLabel,
  entriesLabel,
  className,
  slotName = "json-viewer",
  ...props
}) {
  const text = useUiLabels("jsonViewer", jsonViewerLabels, {
    copyLabel,
    copiedLabel,
    expandLabel,
    collapseLabel,
    circularLabel,
    entriesLabel
  });
  const labels = React4.useMemo(
    () => ({
      expandLabel: text.expandLabel,
      collapseLabel: text.collapseLabel,
      circularLabel: text.circularLabel,
      entriesLabel: text.entriesLabel
    }),
    [
      text.expandLabel,
      text.collapseLabel,
      text.circularLabel,
      text.entriesLabel
    ]
  );
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      className: cn(
        elevatedSurface,
        nestedSurfaceReset,
        "relative overflow-hidden bg-card",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx5(
          CopyButton,
          {
            value: stringifyJson(value),
            copyLabel: text.copyLabel,
            copiedLabel: text.copiedLabel,
            className: "top-2 right-2 absolute z-10 text-muted-foreground"
          }
        ),
        /* @__PURE__ */ jsx5(
          "div",
          {
            "data-slot": "json-viewer-body",
            style: { maxHeight },
            className: "p-4 pr-12 font-mono text-sm leading-6 overflow-auto rounded-[inherit]",
            children: /* @__PURE__ */ jsx5(
              JsonNode,
              {
                value,
                depth: 0,
                initialDepth,
                ancestors: [],
                labels
              }
            )
          }
        )
      ]
    }
  );
}
export {
  Code,
  CodeBlock,
  JsonViewer,
  codeBlockLabels,
  jsonViewerLabels
};
//# sourceMappingURL=code.js.map