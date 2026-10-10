// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    GlassPillAction,
    GlassPillGroup,
    GlassToolbar,
} from '@/components/ui/glass-toolbar';

const lefts: Record<string, number> = { Archive: 4, Flag: 48 };
const originalRect = HTMLElement.prototype.getBoundingClientRect;
const originalMatchMedia = window.matchMedia;
const originalLeft = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetLeft',
);

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
    Object.defineProperty(HTMLElement.prototype, 'offsetLeft', {
        configurable: true,
        get() {
            return (
                lefts[(this as HTMLElement).getAttribute('aria-label') ?? ''] ??
                0
            );
        },
    });
    HTMLElement.prototype.getBoundingClientRect = function () {
        return this.dataset.slot === 'glass-pill-group'
            ? ({
                  left: 100,
                  top: 500,
                  right: 196,
                  bottom: 552,
                  width: 96,
                  height: 52,
              } as DOMRect)
            : originalRect.call(this);
    };
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
    window.matchMedia = originalMatchMedia;
    HTMLElement.prototype.getBoundingClientRect = originalRect;
    if (originalLeft) {
        Object.defineProperty(
            HTMLElement.prototype,
            'offsetLeft',
            originalLeft,
        );
    }
});

afterEach(cleanup);

describe('the glass pill highlight under reduced motion', () => {
    it('jumps to the action under the finger', async () => {
        render(
            <GlassToolbar label="Actions">
                <GlassPillGroup>
                    <GlassPillAction icon={<span>A</span>} label="Archive" />
                    <GlassPillAction icon={<span>F</span>} label="Flag" />
                </GlassPillGroup>
            </GlassToolbar>,
        );
        const at = (x: number) => ({
            pointerId: 1,
            button: 0,
            buttons: 1,
            clientX: x,
            clientY: 526,
        });

        fireEvent.pointerDown(
            screen.getByRole('button', { name: 'Archive' }),
            at(126),
        );
        fireEvent.pointerMove(window, at(170));
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await new Promise((resolve) => requestAnimationFrame(resolve));

        expect(
            document.querySelector<HTMLElement>(
                '[data-slot="glass-pill-highlight"]',
            )?.style.transform,
        ).toContain('translateX(48px)');
        fireEvent.pointerUp(window, at(170));
    });
});
