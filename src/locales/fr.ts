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
import { formatBytes } from '@/lib/bytes';
import type { FullUiLabels } from '@/locales/context';
import {
    commandPaletteLabelsFr,
    dangerZoneLabelsFr,
    dateFilterLabelsFr,
    dateFilterOperatorsFr,
    dateFilterPresetsFr,
    dateFilterUnitsFr,
    formOverlayLabelsFr,
    loginFormLabelsFr,
    passkeyLabelsFr,
    settingsLabelsFr,
    tourLabelsFr,
    twoFactorLabelsFr,
} from '@/locales/fr-blocks';
import type { UserMenuLabels } from '@/shells/user-menu-content';

export * from '@/locales/fr-blocks';

export const alertLabelsFr: AlertLabels = {
    warningLabel: 'Avertissement',
    infoLabel: 'Information',
};
export const appearanceToggleLabelsFr: AppearanceToggleLabels = {
    groupLabel: 'Apparence',
    lightLabel: 'Clair',
    darkLabel: 'Sombre',
    systemLabel: 'Système',
};
export const dataTableLabelsFr: DataTableLabels = {
    searchPlaceholder: 'Rechercher...',
    emptyLabel: 'Aucun résultat.',
    createLabel: 'Nouveau',
    clearFiltersLabel: 'Effacer les filtres',
    paginationLabel: (page, pages) => `Page ${page} sur ${pages}`,
    noOptionsLabel: 'Aucune option.',
    totalLabel: (total) => `${total.toLocaleString('fr-FR')} enregistrements`,
};
export const floatingSheetLabelsFr: FloatingSheetLabels = {
    backLabel: 'Retour',
    closeLabel: 'Fermer',
};
export const dateRangeFilterLabelsFr: DateRangeFilterLabels = {
    emptyLabel: 'Plage de dates',
    dateFormat: 'dd/MM/yy',
};
export const dropzoneLabelsFr: DropzoneLabels = {
    idleLabel: 'Glissez un fichier ici',
    activeLabel: 'Déposez pour joindre',
    triggerLabel: 'Choisir un fichier',
    removeLabel: 'Retirer le fichier',
    sizeLabel: (bytes) => formatBytes(bytes, 'fr-FR'),
    invalidTypeLabel: "Ce type de fichier n'est pas accepté.",
    tooLargeLabel: (maxSize) =>
        `Le fichier dépasse ${formatBytes(maxSize, 'fr-FR')}.`,
    tooManyFilesLabel: (maxFiles) => `Joignez au maximum ${maxFiles} fichiers.`,
    rejectedLabel: "Le fichier n'a pas été accepté.",
    progressLabel: (percent) => `Envoi en cours, ${percent}% effectué`,
};
export const datePickerLabelsFr: DatePickerLabels = {
    placeholder: 'Choisir une date',
    dateFormat: 'dd/MM/yy',
    clearLabel: 'Effacer la date',
};
export const comboboxLabelsFr: ComboboxLabels = {
    placeholder: 'Sélectionnez une option',
    searchPlaceholder: 'Rechercher...',
    emptyText: 'Aucun résultat.',
};
export const confirmDialogLabelsFr: ConfirmDialogLabels = {
    title: "Confirmer l'action",
    description:
        'Êtes-vous sûr de vouloir continuer ? Cette action ne peut pas être annulée.',
    confirmText: 'Confirmer',
    cancelText: 'Annuler',
};
export const fieldLabelsFr: FieldLabels = {
    requiredLabel: 'Obligatoire',
};
export const passwordInputLabelsFr: PasswordInputLabels = {
    showLabel: 'Afficher le mot de passe',
    hideLabel: 'Masquer le mot de passe',
};
export const dataTableFacetedFilterLabelsFr: DataTableFacetedFilterLabels = {
    noOptionsLabel: 'Aucune option.',
};
export const saveStatusLabelsFr: SaveStatusLabels = {
    error: "Vos modifications n'ont pas pu être enregistrées",
    idle: 'Les modifications sont enregistrées automatiquement',
    saved: 'Enregistré',
    saving: 'Enregistrement',
};
export const copyButtonLabelsFr: CopyButtonLabels = {
    copyLabel: 'Copier',
    copiedLabel: 'Copié',
};
export const codeBlockLabelsFr: CodeBlockLabels = {
    copyLabel: 'Copier',
    copiedLabel: 'Copié',
    expandLabel: 'Développer',
    collapseLabel: 'Réduire',
};
export const jsonViewerLabelsFr: JsonViewerLabels = {
    copyLabel: 'Copier',
    copiedLabel: 'Copié',
    expandLabel: 'Développer',
    collapseLabel: 'Réduire',
    circularLabel: 'Référence circulaire',
    entriesLabel: (count) => `${count} ${count === 1 ? 'entrée' : 'entrées'}`,
};

