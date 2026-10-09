// @vitest-environment jsdom

import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isWeekend } from 'date-fns';
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

function today(date: Date): void {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(date);
}

describe('the DateTimePicker bounds', () => {
    it('keeps a picked day at or after the minimum time on that day', async () => {
        today(new Date(2024, 5, 15, 10, 0));

        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <DateTimePicker
                hourCycle={24}
                minDate={new Date(2024, 5, 15, 14, 30)}
                onChange={onChange}
            />,
        );

        await user.click(trigger());
        await user.click(day(new Date(2024, 5, 15)));

        expect(onChange).toHaveBeenLastCalledWith(
            new Date(2024, 5, 15, 14, 30),
        );
        expect(hour('09').getAttribute('aria-disabled')).toBe('true');
    });

    it('disables the hours after the maximum time on its day', async () => {
        const user = userEvent.setup();

        render(
            <DateTimePicker
                hourCycle={24}
                defaultValue={new Date(2024, 5, 15, 10, 0)}
                maxDate={new Date(2024, 5, 15, 12, 0)}
            />,
        );

        await user.click(trigger());

        expect(hour('18').getAttribute('aria-disabled')).toBe('true');
        expect(hour('11').hasAttribute('aria-disabled')).toBe(false);
    });

    it('puts an hour picked before any day on the first allowed day', async () => {
        today(new Date(2024, 5, 10, 8, 0));

        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <DateTimePicker
                hourCycle={24}
                minDate={new Date(2024, 5, 20)}
                onChange={onChange}
            />,
        );

        await user.click(trigger());
        await user.click(hour('09'));

        expect(onChange).toHaveBeenLastCalledWith(new Date(2024, 5, 20, 9, 0));
    });

    it('waits for a day when today is a disabled day', async () => {
        today(new Date(2024, 5, 15, 8, 0));

        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <DateTimePicker
                hourCycle={24}
                disabledDays={isWeekend}
                onChange={onChange}
            />,
        );

        await user.click(trigger());
        await user.click(hour('09'));

        expect(onChange).not.toHaveBeenCalled();
    });

    it('drops the seconds it does not show', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <DateTimePicker
                hourCycle={24}
                defaultValue={new Date(2024, 5, 15, 10, 30, 45)}
                onChange={onChange}
            />,
        );

        await user.click(trigger());
        await user.click(hour('14'));

        expect(onChange).toHaveBeenLastCalledWith(
            new Date(2024, 5, 15, 14, 30, 0),
        );
    });

    it('submits the seconds when it shows them', () => {
        render(
            <form data-testid="form">
                <DateTimePicker
                    withSeconds
                    name="starts_at"
                    defaultValue={new Date(2024, 5, 15, 9, 5, 7)}
                />
            </form>,
        );

        const form = screen.getByTestId('form') as HTMLFormElement;

        expect(new FormData(form).get('starts_at')).toBe('2024-06-15T09:05:07');
    });
    it('rounds a minimum with seconds up to the next whole minute', async () => {
        today(new Date(2024, 5, 15, 10, 0));

        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <DateTimePicker
                hourCycle={24}
                minDate={new Date(2024, 5, 15, 14, 30, 20)}
                onChange={onChange}
            />,
        );

        await user.click(trigger());
        await user.click(day(new Date(2024, 5, 15)));

        expect(onChange).toHaveBeenLastCalledWith(
            new Date(2024, 5, 15, 14, 31, 0),
        );
    });
});
