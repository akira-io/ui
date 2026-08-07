import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface PasswordInputLabels {
    showLabel: string;
    hideLabel: string;
}

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
    showLabel = 'Show password',
    hideLabel = 'Hide password',
    ...props
}: PasswordInputProps) {
    const [visible, setVisible] = React.useState(false);

    return (
        <div data-slot="password-input" className="relative w-full">
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
                    aria-label={visible ? hideLabel : showLabel}
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
