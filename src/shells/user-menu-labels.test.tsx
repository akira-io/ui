// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';
import { UiLocaleProvider, type UiLabels } from '@/locales/context';
import { esLabels } from '@/locales/es';
import { frLabels } from '@/locales/fr';
import { ptLabels } from '@/locales/pt';
import type { UserMenuLabels } from '@/shells/user-menu-content';
import { installMatchMedia } from '../../tests/fixtures/match-media';
import { AppSidebar } from './app-sidebar';

beforeEach(() => installMatchMedia());

afterEach(cleanup);

function sidebar(userMenuLabels?: Partial<UserMenuLabels>): ReactNode {
    return (
        <SidebarProvider>
            <AppSidebar
                logo={<span>logo</span>}
                logoHref="/"
                groups={[]}
                user={{ name: 'Ana', email: 'ana@example.test', avatar: '' }}
                settingsHref="/settings"
                logoutHref="/logout"
                userMenuLabels={userMenuLabels}
            />
        </SidebarProvider>
    );
}

async function openUserMenu(): Promise<void> {
    await userEvent.click(
        document.querySelector('[data-test="sidebar-menu-button"]')!,
    );
}

function under(labels: UiLabels, children: ReactNode) {
    return render(
        <UiLocaleProvider labels={labels}>{children}</UiLocaleProvider>,
    );
}

describe('the sidebar user menu', () => {
    it('keeps the English labels when nothing names them', async () => {
        render(sidebar());
        await openUserMenu();

        expect(await screen.findByText('Settings')).toBeDefined();
        expect(screen.getByText('Log out')).toBeDefined();
    });

    it('takes the labels the app hands AppSidebar', async () => {
        render(
            sidebar({
                settingsLabel: 'Definições',
                logoutLabel: 'Terminar sessão',
            }),
        );
        await openUserMenu();

        expect(await screen.findByText('Definições')).toBeDefined();
        expect(screen.getByText('Terminar sessão')).toBeDefined();
        expect(screen.queryByText('Log out')).toBeNull();
    });

    it.each([
        ['Portuguese', ptLabels, 'Definições', 'Terminar sessão'],
        ['French', frLabels, 'Paramètres', 'Se déconnecter'],
        ['Spanish', esLabels, 'Configuración', 'Cerrar sesión'],
    ])(
        'reads its labels from the %s locale',
        async (_, labels, settings, logout) => {
            under(labels, sidebar());
            await openUserMenu();

            expect(await screen.findByText(settings)).toBeDefined();
            expect(screen.getByText(logout)).toBeDefined();
        },
    );

    it('lets the labels the app hands it outrank the locale', async () => {
        under(ptLabels, sidebar({ logoutLabel: 'Sair' }));
        await openUserMenu();

        expect(await screen.findByText('Sair')).toBeDefined();
        expect(screen.getByText('Definições')).toBeDefined();
    });
});
