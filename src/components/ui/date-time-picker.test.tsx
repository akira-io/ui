// @vitest-environment jsdom

import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { DateTimePicker } from '@/components/ui/date-time-picker';

afterEach(() => {
    cleanup();
    vi.useRealTimers();
});

function trigger(): HTMLElement {
    const button = document.querySelector<HTMLElement>(
        '[data-slot="date-time-picker-trigger"]',
    );

    if (!button) {
        throw new Error('the date time picker rendered no trigger');
    }

    return button;
}

function day(date: Date): HTMLElement {
    const cell = document.querySelector<HTMLElement>(
        `[data-day="${date.toLocaleDateString()}"]`,
    );

    if (!cell) {
        throw new Error(`no day button for ${date.toDateString()}`);
    }

    return cell;
}

function hour(name: string): HTMLElement {
    return within(screen.getByRole('listbox', { name: 'Hours' })).getByRole(
        'option',
        { name },
    );
}

describe('DateTimePicker', () => {
    it('builds the date from a day and then an hour', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <DateTimePicker
                hourCycle={24}
                defaultValue={new Date(2024, 5, 10, 8, 0)}
                onChange={onChange}
            />,
        );

        await user.click(trigger());
        await user.click(day(new Date(2024, 5, 15)));

        expect(onChange).toHaveBeenLastCalledWith(new Date(2024, 5, 15, 8, 0));

        await user.click(hour('14'));

        expect(onChange).toHaveBeenLastCalledWith(new Date(2024, 5, 15, 14, 0));
    });

    it('keeps the popover open after a day is picked', async () => {
        const user = userEvent.setup();

        render(
            <DateTimePicker
                hourCycle={24}
                defaultValue={new Date(2024, 5, 10, 8, 0)}
            />,
        );

        await user.click(trigger());
        await user.click(day(new Date(2024, 5, 15)));

        expect(screen.getByRole('listbox', { name: 'Hours' })).toBeTruthy();
    });

    it('puts an hour picked before any day on today', async () => {
        vi.useFakeTimers({ toFake: ['Date'] });
        vi.setSystemTime(new Date(2024, 5, 20, 11, 0));

        const onChange = vi.fn();
        const user = userEvent.setup();

        render(<DateTimePicker hourCycle={24} onChange={onChange} />);

        await user.click(trigger());
        await user.click(hour('09'));

        expect(onChange).toHaveBeenLastCalledWith(new Date(2024, 5, 20, 9, 0));
    });

    it('disables the days outside the bounds', async () => {
        const user = userEvent.setup();

        render(
            <DateTimePicker
                hourCycle={24}
                defaultValue={new Date(2024, 5, 15, 9, 0)}
                minDate={new Date(2024, 5, 10)}
                maxDate={new Date(2024, 5, 20)}
            />,
        );

        await user.click(trigger());

        expect(day(new Date(2024, 5, 9)).hasAttribute('disabled')).toBe(true);
    });

    it('clears through the clear control', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <DateTimePicker
                hourCycle={24}
                defaultValue={new Date(2024, 5, 15, 9, 0)}
                onChange={onChange}
            />,
        );

        await user.click(
            screen.getByRole('button', { name: 'Clear date and time' }),
        );

        expect(onChange).toHaveBeenLastCalledWith(undefined);
    });

    it('submits a local ISO date and time under its name', () => {
        render(
            <form data-testid="form">
                <DateTimePicker
                    name="starts_at"
                    defaultValue={new Date(2024, 5, 15, 9, 5)}
                />
            </form>,
        );

        const form = screen.getByTestId('form') as HTMLFormElement;

        expect(new FormData(form).get('starts_at')).toBe('2024-06-15T09:05');
    });

    it('shows the time on the trigger in the hour cycle it uses', () => {
        render(
            <DateTimePicker
                hourCycle={12}
                defaultValue={new Date(2024, 5, 15, 21, 5)}
            />,
        );

        expect(trigger().textContent).toContain('9:05 PM');
    });

    it('follows a controlled value', () => {
        const { rerender } = render(
            <DateTimePicker
                hourCycle={24}
                value={new Date(2024, 5, 15, 9, 5)}
                onChange={vi.fn()}
            />,
        );

        rerender(
            <DateTimePicker
                hourCycle={24}
                value={new Date(2024, 5, 16, 18, 30)}
                onChange={vi.fn()}
            />,
        );

        expect(trigger().textContent).toContain('18:30');
    });
});
