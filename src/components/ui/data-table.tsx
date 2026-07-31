import { Button } from '@/components/ui/button';
import type {
    DataTableFilter,
    DataTableServerFilter,
} from '@/components/ui/data-table-faceted-filter';
import {
    FacetedFilter,
    ServerFacetedFilter,
} from '@/components/ui/data-table-faceted-filter';
import {
    type DataTableRowAction,
    RowActionsMenu,
} from '@/components/ui/data-table-row-actions';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { elevatedSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type Row,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import {
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
    X,
} from 'lucide-react';
import { type ReactNode, useMemo, useState } from 'react';

export type {
    DataTableFilter,
    DataTableServerFilter,
} from '@/components/ui/data-table-faceted-filter';
export type { DataTableRowAction } from '@/components/ui/data-table-row-actions';

function pageRange(current: number, last: number): (number | 'ellipsis')[] {
    if (last <= 7) {
        return Array.from({ length: last }, (_, i) => i + 1);
    }
    const pages: (number | 'ellipsis')[] = [1];
    const left = Math.max(2, current - 1);
    const right = Math.min(last - 1, current + 1);
    if (left > 2) pages.push('ellipsis');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < last - 1) pages.push('ellipsis');
    pages.push(last);
    return pages;
}

export interface DataTableLabels {
    searchPlaceholder: string;
    emptyLabel: string;
    createLabel: string;
    clearFiltersLabel: string;
    paginationLabel: (page: number, pages: number) => string;
    noOptionsLabel: string;
    totalLabel: (total: number) => string;
}

