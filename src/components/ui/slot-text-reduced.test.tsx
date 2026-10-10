// @vitest-environment jsdom

import { cleanup, render, waitFor } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SlotText } from '@/components/ui/slot-text';

const originalMatchMedia = window.matchMedia;

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
    window.matchMedia = originalMatchMedia;
});

afterEach(cleanup);

describe('SlotText under reduced motion', () => {
    it('swaps the digits at once', async () => {
        const { rerender } = render(<SlotText value="12" />);

        rerender(<SlotText value="87" />);

        await waitFor(() =>
            expect(
                [
                    ...document.querySelectorAll<HTMLElement>(
                        '[data-slot="slot-text-reel"]',
                    ),
                ].map((reel) => reel.style.transform),
            ).toEqual(['translateY(-80%)', 'translateY(-70%)']),
            { timeout: 60 },
        );
    });

    it('shows a changed character without a fade', () => {
        const { rerender } = render(<SlotText value="5%" />);

        rerender(<SlotText value="5‰" />);

        expect(
            document.querySelectorAll<HTMLElement>(
                '[data-slot="slot-text-character"]',
            )[0].style.opacity,
        ).toBe('');
    });
});
