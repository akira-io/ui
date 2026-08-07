// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { AppearanceToggle } from '@/components/ui/appearance-toggle';
import { appearanceToggleLabelsPt } from '@/locales/pt';

let systemPrefersDark = false;
const listeners = new Set<() => void>();

function installMatchMedia() {
    window.matchMedia = ((query: string) => ({
        matches: query.includes('dark') && systemPrefersDark,
        media: query,
        onchange: null,
        addEventListener: (_: string, listener: () => void) => {
            listeners.add(listener);
        },
        removeEventListener: (_: string, listener: () => void) => {
            listeners.delete(listener);
        },
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
}

function changeSystemPreference(prefersDark: boolean) {
    systemPrefersDark = prefersDark;
    for (const listener of listeners) {
        listener();
    }
}

function isDark(): boolean {
    return document.documentElement.classList.contains('dark');
}

beforeEach(() => {
    systemPrefersDark = false;
    listeners.clear();
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    installMatchMedia();
});

afterEach(cleanup);

describe('the segmented appearance toggle', () => {
    it('names every option so the icon is not the only label', () => {
        render(<AppearanceToggle />);

        expect(screen.getByRole('radio', { name: 'Light' })).toBeDefined();
        expect(screen.getByRole('radio', { name: 'Dark' })).toBeDefined();
        expect(screen.getByRole('radio', { name: 'System' })).toBeDefined();
    });

    it('applies the dark theme when dark is chosen', async () => {
        const user = userEvent.setup();
        render(<AppearanceToggle />);

        await user.click(screen.getByRole('radio', { name: 'Dark' }));

        expect(isDark()).toBe(true);
        expect(document.documentElement.style.colorScheme).toBe('dark');
    });

    it('applies the light theme when light is chosen', async () => {
        const user = userEvent.setup();
        render(<AppearanceToggle />);

        await user.click(screen.getByRole('radio', { name: 'Dark' }));
        await user.click(screen.getByRole('radio', { name: 'Light' }));

        expect(isDark()).toBe(false);
    });

    it('persists the choice across a remount', async () => {
        const user = userEvent.setup();
        const first = render(<AppearanceToggle />);

        await user.click(screen.getByRole('radio', { name: 'Dark' }));
        expect(localStorage.getItem('appearance')).toBe('dark');

        first.unmount();
        document.documentElement.classList.remove('dark');
        render(<AppearanceToggle />);

        expect(isDark()).toBe(true);
        expect(
            screen
                .getByRole('radio', { name: 'Dark' })
                .getAttribute('data-state'),
        ).toBe('on');
    });

    it('follows the media query when system is chosen', async () => {
        const user = userEvent.setup();
        systemPrefersDark = true;
        render(<AppearanceToggle />);

        await user.click(screen.getByRole('radio', { name: 'System' }));

        expect(isDark()).toBe(true);
    });

    it('leaves the light theme applied when system prefers light', async () => {
        const user = userEvent.setup();
        render(<AppearanceToggle />);

        await user.click(screen.getByRole('radio', { name: 'Dark' }));
        await user.click(screen.getByRole('radio', { name: 'System' }));

        expect(isDark()).toBe(false);
    });

    it('follows a later media query change while on system', async () => {
        const user = userEvent.setup();
        render(<AppearanceToggle />);

        await user.click(screen.getByRole('radio', { name: 'System' }));
        changeSystemPreference(true);

        expect(isDark()).toBe(true);
    });

    it('takes translated labels', () => {
        render(<AppearanceToggle labels={appearanceToggleLabelsPt} />);

        expect(screen.getByRole('radio', { name: 'Escuro' })).toBeDefined();
        expect(
            document
                .querySelector('[data-slot="toggle-group"]')
                ?.getAttribute('aria-label'),
        ).toBe('Aparência');
    });

    it('marks itself with a data slot', () => {
        render(<AppearanceToggle />);

        expect(
            document.querySelector('[data-slot="appearance-toggle"]'),
        ).not.toBeNull();
    });
});

describe('the menu appearance toggle', () => {
    it('names its trigger and applies the chosen theme', async () => {
        const user = userEvent.setup();
        render(<AppearanceToggle variant="menu" />);

        await user.click(screen.getByRole('button', { name: 'Appearance' }));
        await user.click(
            await screen.findByRole('menuitemradio', { name: 'Dark' }),
        );

        expect(isDark()).toBe(true);
        expect(localStorage.getItem('appearance')).toBe('dark');
    });

    it('marks the current option as checked', async () => {
        const user = userEvent.setup();
        localStorage.setItem('appearance', 'light');
        render(<AppearanceToggle variant="menu" />);

        await user.click(screen.getByRole('button', { name: 'Appearance' }));

        expect(
            (
                await screen.findByRole('menuitemradio', { name: 'Light' })
            ).getAttribute('aria-checked'),
        ).toBe('true');
    });
});
