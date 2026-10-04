'use client';

"use client";
import {
  elevatedSurface,
  menuSurface,
  nestedSurfaceReset
} from "./chunk-H26GY6FP.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/cartesian-chart.tsx
import * as React5 from "react";
import {
  CartesianGrid,
  AreaChart as RechartsAreaChart,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart
} from "recharts";

// src/components/ui/bar-stack.ts
import * as React from "react";
import { Bar, BarStack } from "recharts";
function useBarStacks(marks, radius) {
  const chartId = React.useId().replace(/[^\w-]/g, "");
  const stacks = /* @__PURE__ */ new Map();
  const output = [];
  for (const mark of marks) {
    const stackId = mark.type === Bar ? mark.props.stackId : void 0;
    if (stackId === void 0) {
      output.push(mark);
      continue;
    }
    if (!stacks.has(stackId)) {
      stacks.set(stackId, []);
      output.push(stackId);
    }
    stacks.get(stackId)?.push(mark);
  }
  const ids = [...stacks.keys()];
  return output.map(
    (entry) => typeof entry === "string" ? React.createElement(
      BarStack,
      {
        key: `stack-${entry}`,
        stackId: `${chartId}-stack-${ids.indexOf(entry)}`,
        radius
      },
      stacks.get(entry)
    ) : entry
  );
}

// src/components/ui/cartesian-axes.ts
import { createElement as createElement2 } from "react";
import { ReferenceLine, XAxis, YAxis } from "recharts";
var AXIS = { tickLine: false, axisLine: false, tickMargin: 8 };
var REFERENCE_COLOR = "var(--muted-foreground)";
function categoryAxis(horizontal, xKey, format) {
  const shared = {
    key: "category",
    dataKey: xKey,
    type: "category",
    tickFormatter: format,
    ...AXIS
  };
  if (horizontal) {
    return createElement2(YAxis, { ...shared, width: "auto" });
  }
  return createElement2(XAxis, shared);
}
function valueAxis(horizontal, format, domain, scale) {
  const shared = {
    key: "value",
    type: "number",
    tickFormatter: format,
    domain,
    scale: scale === "log" ? "log" : "auto",
    ...AXIS
  };
  if (horizontal) {
    return createElement2(XAxis, shared);
  }
  return createElement2(YAxis, { ...shared, width: "auto" });
}
function referenceLines(lines, horizontal) {
  return lines.map((line, index) => {
    const valueLine = line.y !== void 0;
    const vertical = valueLine === horizontal;
    return createElement2(ReferenceLine, {
      key: `reference-${index}`,
      x: horizontal ? line.y : line.x,
      y: horizontal ? line.x : line.y,
      stroke: REFERENCE_COLOR,
      strokeDasharray: "4 4",
      ifOverflow: valueLine ? "extendDomain" : "discard",
      label: line.label ? {
        value: line.label,
        position: vertical ? "insideTopLeft" : "insideTopRight",
        fill: REFERENCE_COLOR
      } : void 0
    });
  });
}

