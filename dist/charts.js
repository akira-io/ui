'use client';

"use client";
import {
  elevatedSurface,
  menuSurface,
  nestedSurfaceReset
} from "./chunk-TA3IKSIJ.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/cartesian-chart.tsx
import {
  Area,
  Bar,
  CartesianGrid,
  Line,
  AreaChart as RechartsAreaChart,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis
} from "recharts";

// src/components/ui/chart.tsx
import * as React from "react";
import * as RechartsPrimitive from "recharts";

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
function dateFormatter(options, locale) {
  const format = new Intl.DateTimeFormat(locale, options);
  return (value) => {
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : format.format(date);
  };
}
function axisFormatter(scale, options, locale) {
  if (scale === "time") {
    return dateFormatter(options, locale);
  }
  if (scale === "linear") {
    return numberFormatter(options, locale);
  }
  return options ? numberFormatter(options, locale) : void 0;
}

// src/components/ui/chart.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var THEMES = { light: "", dark: ".dark" };
var INITIAL_DIMENSION = { width: 320, height: 200 };
var ChartContext = React.createContext(null);
function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  slotName = "chart",
  ...props
}) {
  const uniqueId = React.useId();
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
var ChartStyle = ({ id, config }) => {
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
var ChartTooltip = RechartsPrimitive.Tooltip;
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) {
  const { config } = useChart();
  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }
    const [item] = payload;
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? config[label]?.label ?? label : itemConfig?.label;
    if (labelFormatter) {
      return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
    }
    if (!value) {
      return null;
    }
    return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: value });
  }, [
    label,
    labelFormatter,
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        `${menuSurface} gap-1.5 px-3 py-2 text-xs grid min-w-[8rem] items-start`,
        className
      ),
      children: [
        !nestLabel ? tooltipLabel : null,
        /* @__PURE__ */ jsx("div", { className: "gap-1.5 grid", children: payload.filter((item) => item.type !== "none").map((item, index) => {
          const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(
            config,
            item,
            key
          );
          const indicatorColor = color ?? item.payload?.fill ?? item.color;
          return /* @__PURE__ */ jsx(
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
              ) : /* @__PURE__ */ jsxs(Fragment, { children: [
                itemConfig?.icon ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx(
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
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "gap-1.5 grid", children: [
                        nestLabel ? tooltipLabel : null,
                        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: itemConfig?.label ?? item.name })
                      ] }),
                      item.value != null && /* @__PURE__ */ jsx("span", { className: "font-mono font-medium text-foreground tabular-nums", children: typeof item.value === "number" ? item.value.toLocaleString() : String(item.value) })
                    ]
                  }
                )
              ] })
            },
            index
          );
        }) })
      ]
    }
  );
}
var ChartLegend = RechartsPrimitive.Legend;
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
  return /* @__PURE__ */ jsx(
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
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "gap-1.5 [&>svg]:h-3 [&>svg]:w-3 flex items-center [&>svg]:text-muted-foreground"
            ),
            children: [
              itemConfig?.icon && !hideIcon ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : /* @__PURE__ */ jsx(
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

// src/components/ui/cartesian-chart.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var CURVE_TYPE = {
  smooth: "monotone",
  linear: "linear",
  step: "step"
};
var CHART_BY_KIND = {
  area: RechartsAreaChart,
  bar: RechartsBarChart,
  line: RechartsLineChart
};
var MARK_BY_KIND = {
  area: ({ dataKey, color, stackId, curveType, dots, animate }) => /* @__PURE__ */ jsx2(
    Area,
    {
      dataKey,
      type: curveType,
      stroke: color,
      strokeWidth: 2,
      fill: color,
      fillOpacity: 0.2,
      stackId,
      dot: dots,
      isAnimationActive: animate
    },
    dataKey
  ),
  bar: ({ dataKey, color, stackId, barSize, barRadius, animate }) => /* @__PURE__ */ jsx2(
    Bar,
    {
      dataKey,
      fill: color,
      radius: barRadius,
      barSize,
      stackId,
      isAnimationActive: animate
    },
    dataKey
  ),
  line: ({ dataKey, color, curveType, dots, animate }) => /* @__PURE__ */ jsx2(
    Line,
    {
      dataKey,
      type: curveType,
      stroke: color,
      strokeWidth: 2,
      dot: dots,
      isAnimationActive: animate
    },
    dataKey
  )
};
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
  slotName = "chart",
  ...props
}) {
  const { series: resolved, config: merged } = resolveChartSeries(
    series,
    config
  );
  const Chart = CHART_BY_KIND[kind];
  const curveType = CURVE_TYPE[curve];
  const formatCategory = axisFormatter(xScale, xFormat, locale);
  const formatValue = numberFormatter(yFormat, locale);
  const categoryAxis = /* @__PURE__ */ jsx2(
    XAxis,
    {
      dataKey: xKey,
      type: "category",
      tickLine: false,
      axisLine: false,
      tickMargin: 8,
      tickFormatter: formatCategory
    }
  );
  const valueAxis = /* @__PURE__ */ jsx2(
    YAxis,
    {
      type: "number",
      tickLine: false,
      axisLine: false,
      tickMargin: 8,
      width: "auto",
      tickFormatter: formatValue
    }
  );
  const swappedCategoryAxis = /* @__PURE__ */ jsx2(
    YAxis,
    {
      dataKey: xKey,
      type: "category",
      tickLine: false,
      axisLine: false,
      tickMargin: 8,
      width: "auto",
      tickFormatter: formatCategory
    }
  );
  const swappedValueAxis = /* @__PURE__ */ jsx2(
    XAxis,
    {
      type: "number",
      tickLine: false,
      axisLine: false,
      tickMargin: 8,
      tickFormatter: formatValue
    }
  );
  return /* @__PURE__ */ jsx2(ChartContainer, { config: merged, slotName, ...props, children: /* @__PURE__ */ jsxs2(
    Chart,
    {
      accessibilityLayer: true,
      data,
      layout: horizontal ? "vertical" : "horizontal",
      children: [
        grid && /* @__PURE__ */ jsx2(
          CartesianGrid,
          {
            horizontal: !horizontal,
            vertical: horizontal,
            strokeDasharray: "4 4"
          }
        ),
        xAxis && (horizontal ? swappedValueAxis : categoryAxis),
        yAxis && (horizontal ? swappedCategoryAxis : valueAxis),
        tooltip && /* @__PURE__ */ jsx2(
          ChartTooltip,
          {
            cursor: kind !== "bar",
            content: /* @__PURE__ */ jsx2(
              ChartTooltipContent,
              {
                labelFormatter: formatCategory ? (label) => formatCategory(label) : void 0
              }
            )
          }
        ),
        legend && /* @__PURE__ */ jsx2(ChartLegend, { content: /* @__PURE__ */ jsx2(ChartLegendContent, {}) }),
        resolved.map(
          (item) => MARK_BY_KIND[kind]({
            dataKey: item.key,
            color: chartColorVariable(item.variableKey),
            stackId: item.stackId ?? (stacked ? "stack" : void 0),
            curveType,
            barSize,
            barRadius,
            dots,
            animate
          })
        )
      ]
    }
  ) });
}

