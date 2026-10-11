import { Folder } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { hrefToString, resolveLink } from '@/lib/href';
import type { LinkComponent, NavItem, NavSubgroup } from '@/types';

export interface NavRailSubgroupProps {
    group: NavSubgroup;
    isItemActive: (item: NavItem) => boolean;
    linkComponent?: LinkComponent;
}

export function NavRailSubgroup({
    group,
    isItemActive,
    linkComponent,
}: NavRailSubgroupProps) {
    const Link = resolveLink(linkComponent);
    const Icon = group.icon ?? Folder;
    const label = group.label ?? '';

    return (
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                        tooltip={label}
                        isActive={group.items.some(isItemActive)}
                    >
                        <Icon />
                        <span>{label}</span>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                    {label !== '' && (
                        <DropdownMenuLabel>{label}</DropdownMenuLabel>
                    )}
                    {group.items.map((item, index) => (
                        <DropdownMenuItem
                            key={`${hrefToString(item.href)}:${item.title}:${index}`}
                            asChild
                        >
                            <Link href={item.href}>{item.title}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
}
