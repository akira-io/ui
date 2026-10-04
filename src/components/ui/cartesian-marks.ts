import { createElement, type ReactElement } from 'react';
import { Area, Bar, Cell, LabelList, Line, type BarShapeProps } from 'recharts';

import { stackedBarShape } from '@/components/ui/bar-stack';
import { ValueLabel, type LabelFit } from '@/components/ui/value-label';

export type ChartCurve = 'smooth' | 'linear' | 'step';

export type ChartBarVariant = 'bar' | 'lollipop';

export type ChartAreaFill = 'solid' | 'gradient';

export type CartesianKind = 'area' | 'bar' | 'line';

export const CURVE_TYPE = {
    smooth: 'monotone',
    linear: 'linear',
    step: 'step',
} as const;

const LOLLIPOP_RADIUS = 5;

const LABEL_GAP = 6;

export function labelOffset(variant: ChartBarVariant): number {
    return variant === 'lollipop' ? LOLLIPOP_RADIUS + LABEL_GAP : LABEL_GAP;
}

export type ValueLabels = {
    format: (value: unknown) => string;
    stacked: boolean;
};

export type MarkProps = {
    animate: boolean;
    dataKey: string;
    color: string;
    stackId?: string;
    stackKeys: readonly string[];
    curveType: (typeof CURVE_TYPE)[ChartCurve];
    barSize?: number;
    barRadius: number;
    dots: boolean;
    cellColors?: readonly string[];
    gradientId?: string;
    labels?: ValueLabels;
    horizontal: boolean;
    variant: ChartBarVariant;
};

function lollipopShape(horizontal: boolean) {
    return function LollipopShape({
        x = 0,
        y = 0,
        width = 0,
        height = 0,
        fill,
    }: BarShapeProps) {
        const stem = horizontal
            ? { x1: x, y1: y + height / 2, x2: x + width, y2: y + height / 2 }
            : { x1: x + width / 2, y1: y + height, x2: x + width / 2, y2: y };

        return createElement(
            'g',
            { className: 'recharts-lollipop' },
            createElement('line', { ...stem, stroke: fill, strokeWidth: 2 }),
            createElement('circle', {
                cx: stem.x2,
                cy: stem.y2,
                r: LOLLIPOP_RADIUS,
                fill,
            }),
        );
    };
}

function barShape(props: MarkProps) {
    if (props.variant === 'lollipop') {
        return lollipopShape(props.horizontal);
    }

    if (props.stackId === undefined) {
        return undefined;
    }

    return stackedBarShape({
        dataKey: props.dataKey,
        stackKeys: props.stackKeys,
        radius: props.barRadius,
        horizontal: props.horizontal,
    });
}

function labelPosition(props: MarkProps) {
    if (props.labels?.stacked) {
        return 'inside';
    }

    return props.horizontal ? 'right' : 'top';
}

function labelFit(props: MarkProps, columns: boolean): LabelFit {
    if (props.labels?.stacked) {
        return 'segment';
    }

    return columns && !props.horizontal ? 'column' : 'free';
}

function valueLabels(props: MarkProps, columns: boolean) {
    if (!props.labels) {
        return null;
    }

    return createElement(LabelList, {
        key: 'labels',
        dataKey: props.dataKey,
        position: labelPosition(props),
        offset: labelOffset(props.variant),
        className: 'fill-muted-foreground',
        content: createElement(ValueLabel, {
            textOf: props.labels.format,
            fit: labelFit(props, columns),
        }),
    });
}

export const MARK_BY_KIND: Record<
    CartesianKind,
    (props: MarkProps) => ReactElement
> = {
    area: (props) =>
        createElement(Area, {
            key: props.dataKey,
            dataKey: props.dataKey,
            type: props.curveType,
            stroke: props.color,
            strokeWidth: 2,
            fill: props.gradientId ? `url(#${props.gradientId})` : props.color,
            fillOpacity: props.gradientId ? 1 : 0.2,
            stackId: props.stackId,
            dot: props.dots,
            isAnimationActive: props.animate,
        }),
    bar: (props) =>
        createElement(
            Bar,
            {
                key: props.dataKey,
                dataKey: props.dataKey,
                fill: props.color,
                radius: props.stackId === undefined ? props.barRadius : 0,
                barSize: props.barSize,
                stackId: props.stackId,
                isAnimationActive: props.animate,
                shape: barShape(props),
            },
            props.cellColors?.map((fill, index) =>
                createElement(Cell, { key: index, fill }),
            ),
            valueLabels(props, true),
        ),
    line: (props) =>
        createElement(
            Line,
            {
                key: props.dataKey,
                dataKey: props.dataKey,
                type: props.curveType,
                stroke: props.color,
                strokeWidth: 2,
                dot: props.dots,
                isAnimationActive: props.animate,
            },
            valueLabels(props, false),
        ),
};

export function areaGradient(id: string, color: string) {
    return createElement(
        'linearGradient',
        { key: id, id, x1: '0', y1: '0', x2: '0', y2: '1' },
        createElement('stop', {
            offset: '5%',
            stopColor: color,
            stopOpacity: 0.4,
        }),
        createElement('stop', {
            offset: '95%',
            stopColor: color,
            stopOpacity: 0.05,
        }),
    );
}