// src/components/ui/cartesian-marks.ts
import { createElement as createElement3 } from "react";
import { Area, Bar as Bar2, Cell, LabelList, Line } from "recharts";
var CURVE_TYPE = {
  smooth: "monotone",
  linear: "linear",
  step: "step"
};
var LOLLIPOP_RADIUS = 5;
function lollipopShape(horizontal) {
  return function LollipopShape({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    fill
  }) {
    const stem = horizontal ? { x1: x, y1: y + height / 2, x2: x + width, y2: y + height / 2 } : { x1: x + width / 2, y1: y + height, x2: x + width / 2, y2: y };
    return createElement3(
      "g",
      { className: "recharts-lollipop" },
      createElement3("line", { ...stem, stroke: fill, strokeWidth: 2 }),
      createElement3("circle", {
        cx: stem.x2,
        cy: stem.y2,
        r: LOLLIPOP_RADIUS,
        fill
      })
    );
  };
}
function labelPosition(props) {
  if (props.labels?.stacked) {
    return "inside";
  }
  return props.horizontal ? "right" : "top";
}
function valueLabels(props) {
  if (!props.labels) {
    return null;
  }
  return createElement3(LabelList, {
    key: "labels",
    dataKey: props.dataKey,
    position: labelPosition(props),
    offset: props.variant === "lollipop" ? LOLLIPOP_RADIUS + 6 : 6,
    className: "fill-muted-foreground",
    formatter: props.labels.format
  });
}
var MARK_BY_KIND = {
  area: (props) => createElement3(Area, {
    key: props.dataKey,
    dataKey: props.dataKey,
    type: props.curveType,
    stroke: props.color,
    strokeWidth: 2,
    fill: props.gradientId ? `url(#${props.gradientId})` : props.color,
    fillOpacity: props.gradientId ? 1 : 0.2,
    stackId: props.stackId,
    dot: props.dots,
    isAnimationActive: props.animate
  }),
  bar: (props) => createElement3(
    Bar2,
    {
      key: props.dataKey,
      dataKey: props.dataKey,
      fill: props.color,
      radius: props.stackId === void 0 ? props.barRadius : 0,
      barSize: props.barSize,
      stackId: props.stackId,
      isAnimationActive: props.animate,
      shape: props.variant === "lollipop" ? lollipopShape(props.horizontal) : void 0
    },
    props.cellColors?.map(
      (fill, index) => createElement3(Cell, { key: index, fill })
    ),
    valueLabels(props)
  ),
  line: (props) => createElement3(
    Line,
    {
      key: props.dataKey,
      dataKey: props.dataKey,
      type: props.curveType,
      stroke: props.color,
      strokeWidth: 2,
      dot: props.dots,
      isAnimationActive: props.animate
    },
    valueLabels(props)
  )
};
function areaGradient(id, color) {
  return createElement3(
    "linearGradient",
    { key: id, id, x1: "0", y1: "0", x2: "0", y2: "1" },
    createElement3("stop", {
      offset: "5%",
      stopColor: color,
      stopOpacity: 0.4
    }),
    createElement3("stop", {
      offset: "95%",
      stopColor: color,
      stopOpacity: 0.05
    })
  );
}

// src/components/ui/chart.tsx
import * as React4 from "react";
import * as RechartsPrimitive2 from "recharts";

// src/components/ui/chart-container.tsx
import * as React3 from "react";
import * as RechartsPrimitive from "recharts";

// src/components/ui/chart-context.ts
import * as React2 from "react";
var THEMES = { light: "", dark: ".dark" };
var ChartContext = React2.createContext(null);
function useChart() {
  const context = React2.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  if (key in payload && typeof payload[key] === "string") {
    const configLabelKey = payload[key];
    return configLabelKey in config ? config[configLabelKey] : config[key];
  }
  if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    const configLabelKey = payloadPayload[key];
    return configLabelKey in config ? config[configLabelKey] : config[key];
  }
  return config[key];
}

// src/lib/chart-dates.ts
var MONTH_YEAR = {
  month: "short",
  year: "numeric"
};
var DAY_MONTH = {
  day: "numeric",
  month: "short"
};
var SEPARATOR = /^[\s/.-]+$/;
var NUMERIC = /^\d+$/;
function toDate(value) {
  return value instanceof Date ? value : new Date(value);
}
function isValidDate(date) {
  return !Number.isNaN(date.getTime());
}
function defaultTimeFormat(values) {
  const dates = values.map(toDate).filter(isValidDate);
  const monthly = dates.length > 0 && dates.every((date) => date.getDate() === 1);
  return monthly ? MONTH_YEAR : DAY_MONTH;
}
function spellMonth(parts, month) {
  const numeric = parts.some(
    (part) => part.type === "month" && NUMERIC.test(part.value)
  );
  return parts.map((part) => {
    if (part.type === "month") {
      return (numeric ? month : part.value).replace(/\.$/, "");
    }
    if (numeric && part.type === "literal" && SEPARATOR.test(part.value)) {
      return " ";
    }
    return part.value;
  }).join("");
}
function dateFormatter(options, locale) {
  const format = new Intl.DateTimeFormat(locale, options);
  const month = options?.month === "short" ? new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: options.timeZone
  }) : void 0;
  return (value) => {
    const date = toDate(value);
    if (!isValidDate(date)) {
      return String(value);
    }
    if (!month) {
      return format.format(date);
    }
    return spellMonth(format.formatToParts(date), month.format(date));
  };
}

