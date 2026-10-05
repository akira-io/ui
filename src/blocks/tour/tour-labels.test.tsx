// @vitest-environment jsdom

import { act, cleanup, render } from '@testing-library/react';
import { useEffect, type ReactElement } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { TourProvider, useTourController } from '@/blocks/tour/tour';
import type { TourLabels } from '@/blocks/tour/types';
import { UiLocaleProvider } from '@/locales/context';
import { ptLabels } from '@/locales/pt';

afterEach(() => {
    cleanup();
    document
        .querySelectorAll('.driver-popover, .driver-overlay')
        .forEach((element) => element.remove());
});

function Starter(): ReactElement {
    const { startTour } = useTourController();

    useEffect(() => {
        startTour(
            {
                id: 'labels',
                version: 1,
                steps: [
                    {
                        target: '[data-tour="target"]',
                        title: 'A',
                        description: 'B',
                    },
                ],
            },
            { force: true },
        );
    }, [startTour]);

    return <div data-tour="target">target</div>;
}

function renderTour(labels?: Partial<TourLabels>): void {
    act(() => {
        render(
            <TourProvider seen={{}} onProgress={() => {}} labels={labels}>
                <Starter />
            </TourProvider>,
        );
    });
}

function closeLabel(): string | null {
    return (
        document
            .querySelector('.driver-popover-close-btn')
            ?.getAttribute('aria-label') ?? null
    );
}

describe('the tour close control', () => {
    it('keeps the english name without a locale', () => {
        renderTour();

        expect(closeLabel()).toBe('Close');
    });

    it('follows the locale the app provides', () => {
        act(() => {
            render(
                <UiLocaleProvider labels={ptLabels}>
                    <TourProvider seen={{}} onProgress={() => {}}>
                        <Starter />
                    </TourProvider>
                </UiLocaleProvider>,
            );
        });

        expect(closeLabel()).toBe('Fechar');
    });

    it('lets the labels prop name it', () => {
        renderTour({ close: 'Dismiss tour' });

        expect(closeLabel()).toBe('Dismiss tour');
    });
});
