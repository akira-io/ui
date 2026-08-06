// @vitest-environment jsdom

import {
    act,
    cleanup,
    render,
    renderHook,
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
    AutosaveForm,
    INITIAL_VALUES,
} from '../../tests/fixtures/autosave-form';
import { useAutosave, type UseAutosaveOptions } from './use-autosave';

interface Values {
    name: string;
}

function renderAutosave(
    onSave: (values: Values) => void | Promise<void>,
    options?: UseAutosaveOptions<Values>,
) {
    return renderHook(
        ({ values }: { values: Values }) =>
            useAutosave(values, onSave, options),
        { initialProps: { values: { name: 'Cascais' } } },
    );
}

async function advance(ms: number) {
    await act(async () => {
        vi.advanceTimersByTime(ms);
    });
}

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    cleanup();
    vi.useRealTimers();
});

describe('useAutosave', () => {
    it('never fires on mount', async () => {
        const onSave = vi.fn();
        const { result } = renderAutosave(onSave);

        await advance(5000);

        expect(onSave).not.toHaveBeenCalled();
        expect(result.current.status).toBe('idle');
    });

    it('saves once per debounce window, with the last value typed', async () => {
        const onSave = vi.fn();
        const { result, rerender } = renderAutosave(onSave);

        rerender({ values: { name: 'C' } });
        await advance(300);
        rerender({ values: { name: 'Ca' } });
        await advance(300);
        rerender({ values: { name: 'Cas' } });
        await advance(699);

        expect(onSave).not.toHaveBeenCalled();

        await advance(1);

        expect(onSave).toHaveBeenCalledTimes(1);
        expect(onSave).toHaveBeenCalledWith({ name: 'Cas' });
        expect(result.current.status).toBe('saved');
    });

    it('takes a configurable delay', async () => {
        const onSave = vi.fn();
        const { rerender } = renderAutosave(onSave, { delay: 100 });

        rerender({ values: { name: 'Sines' } });
        await advance(100);

        expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('reports saving while the callback is in flight', async () => {
        let release: (() => void) | undefined;
        const onSave = vi.fn(
            () =>
                new Promise<void>((resolve) => {
                    release = resolve;
                }),
        );
        const { result, rerender } = renderAutosave(onSave);

        rerender({ values: { name: 'Sesimbra' } });
        await advance(700);

        expect(result.current.status).toBe('saving');

        await act(async () => {
            release?.();
        });

        expect(result.current.status).toBe('saved');
    });

    it('survives a rejected callback and carries its message', async () => {
        const onSave = vi
            .fn()
            .mockRejectedValue(new Error('The server said no'));
        const { result, rerender } = renderAutosave(onSave);

        rerender({ values: { name: 'Setubal' } });
        await advance(700);

        expect(result.current.status).toBe('error');
        expect(result.current.error).toBe('The server said no');
    });

    it('saves again after an error, once the next change lands', async () => {
        const onSave = vi
            .fn()
            .mockRejectedValueOnce(new Error('offline'))
            .mockResolvedValueOnce(undefined);
        const { result, rerender } = renderAutosave(onSave);

        rerender({ values: { name: 'Faro' } });
        await advance(700);

        expect(result.current.status).toBe('error');

        rerender({ values: { name: 'Faroe' } });
        await advance(700);

        expect(onSave).toHaveBeenCalledTimes(2);
        expect(result.current.status).toBe('saved');
        expect(result.current.error).toBeUndefined();
    });

    it('never resolves an overtaken save into a stale status', async () => {
        const resolvers: Array<(value: void) => void> = [];
        const rejecters: Array<(reason: unknown) => void> = [];
        const onSave = vi.fn(
            () =>
                new Promise<void>((resolve, reject) => {
                    resolvers.push(resolve);
                    rejecters.push(reject);
                }),
        );
        const { result, rerender } = renderAutosave(onSave, { delay: 10 });

        rerender({ values: { name: 'first' } });
        await advance(10);
        rerender({ values: { name: 'second' } });
        await advance(10);

        expect(onSave).toHaveBeenCalledTimes(2);

        await act(async () => {
            resolvers[1]?.();
        });

        expect(result.current.status).toBe('saved');

        await act(async () => {
            rejecters[0]?.(new Error('the stale one failed'));
        });

        expect(result.current.status).toBe('saved');
        expect(result.current.error).toBeUndefined();
    });

    it('stays quiet while disabled', async () => {
        const onSave = vi.fn();
        const { rerender } = renderAutosave(onSave, { enabled: false });

        rerender({ values: { name: 'Evora' } });
        await advance(5000);

        expect(onSave).not.toHaveBeenCalled();
    });

    it('flushes the pending save on demand and resets back to idle', async () => {
        const onSave = vi.fn();
        const { result, rerender } = renderAutosave(onSave);

        rerender({ values: { name: 'Braga' } });

        await act(async () => {
            result.current.flush();
        });

        expect(onSave).toHaveBeenCalledTimes(1);

        await advance(700);

        expect(onSave).toHaveBeenCalledTimes(1);

        act(() => result.current.reset());

        expect(result.current.status).toBe('idle');
    });

    it('drives a form that saves as the user types', async () => {
        vi.useRealTimers();

        const user = userEvent.setup();
        const onSave = vi.fn();

        render(<AutosaveForm onSave={onSave} options={{ delay: 30 }} />);

        expect(screen.getByRole('status').textContent).toContain(
            'Changes are saved automatically',
        );

        await user.type(screen.getByLabelText('Name'), 'x');

        await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));

        expect(onSave).toHaveBeenCalledWith({
            ...INITIAL_VALUES,
            name: `${INITIAL_VALUES.name}x`,
        });

        await waitFor(() =>
            expect(screen.getByRole('status').textContent).toContain('Saved'),
        );
    });
});
