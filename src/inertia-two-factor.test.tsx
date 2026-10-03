/** @vitest-environment jsdom */

import { router } from '@inertiajs/react';
import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import * as inertiaEntry from '@/inertia';
import {
    useFortifyTwoFactor,
    type FortifyTwoFactorUrls,
} from '@/inertia-two-factor';
import { UiLocaleProvider } from '@/locales/context';
import { ptLabels, twoFactorLabelsPt } from '@/locales/pt';

vi.mock('@inertiajs/react', () => ({
    router: { post: vi.fn(), delete: vi.fn() },
    Form: () => null,
    Link: () => null,
    usePage: () => ({ url: '/', props: {} }),
}));

interface VisitCallbacks {
    onStart?: () => void;
    onSuccess?: () => void;
    onError?: (errors: Record<string, string>) => void;
    onFinish?: () => void;
    errorBag?: string;
}

const post = vi.mocked(router.post);
const remove = vi.mocked(router.delete);

const urls: FortifyTwoFactorUrls = {
    qrCode: '/user/two-factor-qr-code',
    secretKey: '/user/two-factor-secret-key',
    recoveryCodes: '/user/two-factor-recovery-codes',
    enable: { url: '/user/two-factor-authentication', method: 'post' },
    confirm: '/user/confirmed-two-factor-authentication',
    regenerateRecoveryCodes: '/user/two-factor-recovery-codes',
    disable: '/user/two-factor-authentication',
};

const responses: Record<string, unknown> = {
    '/user/two-factor-qr-code': { svg: '<svg viewBox="0 0 1 1"></svg>' },
    '/user/two-factor-secret-key': { secretKey: 'JBSWY3DPEHPK3PXP' },
    '/user/two-factor-recovery-codes': ['AAAA-1111', 'BBBB-2222'],
};

function respond(input: string): Promise<Response> {
    return Promise.resolve(
        new Response(JSON.stringify(responses[input]), { status: 200 }),
    );
}

const fetchMock = vi.fn(respond);

function visitOptions(call: unknown[]): VisitCallbacks {
    return call[call.length - 1] as VisitCallbacks;
}

beforeEach(() => {
    fetchMock.mockImplementation(respond);
    vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    fetchMock.mockClear();
    post.mockReset();
    remove.mockReset();
});

describe('useFortifyTwoFactor', () => {
    it('ships from the Inertia entry', () => {
        expect(inertiaEntry).toHaveProperty('useFortifyTwoFactor');
    });

    it('loads the QR code and the setup key as JSON from the same origin', async () => {
        const { result } = renderHook(() =>
            useFortifyTwoFactor({ urls, enabled: false }),
        );

        await act(() => result.current.fetchSetupData());

        expect(result.current.qrCodeSvg).toBe('<svg viewBox="0 0 1 1"></svg>');
        expect(result.current.manualSetupKey).toBe('JBSWY3DPEHPK3PXP');
        expect(result.current.errors).toEqual([]);
        expect(fetchMock).toHaveBeenCalledWith(
            '/user/two-factor-qr-code',
            expect.objectContaining({
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }),
        );
    });

    it('reports a failed request with the localized label', async () => {
        fetchMock.mockImplementation(() =>
            Promise.resolve(new Response('', { status: 500 })),
        );

        const { result } = renderHook(
            () => useFortifyTwoFactor({ urls, enabled: false }),
            {
                wrapper: ({ children }: PropsWithChildren) => (
                    <UiLocaleProvider labels={ptLabels}>
                        {children}
                    </UiLocaleProvider>
                ),
            },
        );

        await act(() => result.current.fetchSetupData());

        expect(result.current.qrCodeSvg).toBeUndefined();
        expect(result.current.manualSetupKey).toBeNull();
        expect(result.current.errors).toEqual([
            twoFactorLabelsPt.qrCodeErrorLabel,
            twoFactorLabelsPt.setupKeyErrorLabel,
        ]);
    });

    it('rejects a wrong confirmation code with the server message', async () => {
        post.mockImplementation((...call: unknown[]) => {
            const options = visitOptions(call);
            options.onError?.({ code: 'The code is invalid.' });
            options.onFinish?.();
        });

        const { result } = renderHook(() =>
            useFortifyTwoFactor({ urls, enabled: false }),
        );

        await expect(result.current.confirm('123456')).rejects.toThrow(
            'The code is invalid.',
        );
        expect(post).toHaveBeenCalledWith(
            '/user/confirmed-two-factor-authentication',
            { code: '123456' },
            expect.objectContaining({
                errorBag: 'confirmTwoFactorAuthentication',
            }),
        );
    });

    it('resolves a confirmation once the recovery codes have arrived', async () => {
        post.mockImplementation((...call: unknown[]) => {
            const options = visitOptions(call);
            options.onSuccess?.();
            options.onFinish?.();
        });

        const { result } = renderHook(() =>
            useFortifyTwoFactor({ urls, enabled: false }),
        );

        await act(() => result.current.confirm('123456'));

        expect(result.current.recoveryCodes).toEqual([
            'AAAA-1111',
            'BBBB-2222',
        ]);
    });

    it('opens the setup dialog once the server has enabled two-factor', async () => {
        post.mockImplementation((...call: unknown[]) => {
            const options = visitOptions(call);
            options.onStart?.();
            options.onSuccess?.();
            options.onFinish?.();
        });

        const { result } = renderHook(() =>
            useFortifyTwoFactor({ urls, enabled: false }),
        );

        act(() => result.current.enable());

        expect(post).toHaveBeenCalledWith(
            '/user/two-factor-authentication',
            {},
            expect.objectContaining({
                preserveScroll: true,
                preserveState: true,
            }),
        );
        expect(result.current.setupOpen).toBe(true);
        expect(result.current.setupDialogProps.open).toBe(true);
        expect(result.current.enabling).toBe(false);
    });

    it('reopens the dialog without a visit when the setup data is already loaded', async () => {
        const { result } = renderHook(() =>
            useFortifyTwoFactor({ urls, enabled: false }),
        );

        await act(() => result.current.fetchSetupData());
        act(() => result.current.enable());

        expect(post).not.toHaveBeenCalled();
        expect(result.current.setupOpen).toBe(true);
    });

    it('loads the recovery codes when two-factor is already on', async () => {
        const { result } = renderHook(() =>
            useFortifyTwoFactor({ urls, enabled: true }),
        );

        await waitFor(() =>
            expect(result.current.recoveryCodes).toEqual([
                'AAAA-1111',
                'BBBB-2222',
            ]),
        );
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('forgets the codes after a disable visit', async () => {
        remove.mockImplementation((...call: unknown[]) => {
            const options = visitOptions(call);
            options.onSuccess?.();
            options.onFinish?.();
        });

        const { result, rerender } = renderHook(
            ({ enabled }: { enabled: boolean }) =>
                useFortifyTwoFactor({ urls, enabled }),
            { initialProps: { enabled: true } },
        );

        await waitFor(() =>
            expect(result.current.recoveryCodes).toHaveLength(2),
        );

        rerender({ enabled: false });
        await act(() => result.current.disable());

        expect(remove).toHaveBeenCalledWith(
            '/user/two-factor-authentication',
            expect.objectContaining({ preserveScroll: true }),
        );
        expect(result.current.recoveryCodes).toEqual([]);
    });
});
