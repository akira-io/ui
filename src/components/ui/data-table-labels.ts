export interface DataTableLabels {
    searchPlaceholder: string;
    emptyLabel: string;
    createLabel: string;
    clearFiltersLabel: string;
    paginationLabel: (page: number, pages: number) => string;
    noOptionsLabel: string;
    totalLabel: (total: number) => string;
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
    totalLabel: (total) => `${total.toLocaleString('en-US')} records`,
};
