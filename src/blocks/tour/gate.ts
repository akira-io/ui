import type {
    TourBreakpoint,
    TourDefinition,
    TourStep,
} from '@/blocks/tour/types';

export function stepsForBreakpoint(
    steps: TourStep[],
    breakpoint: TourBreakpoint,
): TourStep[] {
    return steps.filter(
        (step) => !step.breakpoints || step.breakpoints.includes(breakpoint),
    );
}

export function resolveSteps(
    steps: TourStep[],
    isPresent: (target: string) => boolean,
): TourStep[] {
    return steps.filter((step) => isPresent(step.target));
}

export function shouldStartTour(input: {
    definition: TourDefinition;
    seen: Record<string, number>;
    resolvedStepCount: number;
    force?: boolean;
}): boolean {
    if (input.resolvedStepCount === 0) {
        return false;
    }

    if (input.force) {
        return true;
    }

    return input.definition.version > (input.seen[input.definition.id] ?? 0);
}
