import { useCallback, useEffect, useRef, useState } from 'react';

export type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export const AUTOSAVE_DELAY = 700;

export interface UseAutosaveOptions<T> {
    delay?: number;
    enabled?: boolean;
    isEqual?: (a: T, b: T) => boolean;
}

export interface UseAutosaveResult {
    status: AutosaveStatus;
    error?: string;
    flush: () => void;
    reset: () => void;
}

function shallowEqual<T>(a: T, b: T): boolean {
    if (Object.is(a, b)) {
        return true;
    }

    if (
        typeof a !== 'object' ||
        typeof b !== 'object' ||
        a === null ||
        b === null
    ) {
        return false;
    }

    const keys = Object.keys(a as object);

    if (keys.length !== Object.keys(b as object).length) {
        return false;
    }

    return keys.every((key) =>
        Object.is(
            (a as Record<string, unknown>)[key],
            (b as Record<string, unknown>)[key],
        ),
    );
}

function messageOf(reason: unknown): string | undefined {
    if (reason instanceof Error) {
        return reason.message;
    }

    return typeof reason === 'string' ? reason : undefined;
}

export function useAutosave<T>(
    values: T,
    onSave: (values: T) => void | Promise<void>,
    options: UseAutosaveOptions<T> = {},
): UseAutosaveResult {
    const { delay = AUTOSAVE_DELAY, enabled = true, isEqual } = options;

    const [status, setStatus] = useState<AutosaveStatus>('idle');
    const [error, setError] = useState<string | undefined>(undefined);

    const latest = useRef(values);
    const dispatched = useRef(values);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const issued = useRef(0);
    const settled = useRef(0);
    const mounted = useRef(true);
    const save = useRef(onSave);
    const equal = useRef(isEqual ?? shallowEqual);

    latest.current = values;
    save.current = onSave;
    equal.current = isEqual ?? shallowEqual;

    const run = useCallback(async () => {
        const payload = latest.current;
        const ticket = (issued.current += 1);

        setStatus('saving');
        setError(undefined);

        try {
            await save.current(payload);

            if (ticket < settled.current || !mounted.current) {
                return;
            }

            settled.current = ticket;
            setStatus('saved');
        } catch (reason) {
            if (ticket < settled.current || !mounted.current) {
                return;
            }

            settled.current = ticket;
            setError(messageOf(reason));
            setStatus('error');
        }
    }, []);

    const flush = useCallback(() => {
        clearTimeout(timer.current);
        dispatched.current = latest.current;
        void run();
    }, [run]);

    const reset = useCallback(() => {
        clearTimeout(timer.current);
        dispatched.current = latest.current;
        setError(undefined);
        setStatus('idle');
    }, []);

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
            clearTimeout(timer.current);
        };
    }, []);

    useEffect(() => {
        if (!enabled || equal.current(values, dispatched.current)) {
            return;
        }

        dispatched.current = values;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => void run(), delay);
    }, [values, delay, enabled, run]);

    return { status, error, flush, reset };
}
