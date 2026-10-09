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
    commandPaletteLabelsEs,
    dangerZoneLabelsEs,
    dateFilterLabelsEs,
    dateFilterOperatorsEs,
    dateFilterPresetsEs,
    dateFilterUnitsEs,
    formOverlayLabelsEs,
    loginFormLabelsEs,
    notificationBellLabelsEs,
    passkeyLabelsEs,
    settingsLabelsEs,
    tourLabelsEs,
    twoFactorLabelsEs,
} from '@/locales/es-blocks';
import type { SettingsLayoutLabels } from '@/shells/settings-layout';
import type { UserMenuLabels } from '@/shells/user-menu-content';

export * from '@/locales/es-blocks';

export const alertLabelsEs: AlertLabels = {
    warningLabel: 'Advertencia',
    infoLabel: 'Información',
};
export const appearanceToggleLabelsEs: AppearanceToggleLabels = {
    groupLabel: 'Apariencia',
    lightLabel: 'Claro',
    darkLabel: 'Oscuro',
    systemLabel: 'Sistema',
};
export const dataTableLabelsEs: DataTableLabels = {
    searchPlaceholder: 'Buscar...',
    emptyLabel: 'No hay resultados.',
    createLabel: 'Nuevo',
    clearFiltersLabel: 'Borrar filtros',
    paginationLabel: (page, pages) => `Página ${page} de ${pages}`,
    noOptionsLabel: 'No hay opciones.',
    totalLabel: (total) => `${total.toLocaleString('es-ES')} registros`,
};
export const floatingSheetLabelsEs: FloatingSheetLabels = {
    backLabel: 'Volver',
    closeLabel: 'Cerrar',
};
export const dateRangeFilterLabelsEs: DateRangeFilterLabels = {
    emptyLabel: 'Intervalo de fechas',
    dateFormat: 'dd/MM/yy',
};
export const dropzoneLabelsEs: DropzoneLabels = {
    idleLabel: 'Arrastra un archivo aquí',
    activeLabel: 'Suelta para adjuntar',
    triggerLabel: 'Elegir archivo',
    removeLabel: 'Quitar archivo',
    sizeLabel: (bytes) => formatBytes(bytes, 'es-ES'),
    invalidTypeLabel: 'Este tipo de archivo no se admite.',
    tooLargeLabel: (maxSize) =>
        `El archivo supera ${formatBytes(maxSize, 'es-ES')}.`,
    tooManyFilesLabel: (maxFiles) =>
        `Adjunta como máximo ${maxFiles} archivos.`,
    rejectedLabel: 'No se ha aceptado el archivo.',
    progressLabel: (percent) => `Subiendo, ${percent}% completado`,
};
export const datePickerLabelsEs: DatePickerLabels = {
    placeholder: 'Elige una fecha',
    dateFormat: 'dd/MM/yy',
    clearLabel: 'Borrar fecha',
};
export const timePickerLabelsEs: TimePickerLabels = {
    hourLabel: 'Horas',
    minuteLabel: 'Minutos',
    secondLabel: 'Segundos',
    periodLabel: 'a. m./p. m.',
    amLabel: 'a. m.',
    pmLabel: 'p. m.',
    openLabel: 'Elegir hora',
    clearLabel: 'Borrar hora',
};
export const dateTimePickerLabelsEs: DateTimePickerLabels = {
    placeholder: 'Elige fecha y hora',
    dateFormat: 'dd/MM/yy',
    clearLabel: 'Borrar fecha y hora',
};
export const comboboxLabelsEs: ComboboxLabels = {
    placeholder: 'Selecciona una opción',
    searchPlaceholder: 'Buscar...',
    emptyText: 'No hay resultados.',
};
export const confirmDialogLabelsEs: ConfirmDialogLabels = {
    title: 'Confirmar acción',
    description:
        '¿Seguro que quieres continuar? Esta acción no se puede deshacer.',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
};
export const fieldLabelsEs: FieldLabels = {
    requiredLabel: 'Obligatorio',
};
export const passwordInputLabelsEs: PasswordInputLabels = {
    showLabel: 'Mostrar contraseña',
    hideLabel: 'Ocultar contraseña',
};
export const dataTableFacetedFilterLabelsEs: DataTableFacetedFilterLabels = {
    noOptionsLabel: 'No hay opciones.',
};
export const saveStatusLabelsEs: SaveStatusLabels = {
    error: 'No se han podido guardar los cambios',
    idle: 'Los cambios se guardan automáticamente',
    saved: 'Guardado',
    saving: 'Guardando',
};
export const spinnerLabelsEs: SpinnerLabels = {
    label: 'Cargando',
};
export const copyButtonLabelsEs: CopyButtonLabels = {
    copyLabel: 'Copiar',
    copiedLabel: 'Copiado',
};
export const codeBlockLabelsEs: CodeBlockLabels = {
    copyLabel: 'Copiar',
    copiedLabel: 'Copiado',
    expandLabel: 'Expandir',
    collapseLabel: 'Contraer',
};
export const jsonViewerLabelsEs: JsonViewerLabels = {
    copyLabel: 'Copiar',
    copiedLabel: 'Copiado',
    expandLabel: 'Expandir',
    collapseLabel: 'Contraer',
    circularLabel: 'Referencia circular',
    entriesLabel: (count) => `${count} ${count === 1 ? 'entrada' : 'entradas'}`,
};

