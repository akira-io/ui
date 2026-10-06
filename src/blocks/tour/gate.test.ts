import { describe, expect, it } from 'vitest';

import {
    presentStepProgress,
    resolveSteps,
    shouldStartTour,
    stepsForBreakpoint,
} from '@/blocks/tour/gate';
import type { TourDefinition, TourStep } from '@/blocks/tour/types';

const step = (target: string, overrides: Partial<TourStep> = {}): TourStep => ({
    target,
    title: target,
    description: target,
    ...overrides,
});

const definition = (
    version: number,
    steps: TourStep[] = [step('[data-tour="a"]')],
): TourDefinition => ({
    id: 'dashboard',
    version,
    steps,
});

describe('stepsForBreakpoint', () => {
    it('keeps a step that declares no breakpoint', () => {
        expect(stepsForBreakpoint([step('a')], 'mobile')).toHaveLength(1);
    });

    it('keeps a step that declares the current breakpoint', () => {
        const steps = [step('a', { breakpoints: ['desktop'] })];

        expect(stepsForBreakpoint(steps, 'desktop')).toHaveLength(1);
    });

    it('drops a step that declares another breakpoint', () => {
        const steps = [step('a', { breakpoints: ['desktop'] })];

        expect(stepsForBreakpoint(steps, 'mobile')).toHaveLength(0);
    });
});

describe('resolveSteps', () => {
    it('drops the steps whose target is absent', () => {
        const steps = [step('a'), step('b')];

        expect(resolveSteps(steps, (target) => target === 'a')).toEqual([
            steps[0],
        ]);
    });
});

describe('presentStepProgress', () => {
    const steps = [step('a'), step('b'), step('c'), step('d'), step('e')];
    const present = (target: string) => target !== 'd';

    it('numbers the active step among the present ones', () => {
        expect(presentStepProgress(steps, 2, present)).toEqual({
            current: 3,
            total: 4,
        });
    });

    it('does not count a missing step that comes before the active one', () => {
        expect(presentStepProgress(steps, 4, present)).toEqual({
            current: 4,
            total: 4,
        });
    });

    it('counts every step when all targets are present', () => {
        expect(presentStepProgress(steps, 0, () => true)).toEqual({
            current: 1,
            total: 5,
        });
    });
});

describe('shouldStartTour', () => {
    it('starts when the user has never seen the tour', () => {
        expect(
            shouldStartTour({
                definition: definition(1),
                seen: {},
                resolvedStepCount: 1,
            }),
        ).toBe(true);
    });

    it('starts when the version is newer than the one seen', () => {
        expect(
            shouldStartTour({
                definition: definition(2),
                seen: { dashboard: 1 },
                resolvedStepCount: 1,
            }),
        ).toBe(true);
    });

    it('does not start when the version was already seen', () => {
        expect(
            shouldStartTour({
                definition: definition(2),
                seen: { dashboard: 2 },
                resolvedStepCount: 1,
            }),
        ).toBe(false);
    });

    it('does not start when the stored version is ahead', () => {
        expect(
            shouldStartTour({
                definition: definition(1),
                seen: { dashboard: 3 },
                resolvedStepCount: 1,
            }),
        ).toBe(false);
    });

    it('does not start without resolved steps', () => {
        expect(
            shouldStartTour({
                definition: definition(2),
                seen: {},
                resolvedStepCount: 0,
            }),
        ).toBe(false);
    });

    it('starts a seen tour when forced', () => {
        expect(
            shouldStartTour({
                definition: definition(1),
                seen: { dashboard: 5 },
                resolvedStepCount: 1,
                force: true,
            }),
        ).toBe(true);
    });

    it('does not start a forced tour without resolved steps', () => {
        expect(
            shouldStartTour({
                definition: definition(1),
                seen: {},
                resolvedStepCount: 0,
                force: true,
            }),
        ).toBe(false);
    });
});
