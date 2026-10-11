import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { type SpinnerProps } from '@/components/ui/spinner';
import { focusRing, glassBubble, glassPress, solidPress } from '@/lib/language';
import { cn } from '@/lib/utils';

const plainVariants = ['secondary', 'outline', 'destructive'] as const;

const buttonVariants = cva(
    `inline-flex items-center justify-center gap-item whitespace-nowrap rounded-full text-control font-normal disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-icon shrink-0 [&_svg]:shrink-0 aria-invalid:ring-destructive/20 ${focusRing}`,
    {
        variants: {
            variant: {
                default: '',
                destructive:
                    'text-destructive focus-visible:outline-destructive',
                outline: 'text-foreground',
                secondary: 'text-foreground',
                ghost: 'text-primary active:opacity-70',
                link: 'cursor-pointer text-primary underline-offset-4 hover:underline',
            },
            material: {
                glass: '',
                solid: '',
            },
            size: {
                default: 'h-control px-4',
                sm: 'h-8 pointer-coarse:h-target px-3',
                lg: 'h-12 px-6',
                icon: 'size-control',
                'icon-sm': 'size-8 pointer-coarse:size-target',
                'icon-lg': 'size-12',
            },
            toned: {
                true: 'focus-visible:outline-(--btn)',
                false: '',
            },
        },
        compoundVariants: [
            {
                material: 'glass',
                variant: 'default',
                class: `glass-prominent glass-edge ${glassPress}`,
            },
            {
                material: 'glass',
                variant: [...plainVariants],
                class: `${glassBubble} ${glassPress}`,
            },
            {
                material: 'solid',
                variant: 'default',
                class: `bg-primary text-primary-foreground ${solidPress}`,
            },
            {
                material: 'solid',
                variant: [...plainVariants],
                class: `bg-muted ${solidPress}`,
            },
            {
                toned: true,
                material: 'solid',
                variant: 'default',
                class: 'bg-(--btn) text-(--btn-foreground)',
            },
            {
                toned: true,
                material: 'solid',
                variant: 'destructive',
                class: 'bg-(--btn) text-(--btn-foreground)',
            },
            {
                toned: true,
                variant: ['secondary', 'outline', 'ghost', 'link'],
                class: 'text-(--btn)',
            },
            {
                toned: true,
                material: 'glass',
                variant: 'destructive',
                class: 'text-(--btn)',
            },
        ],
        defaultVariants: {
            variant: 'default',
            material: 'glass',
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

type ButtonMaterial = NonNullable<
    VariantProps<typeof buttonVariants>['material']
>;

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
    type ButtonMaterial,
    type ButtonSize,
    type ButtonTone,
};
