// @vitest-environment jsdom

import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { forgetRecordedVersions } from '@/blocks/tour/recorded-versions';
import { TourProvider, useTourController } from '@/blocks/tour/tour';
import type { TourDefinition, TourProgress } from '@/blocks/tour/types';

const TRANSITION = 500;

const tour = (id: string): TourDefinition => ({
    id,
    version: 1,
    steps: ['a', 'b'].map((name) => ({
        target: `[data-tour="${name}"]`,
        title: `${id} ${name}`,
        description: name,
    })),
});

let start: ReturnType<typeof useTourController>['startTour'] = () => () => {};

function Controller(): null {
    start = useTourController().startTour;

    return null;
}

function mount(): { reports: TourProgress[]; unmount: () => void } {
    ['a', 'b'].forEach((name) => {
        const element = document.createElement('div');
        element.dataset.tour = name;
        document.body.appendChild(element);
    });

    const reports: TourProgress[] = [];

    const { unmount } = render(
        <TourProvider seen={{}} onProgress={(entry) => reports.push(entry)}>
            <Controller />
        </TourProvider>,
    );

    return { reports, unmount };
}

async function run(callback: () => void): Promise<void> {
    await act(async () => {
        callback();
        await vi.advanceTimersByTimeAsync(TRANSITION);
    });
}

async function press(selector: string): Promise<void> {
    await run(() =>
        document.querySelector<HTMLButtonElement>(selector)?.click(),
    );
}

function title(): string | null | undefined {
    return document.querySelector('.driver-popover-title')?.textContent;
}

beforeEach(() => {
    vi.useFakeTimers();
    Element.prototype.scrollIntoView = () => {};
});

afterEach(() => {
    cleanup();
    forgetRecordedVersions();
    vi.useRealTimers();
    document.body.innerHTML = '';
});

describe('a tour the user already finished while the seen prop is stale', () => {
    it('does not start again after it was skipped', async () => {
        const { reports } = mount();

        await run(() => start(tour('roles')));
        await press('.driver-popover-close-btn');
        await run(() => start(tour('roles')));

        expect(title()).toBeUndefined();
        expect(reports).toEqual([
            { tour: 'roles', version: 1, lastStep: 0, outcome: 'skipped' },
        ]);
    });

    it('does not start again after it was completed', async () => {
        const { reports } = mount();

        await run(() => start(tour('roles')));
        await press('.driver-popover-next-btn');
        await press('.driver-popover-next-btn');
        await run(() => start(tour('roles')));

        expect(title()).toBeUndefined();
        expect(reports).toEqual([
            { tour: 'roles', version: 1, lastStep: 1, outcome: 'completed' },
        ]);
    });

    it('does not start again from a provider mounted by the next page', async () => {
        const { unmount } = mount();

        await run(() => start(tour('roles')));
        await press('.driver-popover-close-btn');
        unmount();
        mount();
        await run(() => start(tour('roles')));

        expect(title()).toBeUndefined();
    });

    it('starts again after it was only dismissed', async () => {
        const { reports, unmount } = mount();

        await run(() => start(tour('roles')));
        unmount();
        mount();
        await run(() => start(tour('roles')));

        expect(reports).toEqual([
            { tour: 'roles', version: 1, lastStep: 0, outcome: 'dismissed' },
        ]);
        expect(title()).toBe('roles a');
    });

    it('still starts another tour', async () => {
        mount();

        await run(() => start(tour('roles')));
        await press('.driver-popover-close-btn');
        await run(() => start(tour('users')));

        expect(title()).toBe('users a');
    });

    it('starts again when restarted', async () => {
        mount();

        await run(() => start(tour('roles')));
        await press('.driver-popover-close-btn');
        await run(() => start(tour('roles'), { force: true }));

        expect(title()).toBe('roles a');
    });

    it('starts a newer version of it', async () => {
        mount();

        await run(() => start(tour('roles')));
        await press('.driver-popover-close-btn');
        await run(() => start({ ...tour('roles'), version: 2 }));

        expect(title()).toBe('roles a');
    });
});
