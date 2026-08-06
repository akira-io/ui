import { CopyButton, type CopyButtonLabels } from '@/components/ui/copy-button';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

export interface InfoFieldProps {
    icon: LucideIcon;
    label: string;
    value: ReactNode;
    copyable?: boolean;
    copyValue?: string;
    copyLabel?: CopyButtonLabels['copyLabel'];
    copiedLabel?: CopyButtonLabels['copiedLabel'];
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
    iconClassName,
    className,
}: InfoFieldProps) {
    const text = copyableText(value, copyValue);

    return (
        <div
            data-slot="info-field"
            className={cn('gap-3 flex items-center', className)}
        >
            <div className={cn('p-2 rounded-xl bg-muted', iconClassName)}>
                <Icon className="size-5 text-muted-foreground" />
            </div>
            <div>
                <p
                    data-slot="info-field-label"
                    className="text-xs font-medium tracking-wider text-muted-foreground uppercase"
                >
                    {label}
                </p>
                <p
                    data-slot="info-field-value"
                    className="gap-1 font-semibold flex items-center"
                >
                    {value}
                    {copyable && text !== '' && (
                        <CopyButton
                            value={text}
                            copyLabel={copyLabel}
                            copiedLabel={copiedLabel}
                        />
                    )}
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
