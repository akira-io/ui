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
    type TimeBounds,
    type TimeOfDay,
} from '@/lib/time-value';
import { cn } from '@/lib/utils';
import { useUiDateLocale, useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import {
    addMinutes,
    min as earliest,
    format,
    isSameDay,
    max as latest,
    setSeconds,
    startOfDay,
} from 'date-fns';
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

function todayWithin(
    minDate?: Date,
    maxDate?: Date,
    disabledDays?: (date: Date) => boolean,
): Date | undefined {
    const day = clampDate(
        startOfDay(new Date()),
        minDate && startOfDay(minDate),
        maxDate && startOfDay(maxDate),
    );

    return disabledDays?.(day) ? undefined : day;
}

function clampDate(date: Date, minDate?: Date, maxDate?: Date): Date {
    const raised = minDate ? latest([date, minDate]) : date;

    return maxDate ? earliest([raised, maxDate]) : raised;
}

function boundsOnDay(
    day: Date | undefined,
    minDate?: Date,
    maxDate?: Date,
): TimeBounds {
    if (!day) {
        return {};
    }

    return {
        min:
            minDate && isSameDay(day, minDate)
                ? timeOfDate(minDate)
                : undefined,
        max:
            maxDate && isSameDay(day, maxDate)
                ? timeOfDate(maxDate)
                : undefined,
    };
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

    const candidateDay =
        selected ?? todayWithin(minDate, maxDate, disabledDays);

    function commitWithin(day: Date, time: TimeOfDay): void {
        const clamped = clampDate(withTime(day, time), minDate, maxDate);

        if (withSeconds) {
            commit(clamped);

            return;
        }

        const whole = setSeconds(clamped, 0);

        commit(minDate && whole < minDate ? addMinutes(whole, 1) : whole);
    }

    function pickTime(time: TimeOfDay): void {
        if (!candidateDay) {
            return;
        }

        commitWithin(candidateDay, time);
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

                            commitWithin(
                                date,
                                selected ? timeOfDate(selected) : MIDNIGHT,
                            );
                        }}
                    />
                    <TimeColumns
                        value={selected ? timeOfDate(selected) : undefined}
                        onSelect={pickTime}
                        hourCycle={cycle}
                        withSeconds={withSeconds}
                        minuteStep={minuteStep}
                        bounds={boundsOnDay(candidateDay, minDate, maxDate)}
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
