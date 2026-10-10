// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Skeleton } from '@/components/ui/skeleton';
import {
    SkeletonMorph,
    SkeletonMorphItem,
} from '@/components/ui/skeleton-morph';

afterEach(cleanup);

function Card({ loading }: { loading: boolean }) {
    return (
        <SkeletonMorph loading={loading}>
            <SkeletonMorphItem skeleton={<Skeleton className="h-6 w-32" />}>
                <h3>Revenue</h3>
            </SkeletonMorphItem>
            <SkeletonMorphItem skeleton={<Skeleton className="h-4 w-48" />}>
                <p>Up 12% this month</p>
            </SkeletonMorphItem>
        </SkeletonMorph>
    );
}

const root = () =>
    document.querySelector('[data-slot="skeleton-morph"]') as HTMLElement;

describe('SkeletonMorph', () => {
    it('shows only hidden placeholders while loading', () => {
        render(<Card loading />);

        expect(root().getAttribute('aria-busy')).toBe('true');
        expect(screen.queryByText('Revenue')).toBeNull();
        expect(
            [
                ...document.querySelectorAll(
                    '[data-slot="skeleton-morph-placeholder"]',
                ),
            ].map((placeholder) => placeholder.getAttribute('aria-hidden')),
        ).toEqual(['true', 'true']);
    });

    it('shows the content and drops the blocks once loaded', async () => {
        const { rerender } = render(<Card loading />);

        rerender(<Card loading={false} />);

        expect(screen.getByText('Revenue')).toBeTruthy();
        expect(root().getAttribute('aria-busy')).toBe('false');
        await waitFor(() =>
            expect(
                document.querySelector('[data-slot="skeleton-morph-block"]'),
            ).toBeNull(),
        );
    });

    it('draws no block when it mounts loaded', () => {
        render(<Card loading={false} />);

        expect(
            document.querySelector('[data-slot="skeleton-morph-block"]'),
        ).toBeNull();
    });

    it('brings the placeholders straight back when loading returns', () => {
        const { rerender } = render(<Card loading />);

        rerender(<Card loading={false} />);
        rerender(<Card loading />);

        expect(screen.queryByText('Revenue')).toBeNull();
        expect(
            document.querySelector('[data-slot="skeleton-morph-block"]'),
        ).toBeNull();
    });
});
