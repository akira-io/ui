interface DataTableLabels {
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
interface DataTableFacetedFilterLabels {
    noOptionsLabel: string;
}
declare const dataTableDefaultLabels: DataTableLabels;

export { type DataTableFacetedFilterLabels as D, type DataTableLabels as a, dataTableDefaultLabels as d };
