// @vitest-environment jsdom

import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TimeColumns } from '@/components/ui/time-columns';
import { timePickerDefaultLabels } from '@/components/ui/time-picker-labels';
import { resolveBounds, type TimeOfDay } from '@/lib/time-value';

afterEach(cleanup);

function column(name: string): HTMLElement {
    return screen.getByRole('listbox', { name });
}

function renderColumns(
    overrides: Partial<React.ComponentProps<typeof TimeColumns>> = {},
) {
    const onSelect = vi.fn<(next: TimeOfDay) => void>();

    render(
        <TimeColumns
            value={undefined}
            onSelect={onSelect}
            hourCycle={24}
            withSeconds={false}
            minuteStep={1}
            bounds={{}}
            labels={timePickerDefaultLabels}
            {...overrides}
        />,
    );

    return onSelect;
}

describe('TimeColumns', () => {
    it('lists the hours and the minutes the step lands on', () => {
        renderColumns({ minuteStep: 15 });

        expect(within(column('Hours')).getAllByRole('option')).toHaveLength(24);
        expect(
            within(column('Minutes'))
                .getAllByRole('option')
                .map((option) => option.textContent),
        ).toEqual(['00', '15', '30', '45']);
        expect(screen.queryByRole('listbox', { name: 'Seconds' })).toBeNull();
    });

    it('marks the selected value', () => {
        renderColumns({ value: { hour: 14, minute: 30, second: 0 } });

        expect(
            within(column('Hours'))
                .getByRole('option', { name: '14' })
                .getAttribute('aria-selected'),
        ).toBe('true');
    });

    it('fills the units nobody picked yet when one is picked', async () => {
        const user = userEvent.setup();
        const onSelect = renderColumns();

        await user.click(
            within(column('Hours')).getByRole('option', { name: '09' }),
        );

        expect(onSelect).toHaveBeenCalledWith({
            hour: 9,
            minute: 0,
            second: 0,
        });
    });

    it('disables the hours outside the bounds and ignores a click on one', async () => {
        const user = userEvent.setup();
        const onSelect = renderColumns({
            bounds: resolveBounds('09:00', '17:00'),
        });
        const early = within(column('Hours')).getByRole('option', {
            name: '08',
        });

        expect(early.getAttribute('aria-disabled')).toBe('true');
        expect(
            within(column('Hours'))
                .getByRole('option', { name: '09' })
                .hasAttribute('aria-disabled'),
        ).toBe(false);

        await user.click(early);

        expect(onSelect).not.toHaveBeenCalled();
    });

    it('adds a period column on the twelve-hour clock and flips the half of the day', async () => {
        const user = userEvent.setup();
        const onSelect = renderColumns({
            hourCycle: 12,
            value: { hour: 9, minute: 15, second: 0 },
        });

        await user.click(
            within(column('AM/PM')).getByRole('option', { name: 'PM' }),
        );

        expect(onSelect).toHaveBeenCalledWith({
            hour: 21,
            minute: 15,
            second: 0,
        });
    });

    it('moves between options with the arrow keys', async () => {
        const user = userEvent.setup();

        renderColumns({ value: { hour: 14, minute: 30, second: 0 } });

        within(column('Hours')).getByRole('option', { name: '14' }).focus();
        await user.keyboard('{ArrowDown}');

        expect(document.activeElement?.textContent).toBe('15');
    });
    it('anchors a column on the nearest option when the value is off the step', () => {
        renderColumns({
            value: { hour: 23, minute: 59, second: 0 },
            minuteStep: 5,
        });

        const anchored = column('Minutes').querySelector(
            '[data-anchor="true"]',
        );

        expect(anchored?.textContent).toBe('55');
        expect(anchored?.getAttribute('tabindex')).toBe('0');
    });
});
