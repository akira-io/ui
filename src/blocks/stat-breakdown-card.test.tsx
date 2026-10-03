// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Ticket } from 'lucide-react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    StatBreakdownCard,
    type StatBreakdownPart,
} from '@/blocks/stat-breakdown-card';
import { patchPointerApis } from '../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(cleanup);

const parts: StatBreakdownPart[] = [
    {
        id: 'passengers',
        label: 'Passageiros',
        value: 600,
        display: '600',
        exactDisplay: '600 bilhetes',
        shareLabel: '60,0%',
        color: 'var(--chart-1)',
    },
    {
        id: 'vehicles',
        label: 'Veículos',
        value: 300,
        display: '300',
        color: 'var(--chart-2)',
    },
    {
        id: 'drivers',
        label: 'Condutores',
        value: 100,
        display: '100',
        shareLabel: '10,0%',
        color: 'var(--chart-3)',
    },
];

function renderCard(total: number) {
    return render(
        <StatBreakdownCard
            title="Bilhetes"
            icon={Ticket}
            value="1 mil"
            secondaryValue="1 000"
            total={total}
            parts={parts}
            breakdownLabel="Bilhetes por tipo de entidade"
        />,
    );
}

function segment(container: HTMLElement, id: string): HTMLElement {
    return container.querySelector(`[data-part-id="${id}"]`) as HTMLElement;
}

describe('a stat breakdown card', () => {
    it('sizes each segment as its share of the total', () => {
        const { container } = renderCard(1000);

        expect(segment(container, 'passengers').style.width).toBe('60%');
        expect(segment(container, 'vehicles').style.width).toBe('30%');
        expect(segment(container, 'drivers').style.width).toBe('10%');
    });

    it('draws empty segments when the total is zero', () => {
        const { container } = renderCard(0);

        expect(segment(container, 'passengers').style.width).toBe('0%');
        expect(screen.getByText('0.0%')).toBeTruthy();
    });

    it('labels the bar and lists every part in the legend', () => {
        renderCard(1000);

        expect(
            screen.getByRole('group', {
                name: 'Bilhetes por tipo de entidade',
            }),
        ).toBeTruthy();
        expect(screen.getByText('Passageiros')).toBeTruthy();
        expect(screen.getByText('60,0%')).toBeTruthy();
        expect(screen.getByText('Condutores')).toBeTruthy();
        expect(screen.getByText('10,0%')).toBeTruthy();
    });

    it('computes the share label a part does not bring', () => {
        renderCard(1000);

        expect(screen.getByText('30.0%')).toBeTruthy();
    });

    it('opens a tooltip with the exact value of the focused segment', async () => {
        const { container } = renderCard(1000);
        const passengers = segment(container, 'passengers');

        fireEvent.pointerMove(passengers, { pointerType: 'mouse' });
        fireEvent.focus(passengers);

        const tooltip = await screen.findByRole('tooltip');

        expect(tooltip.textContent).toContain('Passageiros');
        expect(tooltip.textContent).toContain('600 bilhetes');
    });
});
