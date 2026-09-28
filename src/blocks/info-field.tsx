import { CopyButton, type CopyButtonLabels } from '@/components/ui/copy-button';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

export type InfoFieldCopyPlacement = 'label' | 'value';

export interface InfoFieldProps {
    icon: LucideIcon;
    label: string;
    value: ReactNode;
    copyable?: boolean;
    copyValue?: string;
    copyLabel?: CopyButtonLabels['copyLabel'];
    copiedLabel?: CopyButtonLabels['copiedLabel'];
    copyPlacement?: InfoFieldCopyPlacement;
    iconClassName?: string;
    className?: string;
}

function copyableText(value: ReactNode, copyValue?: string): string {
    if (copyValue !== undefined) {
        return copyValue.trim();
    }

    if (typeof value === 'string' || typeof value === 'number') {
        return String(value).trim();
    }

    return '';
}

export function InfoField({
    icon: Icon,
    label,
    value,
    copyable = false,
    copyValue,
    copyLabel,
    copiedLabel,
    copyPlacement = 'label',
    iconClassName,
    className,
    slotName = 'info-field',
}: InfoFieldProps & SlotNameProps) {
    const text = copyableText(value, copyValue);
    const control = copyable && text !== '' && (
        <CopyButton
            value={text}
            copyLabel={copyLabel}
            copiedLabel={copiedLabel}
            className={
                copyPlacement === 'label'
                    ? "size-5 [&_svg:not([class*='size-'])]:size-3 rounded-md text-muted-foreground"
                    : undefined
            }
        />
    );
    const onLabelRow = copyPlacement === 'label';

    return (
        <div
            className={cn('gap-3 flex items-center', className)}
            data-slot={slotName}
        >
            <div className={cn('p-2 rounded-xl bg-muted', iconClassName)}>
                <Icon className="size-5 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="gap-1 flex items-center">
                    <p
                        data-slot="info-field-label"
                        className="text-xs font-medium tracking-wider text-muted-foreground uppercase"
                    >
                        {label}
                    </p>
                    {onLabelRow && control}
                </div>
                <p
                    data-slot="info-field-value"
                    className={cn(
                        'font-semibold',
                        onLabelRow ? 'truncate' : 'gap-1 flex items-center',
                    )}
                >
                    {value}
                    {!onLabelRow && control}
                </p>
            </div>
        </div>
    );
}

export interface InfoFieldGroupProps {
    children: ReactNode;
    className?: string;
}

export function InfoFieldGroup({ children, className }: InfoFieldGroupProps) {
    return <div className={cn('space-y-4', className)}>{children}</div>;
}
