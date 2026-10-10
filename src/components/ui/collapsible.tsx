import { assignRefs } from '@/lib/motion/assign-refs';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as React from 'react';

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
    ref,
    slotName = 'collapsible-content',
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent> &
    SlotNameProps) {
    const [animating, setAnimating] = React.useState(false);
    const content = React.useRef<HTMLDivElement>(null);
    const composedRef = React.useMemo(() => assignRefs(content, ref), [ref]);

    React.useEffect(() => {
        const element = content.current;

        if (!element) {
            return undefined;
        }

        const follow = (animating: boolean) => (event: Event) => {
            if (event.target === element) {
                setAnimating(animating);
            }
        };
        const onStart = follow(true);
        const onStop = follow(false);

        element.addEventListener('animationstart', onStart);
        element.addEventListener('animationend', onStop);
        element.addEventListener('animationcancel', onStop);

        return () => {
            element.removeEventListener('animationstart', onStart);
            element.removeEventListener('animationend', onStop);
            element.removeEventListener('animationcancel', onStop);
        };
    }, []);

    return (
        <CollapsiblePrimitive.CollapsibleContent
            ref={composedRef}
            data-animating={animating || undefined}
            className={cn(
                '[--motion-content-height:var(--radix-collapsible-content-height)] data-[animating=true]:overflow-hidden data-[state=closed]:animate-height-close data-[state=open]:animate-height-open motion-reduce:animate-none',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
