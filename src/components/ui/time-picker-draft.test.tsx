// @vitest-environment jsdom

import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TimePicker } from '@/components/ui/time-picker';

afterEach(cleanup);

function segment(name: string): HTMLElement {
    return screen.getByRole('spinbutton', { name });
}

describe('the TimePicker draft and focus', () => {
    it('puts back the stored time when the field is left half cleared', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <>
                <TimePicker
                    hourCycle={24}
                    defaultValue="09:15"
                    onChange={onChange}
                />
                <button type="button">Elsewhere</button>
            </>,
        );

        await user.click(segment('Hours'));
        await user.keyboard('{Backspace}');
        await user.click(screen.getByRole('button', { name: 'Elsewhere' }));

        expect(segment('Hours').textContent).toBe('09');
        expect(onChange).not.toHaveBeenCalled();
    });

    it('clears a twelve-hour field without the period having to be cleared too', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(<TimePicker defaultValue="21:30" onChange={onChange} />);

        await user.click(segment('Hours'));
        await user.keyboard('{Backspace}{ArrowRight}{Backspace}');

        expect(onChange).toHaveBeenLastCalledWith(undefined);
    });

    it('keeps the typed hour when a minute is picked from the columns', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(<TimePicker hourCycle={24} onChange={onChange} />);

        await user.click(segment('Hours'));
        await user.keyboard('14');
        await user.keyboard('{Alt>}{ArrowDown}{/Alt}');
        await user.click(
            within(screen.getByRole('listbox', { name: 'Minutes' })).getByRole(
                'option',
                { name: '30' },
            ),
        );

        expect(onChange).toHaveBeenLastCalledWith('14:30');
    });

    it('returns focus to the hour segment when Escape closes the columns', async () => {
        const user = userEvent.setup();

        render(<TimePicker hourCycle={24} />);

        await user.click(segment('Minutes'));
        await user.keyboard('{Alt>}{ArrowDown}{/Alt}');
        await user.keyboard('{Escape}');

        expect(screen.queryByRole('listbox')).toBeNull();
        expect(document.activeElement).toBe(segment('Hours'));
    });

    it('settles the draft when focus leaves from the open columns', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <>
                <TimePicker
                    hourCycle={24}
                    minTime="08:00"
                    onChange={onChange}
                />
                <button type="button">Elsewhere</button>
            </>,
        );

        await user.click(segment('Hours'));
        await user.keyboard('0700');
        await user.keyboard('{Alt>}{ArrowDown}{/Alt}');
        await user.click(screen.getByRole('button', { name: 'Elsewhere' }));

        expect(onChange).toHaveBeenLastCalledWith('08:00');
    });
    it('takes the seconds when it shows them', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(<TimePicker hourCycle={24} withSeconds onChange={onChange} />);

        await user.click(segment('Hours'));
        await user.keyboard('143015');

        expect(onChange).toHaveBeenLastCalledWith('14:30:15');
    });

    it('keeps a column pick inside the bounds', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <TimePicker
                hourCycle={24}
                minTime="09:00"
                maxTime="17:00"
                defaultValue="16:45"
                onChange={onChange}
            />,
        );

        await user.click(screen.getByRole('button', { name: 'Choose time' }));
        await user.click(
            within(screen.getByRole('listbox', { name: 'Hours' })).getByRole(
                'option',
                { name: '17' },
            ),
        );

        expect(onChange).toHaveBeenLastCalledWith('17:00');
    });
});
