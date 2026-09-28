import {
  formatBytes
} from "../chunk-BW5T7MUK.js";

// src/locales/es-blocks.ts
var formOverlayLabelsEs = {
  cancelLabel: "Cancelar",
  saveLabel: "Guardar",
  savingLabel: "Guardando..."
};
var commandPaletteLabelsEs = {
  placeholder: "Buscar...",
  noResultsLabel: "No se han encontrado resultados"
};
var tourLabelsEs = {
  next: "Siguiente",
  previous: "Anterior",
  done: "Finalizar",
  progress: "{{current}} de {{total}}"
};
var dateFilterPresetsEs = [
  { value: "today", label: "Hoy" },
  { value: "yesterday", label: "Ayer" },
  { value: "previous_week", label: "Semana anterior" },
  { value: "previous_7_days", label: "\xDAltimos 7 d\xEDas" },
  { value: "previous_30_days", label: "\xDAltimos 30 d\xEDas" },
  { value: "previous_month", label: "Mes anterior" },
  { value: "previous_3_months", label: "\xDAltimos 3 meses" },
  { value: "previous_12_months", label: "\xDAltimos 12 meses" }
];
var dateFilterOperatorsEs = [
  { value: "between", label: "Entre" },
  { value: "before", label: "Antes de" },
  { value: "on", label: "El" },
  { value: "after", label: "Despu\xE9s de" }
];
var dateFilterUnitsEs = [
  { value: "day", label: "d\xEDas" },
  { value: "week", label: "semanas" },
  { value: "month", label: "meses" },
  { value: "quarter", label: "trimestres" },
  { value: "year", label: "a\xF1os" }
];
var dateFilterLabelsEs = {
  all: "Todo el periodo",
  fixed: "Intervalo fijo...",
  relative: "Intervalo relativo...",
  relativeTitle: "Intervalo relativo",
  apply: "Aplicar filtro",
  back: "Volver",
  latest: "\xDAltimos",
  ago: "hace",
  includeCurrent: "Incluir el periodo actual",
  startingAgo: "A partir de",
  removeOffset: "Quitar desplazamiento",
  fallback: "Fecha"
};
var settingsLabelsEs = {
  back: "Volver"
};
var loginFormLabelsEs = {
  emailLabel: "Correo electr\xF3nico",
  emailPlaceholder: "correo@ejemplo.com",
  passwordLabel: "Contrase\xF1a",
  passwordPlaceholder: "Contrase\xF1a",
  forgotPasswordLabel: "\xBFHas olvidado la contrase\xF1a?",
  rememberLabel: "Recordarme",
  submitLabel: "Iniciar sesi\xF3n",
  submittingLabel: "Iniciando sesi\xF3n"
};
var passkeyLabelsEs = {
  signInLabel: "Iniciar sesi\xF3n con una llave de acceso",
  signingInLabel: "Iniciando sesi\xF3n",
  unsupportedLabel: "Este navegador no admite llaves de acceso.",
  addLabel: "A\xF1adir llave de acceso",
  nameLabel: "Nombre de la llave de acceso",
  namePlaceholder: "Por ejemplo, MacBook Pro o iPhone",
  nameDescription: "Un nombre te ayuda a reconocer esta llave de acceso m\xE1s adelante.",
  deviceNameLabel: (browser, system) => `${browser} en ${system}`,
  registerLabel: "Registrar llave de acceso",
  registeringLabel: "Registrando",
  cancelLabel: "Cancelar",
  errorFallbackLabel: "No ha funcionado. Int\xE9ntalo de nuevo.",
  createdLabel: (when) => `A\xF1adida ${when}`,
  lastUsedLabel: (when) => `\xDAltimo uso ${when}`,
  deleteLabel: (name) => `Eliminar ${name}`,
  deleteTitle: "Eliminar llave de acceso",
  deleteDescription: (name) => `Ya no podr\xE1s iniciar sesi\xF3n con \xAB${name}\xBB.`,
  deleteConfirmLabel: "Eliminar llave de acceso",
  deleteCancelLabel: "Cancelar",
  emptyTitle: "Todav\xEDa no hay llaves de acceso",
  emptyDescription: "A\xF1ade una llave de acceso para iniciar sesi\xF3n sin contrase\xF1a."
};
var twoFactorLabelsEs = {
  setupTitle: "Autenticaci\xF3n en dos pasos",
  setupDescription: "A\xF1ade un segundo paso al inicio de sesi\xF3n con una aplicaci\xF3n de autenticaci\xF3n.",
  pendingLabel: "Preparando tu clave de configuraci\xF3n",
  scanTitle: "Escanea el c\xF3digo",
  scanDescription: "Abre la aplicaci\xF3n de autenticaci\xF3n y escanea el c\xF3digo de abajo para a\xF1adir esta cuenta.",
  qrFallbackLabel: "El c\xF3digo QR a\xFAn no est\xE1 disponible.",
  manualKeyLabel: "Clave de configuraci\xF3n",
  manualKeyDescription: "Introduce esta clave manualmente si la aplicaci\xF3n no puede escanear el c\xF3digo.",
  manualKeyRevealLabel: "Mostrar clave",
  manualKeyHideLabel: "Ocultar clave",
  continueLabel: "Continuar",
  confirmTitle: "Confirma el c\xF3digo",
  confirmDescription: "Introduce el c\xF3digo de seis d\xEDgitos que muestra la aplicaci\xF3n de autenticaci\xF3n.",
  codeLabel: "C\xF3digo de autenticaci\xF3n",
  recoveryCodeLabel: "C\xF3digo de recuperaci\xF3n",
  recoveryCodePlaceholder: "Introduce un c\xF3digo de recuperaci\xF3n",
  useRecoveryCodeLabel: "Usar un c\xF3digo de recuperaci\xF3n",
  useCodeLabel: "Usar un c\xF3digo de autenticaci\xF3n",
  verifyLabel: "Verificar",
  verifyingLabel: "Verificando",
  errorFallbackLabel: "No ha funcionado. Int\xE9ntalo de nuevo.",
  cancelLabel: "Cancelar",
  challengeTitle: "Confirmaci\xF3n en dos pasos",
  challengeDescription: "Confirma el acceso a tu cuenta con el c\xF3digo de la aplicaci\xF3n de autenticaci\xF3n.",
  recoveryTitle: "C\xF3digos de recuperaci\xF3n",
  recoveryDescription: "Guarda estos c\xF3digos en un lugar seguro. Cada uno te permite iniciar sesi\xF3n una vez si pierdes el dispositivo.",
  recoveryWarning: "Solo se muestran una vez y no se pueden volver a consultar.",
  revealLabel: "Mostrar c\xF3digos",
  hideLabel: "Ocultar c\xF3digos",
  copyLabel: "Copiar",
  copiedLabel: "Copiado",
  copyFailedLabel: "No se ha podido copiar aqu\xED. Selecciona los c\xF3digos manualmente.",
  regenerateLabel: "Regenerar c\xF3digos",
  doneLabel: "Finalizar",
  disableLabel: "Desactivar la autenticaci\xF3n en dos pasos",
  disableTitle: "Desactivar la autenticaci\xF3n en dos pasos",
  disableDescription: "Tu cuenta quedar\xE1 protegida solo con la contrase\xF1a. Los c\xF3digos de recuperaci\xF3n dejar\xE1n de funcionar.",
  disableConfirmLabel: "Desactivar",
  disableCancelLabel: "Mantener activa"
};
var dangerZoneLabelsEs = {
  title: "Zona de peligro",
  description: "Estas acciones son definitivas y no se pueden deshacer.",
  actionLabel: "Eliminar",
  confirmTitle: "Confirmar acci\xF3n",
  confirmDescription: "\xBFSeguro que quieres continuar? Esta acci\xF3n no se puede deshacer.",
  confirmText: "Confirmar",
  cancelText: "Cancelar",
  requiredValueLabel: "Escribe {{value}} para confirmar"
};

