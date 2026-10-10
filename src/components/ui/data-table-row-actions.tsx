import { Button } from '@/components/ui/button';
import { dataTableDefaultLabels } from '@/components/ui/data-table-labels';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUiLabels } from '@/locales/context';
import type { IconComponent, SlotNameProps } from '@/types';
import { MoreVertical } from 'lucide-react';

export interface DataTableRowAction<TData> {
    label: string;
    icon?: IconComponent;
    variant?: 'default' | 'destructive';
    hidden?: (row: TData) => boolean;
    onClick: (row: TData) => void;
}

export function RowActionsMenu<TData>({
    row,
    actions,
    rowActionsLabel,
    slotName = 'data-table-row-actions',
}: {
    row: TData;
    actions: DataTableRowAction<TData>[];
    rowActionsLabel?: string;
} & SlotNameProps) {
    const labels = useUiLabels('dataTable', dataTableDefaultLabels, {
        rowActionsLabel,
    });
    const visible = actions.filter((action) => !action.hidden?.(row));

    if (visible.length === 0) {
        return null;
    }

    return (
        <div
            className="flex justify-end"
            onClick={(event) => event.stopPropagation()}
            data-slot={slotName}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={labels.rowActionsLabel}
                        className="size-8 rounded-xl text-muted-foreground hover:text-foreground"
                    >
                        <MoreVertical className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-2xl">
                    {visible.map((action) => (
                        <DropdownMenuItem
                            key={action.label}
                            onClick={() => action.onClick(row)}
                            className={
                                action.variant === 'destructive'
                                    ? 'rounded-xl text-destructive focus:text-destructive'
                                    : 'rounded-xl'
                            }
                        >
                            {action.icon && <action.icon className="size-4" />}
                            {action.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