// src/components/ui/area-chart.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function AreaChart({
  slotName = "area-chart",
  ...props
}) {
  return /* @__PURE__ */ jsx3(CartesianChart, { kind: "area", slotName, ...props });
}

// src/components/ui/bar-chart.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function BarChart({ slotName = "bar-chart", ...props }) {
  return /* @__PURE__ */ jsx4(CartesianChart, { kind: "bar", slotName, ...props });
}

// src/components/ui/donut-chart.tsx
import * as React2 from "react";
import { Cell, Pie, PieChart } from "recharts";
import { Fragment as Fragment2, jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
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
  const slices = React2.useMemo(
    () => data.map((datum) => ({
      key: String(datum[labelKey]),
      amount: Math.max(0, Number(datum[valueKey]) || 0)
    })),
    [data, labelKey, valueKey]
  );
  const { series: resolved, config: merged } = React2.useMemo(
    () => resolveChartSeries(
      slices.map((slice) => ({ key: slice.key })),
      config
    ),
    [slices, config]
  );
  const total = slices.reduce((sum, slice) => sum + slice.amount, 0);
  const formatValue = React2.useMemo(
    () => numberFormatter(format, locale),
    [format, locale]
  );
  const formatPercentage = React2.useMemo(
    () => numberFormatter(
      { style: "percent", maximumFractionDigits: 0 },
      locale
    ),
    [locale]
  );
  const chartData = React2.useMemo(
    () => slices.map((slice, index) => ({
      ...slice,
      key: resolved[index].variableKey,
      fill: chartColorVariable(resolved[index].variableKey)
    })),
    [slices, resolved]
  );
  const centerValue = value ?? formatValue(total);
  const chartId = `donut-${React2.useId().replace(/:/g, "")}`;
  return /* @__PURE__ */ jsxs3(
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
        /* @__PURE__ */ jsxs3(
          "div",
          {
            className: cn(
              "relative",
              legend === "bottom" ? "w-full" : "flex-1"
            ),
            "data-slot": "donut-chart-ring",
            children: [
              /* @__PURE__ */ jsx5(
                ChartContainer,
                {
                  id: chartId,
                  config: merged,
                  slotName: "donut-chart-canvas",
                  className: "p-0 aspect-square w-full border-0 bg-transparent shadow-none",
                  children: /* @__PURE__ */ jsxs3(PieChart, { children: [
                    tooltip && /* @__PURE__ */ jsx5(
                      ChartTooltip,
                      {
                        cursor: false,
                        content: /* @__PURE__ */ jsx5(
                          ChartTooltipContent,
                          {
                            nameKey: "key",
                            hideLabel: true
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx5(
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
                        children: chartData.map((slice) => /* @__PURE__ */ jsx5(Cell, { fill: slice.fill }, slice.key))
                      }
                    )
                  ] })
                }
              ),
              (label !== void 0 || value !== void 0 || children !== void 0) && /* @__PURE__ */ jsx5(
                "div",
                {
                  className: "gap-1 inset-0 pointer-events-none absolute flex flex-col items-center justify-center",
                  "data-slot": "donut-chart-center",
                  children: children ?? /* @__PURE__ */ jsxs3(Fragment2, { children: [
                    label && /* @__PURE__ */ jsx5("span", { className: "text-sm text-muted-foreground", children: label }),
                    /* @__PURE__ */ jsx5("span", { className: "text-2xl font-semibold text-foreground tabular-nums", children: centerValue })
                  ] })
                }
              )
            ]
          }
        ),
        legend !== false && /* @__PURE__ */ jsx5(
          "ul",
          {
            className: cn(
              "gap-3 text-sm flex flex-col",
              legend === "right" ? "min-w-40" : "w-full"
            ),
            "data-slot": "donut-chart-legend",
            children: resolved.map((item, index) => /* @__PURE__ */ jsxs3(
              "li",
              {
                className: "gap-3 flex items-center justify-between",
                children: [
                  /* @__PURE__ */ jsxs3("span", { className: "gap-2 flex items-center", children: [
                    /* @__PURE__ */ jsx5(
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
                    /* @__PURE__ */ jsx5("span", { className: "text-foreground", children: item.label })
                  ] }),
                  legendValue !== "none" && /* @__PURE__ */ jsx5("span", { className: "text-muted-foreground tabular-nums", children: legendValue === "percentage" ? formatPercentage(
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
import { jsx as jsx6 } from "react/jsx-runtime";
function LineChart({
  slotName = "line-chart",
  ...props
}) {
  return /* @__PURE__ */ jsx6(CartesianChart, { kind: "line", slotName, ...props });
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