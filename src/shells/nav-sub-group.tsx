import { ChevronDown } from 'lucide-react';

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
    const Link = resolveLink(linkComponent);
    const label = group.label ?? '';
    const key = groupKey(parentKey, label);
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
            {group.items.map((item) => (
                <SidebarMenuSubItem
                    key={`${hrefToString(item.href)}:${item.title}`}
                >
                    <SidebarMenuSubButton asChild isActive={isItemActive(item)}>
                        <Link href={item.href} prefetch>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuSubButton>
                </SidebarMenuSubItem>
            ))}
            {(group.groups ?? []).map((subgroup, index) => (
                <NavSubGroup
                    key={subgroup.label ?? index}
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

    if (!collapsible) {
        return (
            <SidebarMenuItem>
                <div
                    data-slot="nav-sub-group-label"
                    className="h-9 px-2.5 text-sm font-medium flex items-center text-sidebar-foreground/70"
                >
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
                    <SidebarMenuButton className="justify-between">
                        <span>{label}</span>
                        <ChevronDown
                            className={cn(
                                'size-4 transition-transform',
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
