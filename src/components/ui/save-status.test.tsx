// @vitest-environment jsdom

import { act, cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { SaveStatus, saveStatusLabels } from './save-status';

afterEach(cleanup);

function line(): HTMLElement {
    const element = document.querySelector<HTMLElement>(
        '[data-slot="save-status"]',
    );

    if (!element) {
        throw new Error('the save status line never rendered');
    }

    return element;
}

describe('SaveStatus', () => {
    it('says nothing at rest, and carries the resting message when asked to', () => {
        const { rerender } = render(<SaveStatus status="idle" />);

        expect(line().textContent).toBe('');

        rerender(<SaveStatus status="idle" showIdle />);

        expect(line().textContent).toBe(saveStatusLabels.idle);
    });

    it('spins while saving', () => {
        render(<SaveStatus status="saving" />);

        expect(line().textContent).toContain(saveStatusLabels.saving);
        expect(line().querySelector('[data-slot="spinner"]')).not.toBeNull();
    });

    it('confirms once saved', () => {
        render(<SaveStatus status="saved" />);

        expect(
            line().querySelector('[data-slot="save-status-saved"]')
                ?.textContent,
        ).toBe(saveStatusLabels.saved);
    });

    it('warns on error, with the message the server returned', () => {
        const { rerender } = render(<SaveStatus status="error" />);

        expect(line().textContent).toBe(saveStatusLabels.error);

        rerender(
            <SaveStatus status="error" message="Seats must be a number" />,
        );

        expect(line().textContent).toBe('Seats must be a number');
    });

    it('announces itself politely, without stealing focus', () => {
        render(<SaveStatus status="saving" />);

        expect(line().getAttribute('aria-live')).toBe('polite');
        expect(line().getAttribute('data-slot')).toBe('save-status');
        expect(line().getAttribute('data-state')).toBe('saving');
    });

    it('fades the confirmation out after the configured interval', () => {
        vi.useFakeTimers();

        try {
            render(<SaveStatus status="saved" savedDuration={1500} />);

            expect(line().className).toContain('opacity-100');

            act(() => {
                vi.advanceTimersByTime(1500);
            });

            expect(line().className).toContain('opacity-0');
            expect(line().getAttribute('data-faded')).toBe('true');
        } finally {
            vi.useRealTimers();
        }
    });

    it('clears the fade timer on unmount', () => {
        vi.useFakeTimers();

        try {
            const { unmount } = render(<SaveStatus status="saved" />);
            const pending = vi.getTimerCount();

            unmount();

            expect(pending).toBe(1);
            expect(vi.getTimerCount()).toBe(0);
        } finally {
            vi.useRealTimers();
        }
    });

    it('takes translated labels', () => {
        render(<SaveStatus status="saving" labels={{ saving: 'A guardar' }} />);

        expect(line().textContent).toContain('A guardar');
    });
});
