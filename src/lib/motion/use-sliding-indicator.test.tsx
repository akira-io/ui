// @vitest-environment jsdom

import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { useRef } from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { useSlidingIndicator } from '@/lib/motion/use-sliding-indicator';
import {
    installResizeObserver,
    resize,
} from '../../../tests/fixtures/resize-observer';

const boxes: Record<string, { left: number; width: number }> = {
    one: { left: 300, width: 80 },
    two: { left: 500, width: 120 },
    three: { left: 700, width: 60 },
};

function stub(
    name: 'offsetLeft' | 'offsetWidth' | 'offsetTop' | 'offsetHeight',
    read: (el: HTMLElement) => number,
) {
    Object.defineProperty(HTMLElement.prototype, name, {
        configurable: true,
        get() {
            return read(this as HTMLElement);
        },
    });
}

beforeAll(() => {
    installResizeObserver();
    MotionGlobalConfig.skipAnimations = false;
    stub('offsetLeft', (el) => boxes[el.dataset.key ?? '']?.left ?? 0);
    stub('offsetWidth', (el) => boxes[el.dataset.key ?? '']?.width ?? 0);
    stub('offsetTop', () => 4);
    stub('offsetHeight', (el) => (el.dataset.key ? 32 : 0));
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
});

afterEach(() => {
    cleanup();
    boxes.one = { left: 300, width: 80 };
});

function List({ active }: { active: string | null }) {
    const list = useRef<HTMLDivElement>(null);
    const pill = useRef<HTMLSpanElement>(null);

    useSlidingIndicator(list, pill, '[data-state="active"]');

    return (
        <div ref={list} data-testid="list">
            <span ref={pill} data-testid="pill" />
            {['one', 'two', 'three'].map((key) => (
                <button
                    key={key}
                    data-key={key}
                    data-state={key === active ? 'active' : 'inactive'}
                >
                    {key}
                </button>
            ))}
        </div>
    );
}

const pill = () => screen.getByTestId('pill');
const shift = () =>
    Number(/translateX\((-?[\d.]+)px\)/.exec(pill().style.transform)?.[1] ?? 0);

describe('useSlidingIndicator', () => {
    it('sits on the active item from the first render', () => {
        render(<List active="one" />);

        expect(shift()).toBe(300);
        expect(pill().style.width).toBe('80px');
        expect(pill().style.opacity).toBe('1');
    });

    it('slides to a new active item without passing through zero', async () => {
        const { rerender } = render(<List active="one" />);

        rerender(<List active="two" />);

        const trail: number[] = [];

        for (let frame = 0; frame < 6; frame++) {
            await new Promise((resolve) => requestAnimationFrame(resolve));
            trail.push(shift());
        }

        expect(Math.min(...trail)).toBeGreaterThanOrEqual(299);
        await waitFor(() => expect(shift()).toBe(500), { timeout: 1500 });
        expect(pill().style.width).toBe('120px');
    });

    it('ends on the last of two quick changes', async () => {
        const { rerender } = render(<List active="one" />);

        rerender(<List active="two" />);
        rerender(<List active="three" />);

        await waitFor(() => expect(shift()).toBe(700), { timeout: 1500 });
    });

    it('fades without an active item and reappears in place', async () => {
        const { rerender } = render(<List active="one" />);

        rerender(<List active={null} />);
        await waitFor(() => expect(pill().style.opacity).toBe('0'), {
            timeout: 1500,
        });

        rerender(<List active="three" />);

        await waitFor(() => expect(pill().style.opacity).toBe('1'));
        expect(shift()).toBe(700);
    });

    it('follows the active item when the list resizes', async () => {
        render(<List active="one" />);

        boxes.one = { left: 320, width: 90 };
        act(() => resize(screen.getByTestId('list')));

        await waitFor(() => expect(shift()).toBe(320), { timeout: 1500 });
    });
});
