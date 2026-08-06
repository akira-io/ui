import type { CommandPaletteLabels } from '@/blocks/command-palette';
import type {
    DateFilterLabels,
    DateFilterOption,
} from '@/blocks/date-filter/types';
import type { FormOverlayLabels } from '@/blocks/form-overlay';
import type { SettingsLabels } from '@/blocks/settings-page';
import type { TourLabels } from '@/blocks/tour/types';
import type { TwoFactorLabels } from '@/blocks/two-factor/types';
import type { AppearanceToggleLabels } from '@/components/ui/appearance-toggle';
import type { CodeBlockLabels } from '@/components/ui/code-block';
import type { ComboboxLabels } from '@/components/ui/combobox';
import type { ConfirmDialogLabels } from '@/components/ui/confirm-dialog';
import type { CopyButtonLabels } from '@/components/ui/copy-button';
import type { DataTableLabels } from '@/components/ui/data-table';
import type { DataTableFacetedFilterLabels } from '@/components/ui/data-table-faceted-filter';
import type { DatePickerLabels } from '@/components/ui/date-picker';
import type { DateRangeFilterLabels } from '@/components/ui/date-range-filter';
import type { FloatingSheetLabels } from '@/components/ui/floating-sheet';
import type { JsonViewerLabels } from '@/components/ui/json-viewer';
import type { SaveStatusLabels } from '@/components/ui/save-status';
import type { UiLabels } from '@/locales/context';

export const appearanceToggleLabelsPt: AppearanceToggleLabels = {
    groupLabel: 'Aparência',
    lightLabel: 'Claro',
    darkLabel: 'Escuro',
    systemLabel: 'Sistema',
};

export const dataTableLabelsPt: DataTableLabels = {
    searchPlaceholder: 'Pesquisar...',
    emptyLabel: 'Sem registos.',
    createLabel: 'Novo',
    clearFiltersLabel: 'Limpar filtros',
    paginationLabel: (page, pages) => `Página ${page} de ${pages}`,
    noOptionsLabel: 'Sem opções.',
    totalLabel: (total) => `${total.toLocaleString('pt-PT')} registos`,
};

export const floatingSheetLabelsPt: FloatingSheetLabels = {
    backLabel: 'Voltar',
    closeLabel: 'Fechar',
};

export const formOverlayLabelsPt: FormOverlayLabels = {
    cancelLabel: 'Cancelar',
    saveLabel: 'Guardar',
    savingLabel: 'A guardar...',
};

export const dateRangeFilterLabelsPt: DateRangeFilterLabels = {
    emptyLabel: 'Período',
    dateFormat: 'dd/MM/yy',
};

export const datePickerLabelsPt: DatePickerLabels = {
    placeholder: 'Escolha uma data',
    dateFormat: 'dd/MM/yy',
    clearLabel: 'Limpar data',
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

export const settingsLabelsPt: SettingsLabels = {
    back: 'Voltar',
};

export const saveStatusLabelsPt: SaveStatusLabels = {
    error: 'Não foi possível guardar as alterações',
    idle: 'As alterações são guardadas automaticamente',
    saved: 'Guardado',
    saving: 'A guardar',
};

export const copyButtonLabelsPt: CopyButtonLabels = {
    copyLabel: 'Copiar',
    copiedLabel: 'Copiado',
};

export const twoFactorLabelsPt: TwoFactorLabels = {
    setupTitle: 'Autenticação de dois fatores',
    setupDescription:
        'Acrescente um segundo passo ao seu início de sessão com uma aplicação autenticadora.',
    pendingLabel: 'A preparar a sua chave de configuração',
    scanTitle: 'Leia o código',
    scanDescription:
        'Abra a aplicação autenticadora e leia o código abaixo para adicionar esta conta.',
    qrFallbackLabel: 'O código QR ainda não está disponível.',
    manualKeyLabel: 'Chave de configuração',
    manualKeyDescription:
        'Introduza esta chave manualmente se a aplicação não conseguir ler o código.',
    manualKeyRevealLabel: 'Mostrar chave',
    manualKeyHideLabel: 'Ocultar chave',
    continueLabel: 'Continuar',
    confirmTitle: 'Confirme o código',
    confirmDescription:
        'Introduza o código de seis dígitos apresentado na aplicação autenticadora.',
    codeLabel: 'Código de autenticação',
    recoveryCodeLabel: 'Código de recuperação',
    recoveryCodePlaceholder: 'Introduza um código de recuperação',
    useRecoveryCodeLabel: 'Usar um código de recuperação',
    useCodeLabel: 'Usar um código de autenticação',
    verifyLabel: 'Verificar',
    verifyingLabel: 'A verificar',
    errorFallbackLabel: 'Não resultou. Tente novamente.',
    cancelLabel: 'Cancelar',
    challengeTitle: 'Confirmação em dois passos',
    challengeDescription:
        'Confirme o acesso à sua conta com o código da aplicação autenticadora.',
    recoveryTitle: 'Códigos de recuperação',
    recoveryDescription:
        'Guarde estes códigos em lugar seguro. Cada um permite um início de sessão se perder o dispositivo.',
    recoveryWarning:
        'São mostrados uma única vez e não podem ser lidos depois.',
    revealLabel: 'Mostrar códigos',
    hideLabel: 'Ocultar códigos',
    copyLabel: 'Copiar',
    copiedLabel: 'Copiado',
    copyFailedLabel:
        'Não é possível copiar aqui. Selecione os códigos manualmente.',
    regenerateLabel: 'Gerar novos códigos',
    doneLabel: 'Concluir',
    disableLabel: 'Desativar autenticação de dois fatores',
    disableTitle: 'Desativar autenticação de dois fatores',
    disableDescription:
        'A sua conta fica protegida apenas pela palavra-passe. Os códigos de recuperação deixam de funcionar.',
    disableConfirmLabel: 'Desativar',
    disableCancelLabel: 'Manter ativa',
};

export const codeBlockLabelsPt: CodeBlockLabels = {
    copyLabel: 'Copiar',
    copiedLabel: 'Copiado',
    expandLabel: 'Expandir',
    collapseLabel: 'Recolher',
};

export const jsonViewerLabelsPt: JsonViewerLabels = {
    copyLabel: 'Copiar',
    copiedLabel: 'Copiado',
    expandLabel: 'Expandir',
    collapseLabel: 'Recolher',
    circularLabel: 'Referência circular',
    entriesLabel: (count) => `${count} ${count === 1 ? 'entrada' : 'entradas'}`,
};

export const ptLabels: UiLabels = {
    codeBlock: codeBlockLabelsPt,
    combobox: comboboxLabelsPt,
    commandPalette: commandPaletteLabelsPt,
    confirmDialog: confirmDialogLabelsPt,
    appearanceToggle: appearanceToggleLabelsPt,
    copyButton: copyButtonLabelsPt,
    dataTable: dataTableLabelsPt,
    dataTableFacetedFilter: dataTableFacetedFilterLabelsPt,
    dateFilter: dateFilterLabelsPt,
    dateFilterOperators: dateFilterOperatorsPt,
    dateFilterPresets: dateFilterPresetsPt,
    dateFilterUnits: dateFilterUnitsPt,
    datePicker: datePickerLabelsPt,
    dateRangeFilter: dateRangeFilterLabelsPt,
    floatingSheet: floatingSheetLabelsPt,
    jsonViewer: jsonViewerLabelsPt,
    saveStatus: saveStatusLabelsPt,
    settings: settingsLabelsPt,
    tour: tourLabelsPt,
};
