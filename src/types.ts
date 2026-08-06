import type {
    Column as TanstackColumn,
    ColumnDef as TanstackColumnDef,
    FilterFn as TanstackFilterFn,
    Row as TanstackRow,
    Table as TanstackTable,
} from '@tanstack/react-table';
import type { LucideIcon as LucideIconType } from 'lucide-react';
import type { ComponentType, MouseEvent, ReactNode } from 'react';

export type UrlLike = string | { url: string; method?: string };

export type Column<TData, TValue = unknown> = TanstackColumn<TData, TValue>;

export type ColumnDef<TData, TValue = unknown> = TanstackColumnDef<
    TData,
    TValue
>;

export type FilterFn<TData> = TanstackFilterFn<TData>;

export type Row<TData> = TanstackRow<TData>;

export type TableInstance<TData> = TanstackTable<TData>;

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
