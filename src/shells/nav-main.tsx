import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { hrefToString, resolveLink } from '@/lib/href';
import type { LinkComponent, NavItem } from '@/types';

export function NavMain({
    items = [],
    label = 'Platform',
    currentUrl = '',
    linkComponent,
}: {
    items: NavItem[];
    label?: string;
    currentUrl?: string;
    linkComponent?: LinkComponent;
}) {
    const Link = resolveLink(linkComponent);

    return (
        <SidebarGroup className="px-2 py-0">
            {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={
                                item.isActive ??
                                (currentUrl
                                    ? currentUrl.startsWith(
                                          hrefToString(item.href),
                                      )
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
        </SidebarGroup>
    );
}
