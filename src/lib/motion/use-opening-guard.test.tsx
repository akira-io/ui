/** @vitest-environment jsdom */

import { renderHook } from '@testing-library/react';
import type * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useOpeningGuard } from './use-opening-guard';

afterEach(() => vi.restoreAllMocks());

function release(): React.MouseEvent {
    return {
        nativeEvent: new MouseEvent('click'),
        detail: 1,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
    } as unknown as React.MouseEvent;
}

describe('the opening guard', () => {
    it('swallows the release of the opening click and lets a later one through', () => {
        const now = vi.spyOn(performance, 'now').mockReturnValue(1000);
        const { result } = renderHook(() => useOpeningGuard(undefined));

        result.current.trackOpening(document.createElement('div'));
        const early = release();
        result.current.ignoreOpeningRelease(early);

        now.mockReturnValue(1400);
        const late = release();
        result.current.ignoreOpeningRelease(late);

        expect(early.preventDefault).toHaveBeenCalled();
        expect(late.preventDefault).not.toHaveBeenCalled();
    });

    it('lets the release through once the pointer moved inside the menu', () => {
        vi.spyOn(performance, 'now').mockReturnValue(1000);
        const { result } = renderHook(() => useOpeningGuard(undefined));

        result.current.trackOpening(document.createElement('div'));
        result.current.markMoved();
        const event = release();
        result.current.ignoreOpeningRelease(event);

        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('hands back the cleanup a caller ref returns, so React can run it', () => {
        const cleanup = vi.fn();
        const { result } = renderHook(() => useOpeningGuard(() => cleanup));

        const returned = result.current.trackOpening(
            document.createElement('div'),
        );

        expect(returned).toBe(cleanup);
    });

    it('hands the node to the caller ref and remembers it for trigger checks', () => {
        const forwarded = vi.fn();
        const { result } = renderHook(() => useOpeningGuard(forwarded));
        const node = document.createElement('div');

        result.current.trackOpening(node);

        expect(forwarded).toHaveBeenCalledWith(node);
        expect(result.current.openedContent()).toBe(node);
    });
});
