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
    slotName = 'collapsible-content',
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent> &
    SlotNameProps) {
    return (
        <CollapsiblePrimitive.CollapsibleContent
            {...props}
            data-slot={slotName}
        />
    );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