// src/lib/chart-series.ts
var CHART_PALETTE = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-6)",
  "var(--color-chart-7)",
  "var(--color-chart-8)"
];
function paletteColor(index) {
  return CHART_PALETTE[index % CHART_PALETTE.length];
}
function categoryColors(data, colorBy) {
  if (colorBy === "series") {
    return void 0;
  }
  return data.map(
    (datum, index) => colorBy === "category" ? paletteColor(index) : colorBy(datum, index)
  );
}
function paintByCategory(items, data, colors) {
  return items.map((item) => {
    const index = data.findIndex((datum) => datum === item.payload);
    return index === -1 ? item : { ...item, color: colors[index] };
  });
}
function cssVariableKey(key) {
  return key.replace(/[^A-Za-z0-9_-]/g, "-");
}
function chartColorVariable(key) {
  return `var(--color-${cssVariableKey(key)})`;
}
var UNSAFE_COLOR = /[<>{};@\\]/;
function safeChartColor(color) {
  return UNSAFE_COLOR.test(color) ? null : color;
}
function chartStyleDeclarations(config, theme) {
  const declarations = /* @__PURE__ */ new Map();
  for (const [key, itemConfig] of Object.entries(config)) {
    const declared = itemConfig.theme?.[theme] ?? itemConfig.color;
    const color = declared ? safeChartColor(declared) : null;
    if (!color) {
      continue;
    }
    const name = cssVariableKey(key);
    const own = name === key;
    if (!own && declarations.get(name)?.own) {
      continue;
    }
    declarations.set(name, { color, own });
  }
  return [...declarations].map(
    ([name, { color }]) => `  --color-${name}: ${color};`
  );
}
function uniqueVariableKeys(keys) {
  const taken = /* @__PURE__ */ new Set();
  const reserved = keys.map((key) => {
    const own = cssVariableKey(key) === key && !taken.has(key);
    if (own) {
      taken.add(key);
    }
    return own;
  });
  return keys.map((key, index) => {
    if (reserved[index]) {
      return key;
    }
    const base = cssVariableKey(key);
    let candidate = base;
    let suffix = 2;
    while (taken.has(candidate)) {
      candidate = `${base}-${suffix}`;
      suffix += 1;
    }
    taken.add(candidate);
    return candidate;
  });
}
function resolveChartSeries(series, config = {}) {
  const items = series.map(
    (entry) => typeof entry === "string" ? { key: entry } : entry
  );
  const variableKeys = uniqueVariableKeys(items.map((item) => item.key));
  const resolved = items.map((item, index) => {
    const fromConfig = config[item.key];
    const named = item.color ?? fromConfig?.color;
    return {
      key: item.key,
      variableKey: variableKeys[index],
      label: item.label ?? fromConfig?.label ?? item.key,
      color: named ?? paletteColor(index),
      named: named !== void 0,
      stackId: item.stackId
    };
  });
  const merged = { ...config };
  for (const item of resolved) {
    const entry = config[item.key];
    const theme = item.named ? void 0 : entry?.theme;
    const resolvedEntry = theme ? { icon: entry?.icon, label: item.label, theme } : { icon: entry?.icon, label: item.label, color: item.color };
    merged[item.variableKey] = resolvedEntry;
    merged[item.key] = resolvedEntry;
  }
  return { series: resolved, config: merged };
}
function numberFormatter(options, locale) {
  const format = new Intl.NumberFormat(locale, options);
  return (value) => {
    const numeric = typeof value === "number" ? value : Number(value);
    return Number.isFinite(numeric) ? format.format(numeric) : String(value);
  };
}
function axisFormatter(scale, options, locale, values = []) {
  if (scale === "time") {
    return dateFormatter(
      options ?? defaultTimeFormat(values),
      locale
    );
  }
  if (scale === "linear") {
    return numberFormatter(options, locale);
  }
  return options ? numberFormatter(options, locale) : void 0;
}

