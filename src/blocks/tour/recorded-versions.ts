import { recordVersion } from '@/blocks/tour/gate';
import type { TourProgress } from '@/blocks/tour/types';

let recorded: Record<string, number> = {};
let owner: unknown;

export function recordedVersions(): Record<string, number> {
    return recorded;
}

export function rememberProgress(progress: TourProgress): void {
    recorded = recordVersion(recorded, progress);
}

export function claimRecordedVersions(nextOwner: unknown): void {
    if (nextOwner === owner) {
        return;
    }

    owner = nextOwner;
    recorded = {};
}

export function forgetRecordedVersions(): void {
    owner = undefined;
    recorded = {};
}
