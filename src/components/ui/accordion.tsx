import { ChevronDown } from 'lucide-react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import * as React from 'react';

import {
    contentFill,
    focusRing,
    type ContentSurfaceProps,
} from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Accordion({
    className,
    slotName = 'accordion',
    surface,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> &
    SlotNameProps &
    ContentSurfaceProps) {
    return (
        <AccordionPrimitive.Root
            className={cn(contentFill(surface), 'px-5', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> &
        SlotNameProps
>(({ className, slotName = 'accordion-item', ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn('border-b border-border last:border-b-0', className)}
        {...props}
        data-slot={slotName}
    />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> &
        SlotNameProps
>(({ className, children, slotName = 'accordion-trigger', ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                `text-base py-4 font-medium rounded-xl data-[state=open]:font-semibold flex flex-1 items-center justify-between transition-all [&[data-state=open]>svg]:rotate-180 ${focusRing}`,
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            {children}
            <ChevronDown className="size-icon shrink-0 transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> &
        SlotNameProps
>(({ className, children, slotName = 'accordion-content', ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="text-md overflow-hidden [--motion-content-height:var(--radix-accordion-content-height)] data-[state=closed]:animate-height-close data-[state=open]:animate-height-open motion-reduce:animate-none"
        {...props}
        data-slot={slotName}
    >
        <div className={cn('pb-4 pt-0', className)}>{children}</div>
    </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
