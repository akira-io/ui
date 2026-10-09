import { Calendar } from '@/components/ui/calendar';
import { CalendarPopover } from '@/components/ui/calendar-popover';
import {
    PickerClearButton,
    pickerTriggerClasses,
} from '@/components/ui/picker-trigger';
import { TimeColumns } from '@/components/ui/time-columns';
import {
    dateTimePickerDefaultLabels,
    timePickerDefaultLabels,
    type DateTimePickerLabels,
} from '@/components/ui/time-picker-labels';
import { useControllableValue } from '@/hooks/use-controllable-value';
import { dayBoundaries } from '@/lib/day-boundaries';
import {
    MIDNIGHT,
    resolveHourCycle,
    timeOfDate,
    withTime,
    type HourCycle,
    type TimeOfDay,
} from '@/lib/time-value';
import { cn } from '@/lib/utils';
import { useUiDateLocale, useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { min as earliest, format, max as latest, startOfDay } from 'date-fns';
import { CalendarClock } from 'lucide-react';
import { useState, type ComponentProps } from 'react';

type DateTimePickerTriggerProps = Omit<
    ComponentProps<'button'>,
    'value' | 'defaultValue' | 'onChange' | 'type' | 'children'
>;

export interface DateTimePickerProps
    extends Partial<DateTimePickerLabels>, DateTimePickerTriggerProps {
    value?: Date;
    defaultValue?: Date;
    onChange?: (value: Date | undefined) => void;
    minDate?: Date;
    maxDate?: Date;
    disabledDays?: (date: Date) => boolean;
    withSeconds?: boolean;
    hourCycle?: HourCycle;
    minuteStep?: number;
    clearable?: boolean;
    invalid?: boolean;
    required?: boolean;
    name?: string;
    formatDateTime?: (value: Date) => string;
}

function timePattern(cycle: HourCycle, withSeconds: boolean): string {
    const seconds = withSeconds ? ':ss' : '';

    return cycle === 12 ? `h:mm${seconds} a` : `HH:mm${seconds}`;
}

function todayWithin(minDate?: Date, maxDate?: Date): Date {
    const today = startOfDay(new Date());
    const raised = minDate ? latest([today, startOfDay(minDate)]) : today;

    return maxDate ? earliest([raised, startOfDay(maxDate)]) : raised;
}

export function DateTimePicker(props: DateTimePickerProps & SlotNameProps) {
    const {
        value,
        defaultValue,
        onChange,
        minDate,
        maxDate,
        disabledDays,
        withSeconds = false,
        hourCycle,
        minuteStep = 1,
        disabled = false,
        clearable = true,
        invalid = false,
        required,
        name,
        formatDateTime,
        placeholder,
        dateFormat,
        clearLabel,
        className,
        'aria-invalid': ariaInvalid,
        slotName = 'date-time-picker',
        ...trigger
    } = props;

    const labels = useUiLabels('dateTimePicker', dateTimePickerDefaultLabels, {
        placeholder,
        dateFormat,
        clearLabel,
    });
    const timeLabels = useUiLabels('timePicker', timePickerDefaultLabels);
    const locale = useUiDateLocale();
    const [open, setOpen] = useState(false);
    const [selected, commit] = useControllableValue(
        'value' in props,
        value,
        defaultValue,
        onChange,
    );
    const cycle = hourCycle ?? resolveHourCycle(locale?.code);
    const showClear = clearable && !disabled && selected !== undefined;
    const label = selected
        ? (formatDateTime?.(selected) ??
          format(
              selected,
              `${labels.dateFormat} ${timePattern(cycle, withSeconds)}`,
              { locale },
          ))
        : labels.placeholder;

    function pickTime(time: TimeOfDay): void {
        commit(withTime(selected ?? todayWithin(minDate, maxDate), time));
    }

    return (
        <div className={cn('relative w-full', className)} data-slot={slotName}>
            <CalendarPopover
                open={open}
                onOpenChange={setOpen}
                slotName="date-time-picker-content"
                trigger={
                    <button
                        {...trigger}
                        type="button"
                        data-slot="date-time-picker-trigger"
                        disabled={disabled}
                        aria-required={required || undefined}
                        aria-invalid={ariaInvalid ?? (invalid || undefined)}
                        className={cn(
                            pickerTriggerClasses,
                            showClear && 'pr-11',
                        )}
                    >
                        <CalendarClock className="size-4 shrink-0 opacity-60" />
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
                <div className="gap-2 sm:flex-row flex flex-col">
                    <Calendar
                        mode="single"
                        autoFocus
                        selected={selected}
                        defaultMonth={selected ?? minDate}
                        startMonth={minDate}
                        endMonth={maxDate}
                        disabled={dayBoundaries(minDate, maxDate, disabledDays)}
                        onSelect={(date) => {
                            if (!date) {
                                return;
                            }

                            commit(
                                withTime(
                                    date,
                                    selected ? timeOfDate(selected) : MIDNIGHT,
                                ),
                            );
                        }}
                    />
                    <TimeColumns
                        value={selected ? timeOfDate(selected) : undefined}
                        onSelect={pickTime}
                        hourCycle={cycle}
                        withSeconds={withSeconds}
                        minuteStep={minuteStep}
                        bounds={{}}
                        labels={timeLabels}
                        fillHeight
                    />
                </div>
            </CalendarPopover>
            {showClear && (
                <PickerClearButton
                    label={labels.clearLabel}
                    onClear={() => commit(undefined)}
                    slotName="date-time-picker-clear"
                />
            )}
            {name !== undefined && (
                <input
                    type="hidden"
                    name={name}
                    value={
                        selected
                            ? format(
                                  selected,
                                  withSeconds
                                      ? "yyyy-MM-dd'T'HH:mm:ss"
                                      : "yyyy-MM-dd'T'HH:mm",
                              )
                            : ''
                    }
                />
            )}
        </div>
    );
}
