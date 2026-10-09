// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { OverlayPresence, OverlaySurface } from '@/lib/motion/overlay-motion';
import { OverlayOpenProvider } from '@/lib/motion/overlay-state';

beforeAll(() => {
    MotionGlobalConfig.skipAnimations = false;
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
});

afterEach(cleanup);

function surface(open: boolean) {
    return (
        <OverlayOpenProvider open={open}>
            <OverlayPresence>
                <OverlaySurface>Body</OverlaySurface>
            </OverlayPresence>
        </OverlayOpenProvider>
    );
}

describe('an overlay closing with motion on', () => {
    it('keeps its content mounted while it plays the exit, then removes it', async () => {
        const { rerender } = render(surface(true));

        rerender(surface(false));

        expect(screen.getByText('Body')).toBeTruthy();
        await waitFor(() => expect(screen.queryByText('Body')).toBeNull(), {
            timeout: 1000,
        });
    });

    it('keeps one content when it reopens during the exit', async () => {
        const { rerender } = render(surface(true));
        const first = screen.getByText('Body');

        rerender(surface(false));
        rerender(surface(true));

        await new Promise((resolve) => setTimeout(resolve, 300));

        expect(screen.getAllByText('Body')).toHaveLength(1);
        expect(screen.getByText('Body')).toBe(first);
    });
});
