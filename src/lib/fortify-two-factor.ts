import type { TwoFactorSetupDialogProps } from '@/blocks/two-factor/setup-dialog';
import type { TwoFactorLabels } from '@/blocks/two-factor/types';
import type { UrlLike } from '@/types';

export interface FortifyTwoFactorUrls {
    qrCode: UrlLike;
    secretKey: UrlLike;
    recoveryCodes: UrlLike;
    enable: UrlLike;
    confirm: UrlLike;
    regenerateRecoveryCodes: UrlLike;
    disable: UrlLike;
}

export interface UseFortifyTwoFactorOptions {
    urls: FortifyTwoFactorUrls;
    enabled: boolean;
    labels?: Partial<TwoFactorLabels>;
}

export type FortifyTwoFactorSetupDialogProps = Required<
    Pick<
        TwoFactorSetupDialogProps,
        | 'open'
        | 'onOpenChange'
        | 'enabled'
        | 'manualSetupKey'
        | 'recoveryCodes'
        | 'errors'
        | 'onConfirm'
        | 'onRequestSetupData'
        | 'onRegenerateRecoveryCodes'
        | 'onCompleted'
    >
> &
    Pick<TwoFactorSetupDialogProps, 'qrCodeSvg' | 'labels'>;

export interface FortifyTwoFactor {
    qrCodeSvg: string | undefined;
    manualSetupKey: string | null;
    recoveryCodes: string[];
    errors: string[];
    enabling: boolean;
    setupOpen: boolean;
    setSetupOpen: (open: boolean) => void;
    enable: () => void;
    confirm: (code: string) => Promise<void>;
    regenerate: () => Promise<void>;
    disable: () => Promise<void>;
    fetchSetupData: () => Promise<void>;
    fetchRecoveryCodes: () => Promise<void>;
    clearSetupData: () => void;
    setupDialogProps: FortifyTwoFactorSetupDialogProps;
}

export async function fetchFortifyJson<T>(url: string): Promise<T> {
    const response = await fetch(url, {
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });

    if (!response.ok) {
        throw new Error(`Request to ${url} failed with ${response.status}`);
    }

    return (await response.json()) as T;
}
