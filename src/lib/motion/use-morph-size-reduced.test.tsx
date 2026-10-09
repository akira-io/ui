// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { useRef } from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { useMorphSize } from '@/lib/motion/use-morph-size';

let width = 96;
const original = HTMLElement.prototype.getBoundingClientRect;
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
    HTMLElement.prototype.getBoundingClientRect = function () {
        return this.dataset.testid === 'content'
            ? ({ left: 0, top: 0, width, height: 40 } as DOMRect)
            : original.call(this);
    };
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
    window.matchMedia = originalMatchMedia;
    HTMLElement.prototype.getBoundingClientRect = original;
});

afterEach(cleanup);

function Morphing({ step }: { step: string }) {
    const surface = useRef<HTMLDivElement>(null);
    const content = useRef<HTMLDivElement>(null);

    useMorphSize(surface, content, { step, radius: 'pill' });

    return (
        <div ref={surface} data-testid="surface">
            <div ref={content} data-testid="content" />
        </div>
    );
}

describe('useMorphSize under reduced motion', () => {
    it('changes size at once', () => {
        const { rerender } = render(<Morphing step="idle" />);

        width = 240;
        rerender(<Morphing step="menu" />);

        expect(screen.getByTestId('surface').style.width).toBe('240px');
    });
});
