import { createElement } from 'react';
import { Label, type LabelProps } from 'recharts';

export const LABEL_FONT_SIZE = 12;

export const LABEL_LINE_HEIGHT = 16;

export const LABEL_CHAR_WIDTH = LABEL_FONT_SIZE * 0.6;

export type LabelFit = 'segment' | 'column' | 'free';

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

const FITS: Record<LabelFit, (text: string, box: LabelBox) => boolean> = {
    free: () => true,
    column: (text, box) => Math.abs(box.width) >= labelWidth(text),
    segment: (text, box) =>
        Math.abs(box.width) >= labelWidth(text) &&
        Math.abs(box.height) >= LABEL_LINE_HEIGHT,
};

export function labelFits(text: string, box: LabelBox, fit: LabelFit): boolean {
    return FITS[fit](text, box);
}

export function labelReach(
    rows: readonly Readonly<Record<string, unknown>>[],
    keys: readonly string[],
    format: (value: unknown) => string,
    offset: number,
): number {
    const widest = rows
        .flatMap((row) => keys.map((key) => row[key]))
        .filter(hasLabelValue)
        .reduce<number>(
            (width, value) => Math.max(width, labelWidth(format(value))),
            0,
        );

    return Math.ceil(offset + widest);
}

export function labelMargin(horizontal: boolean, reach: number) {
    return horizontal
        ? { top: 5, right: Math.max(8, reach), bottom: 5, left: 5 }
        : { top: 24, right: 8, bottom: 5, left: 5 };
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
