import { CalendarDays } from 'lucide-react';
import { useState, type ReactNode } from 'react';

import {
    DateFilterProvider,
    useDateFilter,
    type DateFilterPanel,
} from '@/blocks/date-filter/context';
import { DateFilterFixedPanel } from '@/blocks/date-filter/fixed-panel';
import { DateFilterRelativePanel } from '@/blocks/date-filter/relative-panel';
import { summariseDateFilter } from '@/blocks/date-filter/summarise';
import {
    DEFAULT_LABELS,
    DEFAULT_OPERATORS,
    DEFAULT_PRESETS,
    DEFAULT_UNITS,
    type DateFilterLabels,
    type DateFilterOption,
    type DateFilterValue,
} from '@/blocks/date-filter/types';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface DateFilterProps {
    value: DateFilterValue;
    onChange: (value: DateFilterValue) => void;
    presets?: DateFilterOption[];
    operators?: DateFilterOption[];
    units?: DateFilterOption[];
    labels?: Partial<DateFilterLabels>;
    children?: ReactNode;
}

export function DateFilter({
    value,
    onChange,
    presets = DEFAULT_PRESETS,
    operators = DEFAULT_OPERATORS,
    units = DEFAULT_UNITS,
    labels,
    children,
}: DateFilterProps) {
    const [open, setOpen] = useState(false);
    const [panel, setPanel] = useState<DateFilterPanel>('root');
    const [draft, setDraft] = useState<DateFilterValue>(value);

    const context = {
        value,
        draft,
        labels: { ...DEFAULT_LABELS, ...labels },
        presets,
        operators,
        units,
        panel,
        setDraft,
        openPanel: (next: DateFilterPanel, seed: DateFilterValue) => {
            setDraft(seed);
            setPanel(next);
        },
        backToRoot: () => setPanel('root'),
        commit: (next: DateFilterValue) => {
            onChange(next);
            setOpen(false);
            setPanel('root');
        },
    };

    return (
        <DateFilterProvider value={context}>
            <Popover
                open={open}
                onOpenChange={(next) => {
                    setOpen(next);

                    if (!next) {
                        setPanel('root');
                    }
                }}
            >
                {children ?? (
                    <>
                        <DateFilterTrigger />
                        <DateFilterContent>
                            <DateFilterAll />
                            <DateFilterSeparator />
                            <DateFilterPresets />
                            <DateFilterSeparator />
                            <DateFilterFixed />
                            <DateFilterRelative />
                        </DateFilterContent>
                    </>
                )}
            </Popover>
        </DateFilterProvider>
    );
}

export function DateFilterTrigger({
    className,
    children,
}: {
    className?: string;
    children?: ReactNode;
}) {
    const { value, presets, operators, units, labels } = useDateFilter();

    return (
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                className={cn('gap-2 justify-start', className)}
            >
                <CalendarDays className="size-4" />
                {children ??
                    summariseDateFilter(
                        value,
                        presets,
                        operators,
                        units,
                        labels,
                    )}
            </Button>
        </PopoverTrigger>
    );
}

export function DateFilterContent({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    const { panel } = useDateFilter();

    return (
        <PopoverContent align="start" className={cn('p-0 w-auto', className)}>
            {panel === 'root' && (
                <div className="w-64 py-2 flex flex-col">{children}</div>
            )}
            {panel === 'fixed' && <DateFilterFixedPanel />}
            {panel === 'relative' && <DateFilterRelativePanel />}
        </PopoverContent>
    );
}

export function DateFilterItem({
    active,
    onSelect,
    children,
}: {
    active: boolean;
    onSelect: () => void;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                'px-4 py-2 text-sm font-medium cursor-pointer text-left transition-colors',
                active
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground hover:bg-accent/50',
            )}
        >
            {children}
        </button>
    );
}

export function DateFilterSeparator() {
    return <div className="my-2 border-t" />;
}

export function DateFilterAll({ children }: { children?: ReactNode }) {
    const { value, labels, commit } = useDateFilter();

    return (
        <DateFilterItem
            active={value.mode === 'all'}
            onSelect={() => commit({ mode: 'all' })}
        >
            {children ?? labels.all}
        </DateFilterItem>
    );
}

export function DateFilterPresets({ only }: { only?: string[] }) {
    const { value, presets, commit } = useDateFilter();

    const visible = only
        ? presets.filter((preset) => only.includes(preset.value))
        : presets;

    return (
        <>
            {visible.map((preset) => (
                <DateFilterItem
                    key={preset.value}
                    active={
                        value.mode === 'preset' && value.preset === preset.value
                    }
                    onSelect={() =>
                        commit({ mode: 'preset', preset: preset.value })
                    }
                >
                    {preset.label}
                </DateFilterItem>
            ))}
        </>
    );
}

export function DateFilterFixed({ children }: { children?: ReactNode }) {
    const { value, labels, openPanel } = useDateFilter();

    return (
        <DateFilterItem
            active={value.mode === 'fixed'}
            onSelect={() =>
                openPanel('fixed', {
                    mode: 'fixed',
                    operator: value.operator ?? 'between',
                    start: value.start,
                    end: value.end,
                })
            }
        >
            {children ?? labels.fixed}
        </DateFilterItem>
    );
}

export function DateFilterRelative({ children }: { children?: ReactNode }) {
    const { value, labels, openPanel } = useDateFilter();

    return (
        <DateFilterItem
            active={value.mode === 'relative'}
            onSelect={() =>
                openPanel('relative', {
                    mode: 'relative',
                    unit: value.unit ?? 'month',
                    amount: value.amount ?? 3,
                    include_current: value.include_current ?? false,
                })
            }
        >
            {children ?? labels.relative}
        </DateFilterItem>
    );
}
