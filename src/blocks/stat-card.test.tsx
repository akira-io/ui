// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { Users, Wallet } from 'lucide-react';
import { afterEach, describe, expect, it } from 'vitest';

import { StatCard } from '@/blocks/stat-card';

afterEach(cleanup);

describe('a stat card', () => {
    it('keeps the stacked layout when no new prop is given', () => {
        render(
            <StatCard
                title="Active users"
                value="1,204"
                icon={Users}
                trend={4.2}
                comparisonLabel="vs last month"
            />,
        );

        expect(screen.getByText('+4.2%')).toBeTruthy();
        expect(
            screen
                .getByText('Active users')
                .parentElement?.querySelector('svg'),
        ).toBeNull();
        expect(screen.queryByRole('meter')).toBeNull();
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
