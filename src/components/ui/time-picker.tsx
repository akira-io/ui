import { useOptionalField } from '@/components/ui/field-context';
import {
    Popover,
    PopoverAnchor,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { TimeColumns } from '@/components/ui/time-columns';
import {
    timePickerDefaultLabels,
    type TimePickerLabels,
} from '@/components/ui/time-picker-labels';
import { TimeSegments } from '@/components/ui/time-segments';
import { useControllableValue } from '@/hooks/use-controllable-value';
import { useTimeDraft } from '@/hooks/use-time-draft';
import { fieldSurface, focusRing } from '@/lib/language';
import {
    formatTime,
    parseTime,
    resolveBounds,
    resolveHourCycle,
    type HourCycle,
    type TimeOfDay,
} from '@/lib/time-value';
import { cn } from '@/lib/utils';
import { useUiDateLocale, useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { Clock, X } from 'lucide-react';
import { useRef, useState, type ComponentProps, type FocusEvent } from 'react';

type TimePickerGroupProps = Omit<
    ComponentProps<'div'>,
    'onChange' | 'defaultValue' | 'children' | 'role'
>;

export interface TimePickerProps
    extends Partial<TimePickerLabels>, TimePickerGroupProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string | undefined) => void;
    withSeconds?: boolean;
    hourCycle?: HourCycle;
    minuteStep?: number;
    minTime?: string;
    maxTime?: string;
    clearable?: boolean;
    invalid?: boolean;
    required?: boolean;
    disabled?: boolean;
    name?: string;
}

const fieldClasses = `h-11 ps-4 pe-2 gap-1 flex w-full items-center aria-disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 ${fieldSurface}`;

const iconButton = `size-7 rounded-xl inline-flex shrink-0 cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground disabled:pointer-events-none ${focusRing}`;

export function TimePicker(props: TimePickerProps & SlotNameProps) {
    const {
        value,
        defaultValue,
        onChange,
        withSeconds = false,
        hourCycle,
        minuteStep = 1,
        minTime,
        maxTime,
        clearable = true,
        invalid = false,
        required,
        disabled = false,
        name,
        className,
        'aria-invalid': ariaInvalid,
        'aria-labelledby': labelledBy,
        hourLabel,
        minuteLabel,
        secondLabel,
        periodLabel,
        amLabel,
        pmLabel,
        openLabel,
        clearLabel,
        slotName = 'time-picker',
        ...group
    } = props;

    const labels = useUiLabels('timePicker', timePickerDefaultLabels, {
        hourLabel,
        minuteLabel,
        secondLabel,
        periodLabel,
        amLabel,
        pmLabel,
        openLabel,
        clearLabel,
    });
    const locale = useUiDateLocale();
    const field = useOptionalField();
    const [open, setOpen] = useState(false);
    const [text, setText] = useControllableValue(
        'value' in props,
        value,
        defaultValue,
        onChange,
    );

    const current = parseTime(text);
    const rootRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const interactedOutside = useRef(false);
    const cycle = hourCycle ?? resolveHourCycle(locale?.code);
    const bounds = resolveBounds(minTime, maxTime);
    const showClear = clearable && !disabled && current !== undefined;

    function commit(next: TimeOfDay | undefined): void {
        setText(next ? formatTime(next, withSeconds) : undefined);
    }

    const draft = useTimeDraft({
        value: current,
        hourCycle: cycle,
        withSeconds,
        bounds,
        onCommit: commit,
    });

    function settleOnLeave(event: FocusEvent<HTMLDivElement>): void {
        const next = event.relatedTarget as Node | null;

        if (
            rootRef.current?.contains(next) ||
            contentRef.current?.contains(next)
        ) {
            return;
        }

        draft.settle();
    }

    return (
        <div
            ref={rootRef}
            onBlur={settleOnLeave}
            className={cn('relative w-full', className)}
            data-slot={slotName}
        >
            <Popover
                open={open && !disabled}
                onOpenChange={(next) => setOpen(next && !disabled)}
            >
                <PopoverAnchor asChild>
                    <div
                        {...group}
                        role="group"
                        aria-labelledby={labelledBy ?? field?.labelId}
                        aria-invalid={ariaInvalid ?? (invalid || undefined)}
                        aria-required={required || undefined}
                        aria-disabled={disabled || undefined}
                        data-slot="time-picker-field"
                        className={fieldClasses}
                    >
                        <TimeSegments
                            parts={draft.parts}
                            onApply={draft.applyParts}
                            onHold={draft.holdParts}
                            hourCycle={cycle}
                            withSeconds={withSeconds}
                            minuteStep={minuteStep}
                            labels={labels}
                            disabled={disabled}
                            onOpenRequest={() => setOpen(true)}
                        />
                        {showClear && (
                            <button
                                type="button"
                                data-slot="time-picker-clear"
                                aria-label={labels.clearLabel}
                                onClick={() => commit(undefined)}
                                className={`ms-auto ${iconButton}`}
                            >
                                <X className="size-3.5" />
                            </button>
                        )}
                        <PopoverTrigger asChild>
                            <button
                                type="button"
                                data-slot="time-picker-trigger"
                                aria-label={labels.openLabel}
                                disabled={disabled}
                                className={cn(
                                    iconButton,
                                    !showClear && 'ms-auto',
                                )}
                            >
                                <Clock className="size-4 opacity-60" />
                            </button>
                        </PopoverTrigger>
                    </div>
                </PopoverAnchor>
                <PopoverContent
                    className="p-1 w-auto"
                    align="start"
                    sideOffset={4}
                    collisionPadding={16}
                    ref={contentRef}
                    slotName="time-picker-content"
                    onInteractOutside={() => {
                        interactedOutside.current = true;
                    }}
                    onCloseAutoFocus={(event) => {
                        event.preventDefault();

                        if (!interactedOutside.current) {
                            rootRef.current
                                ?.querySelector<HTMLElement>(
                                    '[role="spinbutton"]',
                                )
                                ?.focus();
                        }

                        interactedOutside.current = false;
                    }}
                >
                    <TimeColumns
                        value={current}
                        onSelect={commit}
                        hourCycle={cycle}
                        withSeconds={withSeconds}
                        minuteStep={minuteStep}
                        bounds={bounds}
                        labels={labels}
                        draft={draft.parts}
                    />
                </PopoverContent>
            </Popover>
            {name !== undefined && (
                <input
                    type="hidden"
                    name={name}
                    value={current ? formatTime(current, withSeconds) : ''}
                />
            )}
        </div>
    );
}
