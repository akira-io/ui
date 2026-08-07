import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Avatar({
    className,
    slotName = 'avatar',
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & SlotNameProps) {
    return (
        <AvatarPrimitive.Root
            className={cn(
                'size-8 relative flex shrink-0 overflow-hidden rounded-full',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function AvatarImage({
    className,
    slotName = 'avatar-image',
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image> & SlotNameProps) {
    return (
        <AvatarPrimitive.Image
            className={cn('aspect-square size-full', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function AvatarFallback({
    className,
    slotName = 'avatar-fallback',
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & SlotNameProps) {
    return (
        <AvatarPrimitive.Fallback
            className={cn(
                'flex size-full items-center justify-center rounded-full bg-muted',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export { Avatar, AvatarFallback, AvatarImage };
