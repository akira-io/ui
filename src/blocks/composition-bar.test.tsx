// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    CompositionBar,
    compositionTotal,
    type CompositionPart,
} from '@/blocks/composition-bar';
import { patchPointerApis } from '../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(cleanup);

const parts: CompositionPart[] = [
    {
        id: 'cash',
        label: 'Numerário',
        value: 600,
        display: '600 CVE',
        exactDisplay: '600,00 CVE',
        color: 'var(--chart-1)',
    },
    {
        id: 'card',
        label: 'Cartão',
        value: 397,
        display: '397 CVE',
        color: 'var(--chart-2)',
    },
    {
        id: 'other',
        label: 'Outros meios',
        value: 3,
        display: '3 CVE',
        shareLabel: '0,3%',
        color: 'var(--chart-3)',
    },
];

function track(): HTMLElement {
    return screen.getByRole('group', { name: 'Valor por meio' });
}

function segments(): HTMLElement[] {
    return [...track().querySelectorAll<HTMLElement>('[role="img"]')];
}

describe('the composition bar', () => {
    it('sizes every segment by its share of the summed parts', () => {
        render(<CompositionBar parts={parts} label="Valor por meio" />);

        expect(segments().map((part) => part.style.width)).toEqual([
            '60%',
            '39.7%',
            '0.3%',
        ]);
    });

    it('rounds the track and leaves every segment straight', () => {
        render(<CompositionBar parts={parts} label="Valor por meio" />);

        expect(track().className).toMatch(/\boverflow-hidden\b/);
        expect(track().className).toMatch(/\brounded-full\b/);

        for (const part of segments()) {
            expect(part.className).not.toMatch(/\brounded/);
        }
    });

    it('lists each part with its value and its share', () => {
        render(<CompositionBar parts={parts} label="Valor por meio" />);

        const rows = screen
            .getByRole('list', { name: 'Valor por meio' })
            .querySelectorAll('li');

        expect([...rows].map((row) => row.textContent)).toEqual([
            'Numerário600 CVE60.0%',
            'Cartão397 CVE39.7%',
            'Outros meios3 CVE0,3%',
        ]);
    });

    it('measures the parts against a larger total when one is given', () => {
        render(
            <CompositionBar
                parts={parts}
                total={2000}
                label="Valor por meio"
            />,
        );

        expect(segments()[0].style.width).toBe('30%');
    });

    it('draws the bar alone without a legend', () => {
        render(
            <CompositionBar
                parts={parts}
                legend={false}
                label="Valor por meio"
            />,
        );

        expect(screen.queryByRole('list')).toBeNull();
    });

    it('shows the exact value of a segment in its tooltip', async () => {
        render(<CompositionBar parts={parts} label="Valor por meio" />);

        fireEvent.focus(segments()[0]);

        expect(
            (await screen.findAllByText('600,00 CVE')).length,
        ).toBeGreaterThan(0);
    });

    it('takes the slot name from the caller', () => {
        const { container } = render(
            <CompositionBar
                parts={parts}
                label="Valor por meio"
                slotName="method-share"
            />,
        );

        expect(
            container.querySelector('[data-slot="method-share"]'),
        ).not.toBeNull();
    });

    it('ignores negative parts in the default total', () => {
        expect(
            compositionTotal([...parts, { ...parts[0], id: 'x', value: -50 }]),
        ).toBe(1000);
    });
});
