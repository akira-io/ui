// @vitest-environment jsdom

import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    installResizeObserver,
    resize,
} from '../../tests/fixtures/resize-observer';
import { useBarRadius } from './use-bar-radius';

function barOfSize(size: { width: number; height: number }) {
    const bar = document.createElement('div');

    bar.getBoundingClientRect = () => size as DOMRect;
    document.body.append(bar);

    return { bar, barRef: { current: bar } };
}

afterEach(cleanup);

describe('useBarRadius', () => {
    it('measures the bar once without a ResizeObserver', () => {
        const original = globalThis.ResizeObserver;

        try {
            Reflect.deleteProperty(globalThis, 'ResizeObserver');
            const { barRef } = barOfSize({ width: 300, height: 12 });
            const { result } = renderHook(() => useBarRadius(barRef, 8));

            expect(result.current).toBe(2);
        } finally {
            globalThis.ResizeObserver = original;
        }
    });

    it('follows the bar as it resizes and stops when it unmounts', () => {
        installResizeObserver();
        const size = { width: 300, height: 12 };
        const { bar, barRef } = barOfSize(size);
        const { result, unmount } = renderHook(() => useBarRadius(barRef, 8));

        size.height = 60;
        act(() => resize(bar));

        expect(result.current).toBe(8);

        unmount();

        expect(() => resize(bar)).toThrow('the target is not observed');
    });

    it('waits for a size before choosing a radius', () => {
        installResizeObserver();
        const { barRef } = barOfSize({ width: 0, height: 0 });
        const { result } = renderHook(() => useBarRadius(barRef, 8));

        expect(result.current).toBeUndefined();
    });
});
