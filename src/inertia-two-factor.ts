'use client';

import { router } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
    twoFactorLabels,
    type TwoFactorLabels,
} from '@/blocks/two-factor/types';
import {
    fetchFortifyJson,
    type FortifyTwoFactor,
    type UseFortifyTwoFactorOptions,
} from '@/lib/fortify-two-factor';
import { hrefToString } from '@/lib/href';
import { useUiLabels } from '@/locales/context';

export type {
    FortifyTwoFactor,
    FortifyTwoFactorSetupDialogProps,
    FortifyTwoFactorUrls,
    UseFortifyTwoFactorOptions,
} from '@/lib/fortify-two-factor';

export function useFortifyTwoFactor({
    urls,
    enabled,
    labels,
}: UseFortifyTwoFactorOptions): FortifyTwoFactor {
    const text = useUiLabels('twoFactor', twoFactorLabels, labels);
    const textRef = useRef(text);
    const [qrCodeSvg, setQrCodeSvg] = useState<string | undefined>();
    const [manualSetupKey, setManualSetupKey] = useState<string | null>(null);
    const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [enabling, setEnabling] = useState(false);
    const [setupOpen, setSetupOpen] = useState(false);
    const codesRequest = useRef<Promise<void> | null>(null);

    useEffect(() => {
        textRef.current = text;
    });

    const qrCodeUrl = hrefToString(urls.qrCode);
    const secretKeyUrl = hrefToString(urls.secretKey);
    const recoveryCodesUrl = hrefToString(urls.recoveryCodes);
    const enableUrl = hrefToString(urls.enable);
    const confirmUrl = hrefToString(urls.confirm);
    const regenerateUrl = hrefToString(urls.regenerateRecoveryCodes);
    const disableUrl = hrefToString(urls.disable);

    const fail = useCallback((label: keyof TwoFactorLabels) => {
        const message = textRef.current[label];

        setErrors((current) =>
            current.includes(message) ? current : [...current, message],
        );
    }, []);

    const fetchQrCode = useCallback(async () => {
        try {
            const { svg } = await fetchFortifyJson<{ svg: string }>(qrCodeUrl);
            setQrCodeSvg(svg);
        } catch {
            setQrCodeSvg(undefined);
            fail('qrCodeErrorLabel');
        }
    }, [qrCodeUrl, fail]);

    const fetchSetupKey = useCallback(async () => {
        try {
            const { secretKey } = await fetchFortifyJson<{ secretKey: string }>(
                secretKeyUrl,
            );
            setManualSetupKey(secretKey);
        } catch {
            setManualSetupKey(null);
            fail('setupKeyErrorLabel');
        }
    }, [secretKeyUrl, fail]);

    const fetchSetupData = useCallback(async () => {
        setErrors([]);
        await Promise.all([fetchQrCode(), fetchSetupKey()]);
    }, [fetchQrCode, fetchSetupKey]);

    const fetchRecoveryCodes = useCallback(() => {
        if (codesRequest.current) {
            return codesRequest.current;
        }

        setErrors([]);

        const request = fetchFortifyJson<string[]>(recoveryCodesUrl)
            .then((codes) => setRecoveryCodes(codes))
            .catch(() => {
                setRecoveryCodes([]);
                fail('recoveryCodesErrorLabel');
            })
            .finally(() => {
                codesRequest.current = null;
            });

        codesRequest.current = request;

        return request;
    }, [recoveryCodesUrl, fail]);

    const clearSetupData = useCallback(() => {
        setQrCodeSvg(undefined);
        setManualSetupKey(null);
        setErrors([]);
    }, []);

    const hasSetupData = qrCodeSvg !== undefined && manualSetupKey !== null;

    useEffect(() => {
        if (enabled && recoveryCodes.length === 0) {
            void fetchRecoveryCodes();
        }
    }, [enabled, recoveryCodes.length, fetchRecoveryCodes]);

    const enable = useCallback(() => {
        if (hasSetupData) {
            setSetupOpen(true);

            return;
        }

        router.post(
            enableUrl,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onStart: () => setEnabling(true),
                onFinish: () => setEnabling(false),
                onSuccess: () => setSetupOpen(true),
            },
        );
    }, [hasSetupData, enableUrl]);

    const confirm = useCallback(
        (code: string) =>
            new Promise<void>((resolve, reject) => {
                let answered = false;

                router.post(
                    confirmUrl,
                    { code },
                    {
                        errorBag: 'confirmTwoFactorAuthentication',
                        preserveScroll: true,
                        preserveState: true,
                        onSuccess: () => {
                            answered = true;
                            void fetchRecoveryCodes().then(resolve);
                        },
                        onError: (bag) => {
                            answered = true;
                            reject(new Error(Object.values(bag).join(' ')));
                        },
                        onFinish: () => {
                            if (!answered) {
                                reject(
                                    new Error(
                                        textRef.current.errorFallbackLabel,
                                    ),
                                );
                            }
                        },
                    },
                );
            }),
        [confirmUrl, fetchRecoveryCodes],
    );

    const regenerate = useCallback(
        () =>
            new Promise<void>((resolve) => {
                let refreshing = false;

                router.post(
                    regenerateUrl,
                    {},
                    {
                        preserveScroll: true,
                        preserveState: true,
                        onSuccess: () => {
                            refreshing = true;
                            void fetchRecoveryCodes().then(resolve);
                        },
                        onFinish: () => {
                            if (!refreshing) {
                                resolve();
                            }
                        },
                    },
                );
            }),
        [regenerateUrl, fetchRecoveryCodes],
    );

    const disable = useCallback(
        () =>
            new Promise<void>((resolve) => {
                router.delete(disableUrl, {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        setRecoveryCodes([]);
                        clearSetupData();
                    },
                    onFinish: () => resolve(),
                });
            }),
        [disableUrl, clearSetupData],
    );

    return {
        qrCodeSvg,
        manualSetupKey,
        recoveryCodes,
        errors,
        enabling,
        setupOpen,
        setSetupOpen,
        enable,
        confirm,
        regenerate,
        disable,
        fetchSetupData,
        fetchRecoveryCodes,
        clearSetupData,
        setupDialogProps: {
            open: setupOpen,
            onOpenChange: setSetupOpen,
            enabled,
            qrCodeSvg,
            manualSetupKey,
            recoveryCodes,
            errors,
            onConfirm: confirm,
            onRequestSetupData: fetchSetupData,
            onRegenerateRecoveryCodes: regenerate,
            onCompleted: clearSetupData,
            labels,
        },
    };
}
