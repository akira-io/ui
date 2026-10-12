import { Button, type ButtonProps } from '@/components/ui/button';
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
import { fieldFocus, fieldSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState, type ComponentProps } from 'react';

export interface ComboboxOption {
    value: string;
    label: string;
}

export interface ComboboxLabels {
    placeholder: string;
    searchPlaceholder: string;
    emptyText: string;
}

export const comboboxDefaultLabels: ComboboxLabels = {
    placeholder: 'Select an option',
    searchPlaceholder: 'Search...',
    emptyText: 'No results.',
};

export interface ComboboxProps extends Omit<
    ButtonProps,
    'value' | 'onChange' | 'children' | 'slotName'
> {
    value: string;
    options: ComboboxOption[];
    onChange: (value: string) => void;
    placeholder?: ComboboxLabels['placeholder'];
    searchPlaceholder?: ComboboxLabels['searchPlaceholder'];
    emptyText?: ComboboxLabels['emptyText'];
    invalid?: boolean;
    required?: boolean;
    filter?: ComponentProps<typeof Command>['filter'];
}

export function Combobox({
    value,
    options,
    onChange,
    placeholder,
    searchPlaceholder,
    emptyText,
    disabled = false,
    invalid = false,
    required,
    filter,
    className,
    'aria-invalid': ariaInvalid,
    slotName = 'combobox',
    ...trigger
}: ComboboxProps & SlotNameProps) {
    const labels = useUiLabels('combobox', comboboxDefaultLabels, {
        placeholder,
        searchPlaceholder,
        emptyText,
    });
    const [open, setOpen] = useState(false);
    const selected = options.find((option) => option.value === value);

    return (
        <Popover modal open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    material="solid"
                    {...trigger}
                    role="combobox"
                    aria-expanded={open}
                    aria-required={required || undefined}
                    aria-invalid={ariaInvalid ?? (invalid || undefined)}
                    disabled={disabled}
                    className={cn(
                        fieldSurface,
                        'w-full justify-between px-inset disabled:opacity-50',
                        fieldFocus,
                        !selected && 'text-muted-foreground',
                        invalid && 'ring-[3px] ring-destructive/20',
                        className,
                    )}
                    slotName={slotName}
                >
                    {selected ? selected.label : labels.placeholder}
                    <ChevronsUpDown className="size-icon shrink-0 text-muted-foreground" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                morph
                className="p-0 w-[var(--radix-popover-trigger-width)]"
                align="start"
            >
                <Command filter={filter}>
                    <CommandInput
                        placeholder={labels.searchPlaceholder}
                        className="h-11"
                    />
                    <CommandList className="max-h-[min(300px,var(--radix-popover-content-available-height))]">
                        <CommandEmpty>{labels.emptyText}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={() => {
                                        onChange(option.value);
                                        setOpen(false);
                                    }}
                                    className="rounded-xl py-1.5 pl-2"
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            'ms-auto size-icon',
                                            selected?.value === option.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
