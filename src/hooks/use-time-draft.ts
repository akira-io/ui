import {
    isEmptyParts,
    partsOf,
    timeOf,
    type TimeParts,
} from '@/lib/time-parts';
import {
    clampTime,
    isWithin,
    sameTime,
    type HourCycle,
    type TimeBounds,
    type TimeOfDay,
} from '@/lib/time-value';
import { useState } from 'react';

export interface TimeDraftOptions {
    value: TimeOfDay | undefined;
    hourCycle: HourCycle;
    withSeconds: boolean;
    bounds: TimeBounds;
    onCommit: (next: TimeOfDay | undefined) => void;
}

export interface TimeDraft {
    parts: TimeParts;
    applyParts: (next: TimeParts) => void;
    holdParts: (next: TimeParts) => void;
    settle: () => void;
}

export function useTimeDraft({
    value,
    hourCycle,
    withSeconds,
    bounds,
    onCommit,
}: TimeDraftOptions): TimeDraft {
    const [parts, setParts] = useState<TimeParts>(() =>
        partsOf(value, hourCycle),
    );
    const [synced, setSynced] = useState({ value, hourCycle });

    if (!sameTime(synced.value, value) || synced.hourCycle !== hourCycle) {
        setSynced({ value, hourCycle });
        setParts(partsOf(value, hourCycle));
    }

    const unitKinds: (keyof TimeParts)[] = withSeconds
        ? ['hour', 'minute', 'second']
        : ['hour', 'minute'];

    function commitParts(next: TimeParts): void {
        const time = timeOf(next, hourCycle, withSeconds);

        if (time) {
            if (isWithin(time, bounds) && !sameTime(time, value)) {
                onCommit(time);
            }

            return;
        }

        if (isEmptyParts(next, unitKinds) && value !== undefined) {
            onCommit(undefined);
        }
    }

    function applyParts(next: TimeParts): void {
        setParts(next);
        commitParts(next);
    }

    function settle(): void {
        const time = timeOf(parts, hourCycle, withSeconds);

        if (!time) {
            setParts(partsOf(value, hourCycle));

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

    return { parts, applyParts, holdParts: setParts, settle };
}
