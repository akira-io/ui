// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { trackOrigin } from '@/lib/motion/origin-element';
import { OverlayBackdrop, OverlayPresence } from '@/lib/motion/overlay-motion';
import { OverlayOpenProvider } from '@/lib/motion/overlay-state';
import { ZoomSurface } from '@/lib/motion/zoom-surface';
import { expectCutToTheButton } from '../../../tests/fixtures/zoom-origin';

const original = HTMLElement.prototype.getBoundingClientRect;

beforeAll(() => {
    MotionGlobalConfig.skipAnimations = false;
    HTMLElement.prototype.getBoundingClientRect = function () {
        if (this.id === 'origin') {
            return { left: 0, top: 0, width: 40, height: 40 } as DOMRect;
        }

        if (this.dataset.testid === 'surface') {
            return { left: 300, top: 200, width: 400, height: 300 } as DOMRect;
        }

        return original.call(this);
    };
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
    HTMLElement.prototype.getBoundingClientRect = original;
});

afterEach(cleanup);

function scene(open: boolean) {
    return (
        <>
            <button id="origin">Open</button>
            <OverlayOpenProvider open={open}>
                <OverlayPresence>
                    <OverlayBackdrop key="backdrop" data-testid="backdrop" />
                    <ZoomSurface key="surface" data-testid="surface">
                        Body
                    </ZoomSurface>
                </OverlayPresence>
            </OverlayOpenProvider>
        </>
    );
}

describe('ZoomSurface', () => {
    it('grows out of the pressed element and shrinks back before leaving', async () => {
        trackOrigin();
        const { rerender } = render(scene(false));

        screen
            .getByText('Open')
            .dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        rerender(scene(true));
        await new Promise((resolve) => setTimeout(resolve, 20));

        expectCutToTheButton(screen.getByTestId('surface'));

        await new Promise((resolve) => setTimeout(resolve, 600));
        rerender(scene(false));

        expect(screen.queryByTestId('surface')).not.toBeNull();
        await waitFor(
            () => {
                expect(screen.queryByTestId('surface')).toBeNull();
                expect(screen.queryByTestId('backdrop')).toBeNull();
            },
            { timeout: 1500 },
        );
    });
});
