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

export const formOverlayLabelsPt: FormOverlayLabels = {
    cancelLabel: 'Cancelar',
    saveLabel: 'Guardar',
    savingLabel: 'A guardar...',
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
export const loginFormLabelsPt: LoginFormLabels = {
    emailLabel: 'Endereço de email',
    emailPlaceholder: 'email@exemplo.com',
    passwordLabel: 'Palavra-passe',
    passwordPlaceholder: 'Palavra-passe',
    forgotPasswordLabel: 'Esqueceu-se da palavra-passe?',
    rememberLabel: 'Manter sessão iniciada',
    submitLabel: 'Entrar',
    submittingLabel: 'A entrar',
};
export const passkeyLabelsPt: PasskeyLabels = {
    signInLabel: 'Iniciar sessão com uma passkey',
    signingInLabel: 'A autenticar',
    unsupportedLabel: 'As passkeys não são suportadas neste navegador.',
    addLabel: 'Adicionar passkey',
    nameLabel: 'Nome da passkey',
    namePlaceholder: 'Por exemplo MacBook Pro ou iPhone',
    nameDescription: 'Um nome ajuda a identificar esta passkey mais tarde.',
    deviceNameLabel: (browser, system) => `${browser} no ${system}`,
    registerLabel: 'Registar passkey',
    registeringLabel: 'A registar',
    cancelLabel: 'Cancelar',
    errorFallbackLabel: 'Não foi possível concluir. Tente novamente.',
    createdLabel: (when) => `Adicionada ${when}`,
    lastUsedLabel: (when) => `Última utilização ${when}`,
    deleteLabel: (name) => `Remover ${name}`,
    deleteTitle: 'Remover passkey',
    deleteDescription: (name) =>
        `Deixará de poder iniciar sessão com "${name}".`,
    deleteConfirmLabel: 'Remover passkey',
    deleteCancelLabel: 'Cancelar',
    emptyTitle: 'Ainda sem passkeys',
    emptyDescription:
        'Adicione uma passkey para iniciar sessão sem palavra-passe',
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
export const dangerZoneLabelsPt: DangerZoneLabels = {
    title: 'Zona de perigo',
    description: 'Estas ações são permanentes e não podem ser desfeitas.',
    actionLabel: 'Eliminar',
    confirmTitle: 'Confirmar Ação',
    confirmDescription:
        'Tem a certeza que pretende continuar? Esta ação não pode ser desfeita.',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    requiredValueLabel: 'Escreva {{value}} para confirmar',
};
