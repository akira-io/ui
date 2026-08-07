import {
    resolveLabels,
    type TwoFactorCodeMode,
    type TwoFactorLabelProps,
} from '@/blocks/two-factor/types';
import { TwoFactorVerifyForm } from '@/blocks/two-factor/verify-form';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import type { ReactNode } from 'react';

export interface TwoFactorChallengeProps extends TwoFactorLabelProps {
    onSubmit: (code: string, mode: TwoFactorCodeMode) => void | Promise<void>;
    errors?: string | string[] | null;
    allowRecoveryCode?: boolean;
    title?: string;
    description?: string;
    footer?: ReactNode;
    className?: string;
}

export function TwoFactorChallenge({
    onSubmit,
    errors,
    allowRecoveryCode = true,
    title,
    description,
    footer,
    labels,
    className,
    slotName = 'two-factor-challenge',
}: TwoFactorChallengeProps & SlotNameProps) {
    const text = resolveLabels(labels);

    return (
        <section
            className={cn('gap-6 flex w-full flex-col', className)}
            data-slot={slotName}
        >
            <div className="gap-2 flex flex-col">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    {title ?? text.challengeTitle}
                </h2>
                <p className="text-sm font-medium text-muted-foreground">
                    {description ?? text.challengeDescription}
                </p>
            </div>

            <TwoFactorVerifyForm
                autoFocus
                allowRecoveryCode={allowRecoveryCode}
                errors={errors}
                labels={labels}
                footer={footer}
                onSubmit={onSubmit}
            />
        </section>
    );
}
