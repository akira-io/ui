import { useState } from 'react';

import { SidebarProvider } from '@/components/ui/sidebar';
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
