// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TwoFactorEnableButton } from '@/blocks/two-factor/enable-button';
import { UiLocaleProvider } from '@/locales/context';
import { ptLabels, twoFactorLabelsPt } from '@/locales/pt';

afterEach(() => {
    cleanup();
});

describe('the two-factor enable button', () => {
    it('starts the setup when pressed', async () => {
        const onEnable = vi.fn();

        render(<TwoFactorEnableButton onEnable={onEnable} />);

        await userEvent.click(
            screen.getByRole('button', {
                name: 'Enable two-factor authentication',
            }),
        );

        expect(onEnable).toHaveBeenCalledTimes(1);
    });

    it('holds still while the server is enabling two-factor', async () => {
        const onEnable = vi.fn();

        render(<TwoFactorEnableButton onEnable={onEnable} processing />);

        const button = screen.getByRole('button', {
            name: /Enable two-factor authentication/,
        });

        expect(button.hasAttribute('disabled')).toBe(true);
        expect(button.getAttribute('aria-busy')).toBe('true');

        await userEvent.click(button);

        expect(onEnable).not.toHaveBeenCalled();
    });

    it('reads its label from the locale provider', () => {
        render(
            <UiLocaleProvider labels={ptLabels}>
                <TwoFactorEnableButton onEnable={vi.fn()} />
            </UiLocaleProvider>,
        );

        expect(
            screen.getByRole('button', { name: twoFactorLabelsPt.enableLabel }),
        ).not.toBeNull();
    });
});
