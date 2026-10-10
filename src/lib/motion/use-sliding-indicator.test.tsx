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
const restore: [string, PropertyDescriptor | undefined][] = [];
const originalRect = HTMLElement.prototype.getBoundingClientRect;

function define(name: string, read: (el: HTMLElement) => unknown) {
    restore.push([
        name,
        Object.getOwnPropertyDescriptor(HTMLElement.prototype, name),
    ]);
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
    define('offsetLeft', (el) =>
        el.dataset.wrapper
            ? 20
            : el.dataset.testid === 'list'
              ? el.dataset.static
                  ? 50
                  : 0
              : el.dataset.key
                ? (boxes[el.dataset.key]?.left ?? 0) +
                  (el.closest('[data-static]') ? 50 : 0)
                : 0,
    );
    define('offsetTop', (el) => (el.dataset.key ? 4 : 0));
    define('offsetWidth', (el) => boxes[el.dataset.key ?? '']?.width ?? 0);
    define('offsetHeight', (el) => (el.dataset.key ? 32 : 0));
    define('offsetParent', (el) => {
        if (el.dataset.key && el.parentElement?.dataset.wrapper) {
            return el.parentElement;
        }

        const list = el.closest<HTMLElement>('[data-testid="list"]');

        return list && list !== el && !list.dataset.static ? list : null;
    });
    HTMLElement.prototype.getBoundingClientRect = function () {
        return { left: 9999, top: 9999, width: 1, height: 1 } as DOMRect;
    };
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
    HTMLElement.prototype.getBoundingClientRect = originalRect;
    for (const [name, descriptor] of restore) {
        if (descriptor) {
            Object.defineProperty(HTMLElement.prototype, name, descriptor);
        }
    }
});

afterEach(() => {
    cleanup();
    boxes.one = { left: 300, width: 80 };
});

function List({
    active,
    wrapped = false,
    isStatic = false,
}: {
    active: string | null;
    wrapped?: boolean;
    isStatic?: boolean;
}) {
    const list = useRef<HTMLDivElement>(null);
    const pill = useRef<HTMLSpanElement>(null);

    useSlidingIndicator(list, pill, '[data-state="active"]');

    return (
        <div
            ref={list}
            data-testid="list"
            data-static={isStatic ? 'true' : undefined}
        >
            <span ref={pill} data-testid="pill" />
            {['one', 'two', 'three'].map((key) => {
                const item = (
                    <button
                        key={key}
                        data-key={key}
                        data-state={key === active ? 'active' : 'inactive'}
                    >
                        {key}
                    </button>
                );

                return wrapped ? (
                    <div key={key} data-wrapper="true">
                        {item}
                    </div>
                ) : (
                    item
                );
            })}
        </div>
    );
}

const pill = () => screen.getByTestId('pill');
const shift = () =>
    Number(/translateX\((-?[\d.]+)px\)/.exec(pill().style.transform)?.[1] ?? 0);

describe('useSlidingIndicator', () => {
    it('sits on the active item from the first render, measured by layout and not by transformed boxes', () => {
        render(<List active="one" />);

        expect(shift()).toBe(300);
        expect(pill().style.width).toBe('80px');
        expect(pill().style.opacity).toBe('1');
    });

    it('adds the offsets of positioned wrappers between the item and the list', () => {
        render(<List active="one" wrapped />);

        expect(shift()).toBe(320);
    });

    it('measures against the list even when the list is not the offset parent', () => {
        render(<List active="one" isStatic />);

        expect(shift()).toBe(300);
    });

    it('slides to a new active item through the space between them', async () => {
        const { rerender } = render(<List active="one" />);

        rerender(<List active="two" />);

        const trail: number[] = [];

        for (let frame = 0; frame < 10; frame++) {
            await new Promise((resolve) => requestAnimationFrame(resolve));
            trail.push(shift());
        }

        expect(Math.min(...trail)).toBeGreaterThanOrEqual(299);
        expect(trail.some((value) => value > 300 && value < 500)).toBe(true);
        await waitFor(() => expect(shift()).toBe(500), { timeout: 1500 });
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

    it('snaps to the active item when the list resizes', () => {
        render(<List active="one" />);

        boxes.one = { left: 320, width: 90 };
        act(() => resize(screen.getByTestId('list')));

        expect(shift()).toBe(320);
    });
});
