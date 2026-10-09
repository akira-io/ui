import type { ActionMorphLabels } from '@/components/ui/action-morph';
import type { AlertLabels } from '@/components/ui/alert';
import type { AppearanceToggleLabels } from '@/components/ui/appearance-toggle';
import type { BreadcrumbLabels } from '@/components/ui/breadcrumb';
import type { CarouselLabels } from '@/components/ui/carousel';
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
import type { DialogLabels } from '@/components/ui/dialog';
import type { DropzoneLabels } from '@/components/ui/dropzone';
import type { EditorLabels } from '@/components/ui/editor/labels';
import type { EmptyStateLabels } from '@/components/ui/empty-state';
import type { FieldLabels } from '@/components/ui/field';
import type { FloatingSheetLabels } from '@/components/ui/floating-sheet';
import type { JsonViewerLabels } from '@/components/ui/json-viewer';
import type { PaginationLabels } from '@/components/ui/pagination';
import type { PasswordInputLabels } from '@/components/ui/password-input';
import type { SaveStatusLabels } from '@/components/ui/save-status';
import type { SheetLabels } from '@/components/ui/sheet';
import type { SidebarLabels } from '@/components/ui/sidebar';
import type { SpinnerLabels } from '@/components/ui/spinner';
import type {
    DateTimePickerLabels,
    TimePickerLabels,
} from '@/components/ui/time-picker-labels';
import { formatBytes } from '@/lib/bytes';
import type { FullUiLabels } from '@/locales/context';
import {
    commandPaletteLabelsPt,
    dangerZoneLabelsPt,
    dateFilterLabelsPt,
    dateFilterOperatorsPt,
    dateFilterPresetsPt,
    dateFilterUnitsPt,
    formOverlayLabelsPt,
    loginFormLabelsPt,
    notificationBellLabelsPt,
    passkeyLabelsPt,
    settingsLabelsPt,
    tourLabelsPt,
    twoFactorLabelsPt,
} from '@/locales/pt-blocks';
import type { SettingsLayoutLabels } from '@/shells/settings-layout';
import type { UserMenuLabels } from '@/shells/user-menu-content';

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
export const timePickerLabelsPt: TimePickerLabels = {
    hourLabel: 'Horas',
    minuteLabel: 'Minutos',
    secondLabel: 'Segundos',
    periodLabel: 'AM/PM',
    amLabel: 'AM',
    pmLabel: 'PM',
    openLabel: 'Escolher hora',
    clearLabel: 'Limpar hora',
};
export const dateTimePickerLabelsPt: DateTimePickerLabels = {
    placeholder: 'Escolha a data e a hora',
    dateFormat: 'dd/MM/yy',
    clearLabel: 'Limpar data e hora',
};
export const comboboxLabelsPt: ComboboxLabels = {
    placeholder: 'Selecione uma opção',
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
export const spinnerLabelsPt: SpinnerLabels = {
    label: 'A carregar',
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

export const emptyStateLabelsPt: EmptyStateLabels = {
    title: 'Nada para mostrar',
    noResultsTitle: 'Sem resultados',
    emptyTitle: 'Ainda não há nada aqui',
    offlineTitle: 'Está sem ligação',
    errorTitle: 'Algo correu mal',
    caughtUpTitle: 'Está tudo em dia',
    notFoundTitle: 'Não encontrado',
};
export const editorLabelsPt: EditorLabels = {
    toolbarLabel: 'Formatação',
    boldLabel: 'Negrito',
    italicLabel: 'Itálico',
    strikeLabel: 'Rasurado',
    codeLabel: 'Código',
    headingLabel: (level) => `Título ${level}`,
    bulletListLabel: 'Lista com marcas',
    orderedListLabel: 'Lista numerada',
    blockquoteLabel: 'Citação',
    undoLabel: 'Anular',
    redoLabel: 'Refazer',
    linkLabel: 'Ligação',
    linkDialogTitle: 'Ligação',
    linkDialogDescription: 'Aponte o texto selecionado para um endereço.',
    linkUrlLabel: 'Endereço',
    linkUrlPlaceholder: 'https://exemplo.pt',
    linkApplyLabel: 'Aplicar',
    linkRemoveLabel: 'Remover',
    linkCancelLabel: 'Cancelar',
};

export const dialogLabelsPt: DialogLabels = {
    closeLabel: 'Fechar',
};
export const actionMorphLabelsPt: ActionMorphLabels = {
    backLabel: 'Voltar',
    closeLabel: 'Fechar',
    doneLabel: 'Feito',
};
export const sheetLabelsPt: SheetLabels = {
    closeLabel: 'Fechar',
};
export const paginationLabelsPt: PaginationLabels = {
    navigationLabel: 'Paginação',
    previousLabel: 'Anterior',
    previousPageLabel: 'Ir para a página anterior',
    nextLabel: 'Seguinte',
    nextPageLabel: 'Ir para a página seguinte',
    morePagesLabel: 'Mais páginas',
};
export const breadcrumbLabelsPt: BreadcrumbLabels = {
    navigationLabel: 'Trilho de navegação',
    moreLabel: 'Mais',
};
export const sidebarLabelsPt: SidebarLabels = {
    toggleLabel: 'Mostrar ou ocultar a barra lateral',
};
export const carouselLabelsPt: CarouselLabels = {
    carouselLabel: 'carrossel',
    slideLabel: 'diapositivo',
    previousLabel: 'Diapositivo anterior',
    nextLabel: 'Diapositivo seguinte',
};
export const settingsLayoutLabelsPt: SettingsLayoutLabels = {
    title: 'Definições',
    description: 'Gerir o perfil e as definições da conta',
};
export const userMenuLabelsPt: UserMenuLabels = {
    settingsLabel: 'Definições',
    logoutLabel: 'Terminar sessão',
};

export const ptLabels: FullUiLabels = {
    alert: alertLabelsPt,
    codeBlock: codeBlockLabelsPt,
    combobox: comboboxLabelsPt,
    commandPalette: commandPaletteLabelsPt,
    confirmDialog: confirmDialogLabelsPt,
    appearanceToggle: appearanceToggleLabelsPt,
    breadcrumb: breadcrumbLabelsPt,
    carousel: carouselLabelsPt,
    copyButton: copyButtonLabelsPt,
    dangerZone: dangerZoneLabelsPt,
    dataTable: dataTableLabelsPt,
    dataTableFacetedFilter: dataTableFacetedFilterLabelsPt,
    dateFilter: dateFilterLabelsPt,
    dateFilterOperators: dateFilterOperatorsPt,
    dateFilterPresets: dateFilterPresetsPt,
    dateFilterUnits: dateFilterUnitsPt,
    datePicker: datePickerLabelsPt,
    dateTimePicker: dateTimePickerLabelsPt,
    dateRangeFilter: dateRangeFilterLabelsPt,
    dialog: dialogLabelsPt,
    dropzone: dropzoneLabelsPt,
    editor: editorLabelsPt,
    emptyState: emptyStateLabelsPt,
    field: fieldLabelsPt,
    floatingSheet: floatingSheetLabelsPt,
    formOverlay: formOverlayLabelsPt,
    jsonViewer: jsonViewerLabelsPt,
    loginForm: loginFormLabelsPt,
    notificationBell: notificationBellLabelsPt,
    pagination: paginationLabelsPt,
    passkeys: passkeyLabelsPt,
    passwordInput: passwordInputLabelsPt,
    saveStatus: saveStatusLabelsPt,
    settings: settingsLabelsPt,
    settingsLayout: settingsLayoutLabelsPt,
    sheet: sheetLabelsPt,
    actionMorph: actionMorphLabelsPt,
    sidebar: sidebarLabelsPt,
    spinner: spinnerLabelsPt,
    timePicker: timePickerLabelsPt,
    tour: tourLabelsPt,
    twoFactor: twoFactorLabelsPt,
    userMenu: userMenuLabelsPt,
};
