import { Calendar } from '@/components/ui/calendar';
import { CalendarPopover } from '@/components/ui/calendar-popover';
import { fieldSurface, focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { useState } from 'react';
import type { Matcher } from 'react-day-picker';

export interface DatePickerLabels {
    placeholder: string;
    dateFormat: string;
    clearLabel: string;
}

export const datePickerDefaultLabels: DatePickerLabels = {
    placeholder: 'Pick a date',
    dateFormat: 'dd MMM yy',
    clearLabel: 'Clear date',
};

export interface DatePickerProps extends Partial<DatePickerLabels> {
    id?: string;
    value?: Date;
    defaultValue?: Date;
    onChange?: (value: Date | undefined) => void;
    minDate?: Date;
    maxDate?: Date;
    disabledDays?: (date: Date) => boolean;
    disabled?: boolean;
    clearable?: boolean;
    invalid?: boolean;
    formatDate?: (value: Date) => string;
    className?: string;
}

const triggerClasses = `h-11 px-4 text-sm font-medium flex w-full cursor-pointer items-center gap-2 text-left transition-all disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 ${fieldSurface} ${focusRing}`;

function boundaries(
    minDate?: Date,
    maxDate?: Date,
    disabledDays?: (date: Date) => boolean,
): Matcher[] {
    const matchers: Matcher[] = [];

    if (minDate) {
        matchers.push({ before: minDate });
    }

    if (maxDate) {
        matchers.push({ after: maxDate });
    }

    if (disabledDays) {
        matchers.push(disabledDays);
    }

    return matchers;
}

export function DatePicker(props: DatePickerProps) {
    const {
        id,
        value,
        defaultValue,
        onChange,
        minDate,
        maxDate,
        disabledDays,
        disabled = false,
        clearable = true,
        invalid = false,
        formatDate,
        placeholder,
        dateFormat,
        clearLabel,
        className,
    } = props;

    const labels = useUiLabels('datePicker', datePickerDefaultLabels, {
        placeholder,
        dateFormat,
        clearLabel,
    });
    const [open, setOpen] = useState(false);
    const [ownValue, setOwnValue] = useState<Date | undefined>(defaultValue);

    const isControlled = 'value' in props;
    const selected = isControlled ? value : ownValue;
    const showClear = clearable && !disabled && selected !== undefined;
    const label = selected
        ? (formatDate?.(selected) ?? format(selected, labels.dateFormat))
        : labels.placeholder;

    function commit(next: Date | undefined): void {
        if (!isControlled) {
            setOwnValue(next);
        }

        onChange?.(next);
    }

    return (
        <div
            data-slot="date-picker"
            className={cn('relative w-full', className)}
        >
            <CalendarPopover
                open={open}
                onOpenChange={setOpen}
                trigger={
                    <button
                        type="button"
                        id={id}
                        data-slot="date-picker-trigger"
                        disabled={disabled}
                        aria-invalid={invalid || undefined}
                        className={cn(triggerClasses, showClear && 'pr-11')}
                    >
                        <CalendarIcon className="size-4 shrink-0 opacity-60" />
                        <span
                            className={cn(
                                'truncate',
                                !selected && 'text-muted-foreground',
                            )}
                        >
                            {label}
                        </span>
                    </button>
                }
            >
                <Calendar
                    mode="single"
                    autoFocus
                    selected={selected}
                    defaultMonth={selected ?? minDate}
                    startMonth={minDate}
                    endMonth={maxDate}
                    disabled={boundaries(minDate, maxDate, disabledDays)}
                    onSelect={(date) => {
                        if (!date) {
                            return;
                        }

                        commit(date);
                        setOpen(false);
                    }}
                    className="rounded-2xl bg-transparent"
                />
            </CalendarPopover>
            {showClear && (
                <button
                    type="button"
                    data-slot="date-picker-clear"
                    aria-label={labels.clearLabel}
                    onClick={() => commit(undefined)}
                    className={`size-7 rounded-xl right-2 absolute top-1/2 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground ${focusRing}`}
                >
                    <X className="size-3.5" />
                </button>
            )}
        </div>
    );
}
