'use client';

import { router } from '@inertiajs/react';
import type { RouteOverrides } from '@laravel/passkeys';
import { usePasskeyRegister, usePasskeyVerify } from '@laravel/passkeys/react';
import { createElement, useRef, type ReactNode } from 'react';

import {
    PasskeyList,
    PasskeyRegisterButton,
    PasskeySignInButton,
    type Passkey,
    type PasskeyLabelProps,
} from '@/blocks/passkeys';
import type { UrlLike } from '@/types';

export type PasskeyRoutes = RouteOverrides['routes'];

export interface InertiaPasskeySignInButtonProps extends PasskeyLabelProps {
    routes?: PasskeyRoutes;
    redirectTo?: string;
    className?: string;
}

export function InertiaPasskeySignInButton({
    routes,
    redirectTo = '/dashboard',
    labels,
    className,
}: InertiaPasskeySignInButtonProps) {
    const { verify, isLoading, error, isSupported } = usePasskeyVerify({
        routes,
        onSuccess: (response) => router.visit(response.redirect ?? redirectTo),
    });

    return createElement(PasskeySignInButton, {
        supported: isSupported,
        processing: isLoading,
        error,
        onSignIn: verify,
        labels,
        className,
    });
}

export interface InertiaPasskeyRegisterButtonProps extends PasskeyLabelProps {
    routes?: PasskeyRoutes;
    className?: string;
}

export function InertiaPasskeyRegisterButton({
    routes,
    labels,
    className,
}: InertiaPasskeyRegisterButtonProps) {
    const failure = useRef<Error | null>(null);
    const { register, isLoading, error, isSupported } = usePasskeyRegister({
        routes,
        onSuccess: () => router.reload(),
        onError: (reason) => {
            failure.current = reason;
        },
    });

    const handleRegister = async (name: string) => {
        failure.current = null;
        await register(name);

        if (failure.current) {
            throw failure.current;
        }
    };

    return createElement(PasskeyRegisterButton, {
        supported: isSupported,
        processing: isLoading,
        error,
        onRegister: handleRegister,
        labels,
        className,
    });
}

export interface InertiaPasskeyListProps extends PasskeyLabelProps {
    passkeys: Passkey[];
    destroyUrl: (passkey: Passkey) => UrlLike;
    children?: ReactNode;
    className?: string;
}

function urlOf(target: UrlLike): string {
    return typeof target === 'string' ? target : target.url;
}

export function InertiaPasskeyList({
    passkeys,
    destroyUrl,
    children,
    labels,
    className,
}: InertiaPasskeyListProps) {
    const handleDelete = (passkey: Passkey) =>
        new Promise<void>((resolve, reject) => {
            router.delete(urlOf(destroyUrl(passkey)), {
                preserveScroll: true,
                onError: () => reject(new Error('passkey not removed')),
                onFinish: () => resolve(),
            });
        });

    return createElement(
        PasskeyList,
        { passkeys, onDelete: handleDelete, labels, className },
        children,
    );
}
