import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Column } from '@tanstack/react-table';
import { Check, PlusCircle } from 'lucide-react';

export interface DataTableFilter {
    columnId: string;
    label: string;
    options: { label: string; value: string }[];
}

export interface DataTableServerFilter {
    paramKey: string;
    label: string;
    options: { label: string; value: string }[];
}

export interface DataTableFacetedFilterLabels {
    noOptionsLabel: string;
}

function FilterPopover({
    label,
    options,
    selected,
    onToggle,
    width,
    noOptionsLabel = 'No options.',
}: {
    label: string;
    options: { label: string; value: string }[];
    selected: Set<string>;
    onToggle: (value: string) => void;
    width: string;
    noOptionsLabel?: DataTableFacetedFilterLabels['noOptionsLabel'];
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="h-11 rounded-2xl font-bold border-dashed border-border/60"
                >
                    <PlusCircle className="mr-2 size-4" />
                    {label}
                    {selected.size > 0 && (
                        <Badge
                            variant="secondary"
                            className="ml-2 px-2 font-black rounded-full tabular-nums"
                        >
                            {selected.size}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={cn('rounded-2xl p-0 shadow-2xl', width)}
                align="start"
            >
                <Command>
                    <CommandList>
                        <CommandEmpty>{noOptionsLabel}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={() => onToggle(option.value)}
                                    className="h-10 rounded-xl"
                                >
                                    <div
                                        className={cn(
                                            'mr-2 size-4 rounded flex items-center justify-center border border-border',
                                            selected.has(option.value)
                                                ? 'bg-primary text-primary-foreground'
                                                : 'opacity-50',
                                        )}
                                    >
                                        {selected.has(option.value) && (
                                            <Check className="size-3" />
                                        )}
                                    </div>
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export function FacetedFilter<TData>({
    column,
    filter,
    noOptionsLabel,
}: {
    column?: Column<TData, unknown>;
    filter: DataTableFilter;
    noOptionsLabel?: DataTableFacetedFilterLabels['noOptionsLabel'];
}) {
    const selected = new Set((column?.getFilterValue() as string[]) ?? []);

    const toggle = (value: string) => {
        const next = new Set(selected);
        if (next.has(value)) {
            next.delete(value);
        } else {
            next.add(value);
        }
        const arr = Array.from(next);
        column?.setFilterValue(arr.length ? arr : undefined);
    };

    return (
        <FilterPopover
            label={filter.label}
            options={filter.options}
            selected={selected}
            onToggle={toggle}
            width="w-[220px]"
            noOptionsLabel={noOptionsLabel}
        />
    );
}

export function ServerFacetedFilter({
    filter,
    selected,
    onChange,
    noOptionsLabel,
}: {
    filter: DataTableServerFilter;
    selected: string[];
    onChange: (values: string[]) => void;
    noOptionsLabel?: DataTableFacetedFilterLabels['noOptionsLabel'];
}) {
    const selectedSet = new Set(selected);

    const toggle = (value: string) => {
        const next = new Set(selectedSet);
        if (next.has(value)) {
            next.delete(value);
        } else {
            next.add(value);
        }
        onChange(Array.from(next));
    };

    return (
        <FilterPopover
            label={filter.label}
            options={filter.options}
            selected={selectedSet}
            onToggle={toggle}
            width="w-[240px]"
            noOptionsLabel={noOptionsLabel}
        />
    );
}
