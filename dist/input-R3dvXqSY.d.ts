import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { S as SlotNameProps } from './types-CMZRvMV5.js';

declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "icon" | "sm" | "default" | "lg" | "icon-sm" | "icon-lg" | null | undefined;
    toned?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const BUTTON_TONES: {
    readonly primary: "primary";
    readonly destructive: "destructive";
    readonly success: "success";
    readonly warning: "warning";
    readonly info: "info";
};
type ButtonTone = keyof typeof BUTTON_TONES;

interface ButtonProps extends React.ComponentProps<'button'>, Omit<VariantProps<typeof buttonVariants>, 'toned'> {
    asChild?: boolean;
    tone?: ButtonTone;
    loading?: boolean;
    loadingLabel?: string;
    slotName?: string;
}
declare function Button({ className, variant, size, tone, style, asChild, loading, loadingLabel, slotName, disabled, children, onClick, ...props }: ButtonProps): React.JSX.Element;

declare function Input({ className, type, slotName, ...props }: React.ComponentProps<'input'> & SlotNameProps): React.JSX.Element;

export { Button as B, Input as I, type ButtonProps as a, type ButtonTone as b, buttonVariants as c };
