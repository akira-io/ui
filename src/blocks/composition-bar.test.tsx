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

    it('draws the track as one shape and every segment straight inside it', () => {
        render(<CompositionBar parts={parts} label="Valor por meio" />);

        const shape = track().querySelector<HTMLElement>(
            '[data-slot="composition-shape"]',
        );
        const curved = [...track().querySelectorAll('*'), track()].filter(
            (element) => /\bround/.test(element.getAttribute('class') ?? ''),
        );

        expect(shape).not.toBeNull();
        expect(curved).toEqual([shape]);
        expect(shape?.className).toMatch(/\boverflow-hidden\b/);
        expect(shape?.className).toContain('rounded-[min(8px,100cqh/6,50cqw)]');
        expect(track().className).toContain('[container-type:size]');

        for (const part of segments()) {
            expect(part.parentElement).toBe(shape);
            expect(part.className).toMatch(/\bh-full\b/);
            expect(part.className).not.toMatch(/\bshrink-0\b/);
            expect(part.style.height).toBe('');
            expect(part.style.minWidth).toBe('');
        }
    });

    it('keeps a tiny last segment at least one pixel wide, inside the shape', () => {
        render(
            <CompositionBar
                parts={[
                    { ...parts[0], value: 9_990 },
                    { ...parts[2], value: 1 },
                ]}
                label="Valor por meio"
            />,
        );

        const tip = segments()[1];

        expect(tip.className).toMatch(/\bmin-w-px\b/);
        expect(tip.className).toMatch(/\bshrink\b/);
        expect(segments()[0].className).toMatch(/\bshrink\b/);
        expect(tip.parentElement?.className).toMatch(/\boverflow-hidden\b/);
    });

    it('lets a segment with no share collapse to nothing', () => {
        render(
            <CompositionBar
                parts={[...parts, { ...parts[2], id: 'none', value: 0 }]}
                label="Valor por meio"
            />,
        );

        expect(segments()[3].className).not.toMatch(/\bmin-w-px\b/);
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