interface DataTableProps<TData, TValue> {
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
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    manualPagination?: boolean;
    pageCount?: number;
    pageIndex?: number;
    total?: number;
    onPageChange?: (pageIndex: number) => void;
    onCreate?: () => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    searchPlaceholder = 'Search...',
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
    emptyLabel = 'No results.',
    clearFiltersLabel = 'Clear filters',
    paginationLabel = (page, pages) => `Page ${page} of ${pages}`,
    noOptionsLabel = 'No options.',
    totalLabel = (total) => `${total.toLocaleString('en-US')} records`,
    renderRow,
    onRowClick,
    isRowActive,
    rowActions,
    searchValue,
    onSearchChange,
    manualPagination = false,
    pageCount,
    pageIndex = 0,
    total,
    onPageChange,
    onCreate,
    createLabel = 'New',
}: DataTableProps<TData, TValue>) {
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
    const currentPage = manualPagination
        ? pageIndex + 1
        : table.getState().pagination.pageIndex + 1;
    const lastPage = manualPagination
        ? Math.max(1, pageCount ?? 1)
        : table.getPageCount();
    const canPrev = manualPagination
        ? pageIndex > 0
        : table.getCanPreviousPage();
    const canNext = manualPagination
        ? pageIndex + 1 < (pageCount ?? 1)
        : table.getCanNextPage();
    const prev = () =>
        manualPagination ? onPageChange?.(pageIndex - 1) : table.previousPage();
    const next = () =>
        manualPagination ? onPageChange?.(pageIndex + 1) : table.nextPage();
    const goTo = (page: number) =>
        manualPagination
            ? onPageChange?.(page - 1)
            : table.setPageIndex(page - 1);

    const activePageSize = manualPagination
        ? pageSize
        : table.getState().pagination.pageSize;
    const changePageSize = (size: number) =>
        onPageSizeChange ? onPageSizeChange(size) : table.setPageSize(size);
    const sizeChoices = [...new Set([...pageSizeOptions, activePageSize])].sort(
        (a, b) => a - b,
    );

    return (
        <div
            data-slot="data-table"
            className={cn(elevatedSurface, 'space-y-4 p-5 bg-card')}
        >
            {hasToolbar && (
                <div className="gap-2 flex flex-wrap items-center">
                    {searchKey !== undefined && (
                        <div className="relative min-w-[200px] flex-1">
                            <Search className="left-4 size-4 pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={
                                    serverSearch
                                        ? (searchValue ?? '')
                                        : globalFilter
                                }
                                onChange={(e) =>
                                    serverSearch
                                        ? onSearchChange?.(e.target.value)
                                        : setGlobalFilter(e.target.value)
                                }
                                placeholder={searchPlaceholder}
                                className="h-11 rounded-2xl pl-11 font-medium focus:shadow-lg border-none bg-muted/50 focus:bg-muted"
                            />
                        </div>
                    )}
                    {filters?.map((filter) => (
                        <FacetedFilter
                            key={filter.columnId}
                            column={table.getColumn(filter.columnId)}
                            filter={filter}
                            noOptionsLabel={noOptionsLabel}
                        />
                    ))}
                    {serverFilters?.map((filter) => (
                        <ServerFacetedFilter
                            key={filter.paramKey}
                            filter={filter}
                            selected={filterValues?.[filter.paramKey] ?? []}
                            onChange={(values) =>
                                onFilterChange?.(filter.paramKey, values)
                            }
                            noOptionsLabel={noOptionsLabel}
                        />
                    ))}
                    {toolbarExtra}
                    {(columnFilters.length > 0 ||
                        hasServerSelection ||
                        (canClearFilters && onClearFilters)) && (
                        <Button
                            variant="ghost"
                            onClick={() => {
                                if (columnFilters.length > 0) {
                                    table.resetColumnFilters();
                                }
                                if (hasServerSelection || canClearFilters) {
                                    onClearFilters?.();
                                }
                            }}
                            className="h-11 rounded-2xl"
                        >
                            {clearFiltersLabel}
                            <X className="ml-1 size-4" />
                        </Button>
                    )}
                    {onCreate && (
                        <Button
                            onClick={onCreate}
                            aria-label={createLabel}
                            size="icon"
                            className="size-11 rounded-2xl shrink-0 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            <Plus className="size-5" />
                        </Button>
                    )}
                    {toolbarAction && (
                        <div className="ml-auto">{toolbarAction}</div>
                    )}
                </div>
            )}

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="hover:bg-transparent"
                        >
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="h-11 px-4 font-medium tracking-wider text-[11px] text-muted-foreground uppercase"
                                >
                                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                        <button
                                            type="button"
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="gap-1 inline-flex items-center transition-colors hover:text-foreground"
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                            <ArrowUpDown className="size-3 opacity-50" />
                                        </button>
                                    ) : (
                                        flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) =>
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
                                className="h-24 text-sm font-medium text-center text-muted-foreground italic"
                            >
                                {emptyLabel}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {showFooter && (
                <div className="gap-3 pt-4 flex flex-wrap items-center justify-between border-t border-border">
                    <div className="gap-3 flex items-center">
                        <Select
                            value={String(activePageSize)}
                            onValueChange={(value) =>
                                changePageSize(Number(value))
                            }
                        >
                            <SelectTrigger className="h-9 rounded-xl w-[74px]">
                                <span>{activePageSize}</span>
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {sizeChoices.map((size) => (
                                    <SelectItem
                                        key={size}
                                        value={String(size)}
                                        className="font-medium"
                                    >
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span className="text-xs font-medium text-muted-foreground">
                            {paginationLabel(currentPage, lastPage)}
                            {total !== undefined && ` · ${totalLabel(total)}`}
                        </span>
                    </div>
                    <div className="gap-1.5 flex items-center">
                        <Button
                            variant="outline"
                            size="icon"
                            className="size-9 rounded-xl"
                            onClick={prev}
                            disabled={!canPrev}
                        >
                            <ChevronLeft className="size-4" />
                        </Button>
                        {pageRange(currentPage, lastPage).map((page, index) =>
                            page === 'ellipsis' ? (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="px-1 text-sm font-medium text-muted-foreground"
                                >
                                    …
                                </span>
                            ) : (
                                <Button
                                    key={page}
                                    variant="outline"
                                    onClick={() => goTo(page)}
                                    className={cn(
                                        'h-9 min-w-9 rounded-xl px-2.5 tabular-nums',
                                        page === currentPage &&
                                            'border-primary bg-primary text-primary-foreground hover:bg-primary/90',
                                    )}
                                >
                                    {page}
                                </Button>
                            ),
                        )}
                        <Button
                            variant="outline"
                            size="icon"
                            className="size-9 rounded-xl"
                            onClick={next}
                            disabled={!canNext}
                        >
                            <ChevronRight className="size-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
