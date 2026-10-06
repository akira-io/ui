// @vitest-environment jsdom

import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { TourProvider, useTour } from '@/blocks/tour/tour';
import type {
    TourDefinition,
    TourProgress,
    TourStep,
} from '@/blocks/tour/types';

const TRANSITION = 500;

const LATER_TARGET_WAIT = 1500;

const step = (name: string): TourStep => ({
    target: `[data-tour="${name}"]`,
    title: name,
    description: name,
});

const tour = (id: string, names: string[]): TourDefinition => ({
    id,
    version: 1,
    steps: names.map(step),
});

function addTarget(name: string): void {
    const element = document.createElement('div');
    element.dataset.tour = name;
    document.body.appendChild(element);
}

function TourStarter({ definition }: { definition: TourDefinition }): null {
    useTour(definition);

    return null;
}

function mount(
    definition: TourDefinition,
    present: string[],
): { reports: TourProgress[]; unmount: () => void } {
    present.forEach(addTarget);

    const reports: TourProgress[] = [];

    const { unmount } = render(
        <TourProvider seen={{}} onProgress={(entry) => reports.push(entry)}>
            <TourStarter definition={definition} />
        </TourProvider>,
    );

    return { reports, unmount };
}

async function elapse(ms: number): Promise<void> {
    await act(async () => {
        await vi.advanceTimersByTimeAsync(ms);
    });
}

function popover(): {
    title: string | null | undefined;
    progress: string | null | undefined;
    next: string | null | undefined;
} | null {
    const wrapper = document.querySelector('.driver-popover');

    if (!wrapper) {
        return null;
    }

    return {
        title: wrapper.querySelector('.driver-popover-title')?.textContent,
        progress: wrapper.querySelector('.driver-popover-progress-text')
            ?.textContent,
        next: wrapper.querySelector('.driver-popover-next-btn')?.textContent,
    };
}

async function pressNext(): Promise<void> {
    await act(async () => {
        document
            .querySelector<HTMLButtonElement>('.driver-popover-next-btn')
            ?.click();
    });
}

async function clickNext(): Promise<void> {
    await pressNext();
    await elapse(LATER_TARGET_WAIT + TRANSITION);
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

describe('a tour whose middle step has no target on the page', () => {
    const fiveSteps = tour('report', ['a', 'b', 'c', 'd', 'e']);

    it('counts only the steps it can show', async () => {
        mount(fiveSteps, ['a', 'b', 'c', 'e']);
        await elapse(TRANSITION);

        expect(popover()).toMatchObject({ title: 'a', progress: '1 of 4' });

        await clickNext();
        await clickNext();

        expect(popover()).toMatchObject({ title: 'c', progress: '3 of 4' });
    });

    it('moves past the missing step on the next click without stalling', async () => {
        mount(fiveSteps, ['a', 'b', 'c', 'e']);
        await elapse(TRANSITION);

        await clickNext();
        await clickNext();
        await clickNext();

        expect(popover()).toEqual({
            title: 'e',
            progress: '4 of 4',
            next: 'Done',
        });
    });

    it('records the tour as completed after the last step shown', async () => {
        const { reports } = mount(fiveSteps, ['a', 'b', 'c', 'e']);
        await elapse(TRANSITION);

        for (let click = 0; click < 4; click++) {
            await clickNext();
        }

        expect(popover()).toBeNull();
        expect(reports).toEqual([
            { tour: 'report', version: 1, lastStep: 4, outcome: 'completed' },
        ]);
    });
});

describe('a tour whose last step has no target on the page', () => {
    const threeSteps = tour('ticket', ['a', 'b', 'c']);

    it('offers to finish on the last step it can show', async () => {
        mount(threeSteps, ['a', 'b']);
        await elapse(TRANSITION);

        await clickNext();

        expect(popover()).toEqual({
            title: 'b',
            progress: '2 of 2',
            next: 'Done',
        });
    });

    it('records the tour as completed as soon as it is finished', async () => {
        const { reports } = mount(threeSteps, ['a', 'b']);
        await elapse(TRANSITION);

        await clickNext();
        await clickNext();

        expect(popover()).toBeNull();
        expect(reports).toEqual([
            { tour: 'ticket', version: 1, lastStep: 1, outcome: 'completed' },
        ]);
    });
});

describe('a tour whose first target renders late', () => {
    it('waits for the target before showing the first step', async () => {
        mount(tour('late', ['a', 'b']), ['b']);
        await elapse(TRANSITION);

        await act(async () => {
            addTarget('a');
        });
        await elapse(TRANSITION);

        expect(popover()).toMatchObject({ title: 'a', progress: '1 of 2' });
    });
});

describe('a later step whose target renders while the tour waits', () => {
    it('shows the step once its target appears', async () => {
        mount(tour('late-middle', ['a', 'b', 'c']), ['a', 'b']);
        await elapse(TRANSITION);

        await clickNext();
        await pressNext();
        await elapse(LATER_TARGET_WAIT / 2);

        await act(async () => {
            addTarget('c');
        });
        await elapse(TRANSITION);

        expect(popover()).toMatchObject({ title: 'c', progress: '3 of 3' });
    });

    it('ignores extra clicks instead of starting the wait again', async () => {
        mount(tour('patient', ['a', 'b', 'c', 'd']), ['a', 'b', 'd']);
        await elapse(TRANSITION);

        await clickNext();
        await pressNext();
        await elapse(1000);
        await pressNext();
        await elapse(1000);

        expect(popover()).toMatchObject({ title: 'd', progress: '3 of 3' });
    });

    it('keeps moving forward after going back towards a missing first step', async () => {
        mount(tour('first-missing', ['a', 'b', 'c']), ['b', 'c']);
        await elapse(4000 + TRANSITION);

        expect(popover()).toMatchObject({ title: 'b' });

        await act(async () => {
            window.dispatchEvent(
                new KeyboardEvent('keyup', { key: 'ArrowLeft' }),
            );
        });
        await elapse(4000 + TRANSITION);

        await clickNext();

        expect(popover()).toMatchObject({ title: 'c' });
    });
});