// src/components/ui/chart-container.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var INITIAL_DIMENSION = { width: 320, height: 200 };
function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  slotName = "chart",
  ...props
}) {
  const uniqueId = React3.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-chart": chartId,
      className: cn(
        elevatedSurface,
        nestedSurfaceReset,
        "p-4 bg-card",
        "aspect-video text-xs flex justify-center [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx(
          RechartsPrimitive.ResponsiveContainer,
          {
            initialDimension,
            children
          }
        )
      ]
    }
  ) });
}
var ChartStyle = ({
  id,
  config
}) => {
  const colorConfig = Object.entries(config).filter(
    ([, config2]) => config2.theme ?? config2.color
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${chartStyleDeclarations(config, theme).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};

// src/components/ui/chart.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ChartTooltip = RechartsPrimitive2.Tooltip;
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter: labelFormatter2,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
  valueFormatter,
  footer,
  slotName = "chart-tooltip-content"
}) {
  const { config } = useChart();
  const tooltipLabel = React4.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }
    const [item] = payload;
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && (typeof label === "string" || typeof label === "number") ? config[label]?.label ?? label : itemConfig?.label;
    if (labelFormatter2) {
      return /* @__PURE__ */ jsx2("div", { className: cn("font-medium", labelClassName), children: labelFormatter2(value, payload) });
    }
    if (value == null || value === "") {
      return null;
    }
    return /* @__PURE__ */ jsx2("div", { className: cn("font-medium", labelClassName), children: value });
  }, [
    label,
    labelFormatter2,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ]);
  if (!active || !payload?.length) {
    return null;
  }
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: cn(
        `${menuSurface} gap-1.5 px-3 py-2 text-xs grid min-w-[8rem] items-start`,
        className
      ),
      "data-slot": slotName,
      children: [
        !nestLabel ? tooltipLabel : null,
        /* @__PURE__ */ jsx2("div", { className: "gap-1.5 grid", children: payload.filter((item) => item.type !== "none").map((item, index) => {
          const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(
            config,
            item,
            key
          );
          const indicatorColor = color ?? item.payload?.fill ?? item.color;
          return /* @__PURE__ */ jsx2(
            "div",
            {
              className: cn(
                "gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 flex w-full flex-wrap items-stretch [&>svg]:text-muted-foreground",
                indicator === "dot" && "items-center"
              ),
              children: formatter && item?.value !== void 0 && item.name ? formatter(
                item.value,
                item.name,
                item,
                index,
                item.payload
              ) : /* @__PURE__ */ jsxs2(Fragment, { children: [
                itemConfig?.icon ? /* @__PURE__ */ jsx2(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx2(
                  "div",
                  {
                    className: cn(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": indicator === "dot",
                        "w-1": indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                        "my-0.5": nestLabel && indicator === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor
                    }
                  }
                ),
                /* @__PURE__ */ jsxs2(
                  "div",
                  {
                    className: cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs2("div", { className: "gap-1.5 grid", children: [
                        nestLabel ? tooltipLabel : null,
                        /* @__PURE__ */ jsx2("span", { className: "text-muted-foreground", children: itemConfig?.label ?? item.name })
                      ] }),
                      item.value != null && /* @__PURE__ */ jsx2("span", { className: "font-mono font-medium text-foreground tabular-nums", children: typeof item.value === "number" ? valueFormatter?.(
                        item.value
                      ) ?? item.value.toLocaleString() : String(item.value) })
                    ]
                  }
                )
              ] })
            },
            index
          );
        }) }),
        footer != null && /* @__PURE__ */ jsx2("div", { className: "text-muted-foreground", children: footer })
      ]
    }
  );
}
var ChartLegend = RechartsPrimitive2.Legend;
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey
}) {
  const { config } = useChart();
  if (!payload?.length) {
    return null;
  }
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: cn(
        "gap-4 flex items-center justify-center",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      ),
      children: payload.filter((item) => item.type !== "none").map((item, index) => {
        const key = `${nameKey ?? item.dataKey ?? "value"}`;
        const itemConfig = getPayloadConfigFromPayload(
          config,
          item,
          key
        );
        return /* @__PURE__ */ jsxs2(
          "div",
          {
            className: cn(
              "gap-1.5 [&>svg]:h-3 [&>svg]:w-3 flex items-center [&>svg]:text-muted-foreground"
            ),
            children: [
              itemConfig?.icon && !hideIcon ? /* @__PURE__ */ jsx2(itemConfig.icon, {}) : /* @__PURE__ */ jsx2(
                "div",
                {
                  className: "h-2 w-2 shrink-0 rounded-[2px]",
                  style: {
                    backgroundColor: item.color
                  }
                }
              ),
              itemConfig?.label
            ]
          },
          index
        );
      })
    }
  );
}

