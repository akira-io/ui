import type { DataTableLabels } from '@/components/ui/data-table';
import type { DateRangeFilterLabels } from '@/components/ui/date-range-filter';

export const dataTableLabelsPt: DataTableLabels = {
    searchPlaceholder: 'Pesquisar...',
    emptyLabel: 'Sem registos.',
    createLabel: 'Novo',
    clearFiltersLabel: 'Limpar filtros',
    paginationLabel: (page, pages) => `Página ${page} de ${pages}`,
};

export const dateRangeFilterLabelsPt: DateRangeFilterLabels = {
    emptyLabel: 'Período',
    dateFormat: 'dd/MM/yy',
};
