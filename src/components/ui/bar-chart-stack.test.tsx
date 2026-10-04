// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BarChart, type BarChartProps } from '@/components/ui/bar-chart';

afterEach(cleanup);

type Box = { left: number; top: number; right: number; bottom: number };

type Segment = { box: Box; arced: boolean; clip: string };

type Outline = { box: Box; radius: number };

const thinTop = [
    { month: 'Jan', web: 100, mobile: 80, kiosk: 3 },
    { month: 'Feb', web: 60, mobile: 40, kiosk: 2 },
];

const sides = [
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

function segmentsOf(container: HTMLElement): Segment[] {
    return [...container.querySelectorAll('.recharts-bar-rectangle path')]
        .filter((path) => !path.closest('clipPath'))
        .map((path) => ({
            box: boxOf(path),
            arced: /A/.test(path.getAttribute('d') ?? ''),
            clip: /url\(#(.+)\)/.exec(
                path.closest('[clip-path]')?.getAttribute('clip-path') ?? '',
            )?.[1] as string,
        }));
}

function bars(container: HTMLElement) {
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

function renderStack(props: Partial<BarChartProps>) {
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

function expectClippedAsAWhole(container: HTMLElement, horizontal: boolean) {
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

describe('the outline of a stacked bar', () => {
    it('clips upright columns as a whole when the top segment is thinner than the radius', () => {
        const container = renderStack({});

        expect(segmentsOf(container)).toHaveLength(6);
        expect(bars(container)).toHaveLength(2);
        expectClippedAsAWhole(container, false);
    });

    it('clips sideways bars as a whole when the last segment is thinner than the radius', () => {
        const container = renderStack({ horizontal: true });

        expect(bars(container)).toHaveLength(2);
        expectClippedAsAWhole(container, true);
    });

    it('keeps most of the width of a 1 px top segment on 30 narrow columns', () => {
        const container = renderStack({
            data: Array.from({ length: 30 }, (_, day) => ({
                month: `${day + 1}`,
                web: 40000,
                mobile: 30000,
                kiosk: 400,
            })),
            initialDimension: { width: 720, height: 256 },
        });

        for (const { outline, segments } of bars(container)) {
            const top = segments.reduce((a, b) => (a.top < b.top ? a : b));
            const width = outline.box.right - outline.box.left;
            const depth =
                top.top - outline.box.top + (top.bottom - top.top) / 2;
            const r = outline.radius;
            const inset =
                depth >= r ? 0 : r - Math.sqrt(r * r - (r - depth) ** 2);

            expect(width).toBeGreaterThan(17);
            expect(top.bottom - top.top).toBeLessThanOrEqual(1.5);
            expect((width - 2 * inset) / width).toBeGreaterThanOrEqual(0.8);
        }
    });

    it('keeps the outline when both axes are hidden', () => {
        const container = renderStack({ xAxis: false, yAxis: false });

        expect(bars(container)).toHaveLength(2);
        expectClippedAsAWhole(container, false);
    });

    it('limits the radius to a sixth of a narrow bar', () => {
        const container = renderStack({ barSize: 10 });

        expectClippedAsAWhole(container, false);
        expect(bars(container).map(({ outline }) => outline.radius)).toEqual([
            1.6667, 1.6667,
        ]);
    });

    it('gives each side of a diverging bar its own outline', () => {
        const container = renderStack({
            data: sides,
            series: ['sales', 'refunds', 'tips'],
        });
        const found = bars(container);

        expect(found).toHaveLength(4);
        expectClippedAsAWhole(container, false);

        for (const month of [0, 1]) {
            const [above, below] = found
                .filter(
                    ({ outline }) =>
                        outline.box.left === found[month].outline.box.left,
                )
                .sort((a, b) => a.outline.box.top - b.outline.box.top);

            expect(above.outline.box.bottom).toBeCloseTo(
                below.outline.box.top,
                3,
            );
        }
    });

    it('never lays a segment of one side over the other', () => {
        const container = renderStack({
            data: sides,
            series: ['sales', 'refunds', 'tips'],
            horizontal: true,
        });

        for (const { segments } of bars(container)) {
            const ordered = [...segments].sort((a, b) => a.left - b.left);

            ordered.slice(1).forEach((segment, index) => {
                expect(segment.left).toBeGreaterThanOrEqual(
                    ordered[index].right - 0.001,
                );
            });
        }

        expectClippedAsAWhole(container, true);
    });

    it('outlines every named stack on its own', () => {
        const container = renderStack({
            stacked: false,
            series: [
                { key: 'web', stackId: 'online' },
                { key: 'mobile', stackId: 'online' },
                { key: 'kiosk', stackId: 'offline' },
            ],
        });

        expect(bars(container)).toHaveLength(4);
        expectClippedAsAWhole(container, false);
    });

    it('never shares a clip with another chart on the page', () => {
        const container = render(
            <>
                <BarChart
                    data={thinTop}
                    series={['web', 'mobile']}
                    xKey="month"
                    stacked
                />
                <BarChart
                    data={thinTop}
                    series={['web', 'mobile']}
                    xKey="month"
                    stacked
                />
            </>,
        ).container;
        const ids = [...container.querySelectorAll('clipPath')].map(
            (clip) => clip.id,
        );

        expect(new Set(ids).size).toBe(ids.length);
    });

    it('leaves every corner of a bar outside a stack arced, as before', () => {
        const container = renderStack({ stacked: false });

        expect(segmentsOf(container)).toHaveLength(6);
        expect(segmentsOf(container).every(({ arced }) => arced)).toBe(true);
        expect(
            container.querySelectorAll('.recharts-bar-stack-segment'),
        ).toHaveLength(0);
    });
});