// src/locales/es.ts
var alertLabelsEs = {
  warningLabel: "Advertencia",
  infoLabel: "Informaci\xF3n"
};
var appearanceToggleLabelsEs = {
  groupLabel: "Apariencia",
  lightLabel: "Claro",
  darkLabel: "Oscuro",
  systemLabel: "Sistema"
};
var dataTableLabelsEs = {
  searchPlaceholder: "Buscar...",
  emptyLabel: "No hay resultados.",
  createLabel: "Nuevo",
  clearFiltersLabel: "Borrar filtros",
  paginationLabel: (page, pages) => `P\xE1gina ${page} de ${pages}`,
  noOptionsLabel: "No hay opciones.",
  totalLabel: (total) => `${total.toLocaleString("es-ES")} registros`
};
var floatingSheetLabelsEs = {
  backLabel: "Volver",
  closeLabel: "Cerrar"
};
var dateRangeFilterLabelsEs = {
  emptyLabel: "Intervalo de fechas",
  dateFormat: "dd/MM/yy"
};
var dropzoneLabelsEs = {
  idleLabel: "Arrastra un archivo aqu\xED",
  activeLabel: "Suelta para adjuntar",
  triggerLabel: "Elegir archivo",
  removeLabel: "Quitar archivo",
  sizeLabel: (bytes) => formatBytes(bytes, "es-ES"),
  invalidTypeLabel: "Este tipo de archivo no se admite.",
  tooLargeLabel: (maxSize) => `El archivo supera ${formatBytes(maxSize, "es-ES")}.`,
  tooManyFilesLabel: (maxFiles) => `Adjunta como m\xE1ximo ${maxFiles} archivos.`,
  rejectedLabel: "No se ha aceptado el archivo.",
  progressLabel: (percent) => `Subiendo, ${percent}% completado`
};
var datePickerLabelsEs = {
  placeholder: "Elige una fecha",
  dateFormat: "dd/MM/yy",
  clearLabel: "Borrar fecha"
};
var comboboxLabelsEs = {
  placeholder: "Selecciona una opci\xF3n",
  searchPlaceholder: "Buscar...",
  emptyText: "No hay resultados."
};
var confirmDialogLabelsEs = {
  title: "Confirmar acci\xF3n",
  description: "\xBFSeguro que quieres continuar? Esta acci\xF3n no se puede deshacer.",
  confirmText: "Confirmar",
  cancelText: "Cancelar"
};
var fieldLabelsEs = {
  requiredLabel: "Obligatorio"
};
var passwordInputLabelsEs = {
  showLabel: "Mostrar contrase\xF1a",
  hideLabel: "Ocultar contrase\xF1a"
};
var dataTableFacetedFilterLabelsEs = {
  noOptionsLabel: "No hay opciones."
};
var saveStatusLabelsEs = {
  error: "No se han podido guardar los cambios",
  idle: "Los cambios se guardan autom\xE1ticamente",
  saved: "Guardado",
  saving: "Guardando"
};
var copyButtonLabelsEs = {
  copyLabel: "Copiar",
  copiedLabel: "Copiado"
};
var codeBlockLabelsEs = {
  copyLabel: "Copiar",
  copiedLabel: "Copiado",
  expandLabel: "Expandir",
  collapseLabel: "Contraer"
};
var jsonViewerLabelsEs = {
  copyLabel: "Copiar",
  copiedLabel: "Copiado",
  expandLabel: "Expandir",
  collapseLabel: "Contraer",
  circularLabel: "Referencia circular",
  entriesLabel: (count) => `${count} ${count === 1 ? "entrada" : "entradas"}`
};
var emptyStateLabelsEs = {
  title: "No hay nada que mostrar"
};
var editorLabelsEs = {
  toolbarLabel: "Formato",
  boldLabel: "Negrita",
  italicLabel: "Cursiva",
  strikeLabel: "Tachado",
  codeLabel: "C\xF3digo",
  headingLabel: (level) => `T\xEDtulo ${level}`,
  bulletListLabel: "Lista con vi\xF1etas",
  orderedListLabel: "Lista numerada",
  blockquoteLabel: "Cita",
  undoLabel: "Deshacer",
  redoLabel: "Rehacer",
  linkLabel: "Enlace",
  linkDialogTitle: "Enlace",
  linkDialogDescription: "Asocia el texto seleccionado a una direcci\xF3n.",
  linkUrlLabel: "Direcci\xF3n",
  linkUrlPlaceholder: "https://ejemplo.es",
  linkApplyLabel: "Aplicar",
  linkRemoveLabel: "Quitar",
  linkCancelLabel: "Cancelar"
};
var dialogLabelsEs = {
  closeLabel: "Cerrar"
};
var sheetLabelsEs = {
  closeLabel: "Cerrar"
};
var paginationLabelsEs = {
  navigationLabel: "Paginaci\xF3n",
  previousLabel: "Anterior",
  previousPageLabel: "Ir a la p\xE1gina anterior",
  nextLabel: "Siguiente",
  nextPageLabel: "Ir a la p\xE1gina siguiente",
  morePagesLabel: "M\xE1s p\xE1ginas"
};
var breadcrumbLabelsEs = {
  navigationLabel: "Ruta de navegaci\xF3n",
  moreLabel: "M\xE1s"
};
var sidebarLabelsEs = {
  toggleLabel: "Mostrar u ocultar la barra lateral"
};
var carouselLabelsEs = {
  carouselLabel: "carrusel",
  slideLabel: "diapositiva",
  previousLabel: "Diapositiva anterior",
  nextLabel: "Diapositiva siguiente"
};
var esLabels = {
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
  pagination: paginationLabelsEs,
  passkeys: passkeyLabelsEs,
  passwordInput: passwordInputLabelsEs,
  saveStatus: saveStatusLabelsEs,
  settings: settingsLabelsEs,
  sheet: sheetLabelsEs,
  sidebar: sidebarLabelsEs,
  tour: tourLabelsEs,
  twoFactor: twoFactorLabelsEs
};
export {
  alertLabelsEs,
  appearanceToggleLabelsEs,
  breadcrumbLabelsEs,
  carouselLabelsEs,
  codeBlockLabelsEs,
  comboboxLabelsEs,
  commandPaletteLabelsEs,
  confirmDialogLabelsEs,
  copyButtonLabelsEs,
  dangerZoneLabelsEs,
  dataTableFacetedFilterLabelsEs,
  dataTableLabelsEs,
  dateFilterLabelsEs,
  dateFilterOperatorsEs,
  dateFilterPresetsEs,
  dateFilterUnitsEs,
  datePickerLabelsEs,
  dateRangeFilterLabelsEs,
  dialogLabelsEs,
  dropzoneLabelsEs,
  editorLabelsEs,
  emptyStateLabelsEs,
  esLabels,
  fieldLabelsEs,
  floatingSheetLabelsEs,
  formOverlayLabelsEs,
  jsonViewerLabelsEs,
  loginFormLabelsEs,
  paginationLabelsEs,
  passkeyLabelsEs,
  passwordInputLabelsEs,
  saveStatusLabelsEs,
  settingsLabelsEs,
  sheetLabelsEs,
  sidebarLabelsEs,
  tourLabelsEs,
  twoFactorLabelsEs
};
//# sourceMappingURL=es.js.map