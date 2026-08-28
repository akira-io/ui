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
});
