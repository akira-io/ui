import type { ReactNode } from 'react';

import {
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { resolveLink } from '@/lib/href';
import type { LinkComponent, NavItem } from '@/types';

const BADGE_CEILING = 99;

function badgeContent(badge: NavItem['badge']): ReactNode {
    if (typeof badge === 'number') {
        if (!Number.isFinite(badge) || badge < 1) {
            return null;
        }

        return badge > BADGE_CEILING
            ? `${BADGE_CEILING}+`
            : String(Math.trunc(badge));
    }

    if (typeof badge === 'string') {
        return badge.trim() === '' ? null : badge;
    }

    if (typeof badge === 'boolean' || badge === null || badge === undefined) {
        return null;
    }

    if (Array.isArray(badge) && badge.length === 0) {
        return null;
    }

    return badge;
}

function tooltipText(item: NavItem, badge: ReactNode): string {
    if (badge === null) {
        return item.title;
    }

    const suffix =
        item.badgeLabel ?? (typeof badge === 'string' ? badge : undefined);

    return suffix ? `${item.title} (${suffix})` : item.title;
}

export interface NavMainItemProps {
    item: NavItem;
    isActive: boolean;
    linkComponent?: LinkComponent;
}

export function NavMainItem({
    item,
    isActive,
    linkComponent,
}: NavMainItemProps) {
    const Link = resolveLink(linkComponent);
    const badge = badgeContent(item.badge);

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={{ children: tooltipText(item, badge) }}
                className={
                    badge === null
                        ? undefined
                        : 'pr-10 group-data-[collapsible=icon]:pr-2.5!'
                }
            >
                <Link
                    href={item.href}
                    prefetch
                    aria-label={
                        badge !== null && item.badgeLabel
                            ? `${item.title}, ${item.badgeLabel}`
                            : undefined
                    }
                >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
            {badge !== null && (
                <>
                    <SidebarMenuBadge
                        aria-hidden={item.badgeLabel ? true : undefined}
                        className="top-1/2! -translate-y-1/2! bg-primary text-primary-foreground peer-hover/menu-button:text-primary-foreground peer-data-[active=true]/menu-button:text-primary-foreground"
                    >
                        {badge}
                    </SidebarMenuBadge>
                    <span
                        data-slot="nav-badge-dot"
                        aria-hidden
                        className="top-1 right-1 size-2 pointer-events-none absolute hidden rounded-full bg-primary group-data-[collapsible=icon]:block"
                    />
                </>
            )}
        </SidebarMenuItem>
    );
}
