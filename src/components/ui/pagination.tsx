import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from 'lucide-react';
import * as React from 'react';

import { buttonVariants, type Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Pagination({
    className,
    slotName = 'pagination',
    ...props
}: React.ComponentProps<'nav'> & SlotNameProps) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            className={cn('mx-auto flex w-full justify-center', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function PaginationContent({
    className,
    slotName = 'pagination-content',
    ...props
}: React.ComponentProps<'ul'> & SlotNameProps) {
    return (
        <ul
            className={cn('gap-1 flex flex-row items-center', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function PaginationItem({
    slotName = 'pagination-item',
    ...props
}: React.ComponentProps<'li'> & SlotNameProps) {
    return <li {...props} data-slot={slotName} />;
}

type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
    React.ComponentProps<'a'>;

function PaginationLink({
    className,
    isActive,
    size = 'icon',
    slotName = 'pagination-link',
    ...props
}: PaginationLinkProps & SlotNameProps) {
    return (
        <a
            aria-current={isActive ? 'page' : undefined}
            data-active={isActive}
            className={cn(
                buttonVariants({
                    variant: isActive ? 'outline' : 'ghost',
                    size,
                }),
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function PaginationPrevious({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="default"
            className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
            {...props}
        >
            <ChevronLeftIcon />
            <span className="sm:block hidden">Previous</span>
        </PaginationLink>
    );
}

function PaginationNext({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink
            aria-label="Go to next page"
            size="default"
            className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
            {...props}
        >
            <span className="sm:block hidden">Next</span>
            <ChevronRightIcon />
        </PaginationLink>
    );
}

function PaginationEllipsis({
    className,
    slotName = 'pagination-ellipsis',
    ...props
}: React.ComponentProps<'span'> & SlotNameProps) {
    return (
        <span
            aria-hidden
            className={cn(
                'size-9 rounded-xl flex items-center justify-center',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">More pages</span>
        </span>
    );
}

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
};
