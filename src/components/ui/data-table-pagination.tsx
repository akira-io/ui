import type { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { DataTableLabels } from '@/components/ui/data-table-labels';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

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

export interface DataTablePaginationProps {
    labels: DataTableLabels;
    activePageSize: number;
    sizeChoices: number[];
    changePageSize: (size: number) => void;
    currentPage: number;
    lastPage: number;
    total?: number;
    canPrev: boolean;
    canNext: boolean;
    prev: () => void;
    next: () => void;
    goTo: (page: number) => void;
}

export function DataTablePagination({
    labels,
    activePageSize,
    sizeChoices,
    changePageSize,
    currentPage,
    lastPage,
    total,
    canPrev,
    canNext,
    prev,
    next,
    goTo,
    slotName = 'data-table-pagination',
}: DataTablePaginationProps & SlotNameProps) {
    return (
        <div
            className="gap-3 pt-4 flex flex-wrap items-center justify-between border-t border-(--hairline)"
            data-slot={slotName}
        >
            <div className="gap-3 flex items-center">
                <Select
                    value={String(activePageSize)}
                    onValueChange={(value) => changePageSize(Number(value))}
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
                    {labels.paginationLabel(currentPage, lastPage)}
                    {total !== undefined && ` · ${labels.totalLabel(total)}`}
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
                    <ChevronLeft className="size-icon" />
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
                    <ChevronRight className="size-icon" />
                </Button>
            </div>
        </div>
    );
}

export interface DataTablePagingOptions {
    manualPagination: boolean;
    pageIndex: number;
    pageCount?: number;
    pageSize: number;
    pageSizeOptions: number[];
    onPageChange?: (pageIndex: number) => void;
    onPageSizeChange?: (size: number) => void;
}

export function useDataTablePaging<TData>(
    table: Table<TData>,
    {
        manualPagination,
        pageIndex,
        pageCount,
        pageSize,
        pageSizeOptions,
        onPageChange,
        onPageSizeChange,
    }: DataTablePagingOptions,
) {
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

    return {
        activePageSize,
        sizeChoices,
        changePageSize,
        currentPage,
        lastPage,
        canPrev,
        canNext,
        prev,
        next,
        goTo,
    };
}
