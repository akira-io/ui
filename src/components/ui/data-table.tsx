import { DataTableHeader } from '@/components/ui/data-table-header';
import { dataTableDefaultLabels } from '@/components/ui/data-table-labels';
import {
    DataTablePagination,
    useDataTablePaging,
} from '@/components/ui/data-table-pagination';
import { RowActionsMenu } from '@/components/ui/data-table-row-actions';
import { DataTableToolbar } from '@/components/ui/data-table-toolbar';
import type { DataTableProps } from '@/components/ui/data-table-types';
import { EmptyState } from '@/components/ui/empty-state';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useHorizontalOverflow } from '@/hooks/use-horizontal-overflow';
import {
    contentFill,
    flatSurface,
    stickyLastCell,
    stickyLastCellShadow,
    truncatedCell,
} from '@/lib/language';
import { useContentSurface } from '@/lib/surface-context';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo, useRef, useState } from 'react';

export type { DataTableLabels } from '@/components/ui/data-table-labels';

export type {
    DataTableFilter,
    DataTableServerFilter,
} from '@/components/ui/data-table-faceted-filter';
export type { DataTableRowAction } from '@/components/ui/data-table-row-actions';

export { dataTableDefaultLabels } from '@/components/ui/data-table-labels';

export type { DataTableProps } from '@/components/ui/data-table-types';

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    searchPlaceholder,
    pageSize = 10,
    pageSizeOptions = [10, 25, 50, 100],
    onPageSizeChange,
    filters,
    serverFilters,
    filterValues,
    onFilterChange,
    canClearFilters,
    onClearFilters,
    toolbarExtra,
    toolbarAction,
    emptyLabel,
    clearFiltersLabel,
    paginationLabel,
    noOptionsLabel,
    totalLabel,
    renderRow,
    onRowClick,
    isRowActive,
    rowActions,
    stickyLastColumn = false,
    searchValue,
    onSearchChange,
    manualPagination = false,
    pageCount,
    pageIndex = 0,
    total,
    onPageChange,
    onCreate,
    createLabel,
    truncateCells = false,
    flat = false,
    surface,
    slotName = 'data-table',
}: DataTableProps<TData, TValue> & SlotNameProps) {
    const labels = useUiLabels('dataTable', dataTableDefaultLabels, {
        searchPlaceholder,
        emptyLabel,
        createLabel,
        clearFiltersLabel,
        paginationLabel,
        noOptionsLabel,
        totalLabel,
    });
    const scrollRef = useRef<HTMLDivElement>(null);
    const hasHiddenColumns = useHorizontalOverflow(scrollRef);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const serverSearch = onSearchChange !== undefined;

    const tableColumns = useMemo<ColumnDef<TData, TValue>[]>(() => {
        if (!rowActions || rowActions.length === 0) {
            return columns;
        }

        return [
            ...columns,
            {
                id: '__actions',
                header: '',
                enableSorting: false,
                cell: ({ row }) => (
                    <RowActionsMenu row={row.original} actions={rowActions} />
                ),
            },
        ];
    }, [columns, rowActions]);
    const sticksLastColumn = stickyLastColumn || (rowActions?.length ?? 0) > 0;

    const table = useReactTable({
        data,
        columns: tableColumns,
        state: {
            sorting,
            columnFilters,
            ...(serverSearch ? {} : { globalFilter }),
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: serverSearch ? undefined : setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        ...(manualPagination
            ? { manualPagination: true, pageCount: pageCount ?? -1 }
            : { getPaginationRowModel: getPaginationRowModel() }),
        initialState: { pagination: { pageSize } },
    });

    const rows = table.getRowModel().rows;

    const hasServerSelection =
        serverFilters?.some(
            (filter) => (filterValues?.[filter.paramKey]?.length ?? 0) > 0,
        ) ?? false;
    const hasToolbar =
        searchKey !== undefined ||
        (filters && filters.length > 0) ||
        (serverFilters && serverFilters.length > 0) ||
        onCreate !== undefined ||
        toolbarExtra !== undefined ||
        toolbarAction !== undefined;
    const showFooter = manualPagination || table.getPageCount() > 1;
    const paging = useDataTablePaging(table, {
        manualPagination,
        pageIndex,
        pageCount,
        pageSize,
        pageSizeOptions,
        onPageChange,
        onPageSizeChange,
    });

    return (
        <div
            data-flat={flat || undefined}
            className={cn(
                contentFill(useContentSurface(surface)),
                'space-y-4 p-5',
                useContentSurface(surface) === 'glass' && flat && flatSurface,
            )}
            data-slot={slotName}
        >
            {hasToolbar && (
                <DataTableToolbar
                    table={table}
                    labels={labels}
                    searchKey={searchKey}
                    search={serverSearch ? (searchValue ?? '') : globalFilter}
                    onSearch={(value) =>
                        serverSearch
                            ? onSearchChange?.(value)
                            : setGlobalFilter(value)
                    }
                    filters={filters}
                    serverFilters={serverFilters}
                    filterValues={filterValues}
                    onFilterChange={onFilterChange}
                    toolbarExtra={toolbarExtra}
                    toolbarAction={toolbarAction}
                    showClear={
                        columnFilters.length > 0 ||
                        hasServerSelection ||
                        Boolean(canClearFilters && onClearFilters)
                    }
                    onClear={() => {
                        if (columnFilters.length > 0) {
                            table.resetColumnFilters();
                        }
                        if (hasServerSelection || canClearFilters) {
                            onClearFilters?.();
                        }
                    }}
                    onCreate={onCreate}
                />
            )}

            <Table
                scrollRef={scrollRef}
                className={cn(
                    sticksLastColumn && stickyLastCell,
                    sticksLastColumn &&
                        hasHiddenColumns &&
                        stickyLastCellShadow,
                    truncateCells && truncatedCell,
                )}
            >
                <DataTableHeader table={table} />
                <TableBody>
                    {rows.length ? (
                        rows.map((row) =>
                            renderRow ? (
                                renderRow(row)
                            ) : (
                                <TableRow
                                    key={row.id}
                                    onClick={
                                        onRowClick
                                            ? () => onRowClick(row.original)
                                            : undefined
                                    }
                                    data-active={
                                        isRowActive?.(row.original) || undefined
                                    }
                                    className={cn(
                                        'border-border transition-colors hover:bg-muted/50',
                                        onRowClick && 'cursor-pointer',
                                        'data-[active=true]:bg-primary/5',
                                    )}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="px-4 py-3"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ),
                        )
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={tableColumns.length}
                                className="h-24 p-0"
                            >
                                <EmptyState compact title={labels.emptyLabel} />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {showFooter && (
                <DataTablePagination
                    labels={labels}
                    total={total}
                    {...paging}
                />
            )}
        </div>
    );
}
