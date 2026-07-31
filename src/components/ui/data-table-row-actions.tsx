import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type LucideIcon, MoreVertical } from 'lucide-react';

export interface DataTableRowAction<TData> {
    label: string;
    icon?: LucideIcon;
    variant?: 'default' | 'destructive';
    onClick: (row: TData) => void;
}

export function RowActionsMenu<TData>({
    row,
    actions,
}: {
    row: TData;
    actions: DataTableRowAction<TData>[];
}) {
    return (
        <div
            className="flex justify-end"
            onClick={(event) => event.stopPropagation()}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-xl text-muted-foreground hover:text-foreground"
                    >
                        <MoreVertical className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-2xl">
                    {actions.map((action) => (
                        <DropdownMenuItem
                            key={action.label}
                            onClick={() => action.onClick(row)}
                            className={
                                action.variant === 'destructive'
                                    ? 'rounded-xl font-bold text-red-600 focus:text-red-600'
                                    : 'rounded-xl font-bold'
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
