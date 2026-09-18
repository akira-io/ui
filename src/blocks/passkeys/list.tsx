import { PasskeyItem } from '@/blocks/passkeys/item';
import {
    passkeyLabels,
    type Passkey,
    type PasskeyLabelProps,
} from '@/blocks/passkeys/types';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { KeyRound } from 'lucide-react';
import type { ReactNode } from 'react';

export interface PasskeyListProps extends PasskeyLabelProps {
    passkeys: Passkey[];
    onDelete: (passkey: Passkey) => void | Promise<void>;
    children?: ReactNode;
    className?: string;
}

export function PasskeyList({
    passkeys,
    onDelete,
    children,
    labels,
    className,
    slotName = 'passkey-list',
}: PasskeyListProps & SlotNameProps) {
    const text = useUiLabels('passkeys', passkeyLabels, labels);

    return (
        <div className={cn('gap-4 grid', className)} data-slot={slotName}>
            {passkeys.length > 0 ? (
                <ul
                    className="rounded-xl divide-y divide-border overflow-hidden border border-border"
                    data-slot={`${slotName}-frame`}
                >
                    {passkeys.map((passkey) => (
                        <PasskeyItem
                            key={passkey.id}
                            passkey={passkey}
                            onDelete={onDelete}
                            labels={labels}
                        />
                    ))}
                </ul>
            ) : (
                <div
                    className="gap-1 p-8 rounded-xl grid justify-items-center border border-dashed border-border text-center"
                    data-slot={`${slotName}-frame`}
                >
                    <span className="mb-3 size-14 rounded-2xl flex items-center justify-center bg-muted">
                        <KeyRound className="size-7 text-muted-foreground" />
                    </span>
                    <p className="font-medium">{text.emptyTitle}</p>
                    <p className="text-sm text-muted-foreground">
                        {text.emptyDescription}
                    </p>
                </div>
            )}
            {children}
        </div>
    );
}
