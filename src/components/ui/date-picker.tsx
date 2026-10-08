import { Calendar } from '@/components/ui/calendar';
import { CalendarPopover } from '@/components/ui/calendar-popover';
import {
    PickerClearButton,
    pickerTriggerClasses,
} from '@/components/ui/picker-trigger';
import { useControllableValue } from '@/hooks/use-controllable-value';
import { dayBoundaries } from '@/lib/day-boundaries';
import { cn } from '@/lib/utils';
import { useUiDateLocale, useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState, type ComponentProps } from 'react';

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

type DatePickerTriggerProps = Omit<
    ComponentProps<'button'>,
    'value' | 'defaultValue' | 'onChange' | 'type' | 'children'
>;

export interface DatePickerProps
    extends Partial<DatePickerLabels>, DatePickerTriggerProps {
    value?: Date;
    defaultValue?: Date;
    onChange?: (value: Date | undefined) => void;
    minDate?: Date;
    maxDate?: Date;
    disabledDays?: (date: Date) => boolean;
    clearable?: boolean;
    invalid?: boolean;
    required?: boolean;
    formatDate?: (value: Date) => string;
}

export function DatePicker(props: DatePickerProps & SlotNameProps) {
    const {
        value,
        defaultValue,
        onChange,
        minDate,
        maxDate,
        disabledDays,
        disabled = false,
        clearable = true,
        invalid = false,
        required,
        formatDate,
        placeholder,
        dateFormat,
        clearLabel,
        className,
        'aria-invalid': ariaInvalid,
        slotName = 'date-picker',
        ...trigger
    } = props;

    const labels = useUiLabels('datePicker', datePickerDefaultLabels, {
        placeholder,
        dateFormat,
        clearLabel,
    });
    const locale = useUiDateLocale();
    const [open, setOpen] = useState(false);
    const [selected, commit] = useControllableValue(
        'value' in props,
        value,
        defaultValue,
        onChange,
    );
    const showClear = clearable && !disabled && selected !== undefined;
    const label = selected
        ? (formatDate?.(selected) ??
          format(selected, labels.dateFormat, { locale }))
        : labels.placeholder;

    return (
        <div className={cn('relative w-full', className)} data-slot={slotName}>
            <CalendarPopover
                open={open}
                onOpenChange={setOpen}
                trigger={
                    <button
                        {...trigger}
                        type="button"
                        data-slot="date-picker-trigger"
                        disabled={disabled}
                        aria-required={required || undefined}
                        aria-invalid={ariaInvalid ?? (invalid || undefined)}
                        className={cn(
                            pickerTriggerClasses,
                            showClear && 'pr-11',
                        )}
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
                    disabled={dayBoundaries(minDate, maxDate, disabledDays)}
                    onSelect={(date) => {
                        if (!date) {
                            return;
                        }

                        commit(date);
                        setOpen(false);
                    }}
                />
            </CalendarPopover>
            {showClear && (
                <PickerClearButton
                    label={labels.clearLabel}
                    onClear={() => commit(undefined)}
                    slotName="date-picker-clear"
                />
            )}
        </div>
    );
}
