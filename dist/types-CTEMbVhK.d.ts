import { LucideIcon as LucideIcon$1 } from 'lucide-react';
import { ComponentType, ReactNode, MouseEvent } from 'react';

interface SlotNameProps {
    slotName?: string;
}
type UrlLike = string | {
    url: string;
    method?: string;
};
type LucideIcon = LucideIcon$1;
type IconComponent = ComponentType<{
    className?: string;
}>;
interface NavItem {
    title: string;
    href: UrlLike;
    icon?: IconComponent | null;
    isActive?: boolean;
    badge?: ReactNode;
    badgeLabel?: string;
}
interface BreadcrumbItem {
    title: string;
    href: UrlLike;
}
interface NavGroup {
    label?: string;
    items: NavItem[];
}
interface UserMenuItem {
    title: string;
    href: UrlLike;
    icon?: IconComponent | null;
    external?: boolean;
    visible?: boolean;
    position?: 'before' | 'after';
}
interface SharedUser {
    name: string;
    email: string;
    avatar?: string;
}
interface LinkProps {
    href: UrlLike;
    children?: ReactNode;
    className?: string;
    prefetch?: boolean;
    as?: string;
    onClick?: (event: MouseEvent) => void;
    [key: string]: unknown;
}
type LinkComponent = ComponentType<LinkProps>;

export type { BreadcrumbItem as B, IconComponent as I, LinkComponent as L, NavItem as N, SlotNameProps as S, UrlLike as U, LucideIcon as a, SharedUser as b, UserMenuItem as c, LinkProps as d, NavGroup as e };
