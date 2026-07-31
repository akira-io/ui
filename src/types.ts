import type { ComponentType, MouseEvent, ReactNode } from 'react';

export type UrlLike = string | { url: string; method?: string };

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
