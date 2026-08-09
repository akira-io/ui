import type { CommandPaletteLabels } from '@/blocks/command-palette';
import type { DangerZoneLabels } from '@/blocks/danger-zone';
import type {
    DateFilterLabels,
    DateFilterOption,
} from '@/blocks/date-filter/types';
import type { FormOverlayLabels } from '@/blocks/form-overlay';
import type { LoginFormLabels } from '@/blocks/login-form/types';
import type { SettingsLabels } from '@/blocks/settings-page';
import type { TourLabels } from '@/blocks/tour/types';
import type { TwoFactorLabels } from '@/blocks/two-factor/types';
import type { AlertLabels } from '@/components/ui/alert';
import type { AppearanceToggleLabels } from '@/components/ui/appearance-toggle';
import type { CodeBlockLabels } from '@/components/ui/code-block';
import type { ComboboxLabels } from '@/components/ui/combobox';
import type { ConfirmDialogLabels } from '@/components/ui/confirm-dialog';
import type { CopyButtonLabels } from '@/components/ui/copy-button';
import type { DataTableLabels } from '@/components/ui/data-table';
import type { DataTableFacetedFilterLabels } from '@/components/ui/data-table-faceted-filter';
import type { DatePickerLabels } from '@/components/ui/date-picker';
import type { DateRangeFilterLabels } from '@/components/ui/date-range-filter';
import type { FieldLabels } from '@/components/ui/field';
import type { FloatingSheetLabels } from '@/components/ui/floating-sheet';
import type { JsonViewerLabels } from '@/components/ui/json-viewer';
import type { PasswordInputLabels } from '@/components/ui/password-input';
import type { SaveStatusLabels } from '@/components/ui/save-status';
import type { FullUiLabels } from '@/locales/context';

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

export const formOverlayLabelsFr: FormOverlayLabels = {
    cancelLabel: 'Annuler',
    saveLabel: 'Enregistrer',
    savingLabel: 'Enregistrement...',
};

