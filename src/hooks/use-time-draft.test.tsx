// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useTimeDraft } from '@/hooks/use-time-draft';
import { resolveBounds, type TimeOfDay } from '@/lib/time-value';

const nineFifteen: TimeOfDay = { hour: 9, minute: 15, second: 0 };

function renderDraft(value: TimeOfDay | undefined, minTime?: string) {
    const onCommit = vi.fn();
    const hook = renderHook(() =>
        useTimeDraft({
            value,
            hourCycle: 24,
            withSeconds: false,
            bounds: resolveBounds(minTime),
            onCommit,
        }),
    );

    return { ...hook, onCommit };
}

describe('useTimeDraft', () => {
    it('reports a complete draft inside the bounds', () => {
        const { result, onCommit } = renderDraft(undefined);

        act(() => result.current.applyParts({ hour: 14, minute: 30 }));

        expect(onCommit).toHaveBeenCalledWith({
            hour: 14,
            minute: 30,
            second: 0,
        });
    });

    it('holds a draft back without reporting it', () => {
        const { result, onCommit } = renderDraft(undefined);

        act(() => result.current.holdParts({ hour: 14, minute: 3 }));

        expect(result.current.parts).toEqual({ hour: 14, minute: 3 });
        expect(onCommit).not.toHaveBeenCalled();
    });

    it('puts back the stored time when a half cleared draft settles', () => {
        const { result, onCommit } = renderDraft(nineFifteen);

        act(() => result.current.applyParts({ minute: 15 }));
        act(() => result.current.settle());

        expect(result.current.parts).toEqual({
            hour: 9,
            minute: 15,
            second: 0,
        });
        expect(onCommit).not.toHaveBeenCalled();
    });

    it('pulls a draft below the minimum up to it when it settles', () => {
        const { result, onCommit } = renderDraft(undefined, '08:00');

        act(() => result.current.applyParts({ hour: 7, minute: 0 }));

        expect(onCommit).not.toHaveBeenCalled();

        act(() => result.current.settle());

        expect(onCommit).toHaveBeenCalledWith({
            hour: 8,
            minute: 0,
            second: 0,
        });
    });

    it('reports nothing once every unit is cleared', () => {
        const { result, onCommit } = renderDraft(nineFifteen);

        act(() => result.current.applyParts({ second: 0 }));

        expect(onCommit).toHaveBeenCalledWith(undefined);
    });
});
