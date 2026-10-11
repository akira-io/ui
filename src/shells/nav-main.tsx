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
    useSidebar,
} from '@/components/ui/sidebar';
import { useCollapsedGroup } from '@/hooks/use-collapsed-groups';
import { hrefToString, mostSpecificActiveHref } from '@/lib/href';
import { collectItems } from '@/lib/nav-groups';
import { cn } from '@/lib/utils';
import type { LinkComponent, NavItem, NavSubgroup } from '@/types';

import { NavMainItem } from './nav-main-item';
import { NavRailSubgroup } from './nav-rail-subgroup';
import { NavSubGroup } from './nav-sub-group';

function isItemActive(item: NavItem, activeHref: string): boolean {
    if (item.isActive !== undefined) {
        return item.isActive;
    }

    return activeHref !== '' && hrefToString(item.href) === activeHref;
}

export interface NavMainProps {
    items: NavItem[];
    groups?: NavSubgroup[];
    label?: string;
    iconRail?: boolean;
    currentUrl?: string;
    linkComponent?: LinkComponent;
    collapsible?: boolean;
    defaultOpen?: boolean;
    collapsedGroups?: string[];
    onCollapsedChange?: (collapsedGroups: string[]) => void;
}

export function NavMain({
    items = [],
    groups = [],
    label,
    iconRail = true,
    currentUrl = '',
    linkComponent,
    collapsible = false,
    defaultOpen = true,
    collapsedGroups,
    onCollapsedChange,
}: NavMainProps) {
    const { state, isMobile } = useSidebar();
    const allItems = collectItems({ items, groups });
    const activeHref = currentUrl
        ? mostSpecificActiveHref(
              allItems
                  .filter((item) => item.isActive === undefined)
                  .map((item) => item.href),
              currentUrl,
          )
        : '';
    const isActive = (item: NavItem) => isItemActive(item, activeHref);
    const holdsCurrentRoute = allItems.some(isActive);
    const { open, setOpen } = useCollapsedGroup({
        group: label ?? '',
        defaultOpen,
        collapsedGroups,
        onCollapsedChange,
    });
    const showsIconsOnly = iconRail && state === 'collapsed' && !isMobile;
    const expanded = open || holdsCurrentRoute || showsIconsOnly;

    const menu = (
        <SidebarMenu>
            {items.map((item, index) => (
                <NavMainItem
                    key={`${hrefToString(item.href)}:${item.title}:${index}`}
                    item={item}
                    isActive={isActive(item)}
                    linkComponent={linkComponent}
                />
            ))}
            {showsIconsOnly &&
                groups.map((group, index) => (
                    <NavRailSubgroup
                        key={`${group.label ?? ''}:${index}`}
                        group={group}
                        isItemActive={isActive}
                        linkComponent={linkComponent}
                    />
                ))}
            {!showsIconsOnly &&
                groups.map((group, index) => (
                    <NavSubGroup
                        key={`${group.label ?? ''}:${index}`}
                        group={group}
                        parentKey={label ?? ''}
                        isItemActive={isActive}
                        collapsible={collapsible}
                        linkComponent={linkComponent}
                        collapsedGroups={collapsedGroups}
                        onCollapsedChange={onCollapsedChange}
                    />
                ))}
        </SidebarMenu>
    );

    if (!collapsible || !label) {
        return (
            <SidebarGroup className="py-0 px-item">
                {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
                {menu}
            </SidebarGroup>
        );
    }

    return (
        <SidebarGroup className="py-0 px-item">
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
                                    'size-icon transition-transform',
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
