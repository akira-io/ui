import type {
    TourBreakpoint,
    TourDefinition,
    TourProgress,
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

export function mergeSeen(
    seen: Record<string, number>,
    recorded: Record<string, number>,
): Record<string, number> {
    const merged = { ...seen };

    for (const [id, version] of Object.entries(recorded)) {
        merged[id] = Math.max(merged[id] ?? 0, version);
    }

    return merged;
}

export function recordVersion(
    recorded: Record<string, number>,
    progress: TourProgress,
): Record<string, number> {
    if (progress.outcome === 'dismissed') {
        return recorded;
    }

    return mergeSeen(recorded, { [progress.tour]: progress.version });
}
