interface LoginFormLabels {
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    forgotPasswordLabel: string;
    rememberLabel: string;
    submitLabel: string;
    submittingLabel: string;
}
declare const loginFormLabels: LoginFormLabels;
type LoginFormErrors = Record<string, string | string[] | undefined>;
declare function fieldError(errors: LoginFormErrors, field: string): string | undefined;

type TourBreakpoint = 'mobile' | 'desktop';
type TourOutcome = 'completed' | 'skipped' | 'dismissed';
interface TourStep {
    target: string;
    title: string;
    description: string;
    breakpoints?: TourBreakpoint[];
}
interface TourDefinition {
    id: string;
    version: number;
    steps: TourStep[];
}
interface TourProgress {
    tour: string;
    version: number;
    lastStep: number;
    outcome: TourOutcome;
}
interface TourLabels {
    next: string;
    previous: string;
    done: string;
    progress: string;
}
declare const DEFAULT_TOUR_LABELS: TourLabels;

export { DEFAULT_TOUR_LABELS as D, type LoginFormErrors as L, type TourStep as T, type LoginFormLabels as a, type TourDefinition as b, type TourBreakpoint as c, type TourProgress as d, type TourLabels as e, type TourOutcome as f, fieldError as g, loginFormLabels as l };
