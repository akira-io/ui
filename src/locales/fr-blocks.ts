import type { CommandPaletteLabels } from '@/blocks/command-palette';
import type { DangerZoneLabels } from '@/blocks/danger-zone';
import type {
    DateFilterLabels,
    DateFilterOption,
} from '@/blocks/date-filter/types';
import type { FormOverlayLabels } from '@/blocks/form-overlay';
import type { LoginFormLabels } from '@/blocks/login-form/types';
import type { PasskeyLabels } from '@/blocks/passkeys/types';
import type { SettingsLabels } from '@/blocks/settings-page';
import type { TourLabels } from '@/blocks/tour/types';
import type { TwoFactorLabels } from '@/blocks/two-factor/types';

export const formOverlayLabelsFr: FormOverlayLabels = {
    cancelLabel: 'Annuler',
    saveLabel: 'Enregistrer',
    savingLabel: 'Enregistrement...',
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
export const passkeyLabelsFr: PasskeyLabels = {
    signInLabel: "Se connecter avec une clé d'accès",
    signingInLabel: 'Connexion en cours',
    unsupportedLabel:
        "Les clés d'accès ne sont pas prises en charge par ce navigateur.",
    addLabel: "Ajouter une clé d'accès",
    nameLabel: "Nom de la clé d'accès",
    namePlaceholder: 'Par exemple MacBook Pro ou iPhone',
    nameDescription:
        "Un nom vous aide à reconnaître cette clé d'accès plus tard.",
    deviceNameLabel: (browser, system) => `${browser} sur ${system}`,
    registerLabel: "Enregistrer la clé d'accès",
    registeringLabel: 'Enregistrement en cours',
    cancelLabel: 'Annuler',
    errorFallbackLabel: "Cela n'a pas fonctionné. Réessayez.",
    createdLabel: (when) => `Ajoutée ${when}`,
    lastUsedLabel: (when) => `Dernière utilisation ${when}`,
    deleteLabel: (name) => `Supprimer ${name}`,
    deleteTitle: "Supprimer la clé d'accès",
    deleteDescription: (name) =>
        `Vous ne pourrez plus vous connecter avec « ${name} ».`,
    deleteConfirmLabel: "Supprimer la clé d'accès",
    deleteCancelLabel: 'Annuler',
    emptyTitle: "Aucune clé d'accès pour le moment",
    emptyDescription:
        "Ajoutez une clé d'accès pour vous connecter sans mot de passe.",
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
