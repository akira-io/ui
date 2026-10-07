// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useCollapsedGroup } from '@/hooks/use-collapsed-groups';

afterEach(cleanup);

function Toggle({ defaultOpen }: { defaultOpen: boolean }) {
    const { open, setOpen } = useCollapsedGroup({
        group: 'Reports',
        defaultOpen,
    });

    return (
        <button type="button" onClick={() => setOpen(!open)}>
            {open ? 'open' : 'closed'}
        </button>
    );
}

function withBlockedStorage(run: () => void): void {
    const own = Object.getOwnPropertyDescriptor(window, 'localStorage');

    Object.defineProperty(window, 'localStorage', {
        configurable: true,
        get() {
            throw new DOMException('denied', 'SecurityError');
        },
    });

    try {
        run();
    } finally {
        if (own) {
            Object.defineProperty(window, 'localStorage', own);
        } else {
            Reflect.deleteProperty(window, 'localStorage');
        }
    }
}

describe('a group whose storage refuses access', () => {
    it('follows defaultOpen and still toggles for the session', () => {
        withBlockedStorage(() => {
            render(<Toggle defaultOpen={false} />);

            expect(screen.getByRole('button').textContent).toBe('closed');

            fireEvent.click(screen.getByRole('button'));

            expect(screen.getByRole('button').textContent).toBe('open');

            fireEvent.click(screen.getByRole('button'));

            expect(screen.getByRole('button').textContent).toBe('closed');
        });
    });
});
