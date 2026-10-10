// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Ticket, Wallet } from 'lucide-react';
import { type ReactNode } from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { CompositionBar, type CompositionPart } from '@/blocks/composition-bar';
import { StatBreakdownCard } from '@/blocks/stat-breakdown-card';
import { StatCard } from '@/blocks/stat-card';
import { UiLocaleProvider } from '@/locales/context';
import { patchPointerApis } from '../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(cleanup);

const parts: CompositionPart[] = [
    {
        id: 'cash',
        label: 'Numerário',
        value: 458.3,
        display: '458 CVE',
        color: 'var(--chart-1)',
    },
    {
        id: 'card',
        label: 'Cartão',
        value: 541.7,
        display: '542 CVE',
        color: 'var(--chart-2)',
    },
];

function inLocale(locale: string, children: ReactNode) {
    return render(
        <UiLocaleProvider labels={{}} locale={locale}>
            {children}
        </UiLocaleProvider>,
    );
}

async function openShareTooltip(): Promise<HTMLElement> {
    const meter = screen.getByRole('meter');
    fireEvent.pointerMove(meter, { pointerType: 'mouse' });
    fireEvent.focus(meter);

    return screen.findByRole('tooltip');
}

describe('a stat card under a number locale', () => {
    it.each([
        ['en-US', -100, '-100.0%'],
        ['pt-PT', -100, '-100,0%'],
        ['pt-PT', 12.34, '+12,3%'],
        ['pt-PT', 0, '0%'],
    ])('formats the %s trend %s as %s', (locale, trend, expected) => {
        inLocale(
            locale,
            <StatCard title="Receita" value="1" icon={Wallet} trend={trend} />,
        );

        expect(screen.getByText(expected)).toBeDefined();
    });

    it('lets formatTrend outrank the locale', () => {
        inLocale(
            'pt-PT',
            <StatCard
                title="Receita"
                value="1"
                icon={Wallet}
                trend={5}
                formatTrend={() => 'subiu'}
            />,
        );

        expect(screen.getByText('subiu')).toBeDefined();
    });

    it.each([
        ['en-US', '45.8%'],
        ['pt-PT', '45,8%'],
    ])('shows a computed %s share as %s', async (locale, expected) => {
        inLocale(
            locale,
            <StatCard
                title="Receita"
                value="1"
                icon={Wallet}
                share={{ value: 45.83 }}
            />,
        );

        expect((await openShareTooltip()).textContent).toContain(expected);
    });
});

describe('a composition under a number locale', () => {
    it.each([
        ['en-US', ['Numerário458 CVE45.8%', 'Cartão542 CVE54.2%']],
        ['pt-PT', ['Numerário458 CVE45,8%', 'Cartão542 CVE54,2%']],
    ])('lists the %s shares', (locale, expected) => {
        inLocale(
            locale,
            <CompositionBar parts={parts} label="Valor por meio" />,
        );

        const rows = screen
            .getByRole('list', { name: 'Valor por meio' })
            .querySelectorAll('li');

        expect([...rows].map((row) => row.textContent)).toEqual(expected);
    });

    it('names each segment with the localized share', () => {
        inLocale(
            'pt-PT',
            <CompositionBar parts={parts} label="Valor por meio" />,
        );

        expect(
            screen.getByRole('img', { name: 'Numerário, 45,8%' }),
        ).toBeDefined();
    });

    it('shows the breakdown card shares in Portuguese', () => {
        inLocale(
            'pt-PT',
            <StatBreakdownCard
                title="Pagamentos"
                icon={Ticket}
                value="1 mil"
                total={1000}
                parts={parts}
                trend={-2.5}
            />,
        );

        expect(screen.getByText('45,8%')).toBeDefined();
        expect(screen.getByText('-2,5%')).toBeDefined();
    });
});