export const dateRangeFilterLabelsFr: DateRangeFilterLabels = {
    emptyLabel: 'Plage de dates',
    dateFormat: 'dd/MM/yy',
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

export const commandPaletteLabelsFr: CommandPaletteLabels = {
    placeholder: 'Rechercher...',
    noResultsLabel: 'Aucun résultat trouvé',
};

export const tourLabelsFr: TourLabels = {
    next: 'Suivant',
    previous: 'Précédent',
    done: 'Terminer',
    progress: '{{current}} sur {{total}}',
};

export const dateFilterPresetsFr: DateFilterOption[] = [
    { value: 'today', label: "Aujourd'hui" },
    { value: 'yesterday', label: 'Hier' },
    { value: 'previous_week', label: 'Semaine précédente' },
    { value: 'previous_7_days', label: '7 derniers jours' },
    { value: 'previous_30_days', label: '30 derniers jours' },
    { value: 'previous_month', label: 'Mois précédent' },
    { value: 'previous_3_months', label: '3 derniers mois' },
    { value: 'previous_12_months', label: '12 derniers mois' },
];

export const dateFilterOperatorsFr: DateFilterOption[] = [
    { value: 'between', label: 'Entre' },
    { value: 'before', label: 'Avant' },
    { value: 'on', label: 'Le' },
    { value: 'after', label: 'Après' },
];

export const dateFilterUnitsFr: DateFilterOption[] = [
    { value: 'day', label: 'jours' },
    { value: 'week', label: 'semaines' },
    { value: 'month', label: 'mois' },
    { value: 'quarter', label: 'trimestres' },
    { value: 'year', label: 'ans' },
];

export const dateFilterLabelsFr: DateFilterLabels = {
    all: 'Toute la période',
    fixed: 'Plage fixe...',
    relative: 'Plage relative...',
    relativeTitle: 'Plage relative',
    apply: 'Appliquer le filtre',
    back: 'Retour',
    latest: 'Derniers',
    ago: 'il y a',
    includeCurrent: 'Inclure la période actuelle',
    startingAgo: 'À partir de',
    removeOffset: 'Supprimer le décalage',
    fallback: 'Date',
};

export const settingsLabelsFr: SettingsLabels = {
    back: 'Retour',
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

export const loginFormLabelsFr: LoginFormLabels = {
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'email@exemple.com',
    passwordLabel: 'Mot de passe',
    passwordPlaceholder: 'Mot de passe',
    forgotPasswordLabel: 'Mot de passe oublié ?',
    rememberLabel: 'Se souvenir de moi',
    submitLabel: 'Se connecter',
    submittingLabel: 'Connexion',
};

export const twoFactorLabelsFr: TwoFactorLabels = {
    setupTitle: 'Authentification à deux facteurs',
    setupDescription:
        'Ajoutez une seconde étape à votre connexion avec une application authentificatrice.',
    pendingLabel: 'Préparation de votre clé de configuration',
    scanTitle: 'Scannez le code',
    scanDescription:
        "Ouvrez l'application authentificatrice et scannez le code ci-dessous pour ajouter ce compte.",
    qrFallbackLabel: "Le code QR n'est pas encore disponible.",
    manualKeyLabel: 'Clé de configuration',
    manualKeyDescription:
        "Saisissez cette clé manuellement si l'application ne peut pas scanner le code.",
    manualKeyRevealLabel: 'Afficher la clé',
    manualKeyHideLabel: 'Masquer la clé',
    continueLabel: 'Continuer',
    confirmTitle: 'Confirmez le code',
    confirmDescription:
        "Saisissez le code à six chiffres affiché dans l'application authentificatrice.",
    codeLabel: "Code d'authentification",
    recoveryCodeLabel: 'Code de récupération',
    recoveryCodePlaceholder: 'Saisissez un code de récupération',
    useRecoveryCodeLabel: 'Utiliser un code de récupération',
    useCodeLabel: "Utiliser un code d'authentification",
    verifyLabel: 'Vérifier',
    verifyingLabel: 'Vérification',
    errorFallbackLabel: "Cela n'a pas fonctionné. Réessayez.",
    cancelLabel: 'Annuler',
    challengeTitle: 'Confirmation à deux facteurs',
    challengeDescription:
        "Confirmez l'accès à votre compte avec le code de l'application authentificatrice.",
    recoveryTitle: 'Codes de récupération',
    recoveryDescription:
        'Conservez ces codes en lieu sûr. Chacun vous permet de vous connecter une fois si vous perdez votre appareil.',
    recoveryWarning:
        "Ils ne sont affichés qu'une seule fois et ne peuvent pas être consultés à nouveau.",
    revealLabel: 'Afficher les codes',
    hideLabel: 'Masquer les codes',
    copyLabel: 'Copier',
    copiedLabel: 'Copié',
    copyFailedLabel:
        'Impossible de copier ici. Sélectionnez les codes manuellement.',
    regenerateLabel: 'Régénérer les codes',
    doneLabel: 'Terminer',
    disableLabel: "Désactiver l'authentification à deux facteurs",
    disableTitle: "Désactiver l'authentification à deux facteurs",
    disableDescription:
        'Votre compte ne sera plus protégé que par le mot de passe. Les codes de récupération cesseront de fonctionner.',
    disableConfirmLabel: 'Désactiver',
    disableCancelLabel: 'Garder active',
};

export const dangerZoneLabelsFr: DangerZoneLabels = {
    title: 'Zone de danger',
    description:
        'Ces actions sont définitives et ne peuvent pas être annulées.',
    actionLabel: 'Supprimer',
    confirmTitle: "Confirmer l'action",
    confirmDescription:
        'Êtes-vous sûr de vouloir continuer ? Cette action ne peut pas être annulée.',
    confirmText: 'Confirmer',
    cancelText: 'Annuler',
    requiredValueLabel: 'Saisissez {{value}} pour confirmer',
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

export const frLabels: FullUiLabels = {
    alert: alertLabelsFr,
    codeBlock: codeBlockLabelsFr,
    combobox: comboboxLabelsFr,
    commandPalette: commandPaletteLabelsFr,
    confirmDialog: confirmDialogLabelsFr,
    appearanceToggle: appearanceToggleLabelsFr,
    copyButton: copyButtonLabelsFr,
    dataTable: dataTableLabelsFr,
    dataTableFacetedFilter: dataTableFacetedFilterLabelsFr,
    dateFilter: dateFilterLabelsFr,
    dateFilterOperators: dateFilterOperatorsFr,
    dateFilterPresets: dateFilterPresetsFr,
    dateFilterUnits: dateFilterUnitsFr,
    datePicker: datePickerLabelsFr,
    dateRangeFilter: dateRangeFilterLabelsFr,
    floatingSheet: floatingSheetLabelsFr,
    jsonViewer: jsonViewerLabelsFr,
    loginForm: loginFormLabelsFr,
    passwordInput: passwordInputLabelsFr,
    saveStatus: saveStatusLabelsFr,
    settings: settingsLabelsFr,
    tour: tourLabelsFr,
};
