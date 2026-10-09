import type { TimePickerLabels } from '@/components/ui/time-picker-labels';
import { compactRadius, focusRing, menuHighlight } from '@/lib/language';
import { fillParts, type TimeParts } from '@/lib/time-parts';
import {
    clampTime,
    hourOptions,
    padUnit,
    rangeAllowed,
    secondsOf,
    to12h,
    to24h,
    unitOptions,
    type HourCycle,
    type Period,
    type TimeBounds,
    type TimeOfDay,
} from '@/lib/time-value';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import { useEffect, useRef, type KeyboardEvent } from 'react';

export interface TimeColumnsProps {
    value: TimeOfDay | undefined;
    onSelect: (next: TimeOfDay) => void;
    hourCycle: HourCycle;
    withSeconds: boolean;
    minuteStep: number;
    bounds: TimeBounds;
    labels: TimePickerLabels;
    draft?: TimeParts;
    fillHeight?: boolean;
}

interface ColumnOption {
    key: string;
    label: string;
    selected: boolean;
    anchor: boolean;
    disabled: boolean;
    time: TimeOfDay;
}

const PERIODS: Period[] = ['am', 'pm'];

const HALF_DAY_SECONDS = 43_200;

function nearestAtOrBelow(options: number[], target: number): number {
    return options.filter((option) => option <= target).at(-1) ?? options[0];
}

function TimeColumn({
    label,
    options,
    onSelect,
    fillHeight,
}: {
    label: string;
    options: ColumnOption[];
    onSelect: (next: TimeOfDay) => void;
    fillHeight: boolean;
}) {
    const listRef = useRef<HTMLDivElement>(null);
    const focusIndex = Math.max(
        0,
        options.findIndex((option) => option.anchor),
    );

    useEffect(() => {
        listRef.current
            ?.querySelector<HTMLElement>('[data-anchor="true"]')
            ?.scrollIntoView?.({ block: 'center' });
    }, []);

    function moveFocus(event: KeyboardEvent<HTMLDivElement>): void {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
            return;
        }

        event.preventDefault();

        const items = Array.from(
            listRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ??
                [],
        );
        const current = items.indexOf(document.activeElement as HTMLElement);
        const offset = event.key === 'ArrowDown' ? 1 : -1;

        items[
            Math.min(items.length - 1, Math.max(0, current + offset))
        ]?.focus();
    }

    return (
        <div
            ref={listRef}
            role="listbox"
            aria-label={label}
            onKeyDown={moveFocus}
            data-slot="time-picker-column"
            className={cn(
                'gap-0.5 p-1 max-h-56 w-14 rounded-xl flex [scrollbar-width:none] flex-col overflow-y-auto',
                fillHeight && 'sm:h-full sm:max-h-none',
            )}
        >
            {options.map((option, index) => (
                <button
                    key={option.key}
                    type="button"
                    role="option"
                    aria-selected={option.selected}
                    aria-disabled={option.disabled || undefined}
                    tabIndex={index === focusIndex ? 0 : -1}
                    data-slot="time-picker-option"
                    data-anchor={option.anchor || undefined}
                    onClick={() => {
                        if (!option.disabled) {
                            onSelect(option.time);
                        }
                    }}
                    className={cn(
                        `h-8 text-sm shrink-0 cursor-pointer tabular-nums ${compactRadius} ${menuHighlight} ${focusRing}`,
                        option.selected &&
                            'bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                        option.disabled && 'cursor-not-allowed opacity-40',
                    )}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

export function TimeColumns({
    value,
    onSelect,
    hourCycle,
    withSeconds,
    minuteStep,
    bounds,
    labels,
    draft = {},
    fillHeight = false,
    slotName = 'time-picker-columns',
}: TimeColumnsProps & SlotNameProps) {
    const base = value ?? clampTime(fillParts(draft, hourCycle), bounds);
    const period = to12h(base.hour).period;

    function columnOption(
        key: string,
        label: string,
        selected: boolean,
        anchor: boolean,
        span: [number, number],
        time: TimeOfDay,
    ): ColumnOption {
        return {
            key,
            label,
            selected: value !== undefined && selected,
            anchor,
            disabled: !rangeAllowed(span[0], span[1], bounds),
            time: clampTime(time, bounds),
        };
    }

    const hours = hourOptions(hourCycle).map((shown) => {
        const hour = hourCycle === 12 ? to24h(shown, period) : shown;

        return columnOption(
            `h${shown}`,
            padUnit(shown),
            value?.hour === hour,
            base.hour === hour,
            [hour * 3600, hour * 3600 + 3599],
            { ...base, hour },
        );
    });

    const minuteOptions = unitOptions(minuteStep);
    const minuteAnchor = nearestAtOrBelow(minuteOptions, base.minute);

    const minutes = minuteOptions.map((minute) => {
        const start = secondsOf({ ...base, minute, second: 0 });

        return columnOption(
            `m${minute}`,
            padUnit(minute),
            value?.minute === minute,
            minute === minuteAnchor,
            [start, start + 59],
            { ...base, minute },
        );
    });

    const seconds = unitOptions(1).map((second) => {
        const start = secondsOf({ ...base, second });

        return columnOption(
            `s${second}`,
            padUnit(second),
            value?.second === second,
            base.second === second,
            [start, start],
            { ...base, second },
        );
    });

    const periods = PERIODS.map((half) => {
        const start = half === 'am' ? 0 : HALF_DAY_SECONDS;

        return columnOption(
            half,
            half === 'am' ? labels.amLabel : labels.pmLabel,
            period === half,
            period === half,
            [start, start + HALF_DAY_SECONDS - 1],
            { ...base, hour: to24h(to12h(base.hour).hour, half) },
        );
    });

    const columnCount = 2 + Number(withSeconds) + Number(hourCycle === 12);
    const columnsWidth = `calc(${columnCount} * 3.5rem + ${columnCount - 1} * 0.25rem)`;

    return (
        <div
            data-slot={slotName}
            className={cn('gap-1 flex', fillHeight && 'sm:relative')}
            style={fillHeight ? { minWidth: columnsWidth } : undefined}
        >
            <div
                className={cn(
                    'gap-1 flex',
                    fillHeight && 'sm:absolute sm:inset-0',
                )}
            >
                <TimeColumn
                    label={labels.hourLabel}
                    options={hours}
                    onSelect={onSelect}
                    fillHeight={fillHeight}
                />
                <TimeColumn
                    label={labels.minuteLabel}
                    options={minutes}
                    onSelect={onSelect}
                    fillHeight={fillHeight}
                />
                {withSeconds && (
                    <TimeColumn
                        label={labels.secondLabel}
                        options={seconds}
                        onSelect={onSelect}
                        fillHeight={fillHeight}
                    />
                )}
                {hourCycle === 12 && (
                    <TimeColumn
                        label={labels.periodLabel}
                        options={periods}
                        onSelect={onSelect}
                        fillHeight={fillHeight}
                    />
                )}
            </div>
        </div>
    );
}
