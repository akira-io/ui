'use client';

import * as React from 'react';
import { toast as sonner } from 'sonner';

import { Spinner } from '@/components/ui/spinner';
import { toastActionClasses, toastCancelClasses } from '@/lib/toast-classes';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

type ToastId = number | string;

export interface ToastActionDescriptor {
    label: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLElement>) => unknown;
    href?: string;
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;
    dismiss?: boolean;
    className?: string;
}

interface ToastActionProps extends ToastActionDescriptor, SlotNameProps {
    toastId: ToastId;
    tone: 'action' | 'cancel';
}

function ToastAction({
    label,
    onClick,
    href,
    target,
    rel,
    dismiss = true,
    className,
    toastId,
    tone,
    slotName = 'toast-action',
    ...props
}: ToastActionProps) {
    const [pending, setPending] = React.useState(false);
    const running = React.useRef(false);

    const classes = cn(
        tone === 'cancel' ? toastCancelClasses : toastActionClasses,
        className,
    );

    if (href) {
        return (
            <a
                href={safeToastHref(href)}
                target={target}
                rel={rel ?? namedTargetRel(target)}
                className={classes}
                onClick={(event) => {
                    onClick?.(event);

                    if (dismiss) {
                        sonner.dismiss(toastId);
                    }
                }}
                {...props}
                data-slot={slotName}
            >
                {label}
            </a>
        );
    }

    return (
        <button
            type="button"
            disabled={pending}
            aria-busy={pending || undefined}
            className={classes}
            onClick={async (event) => {
                if (running.current) {
                    return;
                }

                running.current = true;

                try {
                    const result = onClick?.(event);

                    if (result instanceof Promise) {
                        setPending(true);
                        await result;
                    }

                    if (dismiss) {
                        sonner.dismiss(toastId);
                    }
                } finally {
                    running.current = false;
                    setPending(false);
                }
            }}
            {...props}
            data-slot={slotName}
        >
            {pending && (
                <span aria-hidden="true">
                    <Spinner size="sm" label="" className="size-3" />
                </span>
            )}
            {label}
        </button>
    );
}

const SCHEME = /^([a-z][a-z0-9+.-]*):/i;
const NAVIGABLE_SCHEMES = new Set(['http', 'https', 'mailto', 'tel']);

function safeToastHref(href: string): string {
    const scheme = SCHEME.exec(href.trim());

    if (!scheme) {
        return href;
    }

    return NAVIGABLE_SCHEMES.has(scheme[1].toLowerCase()) ? href : '#';
}

function namedTargetRel(
    target: React.HTMLAttributeAnchorTarget | undefined,
): string | undefined {
    if (!target || target === '_self' || target === '_parent') {
        return undefined;
    }

    return target === '_top' ? undefined : 'noreferrer';
}

type SonnerOptions = Parameters<typeof sonner>[1];

export type ToastOptions = Omit<
    NonNullable<SonnerOptions>,
    'action' | 'cancel'
> & {
    action?: ToastActionDescriptor | React.ReactNode;
    cancel?: ToastActionDescriptor | React.ReactNode;
};

function isDescriptor(
    value: ToastActionDescriptor | React.ReactNode,
): value is ToastActionDescriptor {
    return (
        typeof value === 'object' &&
        value !== null &&
        'label' in value &&
        !React.isValidElement(value)
    );
}

function withActions(
    options: ToastOptions | undefined,
): NonNullable<SonnerOptions> {
    const id = options?.id ?? `toast-${Math.random().toString(36).slice(2)}`;

    const render = (
        value: ToastActionDescriptor | React.ReactNode,
        tone: 'action' | 'cancel',
    ) =>
        isDescriptor(value) ? (
            <ToastAction {...value} tone={tone} toastId={id} />
        ) : (
            value
        );

    return {
        ...options,
        id,
        action: options?.action ? render(options.action, 'action') : undefined,
        cancel: options?.cancel ? render(options.cancel, 'cancel') : undefined,
    } as NonNullable<SonnerOptions>;
}

type Message = Parameters<typeof sonner>[0];

type Variant = 'success' | 'info' | 'warning' | 'error' | 'loading' | 'message';

type ToastFn = (message: Message, options?: ToastOptions) => ToastId;

type Toast = ToastFn &
    Omit<typeof sonner, Variant> & { [Name in Variant]: ToastFn };

function variant(name: Variant): ToastFn {
    return (message, options) => sonner[name](message, withActions(options));
}

export const toast: Toast = Object.assign(
    (message: Message, options?: ToastOptions) =>
        sonner(message, withActions(options)),
    sonner,
    {
        success: variant('success'),
        info: variant('info'),
        warning: variant('warning'),
        error: variant('error'),
        loading: variant('loading'),
        message: variant('message'),
    },
);
