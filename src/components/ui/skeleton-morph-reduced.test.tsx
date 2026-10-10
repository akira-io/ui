// @vitest-environment jsdom

import { act, cleanup, render, screen } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { Skeleton } from '@/components/ui/skeleton';
import {
    SkeletonMorph,
    SkeletonMorphItem,
} from '@/components/ui/skeleton-morph';

const originalMatchMedia = window.matchMedia;
const originalRect = HTMLElement.prototype.getBoundingClientRect;

beforeAll(() => {
    MotionGlobalConfig.skipAnimations = false;
    window.matchMedia = (query: string) =>
        ({
            matches: query.includes('prefers-reduced-motion'),
            media: query,
            onchange: null,
            addListener: () => undefined,
            removeListener: () => undefined,
            addEventListener: () => undefined,
            removeEventListener: () => undefined,
            dispatchEvent: () => false,
        }) as MediaQueryList;
    HTMLElement.prototype.getBoundingClientRect = function () {
        const height = this.getAttribute('aria-busy') === 'true' ? 40 : 120;

        return {
            width: 128,
            height,
            top: 0,
            left: 0,
            right: 128,
            bottom: height,
        } as DOMRect;
    };
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
    window.matchMedia = originalMatchMedia;
    HTMLElement.prototype.getBoundingClientRect = originalRect;
});

afterEach(cleanup);

function Card({ loading }: { loading: boolean }) {
    return (
        <SkeletonMorph loading={loading}>
            <SkeletonMorphItem skeleton={<Skeleton className="h-6 w-32" />}>
                <h3>Revenue</h3>
            </SkeletonMorphItem>
        </SkeletonMorph>
    );
}

describe('SkeletonMorph under reduced motion', () => {
    it('swaps the placeholders for the content at once', async () => {
        const { rerender } = render(<Card loading />);

        rerender(<Card loading={false} />);
        await act(
            () => new Promise<void>((resolve) => setTimeout(resolve, 30)),
        );

        expect(screen.getByText('Revenue')).toBeTruthy();
        expect(
            document.querySelector('[data-slot="skeleton-morph-block"]'),
        ).toBeNull();
        expect(
            document.querySelector<HTMLElement>('[data-slot="skeleton-morph"]')
                ?.style.height,
        ).toBe('');
    });
});
