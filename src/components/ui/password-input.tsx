import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

export interface PasswordInputLabels {
    showLabel: string;
    hideLabel: string;
}

export const passwordInputDefaultLabels: PasswordInputLabels = {
    showLabel: 'Show password',
    hideLabel: 'Hide password',
};

interface PasswordInputProps extends Omit<
    React.ComponentProps<typeof Input>,
    'type'
> {
    revealable?: boolean;
    showLabel?: PasswordInputLabels['showLabel'];
    hideLabel?: PasswordInputLabels['hideLabel'];
}

export function PasswordInput({
    className,
    revealable = true,
    showLabel,
    hideLabel,
    slotName = 'password-input',
    ...props
}: PasswordInputProps & SlotNameProps) {
    const labels = useUiLabels('passwordInput', passwordInputDefaultLabels, {
        showLabel,
        hideLabel,
    });
    const [visible, setVisible] = React.useState(false);

    return (
        <div className="relative w-full" data-slot={slotName}>
            <Input
                type={visible ? 'text' : 'password'}
                className={cn(revealable && 'pr-12', className)}
                {...props}
            />
            {revealable ? (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    slotName="password-input-toggle"
                    aria-label={visible ? labels.hideLabel : labels.showLabel}
                    aria-pressed={visible}
                    disabled={props.disabled}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => setVisible((current) => !current)}
                    className="right-1 absolute top-1/2 -translate-y-1/2"
                >
                    {visible ? (
                        <EyeOff aria-hidden="true" />
                    ) : (
                        <Eye aria-hidden="true" />
                    )}
                </Button>
            ) : null}
        </div>
    );
}
