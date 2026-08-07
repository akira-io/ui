import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarPopover } from '@/components/ui/calendar-popover';
import { useUiLabels } from '@/locales/context';
import { format } from 'date-fns';
import { CalendarRange, X } from 'lucide-react';
import { useState } from 'react';
import { type DateRange } from 'react-day-picker';

function parse(value?: string): Date | undefined {
    return value ? new Date(`${value}T00:00:00`) : undefined;
}

export interface DateRangeFilterLabels {
    emptyLabel: string;
    dateFormat: string;
}

export const dateRangeFilterDefaultLabels: DateRangeFilterLabels = {
    emptyLabel: 'Date range',
    dateFormat: 'dd MMM yy',
};

export function DateRangeFilter({
    from,
    to,
    onChange,
    emptyLabel,
    dateFormat,
}: {
    from?: string;
    to?: string;
    onChange: (range: { from?: string; to?: string }) => void;
} & Partial<DateRangeFilterLabels>) {
    const labels = useUiLabels(
        'dateRangeFilter',
        dateRangeFilterDefaultLabels,
        { emptyLabel, dateFormat },
    );
    const [open, setOpen] = useState(false);
    const selected: DateRange | undefined =
        from || to ? { from: parse(from), to: parse(to) } : undefined;
    const label = from
        ? to && to !== from
            ? `${format(parse(from)!, labels.dateFormat)} - ${format(parse(to)!, labels.dateFormat)}`
            : format(parse(from)!, labels.dateFormat)
        : labels.emptyLabel;

    return (
        <CalendarPopover
            open={open}
            onOpenChange={setOpen}
            align="end"
            trigger={
                <Button
                    variant="outline"
                    data-slot="date-range-filter"
                    className="h-11 rounded-2xl cursor-pointer border-dashed border-border"
                >
                    <CalendarRange className="mr-2 size-4" />
                    {label}
                    {(from || to) && (
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={(event) => {
                                event.stopPropagation();
                                onChange({ from: undefined, to: undefined });
                            }}
                            className="ml-2 inline-flex"
                        >
                            <X className="size-3.5 opacity-60 hover:opacity-100" />
                        </span>
                    )}
                </Button>
            }
        >
            <Calendar
                mode="range"
                numberOfMonths={2}
                defaultMonth={parse(from)}
                selected={selected}
                onSelect={(range) =>
                    onChange({
                        from: range?.from
                            ? format(range.from, 'yyyy-MM-dd')
                            : undefined,
                        to: range?.to
                            ? format(range.to, 'yyyy-MM-dd')
                            : undefined,
                    })
                }
                className="rounded-2xl bg-transparent"
            />
        </CalendarPopover>
    );
}
