import { createElement } from 'react';
import { Label, type LabelProps } from 'recharts';

export const LABEL_FONT_SIZE = 12;

export const LABEL_LINE_HEIGHT = 16;

export const LABEL_CHAR_WIDTH = LABEL_FONT_SIZE * 0.6;

export type LabelFit = 'segment' | 'free';

export type LabelBox = { width: number; height: number };

export type ValueLabelProps = LabelProps & {
    textOf: (value: unknown) => string;
    fit: LabelFit;
};

export function labelWidth(text: string): number {
    return [...text].length * LABEL_CHAR_WIDTH;
}

export function hasLabelValue(value: unknown): boolean {
    const numeric = typeof value === 'number' ? value : Number(value);

    return Number.isFinite(numeric) && numeric !== 0;
}

export function labelFits(text: string, box: LabelBox, fit: LabelFit): boolean {
    if (fit === 'free') {
        return true;
    }

    return (
        Math.abs(box.width) >= labelWidth(text) &&
        Math.abs(box.height) >= LABEL_LINE_HEIGHT
    );
}

function boxOf(viewBox: LabelProps['viewBox']): LabelBox {
    if (viewBox && 'width' in viewBox && 'height' in viewBox) {
        return { width: viewBox.width ?? 0, height: viewBox.height ?? 0 };
    }

    return { width: 0, height: 0 };
}

export function ValueLabel({
    textOf,
    fit,
    content,
    formatter,
    value,
    ...label
}: ValueLabelProps) {
    if (!hasLabelValue(value)) {
        return null;
    }

    const text = textOf(value);

    if (!labelFits(text, boxOf(label.viewBox), fit)) {
        return null;
    }

    return createElement(Label, { ...label, value: text });
}
