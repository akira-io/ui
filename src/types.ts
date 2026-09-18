import type { LucideIcon as LucideIconType } from 'lucide-react';
import type { ComponentType, MouseEvent, ReactNode } from 'react';

export interface SlotNameProps {
    slotName?: string;
}

export type UrlLike = string | { url: string; method?: string };

export type LucideIcon = LucideIconType;

export type IconComponent = ComponentType<{ className?: string }>;

export interface NavItem {
    title: string;
    href: UrlLike;
    icon?: IconComponent | null;
    isActive?: boolean;
}

export interface BreadcrumbItem {
    title: string;
    href: UrlLike;
}

export interface NavGroup {
    label?: string;
    items: NavItem[];
}

export interface SharedUser {
    name: string;
    email: string;
    avatar?: string;
}

export interface LinkProps {
    href: UrlLike;
    children?: ReactNode;
    className?: string;
    prefetch?: boolean;
    as?: string;
    onClick?: (event: MouseEvent) => void;
    [key: string]: unknown;
}

export type LinkComponent = ComponentType<LinkProps>;
