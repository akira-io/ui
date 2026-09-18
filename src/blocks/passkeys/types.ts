export interface Passkey {
    id: string | number;
    name: string;
    authenticator?: string | null;
    createdAt: string;
    lastUsedAt?: string | null;
}

export interface PasskeyLabels {
    signInLabel: string;
    signingInLabel: string;
    unsupportedLabel: string;
    addLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    nameDescription: string;
    deviceNameLabel: (browser: string, system: string) => string;
    registerLabel: string;
    registeringLabel: string;
    cancelLabel: string;
    errorFallbackLabel: string;
    createdLabel: (when: string) => string;
    lastUsedLabel: (when: string) => string;
    deleteLabel: (name: string) => string;
    deleteTitle: string;
    deleteDescription: (name: string) => string;
    deleteConfirmLabel: string;
    deleteCancelLabel: string;
    emptyTitle: string;
    emptyDescription: string;
}

export const passkeyLabels: PasskeyLabels = {
    signInLabel: 'Sign in with a passkey',
    signingInLabel: 'Signing in',
    unsupportedLabel: 'Passkeys are not supported in this browser.',
    addLabel: 'Add passkey',
    nameLabel: 'Passkey name',
    namePlaceholder: 'For example MacBook Pro or iPhone',
    nameDescription: 'A name helps you recognise this passkey later.',
    deviceNameLabel: (browser, system) => `${browser} on ${system}`,
    registerLabel: 'Register passkey',
    registeringLabel: 'Registering',
    cancelLabel: 'Cancel',
    errorFallbackLabel: 'That did not work. Try again.',
    createdLabel: (when) => `Added ${when}`,
    lastUsedLabel: (when) => `Last used ${when}`,
    deleteLabel: (name) => `Remove ${name}`,
    deleteTitle: 'Remove passkey',
    deleteDescription: (name) =>
        `You will no longer be able to sign in with "${name}".`,
    deleteConfirmLabel: 'Remove passkey',
    deleteCancelLabel: 'Cancel',
    emptyTitle: 'No passkeys yet',
    emptyDescription: 'Add a passkey to sign in without a password.',
};

export interface PasskeyLabelProps {
    labels?: Partial<PasskeyLabels>;
}
