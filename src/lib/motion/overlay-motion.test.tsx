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
    useClosingDismissGuard,
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

function DismissProbe() {
    const guardClosingDismiss = useClosingDismissGuard();
    const event = new Event('focusoutside', { cancelable: true });

    guardClosingDismiss(event);

    return <span>{event.defaultPrevented ? 'kept' : 'dismissed'}</span>;
}

describe('useClosingDismissGuard', () => {
    it('keeps a closing overlay from dismissing its replacement', () => {
        render(
            <OverlayOpenProvider open={false}>
                <DismissProbe />
            </OverlayOpenProvider>,
        );

        expect(screen.getByText('kept')).toBeTruthy();
    });

    it('lets an open overlay dismiss', () => {
        render(
            <OverlayOpenProvider open>
                <DismissProbe />
            </OverlayOpenProvider>,
        );

        expect(screen.getByText('dismissed')).toBeTruthy();
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