// src/components/ui/chart-category.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function ChartCategoryLegend({
  data,
  xKey,
  colors,
  format,
  verticalAlign = "bottom",
  className,
  slotName = "chart-category-legend"
}) {
  if (!data.length) {
    return null;
  }
  return /* @__PURE__ */ jsx3(
    "ul",
    {
      className: cn(
        "gap-x-4 gap-y-1.5 flex flex-wrap items-center justify-center",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      ),
      "data-slot": slotName,
      children: data.map((datum, index) => /* @__PURE__ */ jsxs3("li", { className: "gap-1.5 flex items-center", children: [
        /* @__PURE__ */ jsx3(
          "span",
          {
            "aria-hidden": true,
            className: "size-2 shrink-0 rounded-full",
            style: { backgroundColor: colors[index] }
          }
        ),
        format ? format(datum[xKey]) : String(datum[xKey] ?? "")
      ] }, index))
    }
  );
}
function ChartCategoryTooltipContent({
  data,
  colors,
  detail,
  payload,
  ...props
}) {
  const datum = payload?.[0]?.payload;
  return /* @__PURE__ */ jsx3(
    ChartTooltipContent,
    {
      ...props,
      footer: detail && datum ? detail(datum) : void 0,
      payload: colors && payload ? paintByCategory(payload, data, colors) : payload
    }
  );
}

// src/lib/chart-scale.ts
function smallestPositive(data, keys) {
  const positives = data.flatMap((datum) => keys.map((key) => Number(datum[key]))).filter((value) => Number.isFinite(value) && value > 0);
  return positives.length > 0 ? Math.min(...positives) : 1;
}
function valueDomain(domain, scale, data, keys) {
  if (scale !== "log") {
    return domain;
  }
  const [min, max] = domain ?? ["auto", "auto"];
  return [
    typeof min === "number" && min > 0 ? min : smallestPositive(data, keys),
    max
  ];
}

