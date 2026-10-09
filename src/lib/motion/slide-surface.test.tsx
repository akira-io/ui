// @vitest-environment jsdom

import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { StrictMode } from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { OverlayPresence } from '@/lib/motion/overlay-motion';
import { OverlayOpenProvider } from '@/lib/motion/overlay-state';
import type { SheetSide } from '@/lib/motion/side';
import { SlideSurface } from '@/lib/motion/slide-surface';

const original = HTMLElement.prototype.getBoundingClientRect;

beforeAll(() => {
    MotionGlobalConfig.skipAnimations = false;
    window.innerWidth = 1000;
    window.innerHeight = 800;
    HTMLElement.prototype.getBoundingClientRect = function () {
        return this.dataset.testid === 'surface'
            ? ({
                  left: 700,
                  top: 500,
                  right: 1000,
                  bottom: 800,
                  width: 300,
                  height: 300,
              } as DOMRect)
            : original.call(this);
    };
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
    HTMLElement.prototype.getBoundingClientRect = original;
});

afterEach(cleanup);

function scene(open: boolean, side: SheetSide = 'right') {
    return (
        <OverlayOpenProvider open={open}>
            <OverlayPresence>
                <SlideSurface key="surface" side={side} data-testid="surface">
                    Body
                </SlideSurface>
            </OverlayPresence>
        </OverlayOpenProvider>
    );
}

const surface = () => screen.queryByTestId('surface');

describe('SlideSurface', () => {
    it.each([
        ['right', /^translateX\(300px\)/],
        ['left', /^translateX\(-1000px\)/],
        ['bottom', /^translateY\(300px\)/],
        ['top', /^translateY\(-800px\)/],
    ] as const)('starts off screen on the %s', (side, start) => {
        render(scene(true, side));

        expect(surface()?.style.transform).toMatch(start);
    });

    it('starts off screen under strict mode', () => {
        render(<StrictMode>{scene(true)}</StrictMode>);

        expect(surface()?.style.transform).toMatch(/^translateX\(300px\)/);
    });

    it('settles in place and slides back out before it unmounts', async () => {
        const { rerender } = render(scene(true));

        await waitFor(
            () => expect(surface()?.style.transform).toMatch(/^(none)?$/),
            {
                timeout: 1500,
            },
        );

        rerender(scene(false));

        expect(surface()).not.toBeNull();
        await waitFor(() => expect(surface()).toBeNull(), { timeout: 1500 });
    });

    it('keeps moving towards a resting place that changed while it slid in', async () => {
        const at = (offset: number) => (
            <OverlayOpenProvider open>
                <OverlayPresence>
                    <SlideSurface
                        key="surface"
                        side="right"
                        rest={{ offset, scale: 1 }}
                        data-testid="surface"
                    >
                        Body
                    </SlideSurface>
                </OverlayPresence>
            </OverlayOpenProvider>
        );
        const position = () =>
            Number(
                /translateX\((-?[\d.]+)px\)/.exec(
                    surface()?.style.transform ?? '',
                )?.[1] ?? 0,
            );
        const { rerender } = render(at(0));

        await waitFor(() => expect(position()).toBeLessThan(250));
        const before = position();
        rerender(at(-26));

        const trail: number[] = [];

        for (let frame = 0; frame < 8; frame++) {
            await new Promise((resolve) => requestAnimationFrame(resolve));
            trail.push(position());
        }

        expect(Math.max(...trail)).toBeLessThanOrEqual(before + 1);
        await waitFor(
            () =>
                expect(surface()?.style.transform).toMatch(
                    /^translateX\(-26px\)/,
                ),
            { timeout: 1500 },
        );
    });

    it('still leaves when it is dragged while sliding out', async () => {
        const swipeable = (open: boolean) => (
            <OverlayOpenProvider open={open}>
                <OverlayPresence>
                    <SlideSurface
                        key="surface"
                        side="right"
                        onDismiss={() => {}}
                        data-testid="surface"
                    >
                        Body
                    </SlideSurface>
                </OverlayPresence>
            </OverlayOpenProvider>
        );
        const { rerender } = render(swipeable(true));

        await waitFor(
            () => expect(surface()?.style.transform).toMatch(/^(none)?$/),
            { timeout: 1500 },
        );

        const target = surface()!;
        const at = (x: number) => ({
            pointerId: 1,
            buttons: 1,
            button: 0,
            clientX: x,
            clientY: 100,
        });

        fireEvent.pointerDown(target, at(750));
        fireEvent.pointerMove(target, at(780));
        rerender(swipeable(false));
        await new Promise((resolve) => setTimeout(resolve, 20));
        fireEvent.pointerMove(target, at(800));
        fireEvent.pointerUp(target, at(800));

        await waitFor(() => expect(surface()).toBeNull(), { timeout: 1500 });
    });

    it('keeps a radix overlay inside it closed', () => {
        render(scene(true));

        expect(surface()?.firstElementChild).toBeNull();
        expect(surface()?.textContent).toBe('Body');
    });
});
