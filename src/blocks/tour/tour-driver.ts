import { driver, type Driver } from 'driver.js';

import type { TourLabels, TourOutcome, TourStep } from '@/blocks/tour/types';

export function outcomeOf(instance: Driver, highlighted: boolean): TourOutcome {
    if (!highlighted) {
        return 'dismissed';
    }

    return instance.hasNextStep() ? 'skipped' : 'completed';
}

export function createTourDriver(input: {
    steps: TourStep[];
    labels: TourLabels;
    onHighlight: (index: number) => void;
    onDestroy: (instance: Driver) => void;
}): Driver {
    const { next, previous, done, progress, close } = input.labels;

    let moving = false;

    const move = (direction: () => void): void => {
        if (moving) {
            return;
        }

        moving = true;
        direction();
    };

    const instance = driver({
        showProgress: true,
        progressText: progress,
        nextBtnText: next,
        prevBtnText: previous,
        doneBtnText: done,
        popoverClass: 'akira-tour',
        waitForElement: 0,
        skipMissingElement: true,
        steps: input.steps.map((step) => ({
            element: step.target,
            popover: {
                title: step.title,
                description: step.description,
            },
        })),
        onPopoverRender: (popover) => {
            popover.closeButton.setAttribute('aria-label', close);
        },
        onNextClick: () => move(() => instance.moveNext()),
        onPrevClick: () => {
            if (instance.hasPreviousStep()) {
                move(() => instance.movePrevious());
            }
        },
        onHighlightStarted: () => {
            moving = false;
            input.onHighlight(instance.getActiveIndex() ?? 0);
        },
        onDestroyStarted: () => {
            input.onDestroy(instance);
            instance.destroy();
        },
    });

    return instance;
}
