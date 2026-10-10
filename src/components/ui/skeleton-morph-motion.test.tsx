// @vitest-environment jsdom

import { act, cleanup, render, waitFor } from '@testing-library/react';
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
        const sizes: Record<string, { width: number; height: number }> = {
            skeleton: { width: 128, height: 24 },
            'skeleton-morph-placeholder': { width: 600, height: 24 },
        };
        const size = sizes[this.dataset.slot ?? ''] ?? {
            width: 200,
            height: 28,
        };

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

function Many({ loading }: { loading: boolean }) {
    return (
        <SkeletonMorph loading={loading}>
            {['a', 'b', 'c', 'd', 'e', 'f'].map((name) => (
                <SkeletonMorphItem
                    key={name}
                    skeleton={<Skeleton className="h-4 w-8" />}
                >
                    <p>{name}</p>
                </SkeletonMorphItem>
            ))}
        </SkeletonMorph>
    );
}

function Nested({ loading }: { loading: boolean }) {
    return (
        <SkeletonMorph loading={loading}>
            <SkeletonMorphItem skeleton={<Skeleton className="h-4 w-8" />}>
                <SkeletonMorph loading={loading}>
                    <SkeletonMorphItem
                        skeleton={<Skeleton className="h-4 w-8" />}
                    >
                        <p>inner one</p>
                    </SkeletonMorphItem>
                    <SkeletonMorphItem
                        skeleton={<Skeleton className="h-4 w-8" />}
                    >
                        <p>inner two</p>
                    </SkeletonMorphItem>
                </SkeletonMorph>
            </SkeletonMorphItem>
            <div data-testid="after">
                <SkeletonMorphItem skeleton={<Skeleton className="h-4 w-8" />}>
                    <p>after</p>
                </SkeletonMorphItem>
            </div>
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

    it('starts the items in reading order, capped at four steps', () => {
        const { rerender } = render(<Many loading />);

        rerender(<Many loading={false} />);

        expect(blocks().map((block) => block.dataset.delay)).toEqual([
            '0',
            '0.06',
            '0.12',
            '0.18',
            '0.24',
            '0.24',
        ]);
    });

    it('counts only its own items when another one sits inside', () => {
        const { rerender } = render(<Nested loading />);

        rerender(<Nested loading={false} />);

        expect(
            document.querySelector<HTMLElement>(
                '[data-testid="after"] [data-slot="skeleton-morph-block"]',
            )?.dataset.delay,
        ).toBe('0.06');
    });

    it('grows the block to the content, then hands over to the content', async () => {
        const { rerender } = render(<Card loading />);

        rerender(<Card loading={false} />);

        await waitFor(() => expect(blocks()[0]?.style.width).toBe('200px'));
        await waitFor(() => expect(blocks()).toHaveLength(0));
        expect(
            document.querySelector<HTMLElement>(
                '[data-slot="skeleton-morph-content"]',
            )?.style.opacity,
        ).toBe('');
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
