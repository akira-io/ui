import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

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
import { hrefToString, resolveLink } from '@/lib/href';
import { cn } from '@/lib/utils';
import type { LinkComponent, NavItem } from '@/types';

export function NavMain({
    items = [],
    label = 'Platform',
    currentUrl = '',
    linkComponent,
    collapsible = false,
    defaultOpen = true,
}: {
    items: NavItem[];
    label?: string;
    currentUrl?: string;
    linkComponent?: LinkComponent;
    collapsible?: boolean;
    defaultOpen?: boolean;
}) {
    const Link = resolveLink(linkComponent);
    const [open, setOpen] = useState(defaultOpen);

    const menu = (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild
                        isActive={
                            item.isActive ??
                            (currentUrl
                                ? currentUrl.startsWith(hrefToString(item.href))
                                : false)
                        }
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
            <Collapsible
                open={open}
                onOpenChange={setOpen}
                className="p-0 rounded-none border-0 bg-transparent shadow-none ring-0 backdrop-blur-none"
            >
                <CollapsibleTrigger asChild>
                    <SidebarGroupLabel className="w-full cursor-pointer justify-between">
                        {label}
                        <ChevronDown
                            className={cn(
                                'size-4 transition-transform',
                                !open && '-rotate-90',
                            )}
                        />
                    </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>{menu}</CollapsibleContent>
            </Collapsible>
        </SidebarGroup>
    );
}
