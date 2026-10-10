// @vitest-environment jsdom

import { act, cleanup, render, waitFor } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { StrictMode } from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SlotText } from '@/components/ui/slot-text';

beforeAll(() => {
    MotionGlobalConfig.skipAnimations = false;
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
});

afterEach(cleanup);

const reels = () => [
    ...document.querySelectorAll<HTMLElement>('[data-slot="slot-text-reel"]'),
];

const offsets = () => reels().map((reel) => reel.style.transform);

const pause = (ms: number) =>
    act(() => new Promise<void>((resolve) => setTimeout(resolve, ms)));

describe('SlotText in motion', () => {
    it('renders each reel at its digit before any effect runs', () => {
        render(<SlotText value="42" />);

        expect(offsets()).toEqual(['translateY(-40%)', 'translateY(-20%)']);
    });

    it('does not roll on mount', async () => {
        render(<SlotText value="42" />);

        await pause(40);

        expect(offsets()).toEqual(['translateY(-40%)', 'translateY(-20%)']);
    });

    it('starts the left reel before the right one', () => {
        const { rerender } = render(<SlotText value="11" />);

        rerender(<SlotText value="99" />);

        expect(reels().map((reel) => reel.dataset.delay)).toEqual([
            '0',
            '0.06',
        ]);
    });

    it('keeps a reel that does not change still', async () => {
        const { rerender } = render(<SlotText value="15" />);

        rerender(<SlotText value="19" />);
        await pause(40);

        expect(offsets()[0]).toBe('translateY(-10%)');
    });

    it('keeps rolling when the parent renders again with the same value', async () => {
        const { rerender } = render(<SlotText value="10" />);

        rerender(<SlotText value="90" />);
        await pause(30);
        rerender(<SlotText value="90" />);
        await pause(10);

        expect(offsets()[0]).not.toBe('translateY(-90%)');
    });

    it('rolls a new column to its digit under strict mode', async () => {
        const { rerender } = render(
            <StrictMode>
                <SlotText value="9" />
            </StrictMode>,
        );

        rerender(
            <StrictMode>
                <SlotText value="59" />
            </StrictMode>,
        );

        await waitFor(() => expect(offsets()[0]).toBe('translateY(-50%)'));
    });

    it('rolls back to the digit it mounted with', async () => {
        const { rerender } = render(<SlotText value="4" />);

        rerender(<SlotText value="7" />);
        await waitFor(() => expect(offsets()[0]).toBe('translateY(-70%)'));
        rerender(<SlotText value="4" />);

        await waitFor(() => expect(offsets()[0]).toBe('translateY(-40%)'));
    });
});
