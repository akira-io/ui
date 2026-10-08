// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useControllableValue } from '@/hooks/use-controllable-value';

describe('useControllableValue', () => {
    it('keeps its own value when uncontrolled and still reports it', () => {
        const onChange = vi.fn();
        const { result } = renderHook(() =>
            useControllableValue<string>(false, undefined, 'a', onChange),
        );

        act(() => result.current[1]('b'));

        expect(result.current[0]).toBe('b');
        expect(onChange).toHaveBeenCalledWith('b');
    });

    it('shows only the value it is given when controlled', () => {
        const onChange = vi.fn();
        const { result } = renderHook(() =>
            useControllableValue<string>(true, 'a', undefined, onChange),
        );

        act(() => result.current[1]('b'));

        expect(result.current[0]).toBe('a');
        expect(onChange).toHaveBeenCalledWith('b');
    });

    it('lets a controlled value be empty', () => {
        const { result } = renderHook(() =>
            useControllableValue<string>(true, undefined, 'a'),
        );

        expect(result.current[0]).toBeUndefined();
    });
});
