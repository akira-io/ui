import type { ColumnDef, Row } from '@tanstack/react-table';
import type { ReactNode } from 'react';

import type {
    DataTableFilter,
    DataTableServerFilter,
} from '@/components/ui/data-table-faceted-filter';
import type { DataTableLabels } from '@/components/ui/data-table-labels';
import type { DataTableRowAction } from '@/components/ui/data-table-row-actions';

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
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
    renderRow?: (row: Row<TData>) => ReactNode;
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
    truncateCells?: boolean;
}
