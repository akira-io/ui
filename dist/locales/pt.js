import {
  formatBytes
} from "../chunk-BW5T7MUK.js";

// src/locales/pt.ts
var alertLabelsPt = {
  warningLabel: "Aviso",
  infoLabel: "Informa\xE7\xE3o"
};
var appearanceToggleLabelsPt = {
  groupLabel: "Apar\xEAncia",
  lightLabel: "Claro",
  darkLabel: "Escuro",
  systemLabel: "Sistema"
};
var dataTableLabelsPt = {
  searchPlaceholder: "Pesquisar...",
  emptyLabel: "Sem registos.",
  createLabel: "Novo",
  clearFiltersLabel: "Limpar filtros",
  paginationLabel: (page, pages) => `P\xE1gina ${page} de ${pages}`,
  noOptionsLabel: "Sem op\xE7\xF5es.",
  totalLabel: (total) => `${total.toLocaleString("pt-PT")} registos`
};
var floatingSheetLabelsPt = {
  backLabel: "Voltar",
  closeLabel: "Fechar"
};
var formOverlayLabelsPt = {
  cancelLabel: "Cancelar",
  saveLabel: "Guardar",
  savingLabel: "A guardar..."
};
var dateRangeFilterLabelsPt = {
  emptyLabel: "Per\xEDodo",
  dateFormat: "dd/MM/yy"
};
var dropzoneLabelsPt = {
  idleLabel: "Arraste um ficheiro para aqui",
  activeLabel: "Largue para anexar",
  triggerLabel: "Escolher ficheiro",
  removeLabel: "Remover ficheiro",
  sizeLabel: (bytes) => formatBytes(bytes, "pt-PT"),
  invalidTypeLabel: "Este tipo de ficheiro n\xE3o \xE9 aceite.",
  tooLargeLabel: (maxSize) => `O ficheiro \xE9 maior do que ${formatBytes(maxSize, "pt-PT")}.`,
  tooManyFilesLabel: (maxFiles) => `Anexe no m\xE1ximo ${maxFiles} ficheiros.`,
  rejectedLabel: "O ficheiro n\xE3o foi aceite.",
  progressLabel: (percent) => `A enviar, ${percent}% conclu\xEDdo`
};
var datePickerLabelsPt = {
  placeholder: "Escolha uma data",
  dateFormat: "dd/MM/yy",
  clearLabel: "Limpar data"
};
var comboboxLabelsPt = {
  placeholder: "Seleccione uma op\xE7\xE3o",
  searchPlaceholder: "Pesquisar...",
  emptyText: "Sem resultados."
};
var confirmDialogLabelsPt = {
  title: "Confirmar A\xE7\xE3o",
  description: "Tem a certeza que pretende continuar? Esta a\xE7\xE3o n\xE3o pode ser desfeita.",
  confirmText: "Confirmar",
  cancelText: "Cancelar"
};
var fieldLabelsPt = {
  requiredLabel: "Obrigat\xF3rio"
};
var passwordInputLabelsPt = {
  showLabel: "Mostrar palavra-passe",
  hideLabel: "Ocultar palavra-passe"
};
var dataTableFacetedFilterLabelsPt = {
  noOptionsLabel: "Sem op\xE7\xF5es."
};
var commandPaletteLabelsPt = {
  placeholder: "Pesquisar...",
  noResultsLabel: "Nenhum resultado encontrado"
};
var tourLabelsPt = {
  next: "Seguinte",
  previous: "Anterior",
  done: "Concluir",
  progress: "{{current}} de {{total}}"
};
var dateFilterPresetsPt = [
  { value: "today", label: "Hoje" },
  { value: "yesterday", label: "Ontem" },
  { value: "previous_week", label: "Semana anterior" },
  { value: "previous_7_days", label: "\xDAltimos 7 dias" },
  { value: "previous_30_days", label: "\xDAltimos 30 dias" },
  { value: "previous_month", label: "M\xEAs anterior" },
  { value: "previous_3_months", label: "\xDAltimos 3 meses" },
  { value: "previous_12_months", label: "\xDAltimos 12 meses" }
];
var dateFilterOperatorsPt = [
  { value: "between", label: "Entre" },
  { value: "before", label: "Antes de" },
  { value: "on", label: "Em" },
  { value: "after", label: "Depois de" }
];
var dateFilterUnitsPt = [
  { value: "day", label: "dias" },
  { value: "week", label: "semanas" },
  { value: "month", label: "meses" },
  { value: "quarter", label: "trimestres" },
  { value: "year", label: "anos" }
];
var dateFilterLabelsPt = {
  all: "Todo o per\xEDodo",
  fixed: "Intervalo fixo...",
  relative: "Intervalo relativo...",
  relativeTitle: "Intervalo relativo",
  apply: "Aplicar filtro",
  back: "Voltar",
  latest: "\xDAltimos",
  ago: "h\xE1",
  includeCurrent: "Incluir per\xEDodo atual",
  startingAgo: "A come\xE7ar h\xE1",
  removeOffset: "Remover deslocamento",
  fallback: "Data"
};
var settingsLabelsPt = {
  back: "Voltar"
};
var saveStatusLabelsPt = {
  error: "N\xE3o foi poss\xEDvel guardar as altera\xE7\xF5es",
  idle: "As altera\xE7\xF5es s\xE3o guardadas automaticamente",
  saved: "Guardado",
  saving: "A guardar"
};
var copyButtonLabelsPt = {
  copyLabel: "Copiar",
  copiedLabel: "Copiado"
};
var loginFormLabelsPt = {
  emailLabel: "Endere\xE7o de email",
  emailPlaceholder: "email@exemplo.com",
  passwordLabel: "Palavra-passe",
  passwordPlaceholder: "Palavra-passe",
  forgotPasswordLabel: "Esqueceu-se da palavra-passe?",
  rememberLabel: "Manter sess\xE3o iniciada",
  submitLabel: "Entrar",
  submittingLabel: "A entrar"
};
var twoFactorLabelsPt = {
  setupTitle: "Autentica\xE7\xE3o de dois fatores",
  setupDescription: "Acrescente um segundo passo ao seu in\xEDcio de sess\xE3o com uma aplica\xE7\xE3o autenticadora.",
  pendingLabel: "A preparar a sua chave de configura\xE7\xE3o",
  scanTitle: "Leia o c\xF3digo",
  scanDescription: "Abra a aplica\xE7\xE3o autenticadora e leia o c\xF3digo abaixo para adicionar esta conta.",
  qrFallbackLabel: "O c\xF3digo QR ainda n\xE3o est\xE1 dispon\xEDvel.",
  manualKeyLabel: "Chave de configura\xE7\xE3o",
  manualKeyDescription: "Introduza esta chave manualmente se a aplica\xE7\xE3o n\xE3o conseguir ler o c\xF3digo.",
  manualKeyRevealLabel: "Mostrar chave",
  manualKeyHideLabel: "Ocultar chave",
  continueLabel: "Continuar",
  confirmTitle: "Confirme o c\xF3digo",
  confirmDescription: "Introduza o c\xF3digo de seis d\xEDgitos apresentado na aplica\xE7\xE3o autenticadora.",
  codeLabel: "C\xF3digo de autentica\xE7\xE3o",
  recoveryCodeLabel: "C\xF3digo de recupera\xE7\xE3o",
  recoveryCodePlaceholder: "Introduza um c\xF3digo de recupera\xE7\xE3o",
  useRecoveryCodeLabel: "Usar um c\xF3digo de recupera\xE7\xE3o",
  useCodeLabel: "Usar um c\xF3digo de autentica\xE7\xE3o",
  verifyLabel: "Verificar",
  verifyingLabel: "A verificar",
  errorFallbackLabel: "N\xE3o resultou. Tente novamente.",
  cancelLabel: "Cancelar",
  challengeTitle: "Confirma\xE7\xE3o em dois passos",
  challengeDescription: "Confirme o acesso \xE0 sua conta com o c\xF3digo da aplica\xE7\xE3o autenticadora.",
  recoveryTitle: "C\xF3digos de recupera\xE7\xE3o",
  recoveryDescription: "Guarde estes c\xF3digos em lugar seguro. Cada um permite um in\xEDcio de sess\xE3o se perder o dispositivo.",
  recoveryWarning: "S\xE3o mostrados uma \xFAnica vez e n\xE3o podem ser lidos depois.",
  revealLabel: "Mostrar c\xF3digos",
  hideLabel: "Ocultar c\xF3digos",
  copyLabel: "Copiar",
  copiedLabel: "Copiado",
  copyFailedLabel: "N\xE3o \xE9 poss\xEDvel copiar aqui. Selecione os c\xF3digos manualmente.",
  regenerateLabel: "Gerar novos c\xF3digos",
  doneLabel: "Concluir",
  disableLabel: "Desativar autentica\xE7\xE3o de dois fatores",
  disableTitle: "Desativar autentica\xE7\xE3o de dois fatores",
  disableDescription: "A sua conta fica protegida apenas pela palavra-passe. Os c\xF3digos de recupera\xE7\xE3o deixam de funcionar.",
  disableConfirmLabel: "Desativar",
  disableCancelLabel: "Manter ativa"
};
var dangerZoneLabelsPt = {
  title: "Zona de perigo",
  description: "Estas a\xE7\xF5es s\xE3o permanentes e n\xE3o podem ser desfeitas.",
  actionLabel: "Eliminar",
  confirmTitle: "Confirmar A\xE7\xE3o",
  confirmDescription: "Tem a certeza que pretende continuar? Esta a\xE7\xE3o n\xE3o pode ser desfeita.",
  confirmText: "Confirmar",
  cancelText: "Cancelar",
  requiredValueLabel: "Escreva {{value}} para confirmar"
};
var codeBlockLabelsPt = {
  copyLabel: "Copiar",
  copiedLabel: "Copiado",
  expandLabel: "Expandir",
  collapseLabel: "Recolher"
};
var jsonViewerLabelsPt = {
  copyLabel: "Copiar",
  copiedLabel: "Copiado",
  expandLabel: "Expandir",
  collapseLabel: "Recolher",
  circularLabel: "Refer\xEAncia circular",
  entriesLabel: (count) => `${count} ${count === 1 ? "entrada" : "entradas"}`
};
var ptLabels = {
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
  floatingSheet: floatingSheetLabelsPt,
  jsonViewer: jsonViewerLabelsPt,
  loginForm: loginFormLabelsPt,
  passwordInput: passwordInputLabelsPt,
  saveStatus: saveStatusLabelsPt,
  settings: settingsLabelsPt,
  tour: tourLabelsPt
};
export {
  alertLabelsPt,
  appearanceToggleLabelsPt,
  codeBlockLabelsPt,
  comboboxLabelsPt,
  commandPaletteLabelsPt,
  confirmDialogLabelsPt,
  copyButtonLabelsPt,
  dangerZoneLabelsPt,
  dataTableFacetedFilterLabelsPt,
  dataTableLabelsPt,
  dateFilterLabelsPt,
  dateFilterOperatorsPt,
  dateFilterPresetsPt,
  dateFilterUnitsPt,
  datePickerLabelsPt,
  dateRangeFilterLabelsPt,
  dropzoneLabelsPt,
  fieldLabelsPt,
  floatingSheetLabelsPt,
  formOverlayLabelsPt,
  jsonViewerLabelsPt,
  loginFormLabelsPt,
  passwordInputLabelsPt,
  ptLabels,
  saveStatusLabelsPt,
  settingsLabelsPt,
  tourLabelsPt,
  twoFactorLabelsPt
};
//# sourceMappingURL=pt.js.map