import type { AlertLabels } from '@/components/ui/alert';
import type { AppearanceToggleLabels } from '@/components/ui/appearance-toggle';
import type { CodeBlockLabels } from '@/components/ui/code-block';
import type { ComboboxLabels } from '@/components/ui/combobox';
import type { ConfirmDialogLabels } from '@/components/ui/confirm-dialog';
import type { CopyButtonLabels } from '@/components/ui/copy-button';
import type {
    DataTableFacetedFilterLabels,
    DataTableLabels,
} from '@/components/ui/data-table-labels';
import type { DatePickerLabels } from '@/components/ui/date-picker';
import type { DateRangeFilterLabels } from '@/components/ui/date-range-filter';
import type { DropzoneLabels } from '@/components/ui/dropzone';
import type { FieldLabels } from '@/components/ui/field';
import type { FloatingSheetLabels } from '@/components/ui/floating-sheet';
import type { JsonViewerLabels } from '@/components/ui/json-viewer';
import type { PasswordInputLabels } from '@/components/ui/password-input';
import type { SaveStatusLabels } from '@/components/ui/save-status';
import { formatBytes } from '@/lib/bytes';
import type { FullUiLabels } from '@/locales/context';
import {
    commandPaletteLabelsPt,
    dateFilterLabelsPt,
    dateFilterOperatorsPt,
    dateFilterPresetsPt,
    dateFilterUnitsPt,
    loginFormLabelsPt,
    passkeyLabelsPt,
    settingsLabelsPt,
    tourLabelsPt,
    twoFactorLabelsPt,
} from '@/locales/pt-blocks';

export * from '@/locales/pt-blocks';

export const alertLabelsPt: AlertLabels = {
    warningLabel: 'Aviso',
    infoLabel: 'Informação',
};
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
export const dateRangeFilterLabelsPt: DateRangeFilterLabels = {
    emptyLabel: 'Período',
    dateFormat: 'dd/MM/yy',
};
export const dropzoneLabelsPt: DropzoneLabels = {
    idleLabel: 'Arraste um ficheiro para aqui',
    activeLabel: 'Largue para anexar',
    triggerLabel: 'Escolher ficheiro',
    removeLabel: 'Remover ficheiro',
    sizeLabel: (bytes) => formatBytes(bytes, 'pt-PT'),
    invalidTypeLabel: 'Este tipo de ficheiro não é aceite.',
    tooLargeLabel: (maxSize) =>
        `O ficheiro é maior do que ${formatBytes(maxSize, 'pt-PT')}.`,
    tooManyFilesLabel: (maxFiles) => `Anexe no máximo ${maxFiles} ficheiros.`,
    rejectedLabel: 'O ficheiro não foi aceite.',
    progressLabel: (percent) => `A enviar, ${percent}% concluído`,
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
export const fieldLabelsPt: FieldLabels = {
    requiredLabel: 'Obrigatório',
};
export const passwordInputLabelsPt: PasswordInputLabels = {
    showLabel: 'Mostrar palavra-passe',
    hideLabel: 'Ocultar palavra-passe',
};
export const dataTableFacetedFilterLabelsPt: DataTableFacetedFilterLabels = {
    noOptionsLabel: 'Sem opções.',
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

export const ptLabels: FullUiLabels = {
    alert: alertLabelsPt,
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
    dropzone: dropzoneLabelsPt,
    field: fieldLabelsPt,
    floatingSheet: floatingSheetLabelsPt,
    jsonViewer: jsonViewerLabelsPt,
    loginForm: loginFormLabelsPt,
    passkeys: passkeyLabelsPt,
    passwordInput: passwordInputLabelsPt,
    saveStatus: saveStatusLabelsPt,
    settings: settingsLabelsPt,
    tour: tourLabelsPt,
    twoFactor: twoFactorLabelsPt,
};
