// @vitest-environment jsdom

import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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

function title(): string | null | undefined {
    return document.querySelector('.driver-popover-title')?.textContent;
}

beforeEach(() => {
    vi.useFakeTimers();
    Element.prototype.scrollIntoView = () => {};
});

afterEach(() => {
    cleanup();
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
        document.body.querySelectorAll('[data-tour]').forEach((element) => {
            element.remove();
        });

        await act(async () => {
            start(tour('first'));
        });
        await run(() => start(tour('second')));

        expect(reports).toEqual([]);
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
