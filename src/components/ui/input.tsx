import { XIcon } from 'lucide-react';
import * as React from 'react';

import { fieldFocus, fieldSurface } from '@/lib/language';
import { assignRefs } from '@/lib/motion/assign-refs';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

export interface InputLabels {
    clearLabel: string;
}

export const inputDefaultLabels: InputLabels = {
    clearLabel: 'Clear',
};

const fieldControl =
    'min-w-0 flex h-control w-full px-inset transition-shadow placeholder:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/20';

const groupedField = `${fieldSurface} h-control px-inset gap-item flex w-full items-center text-muted-foreground transition-shadow has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-primary/45 has-[input:disabled]:opacity-50 has-[input[aria-invalid=true]]:ring-[3px] has-[input[aria-invalid=true]]:ring-destructive/20 [&_svg:not([class*='size-'])]:size-icon [&_svg]:shrink-0`;

interface InputProps extends React.ComponentProps<'input'> {
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
    labels?: Partial<InputLabels>;
    groupSlotName?: string;
}

function clearValue(input: HTMLInputElement): void {
    Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value',
    )?.set?.call(input, '');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
}

function Input({
    className,
    type,
    leading,
    trailing,
    labels: labelOverrides,
    ref,
    onChange,
    slotName = 'input',
    groupSlotName = 'input-group',
    ...props
}: InputProps & SlotNameProps) {
    const labels = useUiLabels('input', inputDefaultLabels, labelOverrides);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const composedRef = React.useMemo(() => assignRefs(inputRef, ref), [ref]);
    const [filled, setFilled] = React.useState(
        String(props.value ?? props.defaultValue ?? '') !== '',
    );
    const searching = type === 'search';

    if (!leading && !trailing && !searching) {
        return (
            <input
                ref={ref}
                type={type}
                onChange={onChange}
                className={cn(
                    `${fieldControl} ${fieldSurface} ${fieldFocus}`,
                    className,
                )}
                {...props}
                data-slot={slotName}
            />
        );
    }

    const showClear =
        searching &&
        (props.value === undefined ? filled : String(props.value) !== '');

    return (
        <div data-slot={groupSlotName} className={cn(groupedField, className)}>
            {leading}
            <input
                ref={composedRef}
                type={type}
                onChange={(event) => {
                    setFilled(event.target.value !== '');
                    onChange?.(event);
                }}
                className="min-w-0 h-full flex-1 bg-transparent text-foreground outline-hidden placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none"
                {...props}
                data-slot={slotName}
            />
            {showClear ? (
                <button
                    type="button"
                    data-slot="input-clear"
                    aria-label={labels.clearLabel}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                        if (inputRef.current) {
                            clearValue(inputRef.current);
                        }
                    }}
                    className="flex size-icon-sm shrink-0 items-center justify-center rounded-full bg-muted-foreground/40 text-background"
                >
                    <XIcon
                        className="size-2.5"
                        strokeWidth={3}
                        aria-hidden="true"
                    />
                </button>
            ) : null}
            {trailing}
        </div>
    );
}

export { Input, type InputProps };
