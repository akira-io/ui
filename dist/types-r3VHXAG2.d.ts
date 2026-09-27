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
}
interface BreadcrumbItem {
    title: string;
    href: UrlLike;
}
interface NavGroup {
    label?: string;
    items: NavItem[];
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

export type { BreadcrumbItem as B, IconComponent as I, LinkComponent as L, NavGroup as N, SlotNameProps as S, UrlLike as U, LucideIcon as a, NavItem as b, SharedUser as c, LinkProps as d };
