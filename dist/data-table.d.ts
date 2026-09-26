import { Column as Column$1, ColumnDef as ColumnDef$1, Row as Row$1, FilterFn as FilterFn$1, Table } from '@tanstack/react-table';
import * as React from 'react';
import { ReactNode } from 'react';
import { D as DataTableFacetedFilterLabels, a as DataTableLabels } from './data-table-labels-xwJ69rBt.js';
import { I as IconComponent, S as SlotNameProps } from './types-r3VHXAG2.js';
import 'lucide-react';

interface DataTableFilter {
    columnId: string;
    label: string;
    options: {
        label: string;
        value: string;
    }[];
}
interface DataTableServerFilter {
    paramKey: string;
    label: string;
    options: {
        label: string;
        value: string;
    }[];
}
declare const dataTableFacetedFilterDefaultLabels: DataTableFacetedFilterLabels;
declare function FacetedFilter<TData>({ column, filter, noOptionsLabel, }: {
    column?: Column$1<TData, unknown>;
    filter: DataTableFilter;
    noOptionsLabel?: DataTableFacetedFilterLabels['noOptionsLabel'];
}): React.JSX.Element;
declare function ServerFacetedFilter({ filter, selected, onChange, noOptionsLabel, }: {
    filter: DataTableServerFilter;
    selected: string[];
    onChange: (values: string[]) => void;
    noOptionsLabel?: DataTableFacetedFilterLabels['noOptionsLabel'];
}): React.JSX.Element;

interface DataTableRowAction<TData> {
    label: string;
    icon?: IconComponent;
    variant?: 'default' | 'destructive';
    hidden?: (row: TData) => boolean;
    onClick: (row: TData) => void;
}
declare function RowActionsMenu<TData>({ row, actions, slotName, }: {
    row: TData;
    actions: DataTableRowAction<TData>[];
} & SlotNameProps): React.JSX.Element | null;

declare const dataTableDefaultLabels: DataTableLabels;
interface DataTableProps<TData, TValue> {
    columns: ColumnDef$1<TData, TValue>[];
    data: TData[];
    searchPlaceholder?: DataTableLabels['searchPlaceholder'];
    emptyLabel?: DataTableLabels['emptyLabel'];
    createLabel?: DataTableLabels['createLabel'];
    clearFiltersLabel?: DataTableLabels['clearFiltersLabel'];
    paginationLabel?: DataTableLabels['paginationLabel'];
    noOptionsLabel?: DataTableLabels['noOptionsLabel'];
    totalLabel?: DataTableLabels['totalLabel'];
    searchKey?: string;
    pageSize?: number;
    pageSizeOptions?: number[];
    onPageSizeChange?: (size: number) => void;
    filters?: DataTableFilter[];
    serverFilters?: DataTableServerFilter[];
    filterValues?: Record<string, string[]>;
    onFilterChange?: (paramKey: string, values: string[]) => void;
    canClearFilters?: boolean;
    onClearFilters?: () => void;
    toolbarExtra?: ReactNode;
    toolbarAction?: ReactNode;
    renderRow?: (row: Row$1<TData>) => ReactNode;
    onRowClick?: (row: TData) => void;
    isRowActive?: (row: TData) => boolean;
    rowActions?: DataTableRowAction<TData>[];
    flat?: boolean;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    manualPagination?: boolean;
    pageCount?: number;
    pageIndex?: number;
    total?: number;
    onPageChange?: (pageIndex: number) => void;
    onCreate?: () => void;
}
declare function DataTable<TData, TValue>({ columns, data, searchKey, searchPlaceholder, pageSize, pageSizeOptions, onPageSizeChange, filters, serverFilters, filterValues, onFilterChange, canClearFilters, onClearFilters, toolbarExtra, toolbarAction, emptyLabel, clearFiltersLabel, paginationLabel, noOptionsLabel, totalLabel, renderRow, onRowClick, isRowActive, rowActions, searchValue, onSearchChange, manualPagination, pageCount, pageIndex, total, onPageChange, onCreate, createLabel, flat, slotName, }: DataTableProps<TData, TValue> & SlotNameProps): React.JSX.Element;

type Column<TData, TValue = unknown> = Column$1<TData, TValue>;
type ColumnDef<TData, TValue = unknown> = ColumnDef$1<TData, TValue>;
type FilterFn<TData> = FilterFn$1<TData>;
type Row<TData> = Row$1<TData>;
type TableInstance<TData> = Table<TData>;

export { type Column, type ColumnDef, DataTable, DataTableFacetedFilterLabels, type DataTableFilter, DataTableLabels, type DataTableRowAction, type DataTableServerFilter, FacetedFilter, type FilterFn, type Row, RowActionsMenu, ServerFacetedFilter, type TableInstance, dataTableDefaultLabels, dataTableFacetedFilterDefaultLabels };
