import type { TimePickerLabels } from '@/components/ui/time-picker-labels';
import { padUnit, type HourCycle, type TimeParts } from '@/lib/time-value';

export type SegmentKind = keyof TimeParts;

export function segmentRange(
    kind: SegmentKind,
    hourCycle: HourCycle,
): [number, number] {
    if (kind === 'period') {
        return [0, 1];
    }

    if (kind !== 'hour') {
        return [0, 59];
    }

    return hourCycle === 12 ? [1, 12] : [0, 23];
}

export function segmentText(
    kind: SegmentKind,
    parts: TimeParts,
    labels: TimePickerLabels,
): string | undefined {
    if (kind === 'period') {
        if (!parts.period) {
            return undefined;
        }

        return parts.period === 'am' ? labels.amLabel : labels.pmLabel;
    }

    const part = parts[kind];

    return part === undefined ? undefined : padUnit(part);
}

export function segmentNumber(
    kind: SegmentKind,
    parts: TimeParts,
): number | undefined {
    if (kind === 'period') {
        return parts.period === undefined
            ? undefined
            : Number(parts.period === 'pm');
    }

    return parts[kind];
}
