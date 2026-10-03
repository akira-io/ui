// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { UiLocaleProvider } from '@/locales/context';
import { esLabels } from '@/locales/es';
import { frLabels } from '@/locales/fr';
import { ptLabels } from '@/locales/pt';
import { SettingsLayout } from '@/shells/settings-layout';

afterEach(cleanup);

function layout(props: { title?: string; description?: string } = {}) {
    return (
        <SettingsLayout
            items={[{ title: 'Profile', href: '/settings/profile' }]}
            currentPath="/settings/profile"
            {...props}
        >
            <p>body</p>
        </SettingsLayout>
    );
}

function underLocale(labels: typeof ptLabels, children: ReactNode) {
    return render(
        <UiLocaleProvider labels={labels}>{children}</UiLocaleProvider>,
    );
}

describe('the settings layout heading', () => {
    it('keeps the English heading when nothing names it', () => {
        render(layout());

        expect(screen.getByText('Settings')).toBeDefined();
        expect(
            screen.getByText('Manage your profile and account settings'),
        ).toBeDefined();
    });

    it.each([
        [
            'Portuguese',
            ptLabels,
            'Definições',
            'Gerir o perfil e as definições da conta',
        ],
        [
            'Spanish',
            esLabels,
            'Configuración',
            'Gestionar el perfil y la configuración de la cuenta',
        ],
        [
            'French',
            frLabels,
            'Paramètres',
            'Gérer le profil et les paramètres du compte',
        ],
    ])(
        'reads its heading from the %s locale',
        (_, labels, title, description) => {
            underLocale(labels, layout());

            expect(screen.getByText(title)).toBeDefined();
            expect(screen.getByText(description)).toBeDefined();
        },
    );

    it('lets the props outrank the locale', () => {
        underLocale(ptLabels, layout({ title: 'Conta' }));

        expect(screen.getByText('Conta')).toBeDefined();
        expect(
            screen.getByText('Gerir o perfil e as definições da conta'),
        ).toBeDefined();
        expect(screen.queryByText('Definições')).toBeNull();
    });
});
