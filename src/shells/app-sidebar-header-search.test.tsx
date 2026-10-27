// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';

import { installMatchMedia } from '../../tests/fixtures/match-media';
import { AppSidebarHeader } from './app-sidebar-header';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

function searchButton(): HTMLElement {
    render(
        <SidebarProvider>
            <AppSidebarHeader onSearchClick={() => undefined} />
        </SidebarProvider>,
    );

    return screen.getByRole('button', { name: /search/i });
}

describe('the header search', () => {
    it('is a field capsule rather than a bordered grey box', () => {
        const classes = searchButton().className.split(' ');

        expect(classes).toEqual(
            expect.arrayContaining([
                'bg-(--field-fill)',
                'rounded-full',
                'hover:bg-(--glass-highlight)',
                'dark:glass-button',
            ]),
        );
        expect(classes).not.toContain('border');
        expect(classes.join(' ')).not.toContain('bg-muted');
    });

    it('prints the shortcut without an opaque key cap', () => {
        const key = searchButton().querySelector('kbd')!;

        const classes = key.className.split(' ');

        expect(classes.filter((name) => name.startsWith('bg-'))).toEqual([]);
        expect(classes).not.toContain('border');
    });
});
