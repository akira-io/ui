// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Wallet } from 'lucide-react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { StatCard } from '@/blocks/stat-card';
import { patchPointerApis } from '../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(cleanup);

describe('a stat card with a share', () => {
    it.each([
        [140, '100'],
        [-5, '0'],
        [42.3, '42'],
    ])('clamps a share of %s to a meter value of %s', (share, expected) => {
        render(
            <StatCard
                title="Receita"
                value="1"
                icon={Wallet}
                share={{ value: share }}
            />,
        );

        const meter = screen.getByRole('meter', { name: 'Receita' });

        expect(meter.getAttribute('aria-valuenow')).toBe(expected);
        expect((meter.firstElementChild as HTMLElement).style.width).toBe(
            `${Math.min(Math.max(share, 0), 100)}%`,
        );
    });

    it('shows the hint below the bar', () => {
        render(
            <StatCard
                title="Receita"
                value="1"
                icon={Wallet}
                share={{ value: 10, hint: 'do total vendido' }}
            />,
        );

        expect(screen.getByText('do total vendido')).toBeTruthy();
    });

    it('opens a tooltip with the title, the share and the exact value on focus', async () => {
        render(
            <StatCard
                layout="inline"
                title="Receita"
                value="761,8 M CVE"
                secondaryValue="761 812 400 CVE"
                icon={Wallet}
                share={{ value: 42.3, label: '42,3%' }}
            />,
        );

        const meter = screen.getByRole('meter', { name: 'Receita' });
        fireEvent.pointerMove(meter, { pointerType: 'mouse' });
        fireEvent.focus(meter);

        const tooltip = await screen.findByRole('tooltip');

        expect(tooltip.textContent).toContain('Receita');
        expect(tooltip.textContent).toContain('42,3%');
        expect(tooltip.textContent).toContain('761 812 400 CVE');
    });

    it('exposes the share label as the meter value text', () => {
        render(
            <StatCard
                title="Receita"
                value="1"
                icon={Wallet}
                share={{ value: 42.3, label: '42,3%' }}
            />,
        );

        expect(screen.getByRole('meter').getAttribute('aria-valuetext')).toBe(
            '42,3%',
        );
    });

    it('omits the meter value text when the share has no label', () => {
        render(
            <StatCard
                title="Receita"
                value="1"
                icon={Wallet}
                share={{ value: 42.3 }}
            />,
        );

        expect(screen.getByRole('meter').hasAttribute('aria-valuetext')).toBe(
            false,
        );
    });
});

async function openTooltip(): Promise<HTMLElement> {
    const meter = screen.getByRole('meter');
    fireEvent.pointerMove(meter, { pointerType: 'mouse' });
    fireEvent.focus(meter);

    return screen.findByRole('tooltip');
}

describe('a stat card share tooltip and meter', () => {
    it('shows the main value when there is no secondary value', async () => {
        render(
            <StatCard
                title="Receita"
                value="761,8 M CVE"
                icon={Wallet}
                share={{ value: 42.3, label: '42,3%' }}
            />,
        );

        expect((await openTooltip()).textContent).toContain('761,8 M CVE');
    });

    it.each([false, null])(
        'shows the main value when the secondary value is %s',
        async (secondaryValue) => {
            render(
                <StatCard
                    title="Receita"
                    value="761,8 M CVE"
                    secondaryValue={secondaryValue}
                    icon={Wallet}
                    share={{ value: 42.3, label: '42,3%' }}
                />,
            );

            const tooltip = await openTooltip();

            expect(tooltip.textContent).toContain('761,8 M CVE');
            expect(tooltip.textContent).not.toContain('false');
        },
    );

    it('shows the computed share when the share has no label', async () => {
        render(
            <StatCard
                title="Receita"
                value="1"
                icon={Wallet}
                share={{ value: 42.3 }}
            />,
        );

        expect((await openTooltip()).textContent).toContain('42.3%');
    });

    it('makes the meter focusable with a 0 to 100 range', () => {
        render(
            <StatCard
                title="Receita"
                value="1"
                icon={Wallet}
                share={{ value: 42.6 }}
            />,
        );

        const meter = screen.getByRole('meter');

        expect(meter.tabIndex).toBe(0);
        expect(meter.getAttribute('aria-valuemin')).toBe('0');
        expect(meter.getAttribute('aria-valuemax')).toBe('100');
        expect(meter.getAttribute('aria-valuenow')).toBe('43');
    });
});
