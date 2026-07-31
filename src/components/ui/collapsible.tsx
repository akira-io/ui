import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

import { elevatedSurface, nestedSurfaceReset } from '@/lib/language';
import { cn } from '@/lib/utils';

function Collapsible({
    className,
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
    return (
        <CollapsiblePrimitive.Root
            data-slot="collapsible"
            className={cn(
                elevatedSurface,
                nestedSurfaceReset,
                'p-5 bg-card',
                className,
            )}
            {...props}
        />
    );
}

function CollapsibleTrigger({
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
    return (
        <CollapsiblePrimitive.CollapsibleTrigger
            data-slot="collapsible-trigger"
            {...props}
        />
    );
}

function CollapsibleContent({
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
    return (
        <CollapsiblePrimitive.CollapsibleContent
            data-slot="collapsible-content"
            {...props}
        />
    );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
