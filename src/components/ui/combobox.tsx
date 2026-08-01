import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

export interface ComboboxOption {
    value: string;
    label: string;
}

export interface ComboboxLabels {
    placeholder: string;
    searchPlaceholder: string;
    emptyText: string;
}

interface ComboboxProps {
    id?: string;
    value: string;
    options: ComboboxOption[];
    onChange: (value: string) => void;
    placeholder?: ComboboxLabels['placeholder'];
    searchPlaceholder?: ComboboxLabels['searchPlaceholder'];
    emptyText?: ComboboxLabels['emptyText'];
    disabled?: boolean;
    invalid?: boolean;
}

export function Combobox({
    id,
    value,
    options,
    onChange,
    placeholder = 'Select an option',
    searchPlaceholder = 'Search...',
    emptyText = 'No results.',
    disabled = false,
    invalid = false,
}: ComboboxProps) {
    const [open, setOpen] = useState(false);
    const selected = options.find((option) => option.value === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    data-slot="combobox"
                    id={id}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn(
                        'h-11 rounded-2xl w-full justify-between border-border bg-muted/40 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50',
                        !selected && 'text-muted-foreground',
                        invalid && 'border-destructive ring-destructive',
                    )}
                >
                    {selected ? selected.label : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="p-0 w-[var(--radix-popover-trigger-width)]"
                align="start"
            >
                <Command>
                    <CommandInput
                        placeholder={searchPlaceholder}
                        className="h-11"
                    />
                    <CommandList>
                        <CommandEmpty>{emptyText}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={() => {
                                        onChange(option.value);
                                        setOpen(false);
                                    }}
                                    className="h-11 rounded-xl"
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            selected?.value === option.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
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
