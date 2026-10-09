// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { useRef } from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { useMorphSize } from '@/lib/motion/use-morph-size';
import {
    installResizeObserver,
    resize,
} from '../../../tests/fixtures/resize-observer';

const sizes: Record<string, { width: number; height: number }> = {
    idle: { width: 96, height: 40 },
    menu: { width: 240, height: 180 },
};
let current = 'idle';
const original = HTMLElement.prototype.getBoundingClientRect;

beforeAll(() => {
    installResizeObserver();
    MotionGlobalConfig.skipAnimations = false;
    HTMLElement.prototype.getBoundingClientRect = function () {
        return this.dataset.testid === 'content'
            ? ({ left: 0, top: 0, ...sizes[current] } as DOMRect)
            : original.call(this);
    };
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
    HTMLElement.prototype.getBoundingClientRect = original;
});

afterEach(() => {
    cleanup();
    sizes.menu = { width: 240, height: 180 };
});

function Morphing({ step }: { step: string }) {
    const surface = useRef<HTMLDivElement>(null);
    const content = useRef<HTMLDivElement>(null);

    useMorphSize(surface, content, {
        step,
        radius: step === 'idle' ? 'pill' : 24,
    });

    return (
        <div ref={surface} data-testid="surface">
            <div ref={content} data-testid="content" />
        </div>
    );
}

const surface = () => screen.getByTestId('surface');

describe('useMorphSize', () => {
    it('takes the size of its first step at once, as a pill', () => {
        current = 'idle';
        render(<Morphing step="idle" />);

        expect(surface().style.width).toBe('96px');
        expect(surface().style.height).toBe('40px');
        expect(surface().style.borderRadius).toBe('20px');
    });

    it('springs to the size of the next step', async () => {
        current = 'idle';
        const { rerender } = render(<Morphing step="idle" />);

        current = 'menu';
        rerender(<Morphing step="menu" />);

        expect(surface().style.width).toBe('96px');
        await waitFor(
            () => {
                expect(surface().style.width).toBe('240px');
                expect(surface().style.borderRadius).toBe('24px');
            },
            { timeout: 1500 },
        );
    });

    it('follows content that grows after the step opened', async () => {
        current = 'menu';
        render(<Morphing step="menu" />);

        sizes.menu = { width: 240, height: 260 };
        resize(screen.getByTestId('content'));

        await waitFor(() => expect(surface().style.height).toBe('260px'), {
            timeout: 1500,
        });
    });
});
