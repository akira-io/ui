// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { OverlayPresence, OverlaySurface } from '@/lib/motion/overlay-motion';
import { OverlayOpenProvider } from '@/lib/motion/overlay-state';

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

describe('an overlay under reduced motion', () => {
    it('starts from a plain fade, without the scale from the trigger', () => {
        render(
            <OverlayOpenProvider open>
                <OverlayPresence>
                    <OverlaySurface data-testid="surface">Body</OverlaySurface>
                </OverlayPresence>
            </OverlayOpenProvider>,
        );

        const style = screen.getByTestId('surface').style;

        expect(style.opacity).toBe('0');
        expect(style.transform).not.toContain('scale');
    });
});
