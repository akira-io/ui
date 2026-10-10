// @vitest-environment jsdom

import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { SlotText } from '@/components/ui/slot-text';

afterEach(cleanup);

const reels = () => [
    ...document.querySelectorAll<HTMLElement>('[data-slot="slot-text-reel"]'),
];

describe('SlotText', () => {
    it('gives assistive tech the whole value and hides the columns', () => {
        render(<SlotText value="€1,250" />);

        expect(document.querySelector('.sr-only')?.textContent).toBe('€1,250');
        expect(
            document
                .querySelector('[data-slot="slot-text-columns"]')
                ?.getAttribute('aria-hidden'),
        ).toBe('true');
    });

    it('draws one reel per digit and plain characters for the rest', () => {
        render(<SlotText value="€1,250" />);

        expect(reels()).toHaveLength(4);
        expect(
            document.querySelectorAll('[data-slot="slot-text-character"]'),
        ).toHaveLength(2);
    });

    it('shows the value in place on mount', async () => {
        render(<SlotText value="42" />);

        await waitFor(() =>
            expect(reels().map((reel) => reel.style.transform)).toEqual([
                'translateY(-40%)',
                'translateY(-20%)',
            ]),
        );
    });

    it('rolls every reel to the new digit', async () => {
        const { rerender } = render(<SlotText value="42" />);

        rerender(<SlotText value="97" />);

        expect(reels().map((reel) => reel.dataset.digit)).toEqual(['9', '7']);
        await waitFor(() =>
            expect(reels().map((reel) => reel.style.transform)).toEqual([
                'translateY(-90%)',
                'translateY(-70%)',
            ]),
        );
    });

    it('lands on the last value after quick changes', async () => {
        const { rerender } = render(<SlotText value="12" />);

        rerender(<SlotText value="19" />);
        rerender(<SlotText value="25" />);

        await waitFor(() =>
            expect(reels().map((reel) => reel.style.transform)).toEqual([
                'translateY(-20%)',
                'translateY(-50%)',
            ]),
        );
    });

    it('rolls a new leftmost digit up from zero', async () => {
        const { rerender } = render(<SlotText value="99" />);

        rerender(<SlotText value="100" />);

        await waitFor(() =>
            expect(reels()[0].style.transform).toBe('translateY(-10%)'),
        );
    });

    it('passes aria-live to the element that holds the value', () => {
        render(<SlotText value="3" aria-live="polite" />);

        expect(
            document
                .querySelector('[data-slot="slot-text"]')
                ?.getAttribute('aria-live'),
        ).toBe('polite');
    });
});
