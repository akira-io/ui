import { countLabel } from '@/lib/count-label';

export interface DataTableLabels {
    searchPlaceholder: string;
    emptyLabel: string;
    createLabel: string;
    clearFiltersLabel: string;
    paginationLabel: (page: number, pages: number) => string;
    noOptionsLabel: string;
    totalLabel: (total: number) => string;
    rowActionsLabel: string;
    previousPageLabel: string;
    nextPageLabel: string;
    pageSizeLabel: string;
}

export interface DataTableFacetedFilterLabels {
    noOptionsLabel: string;
}

export const dataTableDefaultLabels: DataTableLabels = {
    searchPlaceholder: 'Search...',
    emptyLabel: 'No results.',
    createLabel: 'New',
    clearFiltersLabel: 'Clear filters',
    paginationLabel: (page, pages) => `Page ${page} of ${pages}`,
    noOptionsLabel: 'No options.',
    totalLabel: (total) =>
        countLabel(total, 'en-US', { one: 'record', other: 'records' }),
    rowActionsLabel: 'Actions',
    previousPageLabel: 'Previous page',
    nextPageLabel: 'Next page',
    pageSizeLabel: 'Rows per page',
};
