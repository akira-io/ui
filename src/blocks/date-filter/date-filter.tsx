import { enUS } from 'date-fns/locale';
import { CalendarDays, Check, ChevronsUpDown } from 'lucide-react';
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
import { compactRadius, fieldFocus, fieldSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import { useUiDateLocale, useUiLabels, useUiLocale } from '@/locales/context';

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
    presets,
    operators,
    units,
    labels,
    children,
}: DateFilterProps) {
    const locale = useUiLocale();
    const dateLocale = useUiDateLocale() ?? enUS;
    const resolvedLabels = useUiLabels('dateFilter', DEFAULT_LABELS, labels);
    const [open, setOpen] = useState(false);
    const [panel, setPanel] = useState<DateFilterPanel>('root');
    const [draft, setDraft] = useState<DateFilterValue>(value);

    const context = {
        value,
        draft,
        labels: resolvedLabels,
        dateLocale,
        presets: presets ?? locale.dateFilterPresets ?? DEFAULT_PRESETS,
        operators: operators ?? locale.dateFilterOperators ?? DEFAULT_OPERATORS,
        units: units ?? locale.dateFilterUnits ?? DEFAULT_UNITS,
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
    const { value, presets, operators, units, labels, dateLocale } =
        useDateFilter();

    return (
        <PopoverTrigger asChild>
            <Button
                variant="secondary"
                material="solid"
                className={cn(
                    fieldSurface,
                    'h-control justify-start gap-item px-inset',
                    fieldFocus,
                    className,
                )}
            >
                <CalendarDays className="size-icon text-muted-foreground" />
                {children ??
                    summariseDateFilter(
                        value,
                        presets,
                        operators,
                        units,
                        labels,
                        dateLocale,
                    )}
                <ChevronsUpDown className="ms-auto size-icon shrink-0 text-muted-foreground" />
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
        <PopoverContent
            morph
            align="start"
            className={cn('p-0 w-auto', className)}
        >
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
            data-slot="date-filter-item"
            className={cn(
                `mx-1 px-2 py-1.5 flex items-center gap-item ${compactRadius} text-sm cursor-pointer text-left text-foreground transition-colors hover:bg-(--glass-highlight)`,
                active && 'font-semibold bg-(--glass-highlight)',
            )}
        >
            {children}
            {active && <Check className="ms-auto size-icon shrink-0" />}
        </button>
    );
}

export function DateFilterSeparator() {
    return (
        <div data-slot="date-filter-separator" className="mx-1 my-2 border-t" />
    );
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
