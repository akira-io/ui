interface DataTableLabels {
    searchPlaceholder: string;
    emptyLabel: string;
    createLabel: string;
    clearFiltersLabel: string;
    paginationLabel: (page: number, pages: number) => string;
    noOptionsLabel: string;
    totalLabel: (total: number) => string;
}
interface DataTableFacetedFilterLabels {
    noOptionsLabel: string;
}

export type { DataTableFacetedFilterLabels as D, DataTableLabels as a };
