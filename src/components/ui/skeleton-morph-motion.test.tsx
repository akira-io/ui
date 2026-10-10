// @vitest-environment jsdom

import { act, cleanup, render } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { Skeleton } from '@/components/ui/skeleton';
import {
    SkeletonMorph,
    SkeletonMorphItem,
} from '@/components/ui/skeleton-morph';

const originalRect = HTMLElement.prototype.getBoundingClientRect;

beforeAll(() => {
    MotionGlobalConfig.skipAnimations = false;
    HTMLElement.prototype.getBoundingClientRect = function () {
        const slot = this.dataset.slot;
        const size =
            slot === 'skeleton-morph-placeholder'
                ? { width: 128, height: 24 }
                : { width: 200, height: 28 };

        return {
            ...size,
            top: 0,
            left: 0,
            right: size.width,
            bottom: size.height,
        } as DOMRect;
    };
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
    HTMLElement.prototype.getBoundingClientRect = originalRect;
});

afterEach(cleanup);

function Card({ loading, third }: { loading: boolean; third?: boolean }) {
    return (
        <SkeletonMorph loading={loading}>
            <SkeletonMorphItem skeleton={<Skeleton className="h-6 w-32" />}>
                <h3>Revenue</h3>
            </SkeletonMorphItem>
            <SkeletonMorphItem skeleton={<Skeleton className="h-4 w-48" />}>
                <p>Up 12% this month</p>
            </SkeletonMorphItem>
            {third ? (
                <SkeletonMorphItem skeleton={<Skeleton className="h-4 w-8" />}>
                    <p>New row</p>
                </SkeletonMorphItem>
            ) : null}
        </SkeletonMorph>
    );
}

const blocks = () => [
    ...document.querySelectorAll<HTMLElement>(
        '[data-slot="skeleton-morph-block"]',
    ),
];

const pause = (ms: number) =>
    act(() => new Promise<void>((resolve) => setTimeout(resolve, ms)));

describe('SkeletonMorph in motion', () => {
    it('starts each block at its placeholder size', () => {
        const { rerender } = render(<Card loading />);

        rerender(<Card loading={false} />);

        expect(blocks().map((block) => block.style.width)).toEqual([
            '128px',
            '128px',
        ]);
        expect(blocks()[0].style.height).toBe('24px');
    });

    it('stretches the first block before the second starts', async () => {
        const { rerender } = render(<Card loading />);

        rerender(<Card loading={false} />);
        await pause(40);

        const [first, second] = blocks();

        expect(first.style.width).not.toBe('128px');
        expect(second.style.width).toBe('128px');
    });

    it('keeps the content hidden under the block until it fades in', () => {
        const { rerender } = render(<Card loading />);

        rerender(<Card loading={false} />);

        const content = document.querySelector<HTMLElement>(
            '[data-slot="skeleton-morph-content"]',
        );

        expect(content?.style.opacity).toBe('0');
    });

    it('draws no block for an item that mounts after loading ended', () => {
        const { rerender } = render(<Card loading />);

        rerender(<Card loading={false} />);
        rerender(<Card loading={false} third />);

        expect(blocks()).toHaveLength(2);
    });

    it('stops the morph when loading returns mid-stretch', async () => {
        const { rerender } = render(<Card loading />);

        rerender(<Card loading={false} />);
        await pause(20);
        rerender(<Card loading />);

        expect(blocks()).toHaveLength(0);
        expect(
            document.querySelector<HTMLElement>('[data-slot="skeleton-morph"]')
                ?.style.height,
        ).toBe('');
    });
});
