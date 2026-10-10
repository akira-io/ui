import type { Driver } from 'driver.js';
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

import {
    resolveSteps,
    shouldStartTour,
    stepsForBreakpoint,
} from '@/blocks/tour/gate';
import {
    rememberProgress,
    seenWithRecorded,
    type TourOwner,
} from '@/blocks/tour/recorded-versions';
import { createTourDriver, outcomeOf } from '@/blocks/tour/tour-driver';
import {
    DEFAULT_TOUR_LABELS,
    type TourBreakpoint,
    type TourDefinition,
    type TourLabels,
    type TourOutcome,
    type TourProgress,
    type TourStep,
} from '@/blocks/tour/types';
import {
    isTargetPresent,
    TARGET_WAIT,
    waitForTargets,
} from '@/blocks/tour/wait-for-targets';
import { useUiLabels } from '@/locales/context';

interface TourControllerValue {
    startTour: (
        definition: TourDefinition,
        options?: { force?: boolean },
    ) => () => void;
}

const TourContext = createContext<TourControllerValue | null>(null);

const MOBILE_BREAKPOINT = 768;

function currentBreakpoint(): TourBreakpoint {
    return window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : 'desktop';
}

export function TourProvider({
    children,
    seen,
    owner,
    onProgress,
    labels,
}: PropsWithChildren<{
    seen: Record<string, number>;
    owner?: TourOwner;
    onProgress: (progress: TourProgress) => void;
    labels?: Partial<TourLabels>;
}>): ReactElement {
    const seenRef = useRef({ seen, owner });
    seenRef.current = { seen, owner };

    const onProgressRef = useRef(onProgress);
    onProgressRef.current = onProgress;

    const driverRef = useRef<Driver | null>(null);
    const pendingRef = useRef<{ id: string; cancel: () => void } | null>(null);
    const activeRef = useRef<{
        definition: TourDefinition;
        lastStep: number;
        highlighted: boolean;
    } | null>(null);

    const { next, previous, done, progress, close } = useUiLabels(
        'tour',
        DEFAULT_TOUR_LABELS,
        labels,
    );

    const tourLabels = useMemo(
        () => ({ next, previous, done, progress, close }),
        [next, previous, done, progress, close],
    );

    const report = useCallback((outcome: TourOutcome): void => {
        const active = activeRef.current;

        if (!active) {
            return;
        }

        activeRef.current = null;

        if (pendingRef.current?.id === active.definition.id) {
            pendingRef.current.cancel();
        }

        const { id: tour, version } = active.definition;
        const progress = { tour, version, lastStep: active.lastStep, outcome };

        rememberProgress(progress, seenRef.current.owner);
        onProgressRef.current(progress);
    }, []);

    const drive = useCallback(
        (definition: TourDefinition, steps: TourStep[]): void => {
            if (steps.length === 0) {
                return;
            }

            const running = driverRef.current;

            if (running) {
                const outcome = outcomeOf(
                    running,
                    activeRef.current?.highlighted ?? false,
                );

                running.destroy();
                driverRef.current = null;
                report(outcome);

                if (driverRef.current) {
                    return;
                }
            }

            activeRef.current = { definition, lastStep: 0, highlighted: false };

            const instance = createTourDriver({
                steps,
                labels: tourLabels,
                onHighlight: (index) => {
                    if (activeRef.current) {
                        activeRef.current.lastStep = index;
                        activeRef.current.highlighted = true;
                    }
                },
                onDestroy: (destroyed) => {
                    report(
                        outcomeOf(
                            destroyed,
                            activeRef.current?.highlighted ?? false,
                        ),
                    );
                },
            });

            driverRef.current = instance;
            instance.drive();
        },
        [report, tourLabels],
    );

    const startTour = useCallback(
        (
            definition: TourDefinition,
            options?: { force?: boolean },
        ): (() => void) => {
            const alreadyRunning =
                activeRef.current?.definition.id === definition.id;

            if (alreadyRunning && !options?.force) {
                return () => {};
            }

            const waiting = pendingRef.current;

            if (waiting?.id === definition.id) {
                return () => {};
            }

            const steps = stepsForBreakpoint(
                definition.steps,
                currentBreakpoint(),
            );

            const allowed = shouldStartTour({
                definition,
                seen: seenWithRecorded(seenRef.current),
                resolvedStepCount: steps.length,
                force: options?.force,
            });

            if (!allowed) {
                return () => {};
            }

            pendingRef.current?.cancel();

            const pending = { id: definition.id, cancel: () => {} };
            pendingRef.current = pending;

            const release = (): void => {
                if (pendingRef.current === pending) {
                    pendingRef.current = null;
                }
            };

            const settle = (): void => {
                release();
                drive(
                    definition,
                    resolveSteps(
                        stepsForBreakpoint(
                            definition.steps,
                            currentBreakpoint(),
                        ),
                        isTargetPresent,
                    ),
                );
            };

            const stop = waitForTargets(
                steps.map((step) => step.target),
                TARGET_WAIT,
                settle,
            );

            pending.cancel = () => {
                stop();
                release();
            };

            return pending.cancel;
        },
        [drive],
    );

    useEffect(
        () => () => {
            pendingRef.current?.cancel();
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

        let cancel = (): void => {};

        const frame = window.requestAnimationFrame(() => {
            cancel = startTour(definitionRef.current);
        });

        return () => {
            window.cancelAnimationFrame(frame);
            cancel();
        };
    }, [definition.id, definition.version, enabled, startTour]);

    return {
        restart: () => {
            startTour(definitionRef.current, { force: true });
        },
    };
}
