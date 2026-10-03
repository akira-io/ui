// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BarChart } from '@/components/ui/bar-chart';

afterEach(cleanup);

type Box = { left: number; top: number; right: number; bottom: number };

const channels = [
    { month: 'Jan', web: 20, mobile: 10, store: 5, kiosk: 3 },
    { month: 'Feb', web: 25, mobile: 12, store: 8, kiosk: 4 },
];

const refunds = [
    { month: 'Jan', card: -20, cash: -10 },
    { month: 'Feb', card: -15, cash: -25 },
];

function box(path: Element): Box {
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

function union(boxes: Box[]): Box {
    return {
        left: Math.min(...boxes.map((b) => b.left)),
        top: Math.min(...boxes.map((b) => b.top)),
        right: Math.max(...boxes.map((b) => b.right)),
        bottom: Math.max(...boxes.map((b) => b.bottom)),
    };
}

function segments(container: HTMLElement): SVGPathElement[] {
    return [
        ...container.querySelectorAll<SVGPathElement>(
            '.recharts-bar-rectangle path',
        ),
    ];
}

function hasArcs(path: Element): boolean {
    return /A/.test(path.getAttribute('d') ?? '');
}

function stackClips(container: HTMLElement): SVGClipPathElement[] {
    return [
        ...container.querySelectorAll<SVGClipPathElement>('clipPath'),
    ].filter((clip) => clip.id.startsWith('recharts-bar-stack-clip-path'));
}

function segmentsClippedBy(container: HTMLElement, id: string): Box[] {
    return [
        ...container.querySelectorAll(
            `.recharts-bar-rectangle[clip-path="url(#${id})"] path`,
        ),
    ].map(box);
}

function outline(clip: SVGClipPathElement): Box {
    const path = clip.querySelector('path');

    if (!path) {
        throw new Error(`clip ${clip.id} has no outline`);
    }

    expect(hasArcs(path)).toBe(true);

    return box(path);
}

function expectRoundedAsAWhole(container: HTMLElement, rows: number) {
    const clips = stackClips(container);

    expect(clips).toHaveLength(rows);
    expect(segments(container).some(hasArcs)).toBe(false);

    for (const clip of clips) {
        expect(outline(clip)).toEqual(
            union(segmentsClippedBy(container, clip.id)),
        );
    }
}

describe('the corners of a stacked bar', () => {
    it('round only the base and the top of the whole bar', () => {
        const { container } = render(
            <BarChart
                data={channels}
                series={['web', 'mobile']}
                xKey="month"
                stacked
            />,
        );

        expect(segments(container)).toHaveLength(4);
        expectRoundedAsAWhole(container, channels.length);
    });

    it('round only the left and the right of a sideways bar', () => {
        const { container } = render(
            <BarChart
                data={channels}
                series={['web', 'mobile']}
                xKey="month"
                stacked
                horizontal
            />,
        );

        expectRoundedAsAWhole(container, channels.length);

        for (const clip of stackClips(container)) {
            const [first, last] = segmentsClippedBy(container, clip.id);

            expect(outline(clip).left).toBe(first.left);
            expect(outline(clip).right).toBe(last.right);
        }
    });

    it('move the arced end to the last segment with a value', () => {
        const { container } = render(
            <BarChart
                data={[
                    { month: 'Jan', web: 20, mobile: 0 },
                    { month: 'Feb', web: 25, mobile: 12 },
                ]}
                series={['web', 'mobile']}
                xKey="month"
                stacked
            />,
        );

        expectRoundedAsAWhole(container, 2);

        const [january] = stackClips(container);
        const visible = segmentsClippedBy(container, january.id).filter(
            (segment) => segment.bottom > segment.top,
        );

        expect(visible).toHaveLength(1);
        expect(outline(january)).toEqual(visible[0]);
    });

    it('round the outer end of a stack below zero', () => {
        const { container } = render(
            <BarChart
                data={refunds}
                series={['card', 'cash']}
                xKey="month"
                stacked
            />,
        );

        expectRoundedAsAWhole(container, refunds.length);

        for (const clip of stackClips(container)) {
            const [first, last] = segmentsClippedBy(container, clip.id);

            expect(outline(clip).top).toBe(first.top);
            expect(outline(clip).bottom).toBe(last.bottom);
        }
    });

    it('round every named stack on its own', () => {
        const { container } = render(
            <BarChart
                data={channels}
                series={[
                    { key: 'web', stackId: 'online' },
                    { key: 'mobile', stackId: 'online' },
                    { key: 'store', stackId: 'offline' },
                    { key: 'kiosk', stackId: 'offline' },
                ]}
                xKey="month"
            />,
        );

        expect(segments(container)).toHaveLength(8);
        expectRoundedAsAWhole(container, channels.length * 2);
        expect(
            stackClips(container).map(
                (clip) => segmentsClippedBy(container, clip.id).length,
            ),
        ).toEqual([2, 2, 2, 2]);
    });

    it('never share a clip with another chart on the page', () => {
        const { container } = render(
            <>
                <BarChart
                    data={channels}
                    series={['web', 'mobile']}
                    xKey="month"
                    stacked
                />
                <BarChart
                    data={channels}
                    series={['web', 'mobile']}
                    xKey="month"
                    stacked
                />
            </>,
        );

        const ids = stackClips(container).map((clip) => clip.id);

        expect(ids).toHaveLength(4);
        expect(new Set(ids).size).toBe(4);
        expectRoundedAsAWhole(container, 4);
    });

    it('leave every corner of a bar outside a stack arced, as before', () => {
        const { container } = render(
            <BarChart
                data={channels}
                series={['web', 'mobile']}
                xKey="month"
            />,
        );

        expect(segments(container)).toHaveLength(4);
        expect(segments(container).every(hasArcs)).toBe(true);
        expect(stackClips(container)).toHaveLength(0);
    });
});
