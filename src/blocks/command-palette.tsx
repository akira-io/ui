import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { useUiLabels } from '@/locales/context';
import { type LucideIcon } from 'lucide-react';
import { useCallback, useEffect, useState, type ReactNode } from 'react';

export interface CommandPaletteItem {
    id: string;
    label: string;
    icon?: LucideIcon;
    value?: string;
    hint?: string;
}

export interface CommandPaletteGroup {
    heading: string;
    items: CommandPaletteItem[];
}

export interface CommandPaletteLabels {
    placeholder: string;
    noResultsLabel: string;
}

export const commandPaletteDefaultLabels: CommandPaletteLabels = {
    placeholder: 'Search...',
    noResultsLabel: 'No results found',
};

export interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    groups: CommandPaletteGroup[];
    onSelect: (item: CommandPaletteItem) => void;
    query?: string;
    onQueryChange?: (query: string) => void;
    placeholder?: CommandPaletteLabels['placeholder'];
    noResultsLabel?: CommandPaletteLabels['noResultsLabel'];
    emptyState?: ReactNode;
    className?: string;
}

export function CommandPalette({
    open,
    onOpenChange,
    groups,
    onSelect,
    query,
    onQueryChange,
    placeholder,
    noResultsLabel,
    emptyState,
    className,
}: CommandPaletteProps) {
    const labels = useUiLabels('commandPalette', commandPaletteDefaultLabels, {
        placeholder,
        noResultsLabel,
    });
    const resolvedEmptyState = emptyState ?? labels.noResultsLabel;

    return (
        <CommandDialog
            open={open}
            onOpenChange={onOpenChange}
            className={className}
        >
            <CommandInput
                placeholder={labels.placeholder}
                value={query}
                onValueChange={onQueryChange}
            />
            <CommandList className="max-h-[360px]">
                <CommandEmpty>{resolvedEmptyState}</CommandEmpty>

                {groups.map((group) => (
                    <CommandGroup key={group.heading} heading={group.heading}>
                        {group.items.map((item) => (
                            <CommandItem
                                key={item.id}
                                value={item.value ?? item.label}
                                onSelect={() => onSelect(item)}
                            >
                                {item.icon && (
                                    <item.icon className="mr-2 size-4" />
                                )}
                                <span className="font-medium">
                                    {item.label}
                                </span>
                                {item.hint && (
                                    <span className="text-xs ml-auto text-muted-foreground">
                                        {item.hint}
                                    </span>
                                )}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                ))}
            </CommandList>
        </CommandDialog>
    );
}

export function useCommandPalette(initialOpen = false) {
    const [open, setOpen] = useState(initialOpen);

    const toggle = useCallback(() => setOpen((previous) => !previous), []);

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                toggle();
            }
        };

        document.addEventListener('keydown', handler);

        return () => document.removeEventListener('keydown', handler);
    }, [toggle]);

    return { open, setOpen, toggle };
}
