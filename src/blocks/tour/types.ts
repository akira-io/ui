export type TourBreakpoint = 'mobile' | 'desktop';

export type TourOutcome = 'completed' | 'skipped' | 'dismissed';

export interface TourStep {
    target: string;
    title: string;
    description: string;
    breakpoints?: TourBreakpoint[];
}

export interface TourDefinition {
    id: string;
    version: number;
    steps: TourStep[];
}

export interface TourProgress {
    tour: string;
    version: number;
    lastStep: number;
    outcome: TourOutcome;
}

export interface TourLabels {
    next: string;
    previous: string;
    done: string;
    progress: string;
}

export const DEFAULT_TOUR_LABELS: TourLabels = {
    next: 'Seguinte',
    previous: 'Anterior',
    done: 'Concluir',
    progress: '{{current}} de {{total}}',
};
