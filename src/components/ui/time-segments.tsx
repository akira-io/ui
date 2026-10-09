import type { TimePickerLabels } from '@/components/ui/time-picker-labels';
import {
    segmentNumber,
    segmentRange,
    segmentText,
    type SegmentKind,
} from '@/components/ui/time-segment-display';
import { menuHighlight } from '@/lib/language';
import { typeDigit, type TimeParts } from '@/lib/time-parts';
import {
    cycleOption,
    hourOptions,
    unitOptions,
    type HourCycle,
} from '@/lib/time-value';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import { Fragment, useRef, type KeyboardEvent } from 'react';

export interface TimeSegmentsProps {
    parts: TimeParts;
    onApply: (next: TimeParts) => void;
    onHold: (next: TimeParts) => void;
    hourCycle: HourCycle;
    withSeconds: boolean;
    minuteStep: number;
    labels: TimePickerLabels;
    disabled: boolean;
    onOpenRequest: () => void;
}

export function TimeSegments({
    parts,
    onApply,
    onHold,
    hourCycle,
    withSeconds,
    minuteStep,
    labels,
    disabled,
    onOpenRequest,
    slotName = 'time-picker-segments',
}: TimeSegmentsProps & SlotNameProps) {
    const digitBuffer = useRef('');
    const segmentRefs = useRef<(HTMLElement | null)[]>([]);

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
            onApply(steppedParts(kind, key === 'ArrowUp' ? 1 : -1));

            return;
        }

        if (key === 'Backspace' || key === 'Delete') {
            event.preventDefault();
            digitBuffer.current = '';
            onApply({ ...parts, [kind]: undefined });

            return;
        }

        if (kind === 'period') {
            const letter = key.toLowerCase();

            if (letter === 'a' || letter === 'p') {
                event.preventDefault();
                onApply({ ...parts, period: letter === 'a' ? 'am' : 'pm' });
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
        (typed.buffer === '' ? onApply : onHold)(next);

        if (typed.advance) {
            focusSegment(index + 1);
        }
    }

    return (
        <div
            data-slot={slotName}
            className="gap-0.5 flex items-center tabular-nums"
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
