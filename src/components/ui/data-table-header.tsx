import { flexRender, type Table } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function DataTableHeader<TData>({ table }: { table: Table<TData> }) {
    return (
        <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                    {headerGroup.headers.map((header) => (
                        <TableHead
                            key={header.id}
                            className="h-11 px-4 font-medium tracking-wider text-[11px] text-muted-foreground uppercase"
                        >
                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                <button
                                    type="button"
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="gap-1 inline-flex items-center transition-colors hover:text-foreground"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                    <ArrowUpDown className="size-3 opacity-50" />
                                </button>
                            ) : (
                                flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                )
                            )}
                        </TableHead>
                    ))}
                </TableRow>
            ))}
        </TableHeader>
    );
}
