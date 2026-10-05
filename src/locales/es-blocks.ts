import type { CommandPaletteLabels } from '@/blocks/command-palette';
import type { DangerZoneLabels } from '@/blocks/danger-zone';
import type {
    DateFilterLabels,
    DateFilterOption,
} from '@/blocks/date-filter/types';
import type { FormOverlayLabels } from '@/blocks/form-overlay';
import type { LoginFormLabels } from '@/blocks/login-form/types';
import type { NotificationBellLabels } from '@/blocks/notification-bell';
import type { PasskeyLabels } from '@/blocks/passkeys/types';
import type { SettingsLabels } from '@/blocks/settings-page';
import type { TourLabels } from '@/blocks/tour/types';
import type { TwoFactorLabels } from '@/blocks/two-factor/types';

export const formOverlayLabelsEs: FormOverlayLabels = {
    cancelLabel: 'Cancelar',
    saveLabel: 'Guardar',
    savingLabel: 'Guardando...',
};
export const commandPaletteLabelsEs: CommandPaletteLabels = {
    placeholder: 'Buscar...',
    noResultsLabel: 'No se han encontrado resultados',
};
export const tourLabelsEs: TourLabels = {
    next: 'Siguiente',
    previous: 'Anterior',
    done: 'Finalizar',
    progress: '{{current}} de {{total}}',
};
export const dateFilterPresetsEs: DateFilterOption[] = [
    { value: 'today', label: 'Hoy' },
    { value: 'yesterday', label: 'Ayer' },
    { value: 'previous_week', label: 'Semana anterior' },
    { value: 'previous_7_days', label: 'Últimos 7 días' },
    { value: 'previous_30_days', label: 'Últimos 30 días' },
    { value: 'previous_month', label: 'Mes anterior' },
    { value: 'previous_3_months', label: 'Últimos 3 meses' },
    { value: 'previous_12_months', label: 'Últimos 12 meses' },
];
export const dateFilterOperatorsEs: DateFilterOption[] = [
    { value: 'between', label: 'Entre' },
    { value: 'before', label: 'Antes de' },
    { value: 'on', label: 'El' },
    { value: 'after', label: 'Después de' },
];
export const dateFilterUnitsEs: DateFilterOption[] = [
    { value: 'day', label: 'días' },
    { value: 'week', label: 'semanas' },
    { value: 'month', label: 'meses' },
    { value: 'quarter', label: 'trimestres' },
    { value: 'year', label: 'años' },
];
export const dateFilterLabelsEs: DateFilterLabels = {
    all: 'Todo el periodo',
    fixed: 'Intervalo fijo...',
    relative: 'Intervalo relativo...',
    relativeTitle: 'Intervalo relativo',
    apply: 'Aplicar filtro',
    back: 'Volver',
    latest: 'Últimos',
    ago: 'hace',
    includeCurrent: 'Incluir el periodo actual',
    startingAgo: 'A partir de',
    removeOffset: 'Quitar desplazamiento',
    fallback: 'Fecha',
};
export const settingsLabelsEs: SettingsLabels = {
    back: 'Volver',
};
export const loginFormLabelsEs: LoginFormLabels = {
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'correo@ejemplo.com',
    passwordLabel: 'Contraseña',
    passwordPlaceholder: 'Contraseña',
    forgotPasswordLabel: '¿Has olvidado la contraseña?',
    rememberLabel: 'Recordarme',
    submitLabel: 'Iniciar sesión',
    submittingLabel: 'Iniciando sesión',
};
export const passkeyLabelsEs: PasskeyLabels = {
    signInLabel: 'Iniciar sesión con una llave de acceso',
    signingInLabel: 'Iniciando sesión',
    unsupportedLabel: 'Este navegador no admite llaves de acceso.',
    addLabel: 'Añadir llave de acceso',
    nameLabel: 'Nombre de la llave de acceso',
    namePlaceholder: 'Por ejemplo, MacBook Pro o iPhone',
    nameDescription:
        'Un nombre te ayuda a reconocer esta llave de acceso más adelante.',
    deviceNameLabel: (browser, system) => `${browser} en ${system}`,
    registerLabel: 'Registrar llave de acceso',
    registeringLabel: 'Registrando',
    cancelLabel: 'Cancelar',
    errorFallbackLabel: 'No ha funcionado. Inténtalo de nuevo.',
    createdLabel: (when) => `Añadida ${when}`,
    lastUsedLabel: (when) => `Último uso ${when}`,
    deleteLabel: (name) => `Eliminar ${name}`,
    deleteTitle: 'Eliminar llave de acceso',
    deleteDescription: (name) => `Ya no podrás iniciar sesión con «${name}».`,
    deleteConfirmLabel: 'Eliminar llave de acceso',
    deleteCancelLabel: 'Cancelar',
    emptyTitle: 'Todavía no hay llaves de acceso',
    emptyDescription:
        'Añade una llave de acceso para iniciar sesión sin contraseña.',
};
export const twoFactorLabelsEs: TwoFactorLabels = {
    setupTitle: 'Autenticación en dos pasos',
    setupDescription:
        'Añade un segundo paso al inicio de sesión con una aplicación de autenticación.',
    pendingLabel: 'Preparando tu clave de configuración',
    scanTitle: 'Escanea el código',
    scanDescription:
        'Abre la aplicación de autenticación y escanea el código de abajo para añadir esta cuenta.',
    qrFallbackLabel: 'El código QR aún no está disponible.',
    manualKeyLabel: 'Clave de configuración',
    manualKeyDescription:
        'Introduce esta clave manualmente si la aplicación no puede escanear el código.',
    manualKeyRevealLabel: 'Mostrar clave',
    manualKeyHideLabel: 'Ocultar clave',
    continueLabel: 'Continuar',
    confirmTitle: 'Confirma el código',
    confirmDescription:
        'Introduce el código de seis dígitos que muestra la aplicación de autenticación.',
    codeLabel: 'Código de autenticación',
    recoveryCodeLabel: 'Código de recuperación',
    recoveryCodePlaceholder: 'Introduce un código de recuperación',
    useRecoveryCodeLabel: 'Usar un código de recuperación',
    useCodeLabel: 'Usar un código de autenticación',
    verifyLabel: 'Verificar',
    verifyingLabel: 'Verificando',
    errorFallbackLabel: 'No ha funcionado. Inténtalo de nuevo.',
    cancelLabel: 'Cancelar',
    challengeTitle: 'Confirmación en dos pasos',
    challengeDescription:
        'Confirma el acceso a tu cuenta con el código de la aplicación de autenticación.',
    recoveryChallengeDescription:
        'Confirma el acceso a tu cuenta con uno de tus códigos de recuperación.',
    recoveryTitle: 'Códigos de recuperación',
    recoveryDescription:
        'Guarda estos códigos en un lugar seguro. Cada uno te permite iniciar sesión una vez si pierdes el dispositivo.',
    recoveryWarning:
        'Solo se muestran una vez y no se pueden volver a consultar.',
    revealLabel: 'Mostrar códigos',
    hideLabel: 'Ocultar códigos',
    copyLabel: 'Copiar',
    copiedLabel: 'Copiado',
    copyFailedLabel:
        'No se ha podido copiar aquí. Selecciona los códigos manualmente.',
    regenerateLabel: 'Regenerar códigos',
    doneLabel: 'Finalizar',
    disableLabel: 'Desactivar la autenticación en dos pasos',
    disableTitle: 'Desactivar la autenticación en dos pasos',
    disableDescription:
        'Tu cuenta quedará protegida solo con la contraseña. Los códigos de recuperación dejarán de funcionar.',
    disableConfirmLabel: 'Desactivar',
    disableCancelLabel: 'Mantener activa',
    enableLabel: 'Activar la autenticación en dos pasos',
    qrCodeErrorLabel: 'No se ha podido cargar el código QR.',
    setupKeyErrorLabel: 'No se ha podido cargar la clave de configuración.',
    recoveryCodesErrorLabel:
        'No se han podido cargar los códigos de recuperación.',
};
export const dangerZoneLabelsEs: DangerZoneLabels = {
    title: 'Zona de peligro',
    description: 'Estas acciones son definitivas y no se pueden deshacer.',
    actionLabel: 'Eliminar',
    confirmTitle: 'Confirmar acción',
    confirmDescription:
        '¿Seguro que quieres continuar? Esta acción no se puede deshacer.',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    requiredValueLabel: 'Escribe {{value}} para confirmar',
    passwordLabel: 'Contraseña actual',
    passwordPlaceholder: 'Contraseña',
};
export const notificationBellLabelsEs: NotificationBellLabels = {
    title: 'Notificaciones',
    unreadLabel: '{{count}} sin leer',
    markAllReadLabel: 'Marcar todas como leídas',
    markReadLabel: 'Marcar como leída',
    viewAllLabel: 'Ver todas',
    emptyLabel: 'Sin notificaciones.',
    loadingLabel: 'Cargando',
};
