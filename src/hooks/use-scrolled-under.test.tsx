// @vitest-environment jsdom

import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useScrolledUnder } from '@/hooks/use-scrolled-under';

afterEach(cleanup);

function Bar() {
    const [ref, scrolled] = useScrolledUnder<HTMLElement>();

    return (
        <header ref={ref} data-testid="bar">
            {scrolled ? 'scrolled' : 'at top'}
        </header>
    );
}

function scroll(target: HTMLElement | Window, top: number) {
    act(() => {
        if (target instanceof HTMLElement) {
            target.scrollTop = top;
        } else {
            Object.defineProperty(window, 'scrollY', {
                value: top,
                configurable: true,
            });
        }

        target.dispatchEvent(new Event('scroll'));
    });
}

describe('useScrolledUnder', () => {
    it('reports when the scroll container it sits in leaves the top', () => {
        render(
            <div data-testid="pane" style={{ overflowY: 'auto' }}>
                <Bar />
            </div>,
        );
        const pane = screen.getByTestId('pane');

        expect(screen.getByTestId('bar').textContent).toBe('at top');

        scroll(pane, 40);
        expect(screen.getByTestId('bar').textContent).toBe('scrolled');

        scroll(pane, 0);
        expect(screen.getByTestId('bar').textContent).toBe('at top');
    });

    it('follows the window when no ancestor scrolls', () => {
        render(<Bar />);

        scroll(window, 40);
        expect(screen.getByTestId('bar').textContent).toBe('scrolled');

        scroll(window, 0);
    });
});
