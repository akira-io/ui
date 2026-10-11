import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

export interface PasswordInputProps extends Omit<
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
        <Input
            type={visible ? 'text' : 'password'}
            className={className}
            trailing={
                revealable ? (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        material="solid"
                        slotName="password-input-toggle"
                        aria-label={
                            visible ? labels.hideLabel : labels.showLabel
                        }
                        aria-pressed={visible}
                        disabled={props.disabled}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => setVisible((current) => !current)}
                        className="-me-tight text-muted-foreground"
                    >
                        {visible ? (
                            <EyeOff aria-hidden="true" />
                        ) : (
                            <Eye aria-hidden="true" />
                        )}
                    </Button>
                ) : undefined
            }
            {...props}
            data-password-input={slotName}
        />
    );
}
