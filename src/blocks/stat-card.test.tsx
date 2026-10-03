// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { Users, Wallet } from 'lucide-react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { StatCard } from '@/blocks/stat-card';
import { BaseStatCard } from '../../tests/fixtures/base-stat-card';
import { patchPointerApis } from '../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(cleanup);

describe('a stat card', () => {
    it.each([
        [
            'with a trend and a comparison',
            { trend: 4.2, comparisonLabel: 'vs last month' },
        ],
        ['without a trend', { trend: undefined }],
        ['with a negative trend on an inset card', { trend: -3, inset: true }],
    ])('keeps the stacked DOM of the base card %s', (_name, extra) => {
        const props = {
            title: 'Active users',
            value: '1,204',
            icon: Users,
            ...extra,
        };
        const base = render(<BaseStatCard {...props} />);
        const baseHtml = base.container.innerHTML;
        base.unmount();
        const current = render(<StatCard {...props} />);

        expect(current.container.innerHTML).toBe(baseHtml);
    });

    it('renders no secondary line when the secondary value is null', () => {
        render(
            <StatCard
                title="Receita"
                value="1"
                secondaryValue={null}
                icon={Wallet}
            />,
        );

        const figure = screen.getByText('1').parentElement as HTMLElement;

        expect(figure.querySelectorAll('p')).toHaveLength(2);
        expect(figure.textContent).toBe('Receita1');
    });

    it('puts the icon beside the title in the inline layout', () => {
        render(
            <StatCard
                layout="inline"
                title="Receita"
                value="761,8 M CVE"
                icon={Wallet}
            />,
        );

        expect(
            screen.getByText('Receita').parentElement?.querySelector('svg'),
        ).not.toBeNull();
    });

    it('shows the exact value below the short one', () => {
        render(
            <StatCard
                title="Receita"
                value="761,8 M CVE"
                secondaryValue="761 812 400 CVE"
                icon={Wallet}
            />,
        );

        const exact = screen.getByText('761 812 400 CVE');

        expect(exact.getAttribute('aria-hidden')).toBeNull();
        expect(exact.className).not.toContain('invisible');
    });

    it('keeps the space of an exact value equal to the short one but hides it', () => {
        render(
            <StatCard
                title="Bilhetes"
                value="42"
                secondaryValue="42"
                icon={Users}
            />,
        );

        const [, exact] = screen.getAllByText('42');

        expect(exact.getAttribute('aria-hidden')).toBe('true');
        expect(exact.className).toContain('invisible');
    });

    it('formats the trend with the caller formatter and keeps the tone', () => {
        render(
            <StatCard
                title="Receita"
                value="1"
                icon={Wallet}
                trend={-4.2}
                formatTrend={(trend) =>
                    `${trend.toFixed(1).replace('.', ',')}%`
                }
            />,
        );

        expect(screen.getByText('-4,2%').className).toContain(
            'text-destructive',
        );
    });
});

describe('a stat card secondary line', () => {
    it.each([undefined, false, null])(
        'renders no secondary line for %s',
        (secondaryValue) => {
            render(
                <StatCard
                    title="Receita"
                    value="1"
                    secondaryValue={secondaryValue}
                    icon={Wallet}
                />,
            );

            const figure = screen.getByText('1').parentElement as HTMLElement;

            expect(figure.querySelectorAll('p')).toHaveLength(2);
        },
    );

    it('renders a zero secondary value visibly', () => {
        render(
            <StatCard
                title="Receita"
                value="1"
                secondaryValue={0}
                icon={Wallet}
            />,
        );

        const zero = screen.getByText('0');

        expect(zero.getAttribute('aria-hidden')).toBeNull();
        expect(zero.className).not.toContain('invisible');
    });
});

describe('a stat card trend', () => {
    it('formats a flat trend as zero with the muted tone', () => {
        const received: number[] = [];

        render(
            <StatCard
                title="Receita"
                value="1"
                icon={Wallet}
                trend={0.01}
                formatTrend={(trend) => {
                    received.push(trend);

                    return 'estavel';
                }}
            />,
        );

        expect(received.every((trend) => trend === 0)).toBe(true);
        expect(received.length).toBeGreaterThan(0);
        expect(screen.getByText('estavel').className).toContain(
            'text-muted-foreground',
        );
    });

    it('gives a positive trend the success tone', () => {
        render(
            <StatCard title="Receita" value="1" icon={Wallet} trend={4.2} />,
        );

        expect(screen.getByText('+4.2%').className).toContain('text-success');
    });
});
