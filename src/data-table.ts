'use client';

import type {
    Column as TanstackColumn,
    ColumnDef as TanstackColumnDef,
    FilterFn as TanstackFilterFn,
    Row as TanstackRow,
    Table as TanstackTable,
} from '@tanstack/react-table';

export * from '@/components/ui/data-table';
export * from '@/components/ui/data-table-faceted-filter';
export * from '@/components/ui/data-table-row-actions';

export type Column<TData, TValue = unknown> = TanstackColumn<TData, TValue>;

export type ColumnDef<TData, TValue = unknown> = TanstackColumnDef<
    TData,
    TValue
>;

export type FilterFn<TData> = TanstackFilterFn<TData>;

export type Row<TData> = TanstackRow<TData>;

export type TableInstance<TData> = TanstackTable<TData>;
