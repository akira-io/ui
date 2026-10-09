import { act, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { vi } from 'vitest';

import { TourProvider, useTour } from '@/blocks/tour/tour';
import type {
    TourDefinition,
    TourProgress,
    TourStep,
} from '@/blocks/tour/types';

export const TRANSITION = 500;

export const TARGET_WAIT = 4000;

const step = (name: string): TourStep => ({
    target: `[data-tour="${name}"]`,
    title: name,
    description: name,
});

export const tour = (id: string, names: string[]): TourDefinition => ({
    id,
    version: 1,
    steps: names.map(step),
});

export function addTarget(name: string): void {
    const element = document.createElement('div');
    element.dataset.tour = name;
    document.body.appendChild(element);
}

function TourStarter({ definition }: { definition: TourDefinition }): null {
    useTour(definition);

    return null;
}

export function Page({
    definition,
    reports,
    showStarter = true,
}: {
    definition: TourDefinition;
    reports: TourProgress[];
    showStarter?: boolean;
}): ReactElement {
    return (
        <TourProvider seen={{}} onProgress={(entry) => reports.push(entry)}>
            {showStarter && <TourStarter definition={definition} />}
        </TourProvider>
    );
}

export function mount(
    definition: TourDefinition,
    present: string[],
): {
    reports: TourProgress[];
    unmount: () => void;
    leavePage: () => void;
} {
    present.forEach(addTarget);

    const reports: TourProgress[] = [];

    const { unmount, rerender } = render(
        <Page definition={definition} reports={reports} />,
    );

    const leavePage = (): void =>
        rerender(
            <Page
                definition={definition}
                reports={reports}
                showStarter={false}
            />,
        );

    return { reports, unmount, leavePage };
}

export async function elapse(ms: number): Promise<void> {
    await act(async () => {
        await vi.advanceTimersByTimeAsync(ms);
    });
}

export function popover(): {
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

export async function clickNext(): Promise<void> {
    await pressNext();
    await elapse(TRANSITION);
}

export async function settle(): Promise<void> {
    await elapse(TARGET_WAIT + TRANSITION);
}
