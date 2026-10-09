// @vitest-environment jsdom

import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pt } from 'date-fns/locale';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Field, FieldControl, FieldLabel } from '@/components/ui/field';
import { TimePicker } from '@/components/ui/time-picker';
import { UiLocaleProvider } from '@/locales/context';
import { ptLabels } from '@/locales/pt';

afterEach(cleanup);

function segment(name: string): HTMLElement {
    return screen.getByRole('spinbutton', { name });
}

describe('TimePicker', () => {
    it('reports a typed time once every unit is filled', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(<TimePicker hourCycle={24} onChange={onChange} />);

        await user.click(segment('Hours'));
        await user.keyboard('143');

        expect(onChange).not.toHaveBeenCalled();

        await user.keyboard('0');

        expect(onChange).toHaveBeenLastCalledWith('14:30');
    });

    it('reports a lone last digit once the field loses focus', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <>
                <TimePicker hourCycle={24} onChange={onChange} />
                <button type="button">Elsewhere</button>
            </>,
        );

        await user.click(segment('Hours'));
        await user.keyboard('143');
        await user.click(screen.getByRole('button', { name: 'Elsewhere' }));

        expect(onChange).toHaveBeenLastCalledWith('14:03');
    });

    it('jumps to the minutes after an hour no second digit could follow', async () => {
        const user = userEvent.setup();

        render(<TimePicker hourCycle={24} />);

        await user.click(segment('Hours'));
        await user.keyboard('3');

        expect(document.activeElement).toBe(segment('Minutes'));
    });

    it('steps the minutes by the step and wraps at the end', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <TimePicker
                hourCycle={24}
                minuteStep={15}
                defaultValue="10:45"
                onChange={onChange}
            />,
        );

        await user.click(segment('Minutes'));
        await user.keyboard('{ArrowUp}');

        expect(onChange).toHaveBeenLastCalledWith('10:00');
    });

    it('reports nothing once every unit is cleared', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <TimePicker
                hourCycle={24}
                defaultValue="10:45"
                onChange={onChange}
            />,
        );

        await user.click(segment('Hours'));
        await user.keyboard('{Backspace}');

        expect(onChange).not.toHaveBeenCalled();

        await user.click(segment('Minutes'));
        await user.keyboard('{Backspace}');

        expect(onChange).toHaveBeenLastCalledWith(undefined);
    });

    it('follows the twelve-hour clock of an English locale', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(<TimePicker onChange={onChange} />);

        await user.click(segment('Hours'));
        await user.keyboard('0930p');

        expect(segment('AM/PM').textContent).toBe('PM');
        expect(onChange).toHaveBeenLastCalledWith('21:30');
    });

    it('follows the 24-hour clock of a Portuguese locale', () => {
        render(
            <UiLocaleProvider labels={ptLabels} dateLocale={pt}>
                <TimePicker />
            </UiLocaleProvider>,
        );

        expect(screen.getByRole('spinbutton', { name: 'Horas' })).toBeTruthy();
        expect(screen.queryByRole('spinbutton', { name: 'AM/PM' })).toBeNull();
    });

    it('holds a time below the minimum back and pulls it to the minimum on blur', async () => {
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

        expect(onChange).not.toHaveBeenCalled();

        await user.click(screen.getByRole('button', { name: 'Elsewhere' }));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith('08:00');
        expect(segment('Hours').textContent).toBe('08');
    });

    it('picks from the columns', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(<TimePicker hourCycle={24} onChange={onChange} />);

        await user.click(screen.getByRole('button', { name: 'Choose time' }));
        await user.click(
            within(screen.getByRole('listbox', { name: 'Hours' })).getByRole(
                'option',
                { name: '16' },
            ),
        );

        expect(onChange).toHaveBeenLastCalledWith('16:00');
    });

    it('opens the columns from the keyboard', async () => {
        const user = userEvent.setup();

        render(<TimePicker hourCycle={24} />);

        await user.click(segment('Hours'));
        await user.keyboard('{Alt>}{ArrowDown}{/Alt}');

        expect(screen.getByRole('listbox', { name: 'Hours' })).toBeTruthy();
    });

    it('shows a new controlled value and drops the draft', async () => {
        const user = userEvent.setup();

        function Harness() {
            const [value, setValue] = useState<string | undefined>('09:00');

            return (
                <>
                    <TimePicker
                        hourCycle={24}
                        value={value}
                        onChange={setValue}
                    />
                    <button type="button" onClick={() => setValue('18:15')}>
                        Evening
                    </button>
                </>
            );
        }

        render(<Harness />);

        await user.click(segment('Hours'));
        await user.keyboard('{Backspace}');
        await user.click(screen.getByRole('button', { name: 'Evening' }));

        expect(segment('Hours').textContent).toBe('18');
        expect(segment('Minutes').textContent).toBe('15');
    });

    it('submits the time under its name', () => {
        render(
            <form data-testid="form">
                <TimePicker hourCycle={24} name="start" defaultValue="09:15" />
            </form>,
        );

        const form = screen.getByTestId('form') as HTMLFormElement;

        expect(new FormData(form).get('start')).toBe('09:15');
    });

    it('clears through the clear control', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <TimePicker
                hourCycle={24}
                defaultValue="09:15"
                onChange={onChange}
            />,
        );

        await user.click(screen.getByRole('button', { name: 'Clear time' }));

        expect(onChange).toHaveBeenLastCalledWith(undefined);
        expect(segment('Hours').textContent).toBe('--');
    });

    it('cannot be opened or typed into while disabled', async () => {
        const user = userEvent.setup();

        render(<TimePicker hourCycle={24} disabled />);

        expect(segment('Hours').getAttribute('tabindex')).toBe('-1');

        await user.click(screen.getByRole('button', { name: 'Choose time' }));

        expect(screen.queryByRole('listbox')).toBeNull();
    });

    it('is named by its field label and carries the field state', () => {
        render(
            <Field id="start" invalid>
                <FieldLabel>Start</FieldLabel>
                <FieldControl>
                    <TimePicker hourCycle={24} />
                </FieldControl>
            </Field>,
        );

        const group = screen.getByRole('group', { name: 'Start' });

        expect(group.getAttribute('aria-invalid')).toBe('true');
        expect(group.dataset.fieldControl).toBe('true');
    });
});
