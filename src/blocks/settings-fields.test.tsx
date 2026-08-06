// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import {
    DateField,
    NumberField,
    SelectField,
    TextField,
} from './settings-fields';

beforeAll(() => {
    Object.assign(window.HTMLElement.prototype, {
        hasPointerCapture: () => false,
        setPointerCapture: () => undefined,
        releasePointerCapture: () => undefined,
        scrollIntoView: () => undefined,
    });
});

afterEach(cleanup);

describe('the settings field set', () => {
    it('ties the label to the control and carries description and error', () => {
        render(
            <TextField
                label="Terminal name"
                description="Shown on every ticket"
                error="Name is required"
                value=""
                onChange={vi.fn()}
            />,
        );

        const input = screen.getByLabelText('Terminal name');

        expect(input.getAttribute('data-slot')).toBe('text-field');
        expect(input.getAttribute('aria-invalid')).toBe('true');
        expect(
            screen.getByText('Shown on every ticket').getAttribute('data-slot'),
        ).toBe('settings-field-description');
        expect(
            screen.getByText('Name is required').getAttribute('data-slot'),
        ).toBe('field-error');
    });

    it('reports every keystroke of a text field', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();

        render(
            <TextField label="Terminal name" value="" onChange={onChange} />,
        );

        await user.type(screen.getByLabelText('Terminal name'), 'ab');

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenLastCalledWith('b');
    });

    it('reports a number field as a number, and an empty one as empty', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();

        render(
            <NumberField
                label="Seats"
                description="Capacity of the vessel"
                value={40}
                min={1}
                onChange={onChange}
            />,
        );

        const input = screen.getByLabelText('Seats') as HTMLInputElement;

        expect(input.type).toBe('number');
        expect(input.value).toBe('40');

        await user.type(input, '2');

        expect(onChange).toHaveBeenLastCalledWith(402);

        await user.clear(input);

        expect(onChange).toHaveBeenLastCalledWith('');
    });

    it('renders a date field as a date control', () => {
        render(
            <DateField
                label="Departure"
                value="2026-08-07"
                onChange={vi.fn()}
            />,
        );

        const input = screen.getByLabelText('Departure') as HTMLInputElement;

        expect(input.type).toBe('date');
        expect(input.value).toBe('2026-08-07');
    });

    it('opens a select field and reports the chosen option', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();

        render(
            <SelectField
                label="Route"
                placeholder="Pick a route"
                value=""
                options={[
                    { value: 'luanda', label: 'Luanda' },
                    { value: 'cabinda', label: 'Cabinda' },
                ]}
                onChange={onChange}
            />,
        );

        const trigger = screen.getByLabelText('Route');

        expect(trigger.getAttribute('data-slot')).toBe('select-field');
        expect(trigger.textContent).toContain('Pick a route');

        await user.click(trigger);
        await user.click(
            await screen.findByRole('option', { name: 'Cabinda' }),
        );

        expect(onChange).toHaveBeenCalledWith('cabinda');
    });

    it('marks a required field on the label without announcing the asterisk', () => {
        render(
            <TextField
                label="Terminal name"
                required
                value=""
                onChange={vi.fn()}
            />,
        );

        expect(screen.getByText('*').getAttribute('aria-hidden')).toBe('true');
    });
});
