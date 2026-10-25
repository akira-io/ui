import {
    contentFill,
    nestedEdgeToEdge,
    nestedRadius,
    nestedSurfaceReset,
    type ContentSurfaceProps,
} from '@/lib/language';
import { useContentSurface } from '@/lib/surface-context';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import * as React from 'react';

const bleedEdges =
    '-mx-6 w-[calc(100%+3rem)] rounded-none bg-transparent shadow-none ring-0 backdrop-blur-none [&_td:first-child]:pl-6 [&_td:last-child]:pr-6 [&_th:first-child]:pl-6 [&_th:last-child]:pr-6';

interface TableProps
    extends
        React.HTMLAttributes<HTMLTableElement>,
        SlotNameProps,
        ContentSurfaceProps {
    bleed?: boolean;
    striped?: boolean;
    scrollRef?: React.Ref<HTMLDivElement>;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
    (
        {
            className,
            bleed = false,
            striped = false,
            scrollRef,
            surface,
            slotName = 'table-container',
            ...props
        },
        ref,
    ) => (
        <div
            className={cn(
                contentFill(useContentSurface(surface)),
                nestedSurfaceReset,
                nestedEdgeToEdge,
                'relative w-full overflow-hidden',
                bleed && bleedEdges,
            )}
            data-bleed={bleed || undefined}
            data-slot={slotName}
        >
            <div
                ref={scrollRef}
                className={cn(
                    nestedRadius,
                    nestedSurfaceReset,
                    nestedEdgeToEdge,
                    'w-full overflow-x-auto',
                    bleed && 'rounded-none',
                )}
            >
                <table
                    ref={ref}
                    className={cn(
                        'text-sm w-full caption-bottom',
                        striped &&
                            '[&_tbody_tr:nth-child(even)]:bg-(--glass-highlight)',
                        className,
                    )}
                    {...props}
                />
            </div>
        </div>
    ),
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <thead
        ref={ref}
        className={cn('[&_tr]:border-b [&_tr]:border-(--hairline)', className)}
        {...props}
    />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn('[&_tr:last-child]:border-0', className)}
        {...props}
    />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn(
            'font-medium border-t border-(--hairline) bg-muted/50 [&>tr]:last:border-b-0',
            className,
        )}
        {...props}
    />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn(
            'border-b border-(--hairline) transition-colors hover:bg-(--glass-highlight) data-[state=selected]:bg-muted',
            className,
        )}
        {...props}
    />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            'h-11 px-4 text-xs font-medium tracking-wider [&:has([role=checkbox])]:pr-0 text-left align-middle text-muted-foreground uppercase',
            className,
        )}
        {...props}
    />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn(
            'p-4 [&:has([role=checkbox])]:pr-0 align-middle',
            className,
        )}
        {...props}
    />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
    HTMLTableCaptionElement,
    React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn(
            'mt-4 px-4 pb-4 text-sm text-muted-foreground',
            className,
        )}
        {...props}
    />
));
TableCaption.displayName = 'TableCaption';

export {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    type TableProps,
};
