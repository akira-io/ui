// @vitest-environment jsdom

import { cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
    installIntersectionObserver,
    setIntersecting,
} from '../../tests/fixtures/intersection-observer';
import { useFloatingSheetBodyEdges } from './use-floating-sheet-body-edges';

function setupRefs() {
    const container = document.createElement('div');
    const topSentinel = document.createElement('div');
    const bottomSentinel = document.createElement('div');

    container.append(topSentinel, bottomSentinel);
    document.body.append(container);

    return {
        containerRef: { current: container },
        topSentinelRef: { current: topSentinel },
        bottomSentinelRef: { current: bottomSentinel },
        topSentinel,
        bottomSentinel,
    };
}

beforeEach(() => {
    installIntersectionObserver();
});

afterEach(cleanup);

describe('useFloatingSheetBodyEdges', () => {
    it('reports both edges visible once the sentinels are observed', () => {
        const { containerRef, topSentinelRef, bottomSentinelRef } = setupRefs();
        const reportEdges = vi.fn();

        renderHook(() =>
            useFloatingSheetBodyEdges(
                containerRef,
                topSentinelRef,
                bottomSentinelRef,
                reportEdges,
            ),
        );

        expect(reportEdges).toHaveBeenCalledWith({ top: true, bottom: true });
    });

    it('reports the top edge alone when only the top sentinel leaves view', () => {
        const { containerRef, topSentinelRef, bottomSentinelRef, topSentinel } =
            setupRefs();
        const reportEdges = vi.fn();

        renderHook(() =>
            useFloatingSheetBodyEdges(
                containerRef,
                topSentinelRef,
                bottomSentinelRef,
                reportEdges,
            ),
        );

        reportEdges.mockClear();
        setIntersecting(topSentinel, false);

        expect(reportEdges).toHaveBeenLastCalledWith({
            top: false,
            bottom: true,
        });
    });

    it('resets to both edges visible on unmount', () => {
        const { containerRef, topSentinelRef, bottomSentinelRef, topSentinel } =
            setupRefs();
        const reportEdges = vi.fn();

        const { unmount } = renderHook(() =>
            useFloatingSheetBodyEdges(
                containerRef,
                topSentinelRef,
                bottomSentinelRef,
                reportEdges,
            ),
        );

        setIntersecting(topSentinel, false);
        reportEdges.mockClear();
        unmount();

        expect(reportEdges).toHaveBeenCalledWith({ top: true, bottom: true });
    });

    it('does nothing when there is nothing to report to', () => {
        const { containerRef, topSentinelRef, bottomSentinelRef } = setupRefs();

        expect(() =>
            renderHook(() =>
                useFloatingSheetBodyEdges(
                    containerRef,
                    topSentinelRef,
                    bottomSentinelRef,
                    null,
                ),
            ),
        ).not.toThrow();
    });
});
