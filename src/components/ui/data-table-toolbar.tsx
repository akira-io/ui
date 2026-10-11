import type { Table } from '@tanstack/react-table';
import { Plus, Search, X } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
    type DataTableFilter,
    type DataTableServerFilter,
    FacetedFilter,
    ServerFacetedFilter,
} from '@/components/ui/data-table-faceted-filter';
import type { DataTableLabels } from '@/components/ui/data-table-labels';
import { Input } from '@/components/ui/input';

export interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    labels: DataTableLabels;
    searchKey?: string;
    search: string;
    onSearch: (value: string) => void;
    filters?: DataTableFilter[];
    serverFilters?: DataTableServerFilter[];
    filterValues?: Record<string, string[]>;
    onFilterChange?: (paramKey: string, values: string[]) => void;
    toolbarExtra?: ReactNode;
    toolbarAction?: ReactNode;
    showClear: boolean;
    onClear: () => void;
    onCreate?: () => void;
}

export function DataTableToolbar<TData>({
    table,
    labels,
    searchKey,
    search,
    onSearch,
    filters,
    serverFilters,
    filterValues,
    onFilterChange,
    toolbarExtra,
    toolbarAction,
    showClear,
    onClear,
    onCreate,
}: DataTableToolbarProps<TData>) {
    return (
        <div className="gap-2 flex flex-wrap items-center">
            {searchKey !== undefined && (
                <div className="relative min-w-[200px] flex-1">
                    <Search className="left-4 size-4 pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder={labels.searchPlaceholder}
                        className={`h-11 rounded-2xl pl-11 font-medium border-none bg-muted/50 focus:bg-muted`}
                    />
                </div>
            )}
            {filters?.map((filter) => (
                <FacetedFilter
                    key={filter.columnId}
                    column={table.getColumn(filter.columnId)}
                    filter={filter}
                    noOptionsLabel={labels.noOptionsLabel}
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
                    noOptionsLabel={labels.noOptionsLabel}
                />
            ))}
            {toolbarExtra}
            {showClear && (
                <Button
                    variant="ghost"
                    onClick={onClear}
                    className="h-11 rounded-2xl"
                >
                    {labels.clearFiltersLabel}
                    <X className="ml-1 size-4" />
                </Button>
            )}
            {onCreate && (
                <Button
                    onClick={onCreate}
                    aria-label={labels.createLabel}
                    size="icon"
                    className="size-11 rounded-2xl shrink-0 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    <Plus className="size-5" />
                </Button>
            )}
            {toolbarAction && <div className="ml-auto">{toolbarAction}</div>}
        </div>
    );
}