export const emptyStateLabelsFr: EmptyStateLabels = {
    title: 'Rien à afficher',
};
export const editorLabelsFr: EditorLabels = {
    toolbarLabel: 'Mise en forme',
    boldLabel: 'Gras',
    italicLabel: 'Italique',
    strikeLabel: 'Barré',
    codeLabel: 'Code',
    headingLabel: (level) => `Titre ${level}`,
    bulletListLabel: 'Liste à puces',
    orderedListLabel: 'Liste numérotée',
    blockquoteLabel: 'Citation',
    undoLabel: 'Annuler',
    redoLabel: 'Rétablir',
    linkLabel: 'Lien',
    linkDialogTitle: 'Lien',
    linkDialogDescription: 'Associez le texte sélectionné à une adresse.',
    linkUrlLabel: 'Adresse',
    linkUrlPlaceholder: 'https://exemple.fr',
    linkApplyLabel: 'Appliquer',
    linkRemoveLabel: 'Retirer',
    linkCancelLabel: 'Annuler',
};

export const dialogLabelsFr: DialogLabels = {
    closeLabel: 'Fermer',
};
export const sheetLabelsFr: SheetLabels = {
    closeLabel: 'Fermer',
};
export const paginationLabelsFr: PaginationLabels = {
    navigationLabel: 'Pagination',
    previousLabel: 'Précédent',
    previousPageLabel: 'Aller à la page précédente',
    nextLabel: 'Suivant',
    nextPageLabel: 'Aller à la page suivante',
    morePagesLabel: 'Plus de pages',
};
export const breadcrumbLabelsFr: BreadcrumbLabels = {
    navigationLabel: "Fil d'Ariane",
    moreLabel: 'Plus',
};
export const sidebarLabelsFr: SidebarLabels = {
    toggleLabel: 'Afficher ou masquer la barre latérale',
};
export const carouselLabelsFr: CarouselLabels = {
    carouselLabel: 'carrousel',
    slideLabel: 'diapositive',
    previousLabel: 'Diapositive précédente',
    nextLabel: 'Diapositive suivante',
};
export const userMenuLabelsFr: UserMenuLabels = {
    settingsLabel: 'Paramètres',
    logoutLabel: 'Se déconnecter',
};

export const frLabels: FullUiLabels = {
    alert: alertLabelsFr,
    codeBlock: codeBlockLabelsFr,
    combobox: comboboxLabelsFr,
    commandPalette: commandPaletteLabelsFr,
    confirmDialog: confirmDialogLabelsFr,
    appearanceToggle: appearanceToggleLabelsFr,
    breadcrumb: breadcrumbLabelsFr,
    carousel: carouselLabelsFr,
    copyButton: copyButtonLabelsFr,
    dangerZone: dangerZoneLabelsFr,
    dataTable: dataTableLabelsFr,
    dataTableFacetedFilter: dataTableFacetedFilterLabelsFr,
    dateFilter: dateFilterLabelsFr,
    dateFilterOperators: dateFilterOperatorsFr,
    dateFilterPresets: dateFilterPresetsFr,
    dateFilterUnits: dateFilterUnitsFr,
    datePicker: datePickerLabelsFr,
    dateRangeFilter: dateRangeFilterLabelsFr,
    dialog: dialogLabelsFr,
    dropzone: dropzoneLabelsFr,
    editor: editorLabelsFr,
    emptyState: emptyStateLabelsFr,
    field: fieldLabelsFr,
    floatingSheet: floatingSheetLabelsFr,
    formOverlay: formOverlayLabelsFr,
    jsonViewer: jsonViewerLabelsFr,
    loginForm: loginFormLabelsFr,
    pagination: paginationLabelsFr,
    passkeys: passkeyLabelsFr,
    passwordInput: passwordInputLabelsFr,
    saveStatus: saveStatusLabelsFr,
    settings: settingsLabelsFr,
    sheet: sheetLabelsFr,
    sidebar: sidebarLabelsFr,
    tour: tourLabelsFr,
    twoFactor: twoFactorLabelsFr,
    userMenu: userMenuLabelsFr,
};
