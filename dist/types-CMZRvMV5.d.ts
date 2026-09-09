import { Column as Column$1, ColumnDef as ColumnDef$1, FilterFn as FilterFn$1, Row as Row$1, Table } from '@tanstack/react-table';
import { LucideIcon as LucideIcon$1 } from 'lucide-react';
import { ComponentType, ReactNode, MouseEvent } from 'react';

interface SlotNameProps {
    slotName?: string;
}
type UrlLike = string | {
    url: string;
    method?: string;
};
type Column<TData, TValue = unknown> = Column$1<TData, TValue>;
type ColumnDef<TData, TValue = unknown> = ColumnDef$1<TData, TValue>;
type FilterFn<TData> = FilterFn$1<TData>;
type Row<TData> = Row$1<TData>;
type TableInstance<TData> = Table<TData>;
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

export type { BreadcrumbItem as B, Column as C, FilterFn as F, IconComponent as I, LinkComponent as L, NavGroup as N, Row as R, SlotNameProps as S, TableInstance as T, UrlLike as U, ColumnDef as a, LucideIcon as b, NavItem as c, SharedUser as d, LinkProps as e };
