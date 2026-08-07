// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { DatePicker } from '@/components/ui/date-picker';

afterEach(cleanup);

const june = {
    tenth: new Date(2024, 5, 10),
    fifteenth: new Date(2024, 5, 15),
    twentieth: new Date(2024, 5, 20),
};

function trigger(): HTMLElement {
    const button = document.querySelector<HTMLElement>(
        '[data-slot="date-picker-trigger"]',
    );

    if (!button) {
        throw new Error('the date picker rendered no trigger');
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

describe('the date picker trigger', () => {
    it('shows the placeholder while empty', () => {
        render(<DatePicker />);

        expect(trigger().textContent).toBe('Pick a date');
    });

    it('shows the formatted value once a date is set', () => {
        render(<DatePicker value={june.fifteenth} />);

        expect(trigger().textContent).toBe('15 Jun 24');
    });

    it('formats through an overridden formatter', () => {
        render(
            <DatePicker
                value={june.fifteenth}
                formatDate={(value) =>
                    value.toLocaleDateString('pt-PT', {
                        day: '2-digit',
                        month: 'long',
                    })
                }
            />,
        );

        expect(trigger().textContent).toBe(
            june.fifteenth.toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: 'long',
            }),
        );
    });

    it('carries an overridden placeholder', () => {
        render(<DatePicker placeholder="Escolha uma data" />);

        expect(
            screen.getByRole('button', { name: 'Escolha uma data' }),
        ).toBeDefined();
    });

    it('stays shut while disabled', async () => {
        const user = userEvent.setup();
        render(<DatePicker disabled />);

        await user.click(trigger());

        expect(screen.queryByRole('grid')).toBeNull();
    });
});

describe('picking a day', () => {
    it('reports the picked date and closes the popover', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <DatePicker defaultValue={june.fifteenth} onChange={onChange} />,
        );

        await user.click(trigger());
        await user.click(day(june.twentieth));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toEqual(june.twentieth);

        await waitFor(() => expect(screen.queryByRole('grid')).toBeNull());
    });

    it('keeps its own value without a controlling parent', async () => {
        const user = userEvent.setup();
        render(<DatePicker defaultValue={june.fifteenth} />);

        await user.click(trigger());
        await user.click(day(june.twentieth));

        expect(trigger().textContent).toBe('20 Jun 24');
    });

    it('renders whatever a controlling parent hands back', async () => {
        const user = userEvent.setup();

        function Controlled() {
            const [value, setValue] = useState<Date | undefined>(
                june.fifteenth,
            );

            return <DatePicker value={value} onChange={setValue} />;
        }

        render(<Controlled />);

        await user.click(trigger());
        await user.click(day(june.twentieth));

        expect(trigger().textContent).toBe('20 Jun 24');
    });

    it('leaves a day outside the bounds unpickable', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <DatePicker
                defaultValue={june.fifteenth}
                minDate={june.tenth}
                maxDate={june.twentieth}
                onChange={onChange}
            />,
        );

        await user.click(trigger());

        expect(
            day(new Date(2024, 5, 9)).getAttribute('disabled'),
        ).not.toBeNull();
        expect(
            day(new Date(2024, 5, 21)).getAttribute('disabled'),
        ).not.toBeNull();

        await user.click(day(new Date(2024, 5, 21)));

        expect(onChange).not.toHaveBeenCalled();
        expect(trigger().textContent).toBe('15 Jun 24');
    });

    it('leaves a day the predicate rejects unpickable', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <DatePicker
                defaultValue={june.fifteenth}
                disabledDays={(date) => date.getDay() === 0}
                onChange={onChange}
            />,
        );

        await user.click(trigger());
        await user.click(day(new Date(2024, 5, 16)));

        expect(onChange).not.toHaveBeenCalled();
    });
});

describe('clearing the value', () => {
    it('reports undefined and falls back to the placeholder', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <DatePicker defaultValue={june.fifteenth} onChange={onChange} />,
        );

        await user.click(screen.getByRole('button', { name: 'Clear date' }));

        expect(onChange).toHaveBeenCalledWith(undefined);
        expect(trigger().textContent).toBe('Pick a date');
    });

    it('offers no clear control while empty or unclearable', () => {
        render(<DatePicker />);

        expect(screen.queryByRole('button', { name: 'Clear date' })).toBeNull();

        cleanup();
        render(<DatePicker value={june.fifteenth} clearable={false} />);

        expect(screen.queryByRole('button', { name: 'Clear date' })).toBeNull();
    });

    it('names the clear control through an overridable label', () => {
        render(<DatePicker value={june.fifteenth} clearLabel="Limpar data" />);

        expect(
            screen.getByRole('button', { name: 'Limpar data' }),
        ).toBeDefined();
    });
});

describe('the keyboard path', () => {
    it('opens on Enter and picks the focused day', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <DatePicker defaultValue={june.fifteenth} onChange={onChange} />,
        );

        await user.tab();

        expect(document.activeElement).toBe(trigger());

        await user.keyboard('{Enter}');
        await screen.findByRole('grid');

        await waitFor(() =>
            expect(document.activeElement).toBe(day(june.fifteenth)),
        );

        await user.keyboard('{ArrowRight}');
        await user.keyboard('{Enter}');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toEqual(new Date(2024, 5, 16));
    });

    it('opens on Space', async () => {
        const user = userEvent.setup();
        render(<DatePicker />);

        await user.tab();
        await user.keyboard(' ');

        expect(await screen.findByRole('grid')).toBeDefined();
    });
});
