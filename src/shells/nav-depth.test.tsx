// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { SidebarMenu, SidebarProvider } from '@/components/ui/sidebar';
import { resetDevWarnings } from '@/lib/dev-warning';
import {
    collectItems,
    markActiveItems,
    NAV_DEPTH_WARNING,
} from '@/lib/nav-groups';
import type { NavGroup, NavSubgroup } from '@/types';

import { installMatchMedia } from '../../tests/fixtures/match-media';
import { AppSidebar } from './app-sidebar';
import { NavSubGroup } from './nav-sub-group';

beforeAll(() => {
    installMatchMedia();
});

afterEach(() => {
    cleanup();
    resetDevWarnings();
    vi.restoreAllMocks();
});

const archive = {
    label: 'Archive',
    items: [{ title: '2025', href: '/2025' }],
    groups: [{ label: 'Older', items: [{ title: '2024', href: '/2024' }] }],
} as unknown as NavSubgroup;

const reports: NavSubgroup = {
    label: 'Reports',
    items: [{ title: 'Revenue', href: '/revenue' }],
};

function renderSubgroup(group: NavSubgroup) {
    render(
        <SidebarProvider>
            <SidebarMenu>
                <NavSubGroup
                    group={group}
                    parentKey="Workspace"
                    isItemActive={() => false}
                    collapsible
                />
            </SidebarMenu>
        </SidebarProvider>,
    );
}

describe('a sidebar three levels deep', () => {
    it('draws two levels and leaves the third out', () => {
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        renderSubgroup(archive);

        expect(screen.getByText('2025')).toBeTruthy();
        expect(screen.queryByText('Older')).toBeNull();
        expect(screen.queryByText('2024')).toBeNull();
    });

    it('warns that the HIG allows two levels', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        renderSubgroup(archive);

        expect(warn).toHaveBeenCalledWith(
            expect.stringContaining(NAV_DEPTH_WARNING),
        );
    });

    it('does not count a route it cannot show', () => {
        expect(
            collectItems({ items: [], groups: [archive] }).map(
                (item) => item.title,
            ),
        ).toEqual(['2025']);
    });

    it('marks two levels active and drops the third', () => {
        const [workspace] = markActiveItems(
            [
                { label: 'Workspace', items: [], groups: [archive] },
            ] as NavGroup[],
            '/2025',
        );
        const [subgroup] = workspace.groups ?? [];

        expect(subgroup.items[0].isActive).toBe(true);
        expect('groups' in subgroup).toBe(false);
    });

    it('draws two levels without a warning', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        renderSubgroup(reports);

        expect(screen.getByText('Revenue')).toBeTruthy();
        expect(warn).not.toHaveBeenCalled();
    });

    it('warns through AppSidebar, which marks the active route first', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        render(
            <SidebarProvider>
                <AppSidebar
                    logo={<span>logo</span>}
                    logoHref="/"
                    groups={
                        [
                            {
                                label: 'Workspace',
                                items: [],
                                groups: [archive],
                            },
                        ] as NavGroup[]
                    }
                    currentUrl="/2025"
                />
            </SidebarProvider>,
        );

        expect(screen.queryByText('2024')).toBeNull();
        expect(warn).toHaveBeenCalledWith(
            expect.stringContaining(NAV_DEPTH_WARNING),
        );
    });

    it('stays quiet for an empty list of deeper groups', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        renderSubgroup({ ...reports, groups: [] } as unknown as NavSubgroup);

        expect(warn).not.toHaveBeenCalled();
    });
});
