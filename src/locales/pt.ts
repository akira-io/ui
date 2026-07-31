import type { CommandPaletteLabels } from '@/blocks/command-palette';
import type {
    DateFilterLabels,
    DateFilterOption,
} from '@/blocks/date-filter/types';
import type { TourLabels } from '@/blocks/tour/types';
import type { ComboboxLabels } from '@/components/ui/combobox';
import type { ConfirmDialogLabels } from '@/components/ui/confirm-dialog';
import type { DataTableLabels } from '@/components/ui/data-table';
import type { DataTableFacetedFilterLabels } from '@/components/ui/data-table-faceted-filter';
import type { DateRangeFilterLabels } from '@/components/ui/date-range-filter';

export const dataTableLabelsPt: DataTableLabels = {
    searchPlaceholder: 'Pesquisar...',
    emptyLabel: 'Sem registos.',
    createLabel: 'Novo',
    clearFiltersLabel: 'Limpar filtros',
    paginationLabel: (page, pages) => `Página ${page} de ${pages}`,
    noOptionsLabel: 'Sem opções.',
    totalLabel: (total) => `${total.toLocaleString('pt-PT')} registos`,
};

export const dateRangeFilterLabelsPt: DateRangeFilterLabels = {
    emptyLabel: 'Período',
    dateFormat: 'dd/MM/yy',
};

export const comboboxLabelsPt: ComboboxLabels = {
    placeholder: 'Seleccione uma opção',
    searchPlaceholder: 'Pesquisar...',
    emptyText: 'Sem resultados.',
};

export const confirmDialogLabelsPt: ConfirmDialogLabels = {
    title: 'Confirmar Ação',
    description:
        'Tem a certeza que pretende continuar? Esta ação não pode ser desfeita.',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
};

export const dataTableFacetedFilterLabelsPt: DataTableFacetedFilterLabels = {
    noOptionsLabel: 'Sem opções.',
};

export const commandPaletteLabelsPt: CommandPaletteLabels = {
    placeholder: 'Pesquisar...',
    noResultsLabel: 'Nenhum resultado encontrado',
};

export const tourLabelsPt: TourLabels = {
    next: 'Seguinte',
    previous: 'Anterior',
    done: 'Concluir',
    progress: '{{current}} de {{total}}',
};

export const dateFilterPresetsPt: DateFilterOption[] = [
    { value: 'today', label: 'Hoje' },
    { value: 'yesterday', label: 'Ontem' },
    { value: 'previous_week', label: 'Semana anterior' },
    { value: 'previous_7_days', label: 'Últimos 7 dias' },
    { value: 'previous_30_days', label: 'Últimos 30 dias' },
    { value: 'previous_month', label: 'Mês anterior' },
    { value: 'previous_3_months', label: 'Últimos 3 meses' },
    { value: 'previous_12_months', label: 'Últimos 12 meses' },
];

export const dateFilterOperatorsPt: DateFilterOption[] = [
    { value: 'between', label: 'Entre' },
    { value: 'before', label: 'Antes de' },
    { value: 'on', label: 'Em' },
    { value: 'after', label: 'Depois de' },
];

export const dateFilterUnitsPt: DateFilterOption[] = [
    { value: 'day', label: 'dias' },
    { value: 'week', label: 'semanas' },
    { value: 'month', label: 'meses' },
    { value: 'quarter', label: 'trimestres' },
    { value: 'year', label: 'anos' },
];

export const dateFilterLabelsPt: DateFilterLabels = {
    all: 'Todo o período',
    fixed: 'Intervalo fixo...',
    relative: 'Intervalo relativo...',
    relativeTitle: 'Intervalo relativo',
    apply: 'Aplicar filtro',
    back: 'Voltar',
    latest: 'Últimos',
    ago: 'há',
    includeCurrent: 'Incluir período atual',
    startingAgo: 'A começar há',
    removeOffset: 'Remover deslocamento',
    fallback: 'Data',
};
