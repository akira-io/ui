import type { TimePickerLabels } from '@/components/ui/time-picker-labels';
import {
    segmentNumber,
    segmentRange,
    segmentText,
    type SegmentKind,
} from '@/components/ui/time-segment-display';
import { menuHighlight } from '@/lib/language';
import {
    clampTime,
    cycleOption,
    hourOptions,
    isEmptyParts,
    isWithin,
    partsOf,
    sameTime,
    timeOf,
    typeDigit,
    unitOptions,
    type HourCycle,
    type TimeBounds,
    type TimeOfDay,
    type TimeParts,
} from '@/lib/time-value';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import {
    Fragment,
    useRef,
    useState,
    type FocusEvent,
    type KeyboardEvent,
} from 'react';

export interface TimeSegmentsProps {
    value: TimeOfDay | undefined;
    onCommit: (next: TimeOfDay | undefined) => void;
    hourCycle: HourCycle;
    withSeconds: boolean;
    minuteStep: number;
    bounds: TimeBounds;
    labels: TimePickerLabels;
    disabled: boolean;
    onOpenRequest: () => void;
}

export function TimeSegments({
    value,
    onCommit,
    hourCycle,
    withSeconds,
    minuteStep,
    bounds,
    labels,
    disabled,
    onOpenRequest,
    slotName = 'time-picker-segments',
}: TimeSegmentsProps & SlotNameProps) {
    const [parts, setParts] = useState<TimeParts>(() =>
        partsOf(value, hourCycle),
    );
    const [synced, setSynced] = useState({ value, hourCycle });
    const digitBuffer = useRef('');
    const segmentRefs = useRef<(HTMLElement | null)[]>([]);

    if (!sameTime(synced.value, value) || synced.hourCycle !== hourCycle) {
        setSynced({ value, hourCycle });
        setParts(partsOf(value, hourCycle));
    }

    const kinds: SegmentKind[] = [
        'hour',
        'minute',
        ...(withSeconds ? (['second'] as const) : []),
        ...(hourCycle === 12 ? (['period'] as const) : []),
    ];

    const names: Record<SegmentKind, string> = {
        hour: labels.hourLabel,
        minute: labels.minuteLabel,
        second: labels.secondLabel,
        period: labels.periodLabel,
    };

    function commitParts(next: TimeParts): void {
        const time = timeOf(next, hourCycle, withSeconds);

        if (time) {
            if (isWithin(time, bounds) && !sameTime(time, value)) {
                onCommit(time);
            }

            return;
        }

        if (isEmptyParts(next, kinds) && value !== undefined) {
            onCommit(undefined);
        }
    }

    function applyParts(next: TimeParts): void {
        setParts(next);
        commitParts(next);
    }

    function focusSegment(index: number): void {
        segmentRefs.current[
            Math.min(kinds.length - 1, Math.max(0, index))
        ]?.focus();
    }

    function steppedParts(kind: SegmentKind, direction: 1 | -1): TimeParts {
        if (kind === 'period') {
            return { ...parts, period: parts.period === 'am' ? 'pm' : 'am' };
        }

        const options =
            kind === 'hour'
                ? hourOptions(hourCycle)
                : unitOptions(kind === 'minute' ? minuteStep : 1);

        return {
            ...parts,
            [kind]: cycleOption(options, parts[kind], direction),
        };
    }

    function handleKeyDown(
        kind: SegmentKind,
        index: number,
        event: KeyboardEvent<HTMLElement>,
    ): void {
        if (disabled) {
            return;
        }

        const { key } = event;

        if (event.altKey && key === 'ArrowDown') {
            event.preventDefault();
            onOpenRequest();

            return;
        }

        if (key === 'ArrowLeft' || key === 'ArrowRight') {
            event.preventDefault();
            digitBuffer.current = '';
            focusSegment(index + (key === 'ArrowRight' ? 1 : -1));

            return;
        }

        if (key === 'ArrowUp' || key === 'ArrowDown') {
            event.preventDefault();
            digitBuffer.current = '';
            applyParts(steppedParts(kind, key === 'ArrowUp' ? 1 : -1));

            return;
        }

        if (key === 'Backspace' || key === 'Delete') {
            event.preventDefault();
            digitBuffer.current = '';
            applyParts({ ...parts, [kind]: undefined });

            return;
        }

        if (kind === 'period') {
            const letter = key.toLowerCase();

            if (letter === 'a' || letter === 'p') {
                event.preventDefault();
                applyParts({ ...parts, period: letter === 'a' ? 'am' : 'pm' });
            }

            return;
        }

        if (!/^\d$/.test(key)) {
            return;
        }

        event.preventDefault();

        const typed = typeDigit(
            kind,
            hourCycle,
            digitBuffer.current,
            Number(key),
        );

        const next = { ...parts, [kind]: typed.value };

        digitBuffer.current = typed.buffer;
        setParts(next);

        if (typed.buffer === '') {
            commitParts(next);
        }

        if (typed.advance) {
            focusSegment(index + 1);
        }
    }

    function handleBlur(event: FocusEvent<HTMLDivElement>): void {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
            return;
        }

        digitBuffer.current = '';

        const time = timeOf(parts, hourCycle, withSeconds);

        if (!time) {
            return;
        }

        if (isWithin(time, bounds)) {
            commitParts(parts);

            return;
        }

        const clamped = clampTime(time, bounds);

        setParts(partsOf(clamped, hourCycle));
        onCommit(clamped);
    }

    return (
        <div
            data-slot={slotName}
            className="gap-0.5 flex items-center tabular-nums"
            onBlur={handleBlur}
        >
            {kinds.map((kind, index) => {
                const text = segmentText(kind, parts, labels);
                const [min, max] = segmentRange(kind, hourCycle);

                return (
                    <Fragment key={kind}>
                        {index > 0 && kind !== 'period' && (
                            <span
                                aria-hidden="true"
                                className="text-muted-foreground"
                            >
                                :
                            </span>
                        )}
                        <span
                            ref={(element) => {
                                segmentRefs.current[index] = element;
                            }}
                            role="spinbutton"
                            tabIndex={disabled ? -1 : 0}
                            aria-label={names[kind]}
                            aria-disabled={disabled || undefined}
                            aria-valuemin={min}
                            aria-valuemax={max}
                            aria-valuenow={segmentNumber(kind, parts)}
                            aria-valuetext={text}
                            data-slot="time-picker-segment"
                            data-segment={kind}
                            onKeyDown={(event) =>
                                handleKeyDown(kind, index, event)
                            }
                            onFocus={() => {
                                digitBuffer.current = '';
                            }}
                            className={cn(
                                `px-0.5 rounded-md ${menuHighlight}`,
                                text === undefined && 'text-muted-foreground',
                                kind === 'period' && 'ms-1',
                            )}
                        >
                            {text ?? '--'}
                        </span>
                    </Fragment>
                );
            })}
        </div>
    );
}
