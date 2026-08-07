import type { SlotNameProps } from '@/types';
import { AspectRatio as AspectRatioPrimitive } from 'radix-ui';

function AspectRatio({
    slotName = 'aspect-ratio',
    ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root> & SlotNameProps) {
    return <AspectRatioPrimitive.Root {...props} data-slot={slotName} />;
}

export { AspectRatio };
