import { afterEach, describe, expect, it } from 'vitest';

import {
    claimRecordedVersions,
    forgetRecordedVersions,
    recordedVersions,
    rememberProgress,
} from '@/blocks/tour/recorded-versions';

const skipped = (tour: string) => ({
    tour,
    version: 1,
    lastStep: 0,
    outcome: 'skipped' as const,
});

afterEach(() => {
    forgetRecordedVersions();
});

describe('the recorded tour versions', () => {
    it('keeps the versions while the same user claims them', () => {
        claimRecordedVersions(7);
        rememberProgress(skipped('roles'));
        claimRecordedVersions(7);

        expect(recordedVersions()).toEqual({ roles: 1 });
    });

    it('drops the versions when another user claims them', () => {
        claimRecordedVersions(7);
        rememberProgress(skipped('roles'));
        claimRecordedVersions(8);

        expect(recordedVersions()).toEqual({});
    });

    it('drops the versions when the user signs out', () => {
        claimRecordedVersions(7);
        rememberProgress(skipped('roles'));
        claimRecordedVersions(undefined);

        expect(recordedVersions()).toEqual({});
    });
});
