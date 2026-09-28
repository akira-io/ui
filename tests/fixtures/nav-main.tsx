import { useState } from 'react';

import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { NavFooter } from '@/shells/nav-footer';
import { NavMain } from '@/shells/nav-main';
import type { NavItem } from '@/types';

export const reportItems: NavItem[] = [
    { title: 'Revenue', href: '/reports/revenue' },
    { title: 'Churn', href: '/reports/churn' },
];

export function CollapsibleGroup({
    currentUrl = '',
    label = 'Reports',
}: {
    currentUrl?: string;
    label?: string;
}) {
    return (
        <SidebarProvider>
            <NavMain
                items={reportItems}
                label={label}
                currentUrl={currentUrl}
                collapsible
            />
        </SidebarProvider>
    );
}

export function ControlledGroup({
    initialCollapsed = [],
}: {
    initialCollapsed?: string[];
}) {
    const [collapsedGroups, setCollapsedGroups] =
        useState<string[]>(initialCollapsed);

    return (
        <SidebarProvider>
            <NavMain
                items={reportItems}
                label="Reports"
                collapsible
                collapsedGroups={collapsedGroups}
                onCollapsedChange={setCollapsedGroups}
            />
        </SidebarProvider>
    );
}

export function groupTrigger(): HTMLElement {
    const trigger = document.querySelector<HTMLElement>(
        '[data-slot="sidebar-group-label"]',
    );

    if (!trigger) {
        throw new Error('the group has no collapsible trigger');
    }

    return trigger;
}

export function groupIsOpen(): boolean {
    return groupTrigger().getAttribute('data-state') === 'open';
}

export function BadgedGroup({
    items,
    collapsible = false,
}: {
    items: NavItem[];
    collapsible?: boolean;
}) {
    return (
        <SidebarProvider>
            <NavMain items={items} label="Platform" collapsible={collapsible} />
        </SidebarProvider>
    );
}

export function BadgedRail({ items }: { items: NavItem[] }) {
    return (
        <SidebarProvider defaultOpen={false}>
            <Sidebar collapsible="icon">
                <NavMain items={items} label="Platform" />
            </Sidebar>
        </SidebarProvider>
    );
}

export function BadgedFooter({ items }: { items: NavItem[] }) {
    return (
        <SidebarProvider>
            <NavFooter items={items} />
        </SidebarProvider>
    );
}

export function railIsCollapsed(): boolean {
    return (
        document
            .querySelector('[data-slot="sidebar"]')
            ?.getAttribute('data-collapsible') === 'icon'
    );
}

export function navBadge(title: string): HTMLElement | null {
    return itemContainer(title).querySelector<HTMLElement>(
        '[data-slot="sidebar-menu-badge"]',
    );
}

export function navBadgeDot(title: string): HTMLElement | null {
    return itemContainer(title).querySelector<HTMLElement>(
        '[data-slot="nav-badge-dot"]',
    );
}

export function navLink(title: string): HTMLElement {
    const link = itemContainer(title).querySelector<HTMLElement>('a');

    if (!link) {
        throw new Error(`the item has no link: ${title}`);
    }

    return link;
}

function itemContainer(title: string): HTMLElement {
    const labels = document.querySelectorAll<HTMLElement>(
        '[data-slot="sidebar-menu-item"] a > span',
    );

    for (const label of labels) {
        if (label.textContent !== title) {
            continue;
        }

        const item = label.closest<HTMLElement>(
            '[data-slot="sidebar-menu-item"]',
        );

        if (item) {
            return item;
        }
    }

    throw new Error(`no nav item carries the label: ${title}`);
}
