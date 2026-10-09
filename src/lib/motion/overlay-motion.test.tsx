// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    OverlayPresence,
    OverlaySurface,
    overlayVariants,
} from '@/lib/motion/overlay-motion';
import {
    OverlayOpenProvider,
    useOverlayForceMount,
} from '@/lib/motion/overlay-state';

afterEach(cleanup);

function ForceMountProbe() {
    return <span>{String(useOverlayForceMount())}</span>;
}

describe('overlayVariants', () => {
    it('scales from the origin when motion is allowed', () => {
        expect(overlayVariants(false).closed).toMatchObject({
            opacity: 0,
            scale: 0.96,
        });
        expect(overlayVariants(false).open).toMatchObject({
            opacity: 1,
            scale: 1,
        });
    });

    it('only fades under reduced motion', () => {
        expect(overlayVariants(true).closed).not.toHaveProperty('scale');
        expect(overlayVariants(true).open).not.toHaveProperty('scale');
    });
});

describe('the overlay state', () => {
    it('forces the mount under an akira root', () => {
        render(
            <OverlayOpenProvider open={false}>
                <ForceMountProbe />
            </OverlayOpenProvider>,
        );

        expect(screen.getByText('true')).toBeTruthy();
    });

    it('leaves the mount to radix without an akira root', () => {
        render(<ForceMountProbe />);

        expect(screen.getByText('undefined')).toBeTruthy();
    });
});

describe('OverlayPresence', () => {
    it('mounts while open and unmounts after the exit', async () => {
        const surface = (open: boolean) => (
            <OverlayOpenProvider open={open}>
                <OverlayPresence>
                    <OverlaySurface>Body</OverlaySurface>
                </OverlayPresence>
            </OverlayOpenProvider>
        );
        const { rerender } = render(surface(true));

        expect(screen.getByText('Body')).toBeTruthy();

        rerender(surface(false));

        await waitFor(() => expect(screen.queryByText('Body')).toBeNull());
    });

    it('renders its children as they are without an akira root', () => {
        render(
            <OverlayPresence>
                <span>Radix decides</span>
            </OverlayPresence>,
        );

        expect(screen.getByText('Radix decides')).toBeTruthy();
    });
});
