// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { EmptyState } from '@/components/ui/empty-state';

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
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
});

afterEach(cleanup);

describe('an empty state under reduced motion', () => {
    it('swaps the icon without scaling it', async () => {
        const { rerender } = render(<EmptyState scene="no-results" />);
        const seen: string[] = [];

        rerender(<EmptyState scene="offline" />);

        for (let frame = 0; frame < 30; frame += 1) {
            document
                .querySelectorAll<HTMLElement>(
                    '[data-slot="empty-state-icon"] > span',
                )
                .forEach((glyph) => seen.push(glyph.style.transform));
            await new Promise((resolve) => setTimeout(resolve, 16));
        }

        expect(seen.length).toBeGreaterThan(0);
        expect(seen.filter((transform) => transform.includes('scale'))).toEqual(
            [],
        );
    });
});
