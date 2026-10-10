import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

function Collapsible({
    slotName = 'collapsible',
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root> & SlotNameProps) {
    return <CollapsiblePrimitive.Root {...props} data-slot={slotName} />;
}

function CollapsibleTrigger({
    slotName = 'collapsible-trigger',
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> &
    SlotNameProps) {
    return (
        <CollapsiblePrimitive.CollapsibleTrigger
            {...props}
            data-slot={slotName}
        />
    );
}

function CollapsibleContent({
    className,
    slotName = 'collapsible-content',
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent> &
    SlotNameProps) {
    return (
        <CollapsiblePrimitive.CollapsibleContent
            className={cn(
                'overflow-hidden [--motion-content-height:var(--radix-collapsible-content-height)] data-[state=closed]:animate-height-close data-[state=open]:animate-height-open motion-reduce:animate-none',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
