import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Skeleton({
    className,
    slotName = 'skeleton',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn('animate-pulse rounded-xl bg-muted', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

export { Skeleton };