export const emptyStateLabelsEs: EmptyStateLabels = {
    title: 'No hay nada que mostrar',
    noResultsTitle: 'Sin resultados',
    emptyTitle: 'Aún no hay nada aquí',
    offlineTitle: 'Sin conexión',
    errorTitle: 'Algo salió mal',
    caughtUpTitle: 'Estás al día',
    notFoundTitle: 'No encontrado',
};
export const editorLabelsEs: EditorLabels = {
    toolbarLabel: 'Formato',
    boldLabel: 'Negrita',
    italicLabel: 'Cursiva',
    strikeLabel: 'Tachado',
    codeLabel: 'Código',
    headingLabel: (level) => `Título ${level}`,
    bulletListLabel: 'Lista con viñetas',
    orderedListLabel: 'Lista numerada',
    blockquoteLabel: 'Cita',
    undoLabel: 'Deshacer',
    redoLabel: 'Rehacer',
    linkLabel: 'Enlace',
    linkDialogTitle: 'Enlace',
    linkDialogDescription: 'Asocia el texto seleccionado a una dirección.',
    linkUrlLabel: 'Dirección',
    linkUrlPlaceholder: 'https://ejemplo.es',
    linkApplyLabel: 'Aplicar',
    linkRemoveLabel: 'Quitar',
    linkCancelLabel: 'Cancelar',
};

export const dialogLabelsEs: DialogLabels = {
    closeLabel: 'Cerrar',
};
export const actionMorphLabelsEs: ActionMorphLabels = {
    backLabel: 'Atrás',
    closeLabel: 'Cerrar',
    doneLabel: 'Hecho',
};
export const sheetLabelsEs: SheetLabels = {
    closeLabel: 'Cerrar',
};
export const paginationLabelsEs: PaginationLabels = {
    navigationLabel: 'Paginación',
    previousLabel: 'Anterior',
    previousPageLabel: 'Ir a la página anterior',
    nextLabel: 'Siguiente',
    nextPageLabel: 'Ir a la página siguiente',
    morePagesLabel: 'Más páginas',
};
export const breadcrumbLabelsEs: BreadcrumbLabels = {
    navigationLabel: 'Ruta de navegación',
    moreLabel: 'Más',
};
export const sidebarLabelsEs: SidebarLabels = {
    toggleLabel: 'Mostrar u ocultar la barra lateral',
};
export const carouselLabelsEs: CarouselLabels = {
    carouselLabel: 'carrusel',
    slideLabel: 'diapositiva',
    previousLabel: 'Diapositiva anterior',
    nextLabel: 'Diapositiva siguiente',
};
export const settingsLayoutLabelsEs: SettingsLayoutLabels = {
    title: 'Configuración',
    description: 'Gestionar el perfil y la configuración de la cuenta',
};
export const userMenuLabelsEs: UserMenuLabels = {
    settingsLabel: 'Configuración',
    logoutLabel: 'Cerrar sesión',
};

export const esLabels: FullUiLabels = {
    actionMorph: actionMorphLabelsEs,
    alert: alertLabelsEs,
    codeBlock: codeBlockLabelsEs,
    combobox: comboboxLabelsEs,
    commandPalette: commandPaletteLabelsEs,
    confirmDialog: confirmDialogLabelsEs,
    appearanceToggle: appearanceToggleLabelsEs,
    breadcrumb: breadcrumbLabelsEs,
    carousel: carouselLabelsEs,
    copyButton: copyButtonLabelsEs,
    dangerZone: dangerZoneLabelsEs,
    dataTable: dataTableLabelsEs,
    dataTableFacetedFilter: dataTableFacetedFilterLabelsEs,
    dateFilter: dateFilterLabelsEs,
    dateFilterOperators: dateFilterOperatorsEs,
    dateFilterPresets: dateFilterPresetsEs,
    dateFilterUnits: dateFilterUnitsEs,
    datePicker: datePickerLabelsEs,
    dateTimePicker: dateTimePickerLabelsEs,
    dateRangeFilter: dateRangeFilterLabelsEs,
    dialog: dialogLabelsEs,
    dropzone: dropzoneLabelsEs,
    editor: editorLabelsEs,
    emptyState: emptyStateLabelsEs,
    field: fieldLabelsEs,
    floatingSheet: floatingSheetLabelsEs,
    formOverlay: formOverlayLabelsEs,
    jsonViewer: jsonViewerLabelsEs,
    loginForm: loginFormLabelsEs,
    notificationBell: notificationBellLabelsEs,
    pagination: paginationLabelsEs,
    passkeys: passkeyLabelsEs,
    passwordInput: passwordInputLabelsEs,
    saveStatus: saveStatusLabelsEs,
    settings: settingsLabelsEs,
    settingsLayout: settingsLayoutLabelsEs,
    sheet: sheetLabelsEs,
    sidebar: sidebarLabelsEs,
    spinner: spinnerLabelsEs,
    timePicker: timePickerLabelsEs,
    tour: tourLabelsEs,
    twoFactor: twoFactorLabelsEs,
    userMenu: userMenuLabelsEs,
};
