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
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCollapsedGroup } from '@/hooks/use-collapsed-groups';
import { pathOfHref, resolveLink } from '@/lib/href';
import { cn } from '@/lib/utils';
import type { LinkComponent, NavItem } from '@/types';

function isItemActive(item: NavItem, currentUrl: string): boolean {
    if (item.isActive !== undefined) {
        return item.isActive;
    }

    if (!currentUrl) {
        return false;
    }

    const currentPath = pathOfHref(currentUrl);
    const path = pathOfHref(item.href);

    return currentPath === path || currentPath.startsWith(`${path}/`);
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
    label = 'Platform',
    currentUrl = '',
    linkComponent,
    collapsible = false,
    defaultOpen = true,
    collapsedGroups,
    onCollapsedChange,
}: NavMainProps) {
    const Link = resolveLink(linkComponent);
    const holdsCurrentRoute = items.some((item) =>
        isItemActive(item, currentUrl),
    );
    const { open, setOpen } = useCollapsedGroup({
        group: label,
        defaultOpen,
        collapsedGroups,
        onCollapsedChange,
    });
    const expanded = open || holdsCurrentRoute;

    const menu = (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild
                        isActive={isItemActive(item, currentUrl)}
                        tooltip={{ children: item.title }}
                    >
                        <Link href={item.href} prefetch>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
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
            <Collapsible open={expanded} onOpenChange={setOpen}>
                <CollapsibleTrigger asChild>
                    <SidebarGroupLabel className="w-full cursor-pointer justify-between">
                        {label}
                        <ChevronDown
                            className={cn(
                                'size-4 transition-transform',
                                !expanded && '-rotate-90',
                            )}
                        />
                    </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>{menu}</CollapsibleContent>
            </Collapsible>
        </SidebarGroup>
    );
}