// src/components/ui/cartesian-chart.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var CHART_BY_KIND = {
  area: RechartsAreaChart,
  bar: RechartsBarChart,
  line: RechartsLineChart
};
var LABEL_MARGIN = {
  vertical: { top: 24, right: 8, bottom: 5, left: 5 },
  horizontal: { top: 5, right: 48, bottom: 5, left: 5 }
};
var NO_REFERENCE_LINES = [];
function labelFormatter(kind, valueLabels2, yFormat, locale) {
  if (kind === "area" || !valueLabels2) {
    return void 0;
  }
  return numberFormatter(
    valueLabels2 === true ? yFormat : valueLabels2,
    locale
  );
}
function CartesianChart({
  kind,
  data,
  series,
  xKey,
  config,
  curve = "smooth",
  stacked = false,
  grid = true,
  legend = false,
  tooltip = true,
  xAxis = true,
  yAxis = true,
  xScale = "categorical",
  xFormat,
  yFormat,
  locale,
  horizontal = false,
  barSize,
  barRadius = 8,
  dots = false,
  animate = false,
  colorBy = "series",
  tooltipFormat,
  tooltipDetail,
  yDomain,
  yScale = "linear",
  referenceLines: referenceLines2 = NO_REFERENCE_LINES,
  stackOffset,
  valueLabels: valueLabels2,
  variant = "bar",
  fill = "solid",
  slotName = "chart",
  ...props
}) {
  const chartId = React5.useId().replace(/[^\w-]/g, "");
  const { series: resolved, config: merged } = resolveChartSeries(
    series,
    config
  );
  const Chart = CHART_BY_KIND[kind];
  const formatCategory = axisFormatter(
    xScale,
    xFormat,
    locale,
    data.map((datum) => datum[xKey])
  );
  const formatValue = numberFormatter(yFormat, locale);
  const formatTooltip = numberFormatter(tooltipFormat ?? yFormat, locale);
  const formatLabel = labelFormatter(kind, valueLabels2, yFormat, locale);
  const cellColors = kind === "bar" ? categoryColors(data, colorBy) : void 0;
  const domain = valueDomain(
    yDomain,
    yScale,
    data,
    resolved.map((item) => item.key)
  );
  const gradients = kind === "area" && fill === "gradient" ? resolved.map((item) => ({
    id: `${chartId}-fill-${item.variableKey}`,
    color: chartColorVariable(item.variableKey)
  })) : void 0;
  const elements = resolved.map((item, index) => {
    const stackId = item.stackId ?? (stacked ? "stack" : void 0);
    return MARK_BY_KIND[kind]({
      dataKey: item.key,
      color: chartColorVariable(item.variableKey),
      stackId,
      curveType: CURVE_TYPE[curve],
      barSize,
      barRadius,
      dots,
      animate,
      cellColors,
      gradientId: gradients?.[index].id,
      labels: formatLabel ? { format: formatLabel, stacked: stackId !== void 0 } : void 0,
      horizontal,
      variant
    });
  });
  const marks = useBarStacks(elements, barRadius);
  return /* @__PURE__ */ jsx4(ChartContainer, { config: merged, slotName, ...props, children: /* @__PURE__ */ jsxs4(
    Chart,
    {
      accessibilityLayer: true,
      data,
      layout: horizontal ? "vertical" : "horizontal",
      stackOffset: kind === "bar" ? stackOffset : void 0,
      margin: formatLabel ? LABEL_MARGIN[horizontal ? "horizontal" : "vertical"] : void 0,
      children: [
        gradients && /* @__PURE__ */ jsx4("defs", { children: gradients.map(
          ({ id, color }) => areaGradient(id, color)
        ) }),
        grid && /* @__PURE__ */ jsx4(
          CartesianGrid,
          {
            horizontal: !horizontal,
            vertical: horizontal,
            strokeDasharray: "4 4"
          }
        ),
        (horizontal ? yAxis : xAxis) && categoryAxis(horizontal, xKey, formatCategory),
        (horizontal ? xAxis : yAxis) && valueAxis(horizontal, formatValue, domain, yScale),
        tooltip && /* @__PURE__ */ jsx4(
          ChartTooltip,
          {
            cursor: kind !== "bar",
            content: /* @__PURE__ */ jsx4(
              ChartCategoryTooltipContent,
              {
                data,
                colors: cellColors,
                detail: tooltipDetail,
                valueFormatter: formatTooltip,
                labelFormatter: formatCategory ? (label) => formatCategory(label) : void 0
              }
            )
          }
        ),
        legend && /* @__PURE__ */ jsx4(
          ChartLegend,
          {
            content: cellColors ? /* @__PURE__ */ jsx4(
              ChartCategoryLegend,
              {
                data,
                xKey,
                colors: cellColors,
                format: formatCategory
              }
            ) : /* @__PURE__ */ jsx4(ChartLegendContent, {})
          }
        ),
        variant === "lollipop" ? elements : marks,
        referenceLines(referenceLines2, horizontal)
      ]
    }
  ) });
}

// src/components/ui/area-chart.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function AreaChart({
  slotName = "area-chart",
  ...props
}) {
  return /* @__PURE__ */ jsx5(CartesianChart, { kind: "area", slotName, ...props });
}

// src/components/ui/bar-chart.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
function BarChart({ slotName = "bar-chart", ...props }) {
  return /* @__PURE__ */ jsx6(CartesianChart, { kind: "bar", slotName, ...props });
}

