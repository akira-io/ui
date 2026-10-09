// @vitest-environment jsdom

import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ActionMorph, ActionMorphAction } from '@/components/ui/action-morph';

afterEach(cleanup);

function Morph({
    onNote = () => {},
    onPin = () => {},
}: {
    onNote?: () => void | Promise<void>;
    onPin?: () => void | Promise<void>;
}) {
    return (
        <>
            <ActionMorph label="New" icon={<span>+</span>}>
                <ActionMorphAction
                    id="note"
                    label="Quick note"
                    onSelect={onNote}
                />
                <ActionMorphAction id="pin" label="Pin page" onSelect={onPin} />
            </ActionMorph>
            <button>Elsewhere</button>
        </>
    );
}

const trigger = () => screen.getByRole('button', { name: 'New' });

describe('ActionMorph', () => {
    it('opens a menu of its actions with focus on the first one', async () => {
        const user = userEvent.setup();
        render(<Morph />);

        await user.click(trigger());

        expect(screen.getByRole('menu')).toBeTruthy();
        expect(document.activeElement?.textContent).toContain('Quick note');
        expect(trigger().getAttribute('aria-expanded')).toBe('true');
    });

    it('moves through the menu with the arrows, home and end', async () => {
        const user = userEvent.setup();
        render(<Morph />);

        await user.click(trigger());
        await user.keyboard('{ArrowDown}');
        expect(document.activeElement?.textContent).toContain('Pin page');
        await user.keyboard('{ArrowDown}');
        expect(document.activeElement?.textContent).toContain('Quick note');
        await user.keyboard('{End}');
        expect(document.activeElement?.textContent).toContain('Pin page');
        await user.keyboard('{Home}');
        expect(document.activeElement?.textContent).toContain('Quick note');
    });

    it('runs a direct action and shows the check, then the button again', async () => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        const onNote = vi.fn();
        render(<Morph onNote={onNote} />);

        await user.click(trigger());
        await user.click(screen.getByRole('menuitem', { name: 'Quick note' }));

        expect(onNote).toHaveBeenCalledTimes(1);
        await waitFor(() =>
            expect(screen.getByRole('status').textContent).toBe('Done'),
        );
        await act(async () => {});

        await act(async () => {
            vi.advanceTimersByTime(1300);
        });

        expect(screen.getByRole('status').textContent).toBe('');
        expect(trigger().getAttribute('aria-expanded')).toBe('false');
        vi.useRealTimers();
    });

    it('waits on a pending action and keeps the menu open when it fails', async () => {
        const user = userEvent.setup();
        let reject = () => {};
        const onNote = () =>
            new Promise<void>((_, fail) => {
                reject = () => fail(new Error('offline'));
            });
        render(<Morph onNote={onNote} />);

        await user.click(trigger());
        await user.click(screen.getByRole('menuitem', { name: 'Quick note' }));

        expect(
            screen
                .getByRole('menuitem', { name: 'Pin page' })
                .getAttribute('aria-disabled'),
        ).toBe('true');

        await user.click(screen.getByText('Elsewhere'));
        expect(screen.getByRole('menu')).toBeTruthy();

        await act(async () => reject());

        await waitFor(() =>
            expect(
                screen
                    .getByRole('menuitem', { name: 'Pin page' })
                    .getAttribute('aria-disabled'),
            ).toBe('false'),
        );
        expect(screen.getByRole('status').textContent).toBe('');
    });

    it('collapses on escape and outside click and hands focus back', async () => {
        const user = userEvent.setup();
        render(<Morph />);

        await user.click(trigger());
        await user.keyboard('{Escape}');
        expect(screen.queryByRole('menu')).toBeNull();
        expect(document.activeElement).toBe(trigger());

        await user.click(trigger());
        await user.click(screen.getByText('Elsewhere'));
        expect(screen.queryByRole('menu')).toBeNull();
    });

    it('forgets the check timer when it unmounts', async () => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        const { unmount } = render(<Morph />);

        await user.click(trigger());
        await user.click(screen.getByRole('menuitem', { name: 'Quick note' }));
        await waitFor(() =>
            expect(screen.getByRole('status').textContent).toBe('Done'),
        );
        await act(async () => {});
        const pending = vi.getTimerCount();
        unmount();

        expect(pending).toBeGreaterThan(0);
        expect(vi.getTimerCount()).toBeLessThan(pending);
        vi.useRealTimers();
    });
});
