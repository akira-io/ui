import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Breadcrumb({
    slotName = 'breadcrumb',
    ...props
}: React.ComponentProps<'nav'> & SlotNameProps) {
    return <nav aria-label="breadcrumb" {...props} data-slot={slotName} />;
}

function BreadcrumbList({
    className,
    slotName = 'breadcrumb-list',
    ...props
}: React.ComponentProps<'ol'> & SlotNameProps) {
    return (
        <ol
            className={cn(
                'gap-1.5 text-sm sm:gap-2.5 flex flex-wrap items-center break-words text-muted-foreground',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function BreadcrumbItem({
    className,
    slotName = 'breadcrumb-item',
    ...props
}: React.ComponentProps<'li'> & SlotNameProps) {
    return (
        <li
            className={cn('gap-1.5 inline-flex items-center', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function BreadcrumbLink({
    asChild,
    className,
    slotName = 'breadcrumb-link',
    ...props
}: React.ComponentProps<'a'> & {
    asChild?: boolean;
} & SlotNameProps) {
    const Comp = asChild ? Slot : 'a';

    return (
        <Comp
            className={cn('transition-colors hover:text-foreground', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function BreadcrumbPage({
    className,
    slotName = 'breadcrumb-page',
    ...props
}: React.ComponentProps<'span'> & SlotNameProps) {
    return (
        <span
            role="link"
            aria-disabled="true"
            aria-current="page"
            className={cn('font-semibold text-foreground', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function BreadcrumbSeparator({
    children,
    className,
    slotName = 'breadcrumb-separator',
    ...props
}: React.ComponentProps<'li'> & SlotNameProps) {
    return (
        <li
            role="presentation"
            aria-hidden="true"
            className={cn('[&>svg]:size-3.5', className)}
            {...props}
            data-slot={slotName}
        >
            {children ?? <ChevronRight />}
        </li>
    );
}

function BreadcrumbEllipsis({
    className,
    slotName = 'breadcrumb-ellipsis',
    ...props
}: React.ComponentProps<'span'> & SlotNameProps) {
    return (
        <span
            role="presentation"
            aria-hidden="true"
            className={cn(
                'size-9 rounded-xl flex items-center justify-center',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">More</span>
        </span>
    );
}

export {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
};
