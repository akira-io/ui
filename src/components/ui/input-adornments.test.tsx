/** @vitest-environment jsdom */

import { fireEvent, render } from '@testing-library/react';
import { Mail } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import { UiLocaleProvider } from '@/locales/context';
import { ptLabels } from '@/locales/pt';

import { Input } from './input';

describe('Input adornments', () => {
    it('moves the fill and the halo to a wrapper when an icon is given', () => {
        const { container } = render(
            <Input leading={<Mail />} placeholder="Email" />,
        );
        const wrapper = container.querySelector('[data-slot="input-group"]')!;

        expect(wrapper.className).toContain('bg-muted');
        expect(wrapper.className).toContain(
            'has-[input:focus-visible]:ring-[3px]',
        );
        expect(container.querySelector('input')!.className).toContain(
            'bg-transparent',
        );
    });

    it('shows the clear button on a search field only while it holds text', () => {
        const { container } = render(<Input type="search" defaultValue="" />);

        expect(container.querySelector('[data-slot="input-clear"]')).toBeNull();
        fireEvent.change(container.querySelector('input')!, {
            target: { value: 'praia' },
        });
        expect(
            container.querySelector('[data-slot="input-clear"]'),
        ).not.toBeNull();
    });

    it('clears a controlled search field and gives focus back', () => {
        const values: string[] = [];
        const onChange = vi.fn((event: React.ChangeEvent<HTMLInputElement>) => {
            values.push(event.target.value);
        });
        const { container } = render(
            <Input type="search" value="praia" onChange={onChange} />,
        );

        fireEvent.click(container.querySelector('[data-slot="input-clear"]')!);

        expect(values).toEqual(['']);
        expect(document.activeElement).toBe(container.querySelector('input'));
    });

    it('names the clear button in the surrounding locale', () => {
        const { container } = render(
            <UiLocaleProvider labels={ptLabels}>
                <Input type="search" defaultValue="praia" />
            </UiLocaleProvider>,
        );

        expect(
            container
                .querySelector('[data-slot="input-clear"]')!
                .getAttribute('aria-label'),
        ).toBe('Limpar');
    });
});
