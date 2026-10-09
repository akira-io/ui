// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useRef, type ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { offscreenDistance } from '@/lib/motion/side';
import {
    shouldDismiss,
    swipeOffset,
    useSwipeToDismiss,
} from '@/lib/motion/use-swipe-to-dismiss';

const original = HTMLElement.prototype.getBoundingClientRect;

beforeEach(() => {
    vi.useFakeTimers({ toFake: ['performance'] });
    HTMLElement.prototype.getBoundingClientRect = function () {
        return this.dataset.testid === 'sheet'
            ? ({
                  left: 700,
                  top: 0,
                  right: 1000,
                  bottom: 800,
                  width: 300,
                  height: 800,
              } as DOMRect)
            : original.call(this);
    };
});

afterEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    vi.useRealTimers();
    HTMLElement.prototype.getBoundingClientRect = original;
    cleanup();
});

function Swipeable({
    onDismiss,
    dismissible = true,
    children,
}: {
    onDismiss: () => void;
    dismissible?: boolean;
    children?: ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useSwipeToDismiss(ref, { side: 'right', onDismiss, dismissible });

    return (
        <div ref={ref} data-testid="sheet">
            {children}
        </div>
    );
}

function drag(target: Element, steps: number[], { dy = 0, ms = 16 } = {}) {
    fireEvent.pointerDown(target, {
        pointerId: 1,
        button: 0,
        clientX: 100,
        clientY: 100,
    });
    steps.forEach((dx) => {
        vi.advanceTimersByTime(ms);
        fireEvent.pointerMove(target, {
            pointerId: 1,
            clientX: 100 + dx,
            clientY: 100 + dy,
        });
    });
    fireEvent.pointerUp(target, {
        pointerId: 1,
        clientX: 100 + (steps.at(-1) ?? 0),
        clientY: 100 + dy,
    });
}

describe('swipe to dismiss', () => {
    it('closes past a third of the sheet', () => {
        const onDismiss = vi.fn();
        render(<Swipeable onDismiss={onDismiss} />);

        drag(screen.getByTestId('sheet'), [20, 60, 120], { ms: 200 });

        expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('closes on a fast flick shorter than a third', () => {
        const onDismiss = vi.fn();
        render(<Swipeable onDismiss={onDismiss} />);

        drag(screen.getByTestId('sheet'), [10, 30, 60], { ms: 10 });

        expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('springs back from a slow short drag', () => {
        const onDismiss = vi.fn();
        render(<Swipeable onDismiss={onDismiss} />);

        drag(screen.getByTestId('sheet'), [10, 30, 60], { ms: 200 });

        expect(onDismiss).not.toHaveBeenCalled();
    });

    it('ignores a drag along the other axis', () => {
        const onDismiss = vi.fn();
        render(<Swipeable onDismiss={onDismiss} />);

        drag(screen.getByTestId('sheet'), [2, 4, 200], { dy: 300, ms: 10 });

        expect(onDismiss).not.toHaveBeenCalled();
    });

    it('never starts on a text field', () => {
        const onDismiss = vi.fn();
        render(
            <Swipeable onDismiss={onDismiss}>
                <input aria-label="Name" />
            </Swipeable>,
        );

        drag(screen.getByLabelText('Name'), [50, 150, 250], { ms: 10 });

        expect(onDismiss).not.toHaveBeenCalled();
    });

    it('yields to content that can still scroll towards the close side', () => {
        const onDismiss = vi.fn();
        render(
            <Swipeable onDismiss={onDismiss}>
                <div data-testid="rail" style={{ overflowX: 'auto' }}>
                    Rail
                </div>
            </Swipeable>,
        );
        const rail = screen.getByTestId('rail');
        Object.defineProperty(rail, 'scrollLeft', { value: 40 });

        drag(rail, [50, 150, 250], { ms: 10 });

        expect(onDismiss).not.toHaveBeenCalled();
    });

    it('lets a plain click through and swallows the click that ends a drag', () => {
        const onClick = vi.fn();
        render(
            <Swipeable onDismiss={() => {}} dismissible={false}>
                <button onClick={onClick}>Save</button>
            </Swipeable>,
        );
        const save = screen.getByText('Save');

        fireEvent.click(save);
        drag(save, [20, 60, 120], { ms: 200 });
        fireEvent.click(save);

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('never closes a persistent sheet', () => {
        const onDismiss = vi.fn();
        render(<Swipeable onDismiss={onDismiss} dismissible={false} />);

        drag(screen.getByTestId('sheet'), [50, 150, 250], { ms: 10 });

        expect(onDismiss).not.toHaveBeenCalled();
    });
});

describe('swipe maths', () => {
    it('follows the finger towards the close side and resists the other way', () => {
        expect(swipeOffset(100, 1, true)).toBe(100);
        expect(swipeOffset(-100, 1, true)).toBe(-20);
        expect(swipeOffset(100, 1, false)).toBe(20);
    });

    it('decides by distance or velocity', () => {
        expect(
            shouldDismiss({ offset: 101, velocity: 0, size: 300, sign: 1 }),
        ).toBe(true);
        expect(
            shouldDismiss({ offset: 40, velocity: 600, size: 300, sign: 1 }),
        ).toBe(true);
        expect(
            shouldDismiss({ offset: 40, velocity: 100, size: 300, sign: 1 }),
        ).toBe(false);
        expect(
            shouldDismiss({ offset: -120, velocity: -600, size: 300, sign: 1 }),
        ).toBe(false);
    });

    it('measures how far each side is from leaving the screen', () => {
        const rect = {
            left: 700,
            top: 500,
            right: 1000,
            bottom: 800,
        } as DOMRect;
        const viewport = { width: 1000, height: 800 };

        expect(offscreenDistance(rect, 'right', viewport)).toBe(300);
        expect(offscreenDistance(rect, 'left', viewport)).toBe(-1000);
        expect(offscreenDistance(rect, 'bottom', viewport)).toBe(300);
        expect(offscreenDistance(rect, 'top', viewport)).toBe(-800);
    });
});
