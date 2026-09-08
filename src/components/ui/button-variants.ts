import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { type SpinnerProps } from '@/components/ui/spinner';
import { controlFill, focusRing, glassControl } from '@/lib/language';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    `inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 aria-invalid:ring-destructive/20 aria-invalid:border-destructive ${focusRing}`,
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]',
                destructive:
                    'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:outline-destructive',
                outline: `${glassControl} ${controlFill} hover:bg-accent hover:text-accent-foreground`,
                secondary: `${glassControl} bg-secondary/80 text-secondary-foreground hover:bg-secondary`,
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-11 px-4 has-[>svg]:gap-3',
                sm: 'h-9 rounded-xl px-3 has-[>svg]:gap-2.5',
                lg: 'h-12 px-6 has-[>svg]:gap-4 text-base',
                icon: 'size-11',
                'icon-sm': 'size-9 rounded-xl',
                'icon-lg': 'size-12',
            },
            toned: {
                true: 'focus-visible:outline-(--btn)',
                false: '',
            },
        },
        compoundVariants: [
            {
                toned: true,
                variant: 'default',
                class: 'bg-(--btn) text-(--btn-foreground) hover:bg-[color-mix(in_oklab,var(--btn)_90%,transparent)]',
            },
            {
                toned: true,
                variant: 'destructive',
                class: 'bg-(--btn) text-(--btn-foreground) hover:bg-[color-mix(in_oklab,var(--btn)_90%,transparent)]',
            },
            {
                toned: true,
                variant: 'outline',
                class: 'bg-transparent text-(--btn) ring-[color-mix(in_oklab,var(--btn)_30%,transparent)] hover:bg-[color-mix(in_oklab,var(--btn)_10%,transparent)] hover:text-(--btn)',
            },
            {
                toned: true,
                variant: 'secondary',
                class: 'bg-[color-mix(in_oklab,var(--btn)_14%,transparent)] text-(--btn) hover:bg-[color-mix(in_oklab,var(--btn)_22%,transparent)]',
            },
            {
                toned: true,
                variant: 'ghost',
                class: 'text-(--btn) hover:bg-[color-mix(in_oklab,var(--btn)_12%,transparent)] hover:text-(--btn)',
            },
            {
                toned: true,
                variant: 'link',
                class: 'text-(--btn)',
            },
        ],
        defaultVariants: {
            variant: 'default',
            size: 'default',
            toned: false,
        },
    },
);

const BUTTON_TONES = {
    primary: 'primary',
    destructive: 'destructive',
    success: 'success',
    warning: 'warning',
    info: 'info',
} as const;

type ButtonTone = keyof typeof BUTTON_TONES;

function toneVariables(tone: ButtonTone): React.CSSProperties {
    const token = BUTTON_TONES[tone];

    return {
        '--btn': `var(--${token})`,
        '--btn-foreground': `var(--${token}-foreground)`,
    } as React.CSSProperties;
}

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

function spinnerSize(size: ButtonSize): SpinnerProps['size'] {
    if (size === 'sm' || size === 'icon-sm') return 'sm';
    if (size === 'lg' || size === 'icon-lg') return 'lg';
    return 'default';
}

const ICON_PADDING: Record<ButtonSize, { leading: string; trailing: string }> =
    {
        default: { leading: 'pl-3', trailing: 'pr-2' },
        sm: { leading: 'pl-2.5', trailing: 'pr-1.5' },
        lg: { leading: 'pl-4', trailing: 'pr-3' },
        icon: { leading: '', trailing: '' },
        'icon-sm': { leading: '', trailing: '' },
        'icon-lg': { leading: '', trailing: '' },
    };

function iconPadding(size: ButtonSize, children: React.ReactNode): string {
    const parts = React.Children.toArray(children).filter(
        (part) => typeof part !== 'string' || part.trim() !== '',
    );

    if (parts.length < 2) {
        return '';
    }

    const edges = ICON_PADDING[size];

    return cn(
        React.isValidElement(parts[0]) && edges.leading,
        React.isValidElement(parts[parts.length - 1]) && edges.trailing,
    );
}

function loadingPadding(size: ButtonSize): string | undefined {
    if (size === 'sm') return 'px-2.5';
    if (size === 'lg') return 'px-5';
    if (size === 'default') return 'px-3';
    return undefined;
}

export {
    BUTTON_TONES,
    buttonVariants,
    iconPadding,
    loadingPadding,
    spinnerSize,
    toneVariables,
    type ButtonSize,
    type ButtonTone,
};
