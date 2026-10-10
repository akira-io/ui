import { afterEach, describe, expect, it } from 'vitest';

import {
    forgetRecordedVersions,
    rememberProgress,
    seenWithRecorded,
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
    it('adds the recorded versions to the seen of the same user', () => {
        rememberProgress(skipped('roles'), 7);

        expect(seenWithRecorded({ seen: { users: 2 }, owner: 7 })).toEqual({
            users: 2,
            roles: 1,
        });
    });

    it('leaves the seen of another user untouched', () => {
        rememberProgress(skipped('roles'), 7);

        expect(seenWithRecorded({ seen: {}, owner: 8 })).toEqual({});
    });

    it('leaves the seen of a signed out visitor untouched', () => {
        rememberProgress(skipped('roles'), 7);

        expect(seenWithRecorded({ seen: {}, owner: null })).toEqual({});
    });

    it('adds the recorded versions when the page does not say who is signed in', () => {
        rememberProgress(skipped('roles'), 7);

        expect(seenWithRecorded({ seen: {} })).toEqual({ roles: 1 });
    });

    it('drops the versions of the previous user once another one records', () => {
        rememberProgress(skipped('roles'), 7);
        rememberProgress(skipped('users'), 8);

        expect(seenWithRecorded({ seen: {}, owner: 8 })).toEqual({ users: 1 });
    });

    it('keeps a version recorded without an owner from the user who signs in next', () => {
        rememberProgress(skipped('roles'));

        expect(seenWithRecorded({ seen: {}, owner: 7 })).toEqual({});
    });
});
