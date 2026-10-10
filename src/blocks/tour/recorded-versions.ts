import { mergeSeen, recordVersion } from '@/blocks/tour/gate';
import type { TourProgress } from '@/blocks/tour/types';

export type TourOwner = string | number | null;

let recorded: Record<string, number> = {};
let recordedOwner: TourOwner | undefined;

function belongsTo(owner: TourOwner | undefined): boolean {
    return (
        owner === undefined ||
        recordedOwner === undefined ||
        owner === recordedOwner
    );
}

export function seenWithRecorded(input: {
    seen: Record<string, number>;
    owner?: TourOwner;
}): Record<string, number> {
    return belongsTo(input.owner)
        ? mergeSeen(input.seen, recorded)
        : input.seen;
}

export function rememberProgress(
    progress: TourProgress,
    owner?: TourOwner,
): void {
    if (!belongsTo(owner)) {
        recorded = {};
    }

    if (owner !== undefined) {
        recordedOwner = owner;
    }

    recorded = recordVersion(recorded, progress);
}

export function forgetRecordedVersions(): void {
    recordedOwner = undefined;
    recorded = {};
}
