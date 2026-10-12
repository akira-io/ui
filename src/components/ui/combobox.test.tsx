// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { Combobox } from '@/components/ui/combobox';

const options = [
    { value: '1', label: 'Atrelado 20' },
    { value: '2', label: 'Bicicleta' },
];

class ResizeObserverStub {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
}

beforeAll(() => {
    globalThis.ResizeObserver ??=
        ResizeObserverStub as unknown as typeof ResizeObserver;
    Element.prototype.scrollIntoView = vi.fn();
});

afterEach(cleanup);

describe('the combobox', () => {
    it('reports the option the reader picked', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();

        render(<Combobox value="" options={options} onChange={onChange} />);

        await user.click(screen.getByRole('combobox'));
        await user.click(await screen.findByText('Bicicleta'));

        expect(onChange).toHaveBeenCalledWith('2');
    });

    it('caps the list at the room the popover has', async () => {
        const user = userEvent.setup();

        render(<Combobox value="" options={options} onChange={vi.fn()} />);

        await user.click(screen.getByRole('combobox'));

        const list = document.querySelector('[cmdk-list]');

        expect(list?.className).toContain(
            'var(--radix-popover-content-available-height)',
        );
    });

    describe('searching time zones', () => {
        const timezones = [
            { value: 'America/Phoenix', label: 'America/Phoenix' },
            { value: 'Atlantic/Cape_Verde', label: 'Atlantic/Cape Verde' },
        ];

        function matchesSubstring(value: string, search: string): number {
            return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
        }

        it('keeps the default fuzzy matching without a filter', async () => {
            const user = userEvent.setup();

            render(
                <Combobox value="" options={timezones} onChange={vi.fn()} />,
            );

            await user.click(screen.getByRole('combobox'));
            await user.type(screen.getByPlaceholderText('Search...'), 'Cape');

            expect(screen.getByText('America/Phoenix')).toBeTruthy();
            expect(screen.getByText('Atlantic/Cape Verde')).toBeTruthy();
        });

        it('hides options that only match by scattered letters under a substring filter', async () => {
            const user = userEvent.setup();

            render(
                <Combobox
                    value=""
                    options={timezones}
                    onChange={vi.fn()}
                    filter={matchesSubstring}
                />,
            );

            await user.click(screen.getByRole('combobox'));
            await user.type(screen.getByPlaceholderText('Search...'), 'Cape');

            expect(screen.queryByText('America/Phoenix')).toBeNull();
            expect(screen.getByText('Atlantic/Cape Verde')).toBeTruthy();
        });

        it('reports the original value of a filtered option', async () => {
            const user = userEvent.setup();
            const onChange = vi.fn();

            render(
                <Combobox
                    value=""
                    options={timezones}
                    onChange={onChange}
                    filter={matchesSubstring}
                />,
            );

            await user.click(screen.getByRole('combobox'));
            await user.type(screen.getByPlaceholderText('Search...'), 'cape');
            await user.click(screen.getByText('Atlantic/Cape Verde'));

            expect(onChange).toHaveBeenCalledWith('Atlantic/Cape_Verde');
        });
    });
});

describe('the combobox trigger', () => {
    it('reads as a field, like the select', () => {
        const { container } = render(
            <Combobox value="" onChange={() => {}} options={[]} />,
        );
        const trigger = container.querySelector('[role="combobox"]')!;

        expect(trigger.className).toContain('dark:glass-button');
        expect(trigger.className).toContain('rounded-full');
        expect(trigger.className).toContain('px-inset');
        expect(trigger.className).toContain('h-control');
        expect(trigger.className).not.toMatch(
            /rounded-2xl|border-border|(^|\s)glass-(button|edge)/,
        );
    });
});

describe('the size of a combobox', () => {
    it('follows the size it is given', () => {
        render(
            <Combobox
                size="sm"
                value=""
                options={options}
                onChange={vi.fn()}
            />,
        );

        const classes = screen.getByRole('combobox').className.split(/\s+/);

        expect(classes).toContain('h-8');
        expect(classes).not.toContain('h-control');
    });

    it('keeps the control height by default', () => {
        render(<Combobox value="" options={options} onChange={vi.fn()} />);

        expect(screen.getByRole('combobox').className.split(/\s+/)).toContain(
            'h-control',
        );
    });
});

describe('the options of a combobox', () => {
    it('carry the check at their trailing edge, as a select does', async () => {
        render(
            <Combobox
                value={options[0]!.value}
                options={options}
                onChange={vi.fn()}
            />,
        );

        await userEvent.click(screen.getByRole('combobox'));

        const check = document.querySelector(
            '[data-slot="command-item"] .lucide-check',
        )!;

        expect(check.getAttribute('class')).toContain('ms-auto');
        expect(check.getAttribute('class')).not.toContain('mr-2');
    });
});
