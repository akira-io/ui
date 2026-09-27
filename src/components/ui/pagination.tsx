import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from 'lucide-react';
import * as React from 'react';

import { buttonVariants, type Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

export interface PaginationLabels {
    navigationLabel: string;
    previousLabel: string;
    previousPageLabel: string;
    nextLabel: string;
    nextPageLabel: string;
    morePagesLabel: string;
}

export const paginationDefaultLabels: PaginationLabels = {
    navigationLabel: 'pagination',
    previousLabel: 'Previous',
    previousPageLabel: 'Go to previous page',
    nextLabel: 'Next',
    nextPageLabel: 'Go to next page',
    morePagesLabel: 'More pages',
};

function Pagination({
    className,
    slotName = 'pagination',
    ...props
}: React.ComponentProps<'nav'> & SlotNameProps) {
    const labels = useUiLabels('pagination', paginationDefaultLabels);

    return (
        <nav
            role="navigation"
            aria-label={labels.navigationLabel}
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
    label,
    ...props
}: React.ComponentProps<typeof PaginationLink> & { label?: string }) {
    const labels = useUiLabels('pagination', paginationDefaultLabels, {
        previousLabel: label,
    });

    return (
        <PaginationLink
            aria-label={labels.previousPageLabel}
            size="default"
            className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
            {...props}
        >
            <ChevronLeftIcon />
            <span className="sm:block hidden">{labels.previousLabel}</span>
        </PaginationLink>
    );
}

function PaginationNext({
    className,
    label,
    ...props
}: React.ComponentProps<typeof PaginationLink> & { label?: string }) {
    const labels = useUiLabels('pagination', paginationDefaultLabels, {
        nextLabel: label,
    });

    return (
        <PaginationLink
            aria-label={labels.nextPageLabel}
            size="default"
            className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
            {...props}
        >
            <span className="sm:block hidden">{labels.nextLabel}</span>
            <ChevronRightIcon />
        </PaginationLink>
    );
}

function PaginationEllipsis({
    className,
    label,
    slotName = 'pagination-ellipsis',
    ...props
}: React.ComponentProps<'span'> & { label?: string } & SlotNameProps) {
    const labels = useUiLabels('pagination', paginationDefaultLabels, {
        morePagesLabel: label,
    });

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
            <span className="sr-only">{labels.morePagesLabel}</span>
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
