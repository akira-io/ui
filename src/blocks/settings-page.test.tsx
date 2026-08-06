/** @vitest-environment jsdom */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { LinkProps } from '@/types';
import { KeyRound } from 'lucide-react';
import {
    SettingsEntry,
    SettingsGroup,
    SettingsPage,
    SettingsSection,
    settingsLabels,
} from './settings-page';

(
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;
let container: HTMLDivElement | undefined;

function render(element: React.ReactNode) {
    container ??= document.createElement('div');
    if (!container.isConnected) document.body.append(container);
    root ??= createRoot(container);
    act(() => root!.render(element));
    return container;
}

afterEach(() => {
    act(() => root?.unmount());
    container?.remove();
    root = undefined;
    container = undefined;
});

describe('SettingsEntry', () => {
    it('wraps the whole card in the link so the entire surface is the target', () => {
        const view = render(
            <SettingsEntry
                icon={KeyRound}
                title="Palavra-passe"
                description="Escolha uma palavra-passe longa"
                href="/settings/password"
            />,
        );
        const link = view.querySelector('[data-slot="settings-entry"]');

        expect(link?.tagName).toBe('A');
        expect(link?.getAttribute('href')).toBe('/settings/password');
        expect(link?.querySelector('[data-slot="card"]')).not.toBeNull();
        expect(link?.textContent).toContain('Palavra-passe');
    });

    it('renders through the link component the page provides', () => {
        const RouterLink = ({ href, children, ...props }: LinkProps) => (
            <a data-router-link="true" href={String(href)} {...props}>
                {children}
            </a>
        );

        const view = render(
            <SettingsPage linkComponent={RouterLink}>
                <SettingsEntry
                    icon={KeyRound}
                    title="Perfil"
                    href="/settings/profile"
                />
            </SettingsPage>,
        );
        const link = view.querySelector('[data-slot="settings-entry"]');

        expect(link?.getAttribute('data-router-link')).toBe('true');
    });

    it('lets an entry override the link component the page provides', () => {
        const PageLink = ({ href, children, ...props }: LinkProps) => (
            <a data-source="page" href={String(href)} {...props}>
                {children}
            </a>
        );
        const EntryLink = ({ href, children, ...props }: LinkProps) => (
            <a data-source="entry" href={String(href)} {...props}>
                {children}
            </a>
        );

        const view = render(
            <SettingsPage linkComponent={PageLink}>
                <SettingsEntry
                    icon={KeyRound}
                    title="Perfil"
                    href="/settings/profile"
                    linkComponent={EntryLink}
                />
            </SettingsPage>,
        );

        expect(
            view
                .querySelector('[data-slot="settings-entry"]')
                ?.getAttribute('data-source'),
        ).toBe('entry');
    });

    it('resolves an object href through the link component', () => {
        const view = render(
            <SettingsEntry
                icon={KeyRound}
                title="Perfil"
                href={{ url: '/settings/profile' }}
            />,
        );

        expect(
            view
                .querySelector('[data-slot="settings-entry"]')
                ?.getAttribute('href'),
        ).toBe('/settings/profile');
    });

    it('renders a disabled entry without a link and without a navigable target', () => {
        const view = render(
            <SettingsEntry
                icon={KeyRound}
                title="Faturação"
                href="/settings/billing"
                disabled
            />,
        );
        const entry = view.querySelector('[data-slot="settings-entry"]');

        expect(entry?.tagName).toBe('DIV');
        expect(entry?.getAttribute('aria-disabled')).toBe('true');
        expect(view.querySelector('a')).toBeNull();
        expect(
            view
                .querySelector('[data-slot="card"]')
                ?.getAttribute('data-disabled'),
        ).toBe('true');
    });

    it('renders the badge next to the title', () => {
        const view = render(
            <SettingsEntry
                icon={KeyRound}
                title="Faturação"
                href="/settings/billing"
                badge={<span data-testid="badge">Brevemente</span>}
            />,
        );

        expect(view.querySelector('[data-testid="badge"]')).not.toBeNull();
    });
});

describe('SettingsPage', () => {
    it('renders the heading only when a title is given', () => {
        const view = render(
            <SettingsPage description="Sem título">
                <span />
            </SettingsPage>,
        );

        expect(view.querySelector('h2')).toBeNull();

        render(
            <SettingsPage
                title="Configurações"
                description="Gerir a conta"
                control={<button type="button">Ajuda</button>}
            >
                <span />
            </SettingsPage>,
        );

        expect(view.querySelector('h2')?.textContent).toBe('Configurações');
        expect(view.textContent).toContain('Gerir a conta');
        expect(view.querySelector('button')?.textContent).toBe('Ajuda');
    });

    it('does not force a link component on consumers that render their own', () => {
        const onClick = vi.fn();
        const view = render(
            <SettingsPage>
                <SettingsGroup label="Conta">
                    <SettingsEntry
                        icon={KeyRound}
                        title="Perfil"
                        href="/settings/profile"
                    />
                </SettingsGroup>
            </SettingsPage>,
        );
        const link = view.querySelector('[data-slot="settings-entry"]');

        act(() => {
            link?.addEventListener('click', onClick);
            link?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(link?.tagName).toBe('A');
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});

describe('SettingsSection', () => {
    it('leads with a back link and no section navigation', () => {
        const view = render(
            <SettingsSection backHref="/settings" backLabel="Voltar">
                <p>Perfil</p>
            </SettingsSection>,
        );
        const back = view.querySelector('[data-slot="settings-section-back"]');

        expect(back?.getAttribute('href')).toBe('/settings');
        expect(back?.textContent).toContain('Voltar');
        expect(view.querySelectorAll('a')).toHaveLength(1);
    });

    it('carries the back link on its own so a page repeats nothing', () => {
        const view = render(
            <SettingsSection title="Perfil" description="Nome e email">
                <p>Formulário</p>
            </SettingsSection>,
        );
        const back = view.querySelector('[data-slot="settings-section-back"]');

        expect(back?.getAttribute('href')).toBe('/settings');
        expect(back?.textContent).toContain(settingsLabels.back);
        expect(view.querySelector('h2')?.textContent).toBe('Perfil');
        expect(view.textContent).toContain('Nome e email');
    });

    it('drops the back link when a page opts out', () => {
        const view = render(
            <SettingsSection title="Perfil" backHref={null}>
                <p>Formulário</p>
            </SettingsSection>,
        );

        expect(
            view.querySelector('[data-slot="settings-section-back"]'),
        ).toBeNull();
    });

    it('widens the column on request', () => {
        const view = render(
            <SettingsSection backHref="/settings" backLabel="Voltar">
                <p>Perfil</p>
            </SettingsSection>,
        );
        const narrow = view.querySelector('[data-slot="settings-section"]');

        expect(narrow?.classList.contains('max-w-2xl')).toBe(true);

        render(
            <SettingsSection backHref="/settings" backLabel="Voltar" wide>
                <p>Perfil</p>
            </SettingsSection>,
        );

        expect(
            view
                .querySelector('[data-slot="settings-section"]')
                ?.classList.contains('max-w-4xl'),
        ).toBe(true);
    });

    it('renders the back link through the given link component', () => {
        const RouterLink = ({ href, children, ...props }: LinkProps) => (
            <a data-router-link="true" href={String(href)} {...props}>
                {children}
            </a>
        );

        const view = render(
            <SettingsSection
                backHref="/settings"
                backLabel="Voltar"
                linkComponent={RouterLink}
            >
                <p>Perfil</p>
            </SettingsSection>,
        );

        expect(
            view
                .querySelector('[data-slot="settings-section-back"]')
                ?.getAttribute('data-router-link'),
        ).toBe('true');
    });
});

describe('SettingsGroup', () => {
    it('lays entries out in two columns by default and one on request', () => {
        const view = render(
            <SettingsGroup label="Conta">
                <span />
            </SettingsGroup>,
        );
        const grid = view.querySelector('[data-slot="settings-group-grid"]');

        expect(grid?.classList.contains('md:grid-cols-2')).toBe(true);

        render(
            <SettingsGroup columns={1}>
                <span />
            </SettingsGroup>,
        );

        expect(
            view
                .querySelector('[data-slot="settings-group-grid"]')
                ?.classList.contains('md:grid-cols-2'),
        ).toBe(false);
    });

    it('renders the label only when one is given', () => {
        const view = render(
            <SettingsGroup>
                <span />
            </SettingsGroup>,
        );

        expect(view.querySelector('p')).toBeNull();

        render(
            <SettingsGroup label="Conta">
                <span />
            </SettingsGroup>,
        );

        expect(view.querySelector('p')?.textContent).toBe('Conta');
    });
});
