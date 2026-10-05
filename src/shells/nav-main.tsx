import { ChevronDown } from 'lucide-react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useCollapsedGroup } from '@/hooks/use-collapsed-groups';
import { hrefToString, mostSpecificActiveHref, resolveLink } from '@/lib/href';
import { cn } from '@/lib/utils';
import type { LinkComponent, NavItem } from '@/types';
import type { ReactNode } from 'react';

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

function isItemActive(item: NavItem, activeHref: string): boolean {
    if (item.isActive !== undefined) {
        return item.isActive;
    }

    return activeHref !== '' && hrefToString(item.href) === activeHref;
}

export interface NavMainProps {
    items: NavItem[];
    label?: string;
    currentUrl?: string;
    linkComponent?: LinkComponent;
    collapsible?: boolean;
    defaultOpen?: boolean;
    collapsedGroups?: string[];
    onCollapsedChange?: (collapsedGroups: string[]) => void;
}

export function NavMain({
    items = [],
    label,
    currentUrl = '',
    linkComponent,
    collapsible = false,
    defaultOpen = true,
    collapsedGroups,
    onCollapsedChange,
}: NavMainProps) {
    const Link = resolveLink(linkComponent);
    const { state, isMobile } = useSidebar();
    const activeHref = currentUrl
        ? mostSpecificActiveHref(
              items
                  .filter((item) => item.isActive === undefined)
                  .map((item) => item.href),
              currentUrl,
          )
        : '';
    const holdsCurrentRoute = items.some((item) =>
        isItemActive(item, activeHref),
    );
    const { open, setOpen } = useCollapsedGroup({
        group: label ?? '',
        defaultOpen,
        collapsedGroups,
        onCollapsedChange,
    });
    const showsIconsOnly = state === 'collapsed' && !isMobile;
    const expanded = open || holdsCurrentRoute || showsIconsOnly;

    const menu = (
        <SidebarMenu>
            {items.map((item) => {
                const badge = badgeContent(item.badge);

                return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isItemActive(item, activeHref)}
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
                                    aria-hidden={
                                        item.badgeLabel ? true : undefined
                                    }
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
            })}
        </SidebarMenu>
    );

    if (!collapsible || !label) {
        return (
            <SidebarGroup className="px-2 py-0">
                {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
                {menu}
            </SidebarGroup>
        );
    }

    return (
        <SidebarGroup className="px-2 py-0">
            <Collapsible
                open={expanded}
                onOpenChange={showsIconsOnly ? undefined : setOpen}
            >
                <CollapsibleTrigger asChild>
                    <SidebarGroupLabel asChild>
                        <button
                            type="button"
                            tabIndex={showsIconsOnly ? -1 : undefined}
                            className="w-full cursor-pointer justify-between text-left"
                        >
                            {label}
                            <ChevronDown
                                className={cn(
                                    'size-4 transition-transform',
                                    !expanded && '-rotate-90',
                                )}
                            />
                        </button>
                    </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>{menu}</CollapsibleContent>
            </Collapsible>
        </SidebarGroup>
    );
}
