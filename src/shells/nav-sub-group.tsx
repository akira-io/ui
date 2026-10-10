import { ChevronDown, Folder } from 'lucide-react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useCollapsedGroup } from '@/hooks/use-collapsed-groups';
import { hrefToString, resolveLink } from '@/lib/href';
import { collectItems, groupKey } from '@/lib/nav-groups';
import { cn } from '@/lib/utils';
import type { LinkComponent, NavGroup, NavItem } from '@/types';

import { badgeContent } from './nav-main-item';

export interface NavSubGroupProps {
    group: NavGroup;
    parentKey: string;
    isItemActive: (item: NavItem) => boolean;
    collapsible: boolean;
    linkComponent?: LinkComponent;
    collapsedGroups?: string[];
    onCollapsedChange?: (collapsedGroups: string[]) => void;
}

export function NavSubGroup({
    group,
    parentKey,
    isItemActive,
    collapsible,
    linkComponent,
    collapsedGroups,
    onCollapsedChange,
}: NavSubGroupProps) {
    const label = group.label ?? '';
    const Icon = group.icon ?? Folder;
    const key = label === '' ? parentKey : groupKey(parentKey, label);
    const { open, setOpen } = useCollapsedGroup({
        group: key,
        defaultOpen: group.defaultOpen ?? true,
        collapsedGroups,
        onCollapsedChange,
    });
    const holdsCurrentRoute = collectItems(group).some(isItemActive);
    const expanded = open || holdsCurrentRoute;

    const menu = (
        <SidebarMenuSub>
            {group.items.map((item, index) => (
                <SidebarMenuSubItem
                    key={`${hrefToString(item.href)}:${item.title}:${index}`}
                >
                    <NavSubGroupLink
                        item={item}
                        isActive={isItemActive(item)}
                        linkComponent={linkComponent}
                    />
                </SidebarMenuSubItem>
            ))}
            {(group.groups ?? []).map((subgroup, index) => (
                <NavSubGroup
                    key={`${subgroup.label ?? ''}:${index}`}
                    group={subgroup}
                    parentKey={key}
                    isItemActive={isItemActive}
                    collapsible={collapsible}
                    linkComponent={linkComponent}
                    collapsedGroups={collapsedGroups}
                    onCollapsedChange={onCollapsedChange}
                />
            ))}
        </SidebarMenuSub>
    );

    if (label === '') {
        return <SidebarMenuItem>{menu}</SidebarMenuItem>;
    }

    if (!collapsible) {
        return (
            <SidebarMenuItem>
                <div
                    data-slot="nav-sub-group-label"
                    className="h-8 gap-2 px-2.5 text-sm font-medium [&>svg]:size-4.5 flex items-center text-sidebar-foreground/70 [&>svg]:shrink-0"
                >
                    <Icon />
                    {label}
                </div>
                {menu}
            </SidebarMenuItem>
        );
    }

    return (
        <SidebarMenuItem>
            <Collapsible open={expanded} onOpenChange={setOpen}>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <Icon />
                        <span>{label}</span>
                        <ChevronDown
                            className={cn(
                                'size-4 ml-auto transition-transform',
                                !expanded && '-rotate-90',
                            )}
                        />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>{menu}</CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );
}

interface NavSubGroupLinkProps {
    item: NavItem;
    isActive: boolean;
    linkComponent?: LinkComponent;
}

function NavSubGroupLink({
    item,
    isActive,
    linkComponent,
}: NavSubGroupLinkProps) {
    const Link = resolveLink(linkComponent);
    const badge = badgeContent(item.badge);

    return (
        <>
            <SidebarMenuSubButton
                asChild
                isActive={isActive}
                className={badge === null ? undefined : 'pr-9'}
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
            </SidebarMenuSubButton>
            {badge !== null && (
                <span
                    data-slot="nav-sub-badge"
                    aria-hidden={item.badgeLabel ? true : undefined}
                    className="right-1 min-w-5 px-1 h-5 text-xs font-medium pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md bg-primary text-primary-foreground tabular-nums"
                >
                    {badge}
                </span>
            )}
        </>
    );
}
