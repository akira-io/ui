// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { Archive } from 'lucide-react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';

import { installMatchMedia } from '../../tests/fixtures/match-media';
import { NavMain } from './nav-main';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

function renderGroup(collapsible: boolean) {
    render(
        <SidebarProvider>
            <NavMain
                label="Workspace"
                collapsible={collapsible}
                items={[]}
                groups={[
                    {
                        label: 'Archive',
                        icon: Archive,
                        items: [{ title: '2025', href: '/archive/2025' }],
                    },
                    {
                        label: 'Reports',
                        items: [],
                        groups: [
                            {
                                label: 'Quarterly',
                                icon: Archive,
                                items: [{ title: 'Q1', href: '/q1' }],
                            },
                        ],
                    },
                ]}
            />
        </SidebarProvider>,
    );
}

describe('the icon of a parent group', () => {
    it('draws the icon before its name on the toggle', () => {
        renderGroup(true);

        const toggle = screen.getByRole('button', { name: 'Archive' });
        const icon = toggle.querySelector('svg.lucide-archive');

        expect(icon).not.toBeNull();
        expect(toggle.firstElementChild).toBe(icon);
    });

    it('draws the icon before its name on a heading that cannot collapse', () => {
        renderGroup(false);

        const heading = screen
            .getByText('Archive')
            .closest('[data-slot="nav-sub-group-label"]');

        expect(heading?.firstElementChild?.matches('svg.lucide-archive')).toBe(
            true,
        );
    });

    it('falls back to a folder for a group without one', () => {
        renderGroup(true);

        const toggle = screen.getByRole('button', { name: 'Reports' });

        expect(toggle.firstElementChild?.matches('svg.lucide-folder')).toBe(
            true,
        );
    });

    it('draws its own icon on a nested group', () => {
        renderGroup(true);

        const toggle = screen.getByRole('button', { name: 'Quarterly' });

        expect(toggle.firstElementChild?.matches('svg.lucide-archive')).toBe(
            true,
        );
    });
});
