import {
  formatBytes
} from "../chunk-BW5T7MUK.js";

// src/locales/fr.ts
var alertLabelsFr = {
  warningLabel: "Avertissement",
  infoLabel: "Information"
};
var appearanceToggleLabelsFr = {
  groupLabel: "Apparence",
  lightLabel: "Clair",
  darkLabel: "Sombre",
  systemLabel: "Syst\xE8me"
};
var dataTableLabelsFr = {
  searchPlaceholder: "Rechercher...",
  emptyLabel: "Aucun r\xE9sultat.",
  createLabel: "Nouveau",
  clearFiltersLabel: "Effacer les filtres",
  paginationLabel: (page, pages) => `Page ${page} sur ${pages}`,
  noOptionsLabel: "Aucune option.",
  totalLabel: (total) => `${total.toLocaleString("fr-FR")} enregistrements`
};
var floatingSheetLabelsFr = {
  backLabel: "Retour",
  closeLabel: "Fermer"
};
var formOverlayLabelsFr = {
  cancelLabel: "Annuler",
  saveLabel: "Enregistrer",
  savingLabel: "Enregistrement..."
};
var dateRangeFilterLabelsFr = {
  emptyLabel: "Plage de dates",
  dateFormat: "dd/MM/yy"
};
var dropzoneLabelsFr = {
  idleLabel: "Glissez un fichier ici",
  activeLabel: "D\xE9posez pour joindre",
  triggerLabel: "Choisir un fichier",
  removeLabel: "Retirer le fichier",
  sizeLabel: (bytes) => formatBytes(bytes, "fr-FR"),
  invalidTypeLabel: "Ce type de fichier n'est pas accept\xE9.",
  tooLargeLabel: (maxSize) => `Le fichier d\xE9passe ${formatBytes(maxSize, "fr-FR")}.`,
  tooManyFilesLabel: (maxFiles) => `Joignez au maximum ${maxFiles} fichiers.`,
  rejectedLabel: "Le fichier n'a pas \xE9t\xE9 accept\xE9.",
  progressLabel: (percent) => `Envoi en cours, ${percent}% effectu\xE9`
};
var datePickerLabelsFr = {
  placeholder: "Choisir une date",
  dateFormat: "dd/MM/yy",
  clearLabel: "Effacer la date"
};
var comboboxLabelsFr = {
  placeholder: "S\xE9lectionnez une option",
  searchPlaceholder: "Rechercher...",
  emptyText: "Aucun r\xE9sultat."
};
var confirmDialogLabelsFr = {
  title: "Confirmer l'action",
  description: "\xCAtes-vous s\xFBr de vouloir continuer ? Cette action ne peut pas \xEAtre annul\xE9e.",
  confirmText: "Confirmer",
  cancelText: "Annuler"
};
var fieldLabelsFr = {
  requiredLabel: "Obligatoire"
};
var passwordInputLabelsFr = {
  showLabel: "Afficher le mot de passe",
  hideLabel: "Masquer le mot de passe"
};
var dataTableFacetedFilterLabelsFr = {
  noOptionsLabel: "Aucune option."
};
var commandPaletteLabelsFr = {
  placeholder: "Rechercher...",
  noResultsLabel: "Aucun r\xE9sultat trouv\xE9"
};
var tourLabelsFr = {
  next: "Suivant",
  previous: "Pr\xE9c\xE9dent",
  done: "Terminer",
  progress: "{{current}} sur {{total}}"
};
var dateFilterPresetsFr = [
  { value: "today", label: "Aujourd'hui" },
  { value: "yesterday", label: "Hier" },
  { value: "previous_week", label: "Semaine pr\xE9c\xE9dente" },
  { value: "previous_7_days", label: "7 derniers jours" },
  { value: "previous_30_days", label: "30 derniers jours" },
  { value: "previous_month", label: "Mois pr\xE9c\xE9dent" },
  { value: "previous_3_months", label: "3 derniers mois" },
  { value: "previous_12_months", label: "12 derniers mois" }
];
var dateFilterOperatorsFr = [
  { value: "between", label: "Entre" },
  { value: "before", label: "Avant" },
  { value: "on", label: "Le" },
  { value: "after", label: "Apr\xE8s" }
];
var dateFilterUnitsFr = [
  { value: "day", label: "jours" },
  { value: "week", label: "semaines" },
  { value: "month", label: "mois" },
  { value: "quarter", label: "trimestres" },
  { value: "year", label: "ans" }
];
var dateFilterLabelsFr = {
  all: "Toute la p\xE9riode",
  fixed: "Plage fixe...",
  relative: "Plage relative...",
  relativeTitle: "Plage relative",
  apply: "Appliquer le filtre",
  back: "Retour",
  latest: "Derniers",
  ago: "il y a",
  includeCurrent: "Inclure la p\xE9riode actuelle",
  startingAgo: "\xC0 partir de",
  removeOffset: "Supprimer le d\xE9calage",
  fallback: "Date"
};
var settingsLabelsFr = {
  back: "Retour"
};
var saveStatusLabelsFr = {
  error: "Vos modifications n'ont pas pu \xEAtre enregistr\xE9es",
  idle: "Les modifications sont enregistr\xE9es automatiquement",
  saved: "Enregistr\xE9",
  saving: "Enregistrement"
};
var copyButtonLabelsFr = {
  copyLabel: "Copier",
  copiedLabel: "Copi\xE9"
};
var loginFormLabelsFr = {
  emailLabel: "Adresse e-mail",
  emailPlaceholder: "email@exemple.com",
  passwordLabel: "Mot de passe",
  passwordPlaceholder: "Mot de passe",
  forgotPasswordLabel: "Mot de passe oubli\xE9 ?",
  rememberLabel: "Se souvenir de moi",
  submitLabel: "Se connecter",
  submittingLabel: "Connexion"
};
var twoFactorLabelsFr = {
  setupTitle: "Authentification \xE0 deux facteurs",
  setupDescription: "Ajoutez une seconde \xE9tape \xE0 votre connexion avec une application authentificatrice.",
  pendingLabel: "Pr\xE9paration de votre cl\xE9 de configuration",
  scanTitle: "Scannez le code",
  scanDescription: "Ouvrez l'application authentificatrice et scannez le code ci-dessous pour ajouter ce compte.",
  qrFallbackLabel: "Le code QR n'est pas encore disponible.",
  manualKeyLabel: "Cl\xE9 de configuration",
  manualKeyDescription: "Saisissez cette cl\xE9 manuellement si l'application ne peut pas scanner le code.",
  manualKeyRevealLabel: "Afficher la cl\xE9",
  manualKeyHideLabel: "Masquer la cl\xE9",
  continueLabel: "Continuer",
  confirmTitle: "Confirmez le code",
  confirmDescription: "Saisissez le code \xE0 six chiffres affich\xE9 dans l'application authentificatrice.",
  codeLabel: "Code d'authentification",
  recoveryCodeLabel: "Code de r\xE9cup\xE9ration",
  recoveryCodePlaceholder: "Saisissez un code de r\xE9cup\xE9ration",
  useRecoveryCodeLabel: "Utiliser un code de r\xE9cup\xE9ration",
  useCodeLabel: "Utiliser un code d'authentification",
  verifyLabel: "V\xE9rifier",
  verifyingLabel: "V\xE9rification",
  errorFallbackLabel: "Cela n'a pas fonctionn\xE9. R\xE9essayez.",
  cancelLabel: "Annuler",
  challengeTitle: "Confirmation \xE0 deux facteurs",
  challengeDescription: "Confirmez l'acc\xE8s \xE0 votre compte avec le code de l'application authentificatrice.",
  recoveryTitle: "Codes de r\xE9cup\xE9ration",
  recoveryDescription: "Conservez ces codes en lieu s\xFBr. Chacun vous permet de vous connecter une fois si vous perdez votre appareil.",
  recoveryWarning: "Ils ne sont affich\xE9s qu'une seule fois et ne peuvent pas \xEAtre consult\xE9s \xE0 nouveau.",
  revealLabel: "Afficher les codes",
  hideLabel: "Masquer les codes",
  copyLabel: "Copier",
  copiedLabel: "Copi\xE9",
  copyFailedLabel: "Impossible de copier ici. S\xE9lectionnez les codes manuellement.",
  regenerateLabel: "R\xE9g\xE9n\xE9rer les codes",
  doneLabel: "Terminer",
  disableLabel: "D\xE9sactiver l'authentification \xE0 deux facteurs",
  disableTitle: "D\xE9sactiver l'authentification \xE0 deux facteurs",
  disableDescription: "Votre compte ne sera plus prot\xE9g\xE9 que par le mot de passe. Les codes de r\xE9cup\xE9ration cesseront de fonctionner.",
  disableConfirmLabel: "D\xE9sactiver",
  disableCancelLabel: "Garder active"
};
var dangerZoneLabelsFr = {
  title: "Zone de danger",
  description: "Ces actions sont d\xE9finitives et ne peuvent pas \xEAtre annul\xE9es.",
  actionLabel: "Supprimer",
  confirmTitle: "Confirmer l'action",
  confirmDescription: "\xCAtes-vous s\xFBr de vouloir continuer ? Cette action ne peut pas \xEAtre annul\xE9e.",
  confirmText: "Confirmer",
  cancelText: "Annuler",
  requiredValueLabel: "Saisissez {{value}} pour confirmer"
};
var codeBlockLabelsFr = {
  copyLabel: "Copier",
  copiedLabel: "Copi\xE9",
  expandLabel: "D\xE9velopper",
  collapseLabel: "R\xE9duire"
};
var jsonViewerLabelsFr = {
  copyLabel: "Copier",
  copiedLabel: "Copi\xE9",
  expandLabel: "D\xE9velopper",
  collapseLabel: "R\xE9duire",
  circularLabel: "R\xE9f\xE9rence circulaire",
  entriesLabel: (count) => `${count} ${count === 1 ? "entr\xE9e" : "entr\xE9es"}`
};
var frLabels = {
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
  dropzone: dropzoneLabelsFr,
  floatingSheet: floatingSheetLabelsFr,
  jsonViewer: jsonViewerLabelsFr,
  loginForm: loginFormLabelsFr,
  passwordInput: passwordInputLabelsFr,
  saveStatus: saveStatusLabelsFr,
  settings: settingsLabelsFr,
  tour: tourLabelsFr
};
export {
  alertLabelsFr,
  appearanceToggleLabelsFr,
  codeBlockLabelsFr,
  comboboxLabelsFr,
  commandPaletteLabelsFr,
  confirmDialogLabelsFr,
  copyButtonLabelsFr,
  dangerZoneLabelsFr,
  dataTableFacetedFilterLabelsFr,
  dataTableLabelsFr,
  dateFilterLabelsFr,
  dateFilterOperatorsFr,
  dateFilterPresetsFr,
  dateFilterUnitsFr,
  datePickerLabelsFr,
  dateRangeFilterLabelsFr,
  dropzoneLabelsFr,
  fieldLabelsFr,
  floatingSheetLabelsFr,
  formOverlayLabelsFr,
  frLabels,
  jsonViewerLabelsFr,
  loginFormLabelsFr,
  passwordInputLabelsFr,
  saveStatusLabelsFr,
  settingsLabelsFr,
  tourLabelsFr,
  twoFactorLabelsFr
};
//# sourceMappingURL=fr.js.map