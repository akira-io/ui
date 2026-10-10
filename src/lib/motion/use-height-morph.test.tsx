// @vitest-environment jsdom

import { act, cleanup, render, waitFor } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import * as React from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { useHeightMorph } from '@/lib/motion/use-height-morph';

const heights = { loading: 40, loaded: 120 };
const originalRect = HTMLElement.prototype.getBoundingClientRect;

beforeAll(() => {
    HTMLElement.prototype.getBoundingClientRect = function () {
        const height =
            this.dataset.state === 'loading' ? heights.loading : heights.loaded;

        return {
            height,
            width: 200,
            top: 0,
            left: 0,
            right: 200,
            bottom: height,
        } as DOMRect;
    };
});

afterAll(() => {
    HTMLElement.prototype.getBoundingClientRect = originalRect;
    MotionGlobalConfig.skipAnimations = true;
});

afterEach(cleanup);

function Card({ loading }: { loading: boolean }) {
    const ref = React.useRef<HTMLDivElement>(null);

    useHeightMorph(ref, loading);

    return (
        <div
            ref={ref}
            data-testid="card"
            data-state={loading ? 'loading' : 'loaded'}
        />
    );
}

const card = () =>
    document.querySelector<HTMLElement>('[data-testid="card"]') as HTMLElement;

describe('useHeightMorph', () => {
    it('leaves the height alone on mount', () => {
        render(<Card loading={false} />);

        expect(card().style.height).toBe('');
    });

    it('starts from the loading height when the content arrives', async () => {
        MotionGlobalConfig.skipAnimations = false;

        const { rerender } = render(<Card loading />);

        rerender(<Card loading={false} />);
        await act(
            () => new Promise<void>((resolve) => setTimeout(resolve, 20)),
        );

        const height = parseFloat(card().style.height);

        expect(height).toBeGreaterThanOrEqual(heights.loading);
        expect(height).toBeLessThan(heights.loaded);
        MotionGlobalConfig.skipAnimations = true;
    });

    it('hands the height back to the content when it lands', async () => {
        const { rerender } = render(<Card loading />);

        rerender(<Card loading={false} />);

        await waitFor(() => {
            expect(card().style.overflow).toBe('');
            expect(card().style.height).toBe('');
        });
    });

    it('releases a fixed height when loading comes back', () => {
        const { rerender } = render(<Card loading />);

        rerender(<Card loading={false} />);
        rerender(<Card loading />);

        expect(card().style.height).toBe('');
    });
});
