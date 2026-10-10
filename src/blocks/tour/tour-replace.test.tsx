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

const ghost: TourDefinition = {
    id: 'ghost',
    version: 1,
    steps: [
        { target: '[data-tour="ghost"]', title: 'ghost', description: 'ghost' },
    ],
};

function removeTargets(): Element[] {
    const targets = [...document.body.querySelectorAll('[data-tour]')];
    targets.forEach((element) => element.remove());

    return targets;
}

async function elapse(ms: number): Promise<void> {
    await act(async () => {
        await vi.advanceTimersByTimeAsync(ms);
    });
}

function closeTour(): void {
    document
        .querySelector<HTMLButtonElement>('.driver-popover-close-btn')
        ?.click();
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

describe('a tour replaced while it runs', () => {
    it('records the running tour before another one starts', async () => {
        const { reports } = mount();

        await run(() => start(tour('first')));
        await run(() => start(tour('second')));

        expect(title()).toBe('second a');
        expect(reports).toEqual([
            { tour: 'first', version: 1, lastStep: 0, outcome: 'skipped' },
        ]);
    });

    it('records the running tour before a forced restart of the same tour', async () => {
        const { reports } = mount();

        await run(() => start(tour('first')));
        await run(() => start(tour('first'), { force: true }));

        expect(title()).toBe('first a');
        expect(reports).toEqual([
            { tour: 'first', version: 1, lastStep: 0, outcome: 'skipped' },
        ]);
    });

    it('drops a waiting tour without recording it when another one starts', async () => {
        const { reports } = mount();
        const targets = removeTargets();

        await run(() => start(tour('first')));
        await run(() => start(tour('second')));
        await run(() =>
            targets.forEach((element) => document.body.appendChild(element)),
        );

        expect(title()).toBe('second a');
        expect(reports).toEqual([]);
    });

    it('keeps waiting instead of starting over when the same tour is asked again', async () => {
        mount();
        const targets = removeTargets();
        document.body.appendChild(targets[0]);

        await run(() => start(tour('first')));
        await elapse(3000);
        await run(() => start(tour('first')));
        await elapse(1000);

        expect(title()).toBe('first a');
    });

    it('keeps the running tour when the one replacing it has nothing to show', async () => {
        const { reports } = mount();

        await run(() => start(tour('first')));
        await run(() => start(ghost));
        await elapse(4000);

        expect(title()).toBe('first a');
        expect(reports).toEqual([]);
    });

    it('drops a forced restart the user closed the tour during', async () => {
        const { reports } = mount();

        await run(() => start(tour('first')));
        document.querySelector('[data-tour="b"]')?.remove();
        await run(() => start(tour('first'), { force: true }));
        await run(() => closeTour());
        await elapse(4000);

        expect(title()).toBeUndefined();
        expect(reports).toEqual([
            { tour: 'first', version: 1, lastStep: 0, outcome: 'completed' },
        ]);
    });

    it('records a finished tour once when the next one starts', async () => {
        const { reports } = mount();

        await run(() => start(tour('first')));
        await run(() =>
            document
                .querySelector<HTMLButtonElement>('.driver-popover-close-btn')
                ?.click(),
        );
        await run(() => start(tour('second')));

        expect(reports).toEqual([
            { tour: 'first', version: 1, lastStep: 0, outcome: 'skipped' },
        ]);
    });

    it('records each tour once across a replacement and an unmount', async () => {
        const { reports, unmount } = mount();

        await run(() => start(tour('first')));
        await run(() => start(tour('second')));
        unmount();

        expect(reports).toEqual([
            { tour: 'first', version: 1, lastStep: 0, outcome: 'skipped' },
            { tour: 'second', version: 1, lastStep: 0, outcome: 'dismissed' },
        ]);
    });

    it('lets onProgress start the next tour without leaving one behind', async () => {
        const reports: TourProgress[] = [];
        ['a', 'b'].forEach((name) => {
            const element = document.createElement('div');
            element.dataset.tour = name;
            document.body.appendChild(element);
        });

        render(
            <TourProvider
                seen={{}}
                onProgress={(entry) => {
                    reports.push(entry);
                    if (entry.tour === 'first') {
                        start(tour('chained'));
                    }
                }}
            >
                <Controller />
            </TourProvider>,
        );

        await run(() => start(tour('first')));
        await run(() => start(tour('second')));

        expect(document.querySelectorAll('.driver-popover')).toHaveLength(1);
        expect(title()).toBe('chained a');
    });
});
