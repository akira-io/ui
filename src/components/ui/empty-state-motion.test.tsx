// @vitest-environment jsdom

import { cleanup, render, waitFor } from '@testing-library/react';
import { Inbox } from 'lucide-react';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { EmptyState } from '@/components/ui/empty-state';

beforeAll(() => {
    MotionGlobalConfig.skipAnimations = false;
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
});

afterEach(cleanup);

const icons = () =>
    document.querySelectorAll('[data-slot="empty-state-icon"] svg');

const isDrawn = (icon: Element | undefined) =>
    [
        ...(icon?.querySelectorAll('path, line, circle, rect, polyline') ?? []),
    ].some((stroke) => stroke.getAttribute('pathLength') === '1');

describe('an empty state on motion', () => {
    it('draws the icon of its scene in', () => {
        render(<EmptyState scene="offline" />);

        expect(isDrawn(icons()[0])).toBe(true);
    });

    it('swaps to the next scene and leaves a single icon', async () => {
        const { rerender } = render(<EmptyState scene="no-results" />);

        rerender(<EmptyState scene="offline" />);
        rerender(<EmptyState scene="caught-up" />);

        await waitFor(
            () => {
                expect(icons()).toHaveLength(1);
                expect(
                    icons()[0]?.classList.contains('lucide-circle-check'),
                ).toBe(true);
            },
            { timeout: 1500 },
        );
    });

    it('draws a new icon passed in without a scene', async () => {
        const { rerender } = render(<EmptyState />);

        rerender(<EmptyState icon={Inbox} />);

        await waitFor(
            () => {
                expect(icons()).toHaveLength(1);
                expect(icons()[0]?.classList.contains('lucide-inbox')).toBe(
                    true,
                );
                expect(isDrawn(icons()[0])).toBe(true);
            },
            { timeout: 1500 },
        );
    });
});
