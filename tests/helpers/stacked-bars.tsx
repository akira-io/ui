import { render } from '@testing-library/react';
import { expect } from 'vitest';

import { BarChart, type BarChartProps } from '@/components/ui/bar-chart';

type Box = { left: number; top: number; right: number; bottom: number };

type Segment = { box: Box; arced: boolean; clip: string };

type Outline = { box: Box; radius: number };

export const thinTop = [
    { month: 'Jan', web: 100, mobile: 80, kiosk: 3 },
    { month: 'Feb', web: 60, mobile: 40, kiosk: 2 },
];

export const sides = [
    { month: 'Jan', sales: 60, refunds: -50, tips: 2 },
    { month: 'Feb', sales: 2, refunds: -50, tips: 1 },
];

const DIMENSION = { width: 600, height: 300 };

function boxOf(path: Element): Box {
    const x = Number(path.getAttribute('x'));
    const y = Number(path.getAttribute('y'));
    const width = Number(path.getAttribute('width'));
    const height = Number(path.getAttribute('height'));

    return {
        left: Math.min(x, x + width),
        top: Math.min(y, y + height),
        right: Math.max(x, x + width),
        bottom: Math.max(y, y + height),
    };
}

function outlineOf(container: HTMLElement, id: string): Outline {
    const shape = container.querySelector(
        `[id="${id}"] rect, [id="${id}"] path`,
    );

    if (!shape) {
        throw new Error(`clip ${id} has no outline`);
    }

    const arc = /A ([\d.]+),/.exec(shape.getAttribute('d') ?? '');

    return {
        box: boxOf(shape),
        radius: Number(shape.getAttribute('rx') ?? arc?.[1] ?? 0),
    };
}

export function segmentsOf(container: HTMLElement): Segment[] {
    return [
        ...container.querySelectorAll(
            '.recharts-bar-rectangle .recharts-rectangle',
        ),
    ]
        .filter((path) => !path.closest('clipPath'))
        .map((path) => ({
            box: boxOf(path),
            arced: /A/.test(path.getAttribute('d') ?? ''),
            clip: /url\(#(.+)\)/.exec(
                path.closest('[clip-path]')?.getAttribute('clip-path') ?? '',
            )?.[1] as string,
        }));
}

export function bars(container: HTMLElement) {
    const groups = new Map<string, Segment[]>();

    for (const segment of segmentsOf(container)) {
        const key = JSON.stringify(outlineOf(container, segment.clip));

        groups.set(key, [...(groups.get(key) ?? []), segment]);
    }

    return [...groups.entries()].map(([key, members]) => ({
        outline: JSON.parse(key) as Outline,
        segments: members.map((member) => member.box),
        arced: members.some((member) => member.arced),
    }));
}

function union(boxes: Box[]): Box {
    return {
        left: Math.min(...boxes.map((b) => b.left)),
        top: Math.min(...boxes.map((b) => b.top)),
        right: Math.max(...boxes.map((b) => b.right)),
        bottom: Math.max(...boxes.map((b) => b.bottom)),
    };
}

export function renderStack(props: Partial<BarChartProps>) {
    return render(
        <BarChart
            data={thinTop}
            series={['web', 'mobile', 'kiosk']}
            xKey="month"
            stacked
            initialDimension={DIMENSION}
            {...props}
        />,
    ).container;
}

export function expectClippedAsAWhole(
    container: HTMLElement,
    horizontal: boolean,
) {
    const found = bars(container);

    expect(found.length).toBeGreaterThan(0);

    for (const { outline, segments, arced } of found) {
        const whole = union(segments);
        const thickness = horizontal
            ? whole.bottom - whole.top
            : whole.right - whole.left;
        const length = horizontal
            ? whole.right - whole.left
            : whole.bottom - whole.top;

        expect(arced).toBe(false);

        for (const segment of segments) {
            expect(Object.values(segment).every(Number.isInteger)).toBe(true);
            expect(segment.left).toBeGreaterThanOrEqual(outline.box.left);
            expect(segment.right).toBeLessThanOrEqual(outline.box.right);
            expect(segment.top).toBeGreaterThanOrEqual(outline.box.top);
            expect(segment.bottom).toBeLessThanOrEqual(outline.box.bottom);

            const across = horizontal
                ? [segment.top, segment.bottom]
                : [segment.left, segment.right];

            expect(across).toEqual(
                horizontal
                    ? [outline.box.top, outline.box.bottom]
                    : [outline.box.left, outline.box.right],
            );
        }

        expect(outline.box.left).toBeCloseTo(whole.left, 3);
        expect(outline.box.right).toBeCloseTo(whole.right, 3);
        expect(outline.box.top).toBeCloseTo(whole.top, 3);
        expect(outline.box.bottom).toBeCloseTo(whole.bottom, 3);
        expect(outline.radius).toBeCloseTo(
            Math.min(8, thickness / 6, length / 2),
            3,
        );
    }
}

export function curvedElements(container: HTMLElement): Element[] {
    return [...container.querySelectorAll('.recharts-bar *')].filter(
        (element) =>
            Number(element.getAttribute('rx') ?? 0) > 0 ||
            /A/.test(element.getAttribute('d') ?? ''),
    );
}
