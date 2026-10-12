import { PasskeyItem } from '@/blocks/passkeys/item';
import {
    passkeyLabels,
    type Passkey,
    type PasskeyLabelProps,
} from '@/blocks/passkeys/types';
import { EmptyState } from '@/components/ui/empty-state';
import {
    contentSurface,
    controlRadius,
    type ContentSurfaceProps,
} from '@/lib/language';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { KeyRound } from 'lucide-react';
import type { ReactNode } from 'react';

export interface PasskeyListProps
    extends PasskeyLabelProps, ContentSurfaceProps {
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
    surface,
    className,
    slotName = 'passkey-list',
}: PasskeyListProps & SlotNameProps) {
    const text = useUiLabels('passkeys', passkeyLabels, labels);

    return (
        <div
            className={cn('gap-4 flex flex-col', className)}
            data-slot={slotName}
        >
            {passkeys.length > 0 ? (
                <div
                    data-slot={`${slotName}-frame`}
                    className={contentSurface(surface)}
                >
                    <ul className="gap-1 flex flex-col">
                        {passkeys.map((passkey) => (
                            <PasskeyItem
                                key={passkey.id}
                                passkey={passkey}
                                onDelete={onDelete}
                                labels={labels}
                            />
                        ))}
                    </ul>
                </div>
            ) : (
                <div
                    className={cn(
                        controlRadius,
                        'border border-dashed border-border',
                    )}
                    data-slot={`${slotName}-frame`}
                >
                    <EmptyState
                        icon={KeyRound}
                        title={text.emptyTitle}
                        description={text.emptyDescription}
                        className="py-10"
                    />
                </div>
            )}
            {children}
        </div>
    );
}
