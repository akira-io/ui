import { driver, type Driver } from 'driver.js';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    type PropsWithChildren,
    type ReactElement,
} from 'react';

import 'driver.js/dist/driver.css';

import { shouldStartTour, stepsForBreakpoint } from '@/blocks/tour/gate';
import {
    DEFAULT_TOUR_LABELS,
    type TourBreakpoint,
    type TourDefinition,
    type TourLabels,
    type TourOutcome,
    type TourProgress,
} from '@/blocks/tour/types';

interface TourControllerValue {
    startTour: (
        definition: TourDefinition,
        options?: { force?: boolean },
    ) => void;
}

const TourContext = createContext<TourControllerValue | null>(null);

const MOBILE_BREAKPOINT = 768;

const WAIT_FOR_TARGET = 4000;

function currentBreakpoint(): TourBreakpoint {
    return window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : 'desktop';
}

function outcomeOf(instance: Driver, highlighted: boolean): TourOutcome {
    if (!highlighted) {
        return 'dismissed';
    }

    return instance.hasNextStep() ? 'skipped' : 'completed';
}

export function TourProvider({
    children,
    seen,
    onProgress,
    labels,
}: PropsWithChildren<{
    seen: Record<string, number>;
    onProgress: (progress: TourProgress) => void;
    labels?: Partial<TourLabels>;
}>): ReactElement {
    const seenRef = useRef(seen);
    seenRef.current = seen;

    const onProgressRef = useRef(onProgress);
    onProgressRef.current = onProgress;

    const driverRef = useRef<Driver | null>(null);
    const activeRef = useRef<{
        definition: TourDefinition;
        lastStep: number;
        highlighted: boolean;
    } | null>(null);

    const resolvedLabels = useMemo(
        () => ({ ...DEFAULT_TOUR_LABELS, ...labels }),
        [labels],
    );

    const report = useCallback((outcome: TourOutcome): void => {
        const active = activeRef.current;

        if (!active) {
            return;
        }

        activeRef.current = null;

        onProgressRef.current({
            tour: active.definition.id,
            version: active.definition.version,
            lastStep: active.lastStep,
            outcome,
        });
    }, []);

    const startTour = useCallback(
        (definition: TourDefinition, options?: { force?: boolean }): void => {
            const alreadyRunning =
                activeRef.current?.definition.id === definition.id;

            if (alreadyRunning && !options?.force) {
                return;
            }

            const steps = stepsForBreakpoint(
                definition.steps,
                currentBreakpoint(),
            );

            const allowed = shouldStartTour({
                definition,
                seen: seenRef.current,
                resolvedStepCount: steps.length,
                force: options?.force,
            });

            if (!allowed) {
                return;
            }

            driverRef.current?.destroy();
            activeRef.current = { definition, lastStep: 0, highlighted: false };

            const instance = driver({
                showProgress: true,
                progressText: resolvedLabels.progress,
                nextBtnText: resolvedLabels.next,
                prevBtnText: resolvedLabels.previous,
                doneBtnText: resolvedLabels.done,
                popoverClass: 'akira-tour',
                waitForElement: WAIT_FOR_TARGET,
                skipMissingElement: true,
                steps: steps.map((step) => ({
                    element: step.target,
                    popover: {
                        title: step.title,
                        description: step.description,
                    },
                })),
                onHighlightStarted: () => {
                    if (activeRef.current) {
                        activeRef.current.lastStep =
                            instance.getActiveIndex() ?? 0;
                        activeRef.current.highlighted = true;
                    }
                },
                onDestroyStarted: () => {
                    report(
                        outcomeOf(
                            instance,
                            activeRef.current?.highlighted ?? false,
                        ),
                    );
                    instance.destroy();
                },
            });

            driverRef.current = instance;
            instance.drive();
        },
        [report, resolvedLabels],
    );

    useEffect(
        () => () => {
            report('dismissed');
            driverRef.current?.destroy();
            driverRef.current = null;
        },
        [report],
    );

    const value = useMemo(() => ({ startTour }), [startTour]);

    return (
        <TourContext.Provider value={value}>{children}</TourContext.Provider>
    );
}

export function useTourController(): TourControllerValue {
    const context = useContext(TourContext);

    if (!context) {
        throw new Error(
            'useTourController must be used inside a TourProvider.',
        );
    }

    return context;
}

export function useTour(
    definition: TourDefinition,
    options?: { enabled?: boolean },
): { restart: () => void } {
    const { startTour } = useTourController();
    const enabled = options?.enabled ?? true;

    const definitionRef = useRef(definition);
    definitionRef.current = definition;

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const frame = window.requestAnimationFrame(() =>
            startTour(definitionRef.current),
        );

        return () => window.cancelAnimationFrame(frame);
    }, [definition.id, definition.version, enabled, startTour]);

    return { restart: () => startTour(definitionRef.current, { force: true }) };
}
