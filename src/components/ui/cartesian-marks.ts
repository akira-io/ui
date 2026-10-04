import { createElement, type ReactElement } from 'react';
import { Area, Bar, Cell, Line } from 'recharts';

export type ChartCurve = 'smooth' | 'linear' | 'step';

export type CartesianKind = 'area' | 'bar' | 'line';

export const CURVE_TYPE = {
    smooth: 'monotone',
    linear: 'linear',
    step: 'step',
} as const;

export type MarkProps = {
    animate: boolean;
    dataKey: string;
    color: string;
    stackId?: string;
    curveType: (typeof CURVE_TYPE)[ChartCurve];
    barSize?: number;
    barRadius: number;
    dots: boolean;
    cellColors?: readonly string[];
};

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
            fill: props.color,
            fillOpacity: 0.2,
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
            },
            props.cellColors?.map((fill, index) =>
                createElement(Cell, { key: index, fill }),
            ),
        ),
    line: (props) =>
        createElement(Line, {
            key: props.dataKey,
            dataKey: props.dataKey,
            type: props.curveType,
            stroke: props.color,
            strokeWidth: 2,
            dot: props.dots,
            isAnimationActive: props.animate,
        }),
};
