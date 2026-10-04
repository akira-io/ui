interface Passkey {
    id: string | number;
    name: string;
    authenticator?: string | null;
    createdAt: string;
    lastUsedAt?: string | null;
}
interface PasskeyLabels {
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
declare const passkeyLabels: PasskeyLabels;
interface PasskeyLabelProps {
    labels?: Partial<PasskeyLabels>;
}

export { type PasskeyLabelProps as P, type Passkey as a, type PasskeyLabels as b, passkeyLabels as p };
