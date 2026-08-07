import * as React from 'react';

import { useOptionalField } from '@/components/ui/field-context';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

interface FieldErrorProps extends React.ComponentProps<'p'> {
    message?: string;
}

export function FieldError({
    message,
    className,
    slotName = 'field-error',
    ...props
}: FieldErrorProps & SlotNameProps) {
    const field = useOptionalField();

    if (!message) {
        return null;
    }

    return (
        <p
            id={field?.errorId}
            className={cn(
                'ml-1 text-xs font-medium text-destructive group-data-[orientation=horizontal]/field:col-span-2 group-data-[orientation=horizontal]/field:row-start-3',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            {message}
        </p>
    );
}