// src/components/ui/donut-chart.tsx
import * as React6 from "react";
import { Cell as Cell2, Pie, PieChart } from "recharts";
import { Fragment as Fragment2, jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
function DonutChart({
  data,
  valueKey = "value",
  labelKey = "label",
  config,
  innerRadius = "65%",
  cornerRadius = 6,
  paddingAngle = 2,
  legend = "right",
  legendValue = "percentage",
  label,
  value,
  format,
  locale,
  tooltip = true,
  animate = false,
  className,
  children,
  slotName = "donut-chart",
  ...props
}) {
  const slices = React6.useMemo(
    () => data.map((datum) => ({
      key: String(datum[labelKey]),
      amount: Math.max(0, Number(datum[valueKey]) || 0)
    })),
    [data, labelKey, valueKey]
  );
  const { series: resolved, config: merged } = React6.useMemo(
    () => resolveChartSeries(
      slices.map((slice) => ({ key: slice.key })),
      config
    ),
    [slices, config]
  );
  const total = slices.reduce((sum, slice) => sum + slice.amount, 0);
  const formatValue = React6.useMemo(
    () => numberFormatter(format, locale),
    [format, locale]
  );
  const formatPercentage = React6.useMemo(
    () => numberFormatter(
      { style: "percent", maximumFractionDigits: 0 },
      locale
    ),
    [locale]
  );
  const chartData = React6.useMemo(
    () => slices.map((slice, index) => ({
      ...slice,
      key: resolved[index].variableKey,
      fill: chartColorVariable(resolved[index].variableKey)
    })),
    [slices, resolved]
  );
  const centerValue = value ?? formatValue(total);
  const chartId = `donut-${React6.useId().replace(/:/g, "")}`;
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      className: cn(
        elevatedSurface,
        nestedSurfaceReset,
        "gap-6 p-4 flex items-center bg-card",
        legend === "bottom" && "flex-col",
        className
      ),
      "data-chart": `chart-${chartId}`,
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs5(
          "div",
          {
            className: cn(
              "relative",
              legend === "bottom" ? "w-full" : "flex-1"
            ),
            "data-slot": "donut-chart-ring",
            children: [
              /* @__PURE__ */ jsx7(
                ChartContainer,
                {
                  id: chartId,
                  config: merged,
                  slotName: "donut-chart-canvas",
                  className: "p-0 aspect-square w-full border-0 bg-transparent shadow-none",
                  children: /* @__PURE__ */ jsxs5(PieChart, { children: [
                    tooltip && /* @__PURE__ */ jsx7(
                      ChartTooltip,
                      {
                        cursor: false,
                        content: /* @__PURE__ */ jsx7(
                          ChartTooltipContent,
                          {
                            nameKey: "key",
                            hideLabel: true,
                            valueFormatter: formatValue
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx7(
                      Pie,
                      {
                        data: chartData,
                        dataKey: "amount",
                        nameKey: "key",
                        innerRadius,
                        cornerRadius,
                        paddingAngle,
                        strokeWidth: 0,
                        isAnimationActive: animate,
                        children: chartData.map((slice) => /* @__PURE__ */ jsx7(Cell2, { fill: slice.fill }, slice.key))
                      }
                    )
                  ] })
                }
              ),
              (label !== void 0 || value !== void 0 || children !== void 0) && /* @__PURE__ */ jsx7(
                "div",
                {
                  className: "gap-1 inset-0 pointer-events-none absolute flex flex-col items-center justify-center",
                  "data-slot": "donut-chart-center",
                  children: children ?? /* @__PURE__ */ jsxs5(Fragment2, { children: [
                    label && /* @__PURE__ */ jsx7("span", { className: "text-sm text-muted-foreground", children: label }),
                    /* @__PURE__ */ jsx7("span", { className: "text-2xl font-semibold text-foreground tabular-nums", children: centerValue })
                  ] })
                }
              )
            ]
          }
        ),
        legend !== false && /* @__PURE__ */ jsx7(
          "ul",
          {
            className: cn(
              "gap-3 text-sm flex flex-col",
              legend === "right" ? "min-w-40" : "w-full"
            ),
            "data-slot": "donut-chart-legend",
            children: resolved.map((item, index) => /* @__PURE__ */ jsxs5(
              "li",
              {
                className: "gap-3 flex items-center justify-between",
                children: [
                  /* @__PURE__ */ jsxs5("span", { className: "gap-2 flex items-center", children: [
                    /* @__PURE__ */ jsx7(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: "size-2.5 shrink-0 rounded-full",
                        style: {
                          backgroundColor: chartColorVariable(
                            item.variableKey
                          )
                        }
                      }
                    ),
                    /* @__PURE__ */ jsx7("span", { className: "text-foreground", children: item.label })
                  ] }),
                  legendValue !== "none" && /* @__PURE__ */ jsx7("span", { className: "text-muted-foreground tabular-nums", children: legendValue === "percentage" ? formatPercentage(
                    total === 0 ? 0 : slices[index].amount / total
                  ) : formatValue(slices[index].amount) })
                ]
              },
              item.variableKey
            ))
          }
        )
      ]
    }
  );
}

// src/components/ui/line-chart.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function LineChart({
  slotName = "line-chart",
  ...props
}) {
  return /* @__PURE__ */ jsx8(CartesianChart, { kind: "line", slotName, ...props });
}
export {
  AreaChart,
  BarChart,
  CHART_PALETTE,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  DonutChart,
  LineChart,
  chartColorVariable,
  cssVariableKey,
  paletteColor
};
//# sourceMappingURL=charts.js.map