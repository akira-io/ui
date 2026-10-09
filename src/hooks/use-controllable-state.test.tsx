// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useControllableState } from '@/hooks/use-controllable-state';

describe('useControllableState', () => {
    it('owns the value when no value is passed', () => {
        const { result } = renderHook(() =>
            useControllableState({ defaultValue: false }),
        );

        act(() => result.current[1](true));

        expect(result.current[0]).toBe(true);
    });

    it('follows the passed value and reports changes without owning them', () => {
        const reported: boolean[] = [];
        const { result } = renderHook(() =>
            useControllableState({
                value: false,
                defaultValue: false,
                onChange: (next) => reported.push(next),
            }),
        );

        act(() => result.current[1](true));

        expect(result.current[0]).toBe(false);
        expect(reported).toEqual([true]);
    });

    it('reports uncontrolled changes too', () => {
        const reported: string[] = [];
        const { result } = renderHook(() =>
            useControllableState({
                defaultValue: '',
                onChange: (next) => reported.push(next),
            }),
        );

        act(() => result.current[1]('file'));

        expect(reported).toEqual(['file']);
    });
});
