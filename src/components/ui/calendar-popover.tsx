import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import * as React from 'react';

export interface CalendarPopoverProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trigger: React.ReactNode;
    align?: React.ComponentProps<typeof PopoverContent>['align'];
    className?: string;
    children: React.ReactNode;
}

export function CalendarPopover({
    open,
    onOpenChange,
    trigger,
    align = 'start',
    className,
    children,
}: CalendarPopoverProps) {
    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent
                data-slot="calendar-popover"
                className={cn('p-2 w-auto', className)}
                align={align}
                sideOffset={4}
                collisionPadding={16}
            >
                {children}
            </PopoverContent>
        </Popover>
    );
}
