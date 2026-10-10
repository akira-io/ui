import { recordVersion } from '@/blocks/tour/gate';
import type { TourProgress } from '@/blocks/tour/types';

let recorded: Record<string, number> = {};

export function recordedVersions(): Record<string, number> {
    return recorded;
}

export function rememberProgress(progress: TourProgress): void {
    recorded = recordVersion(recorded, progress);
}

export function forgetRecordedVersions(): void {
    recorded = {};
}
