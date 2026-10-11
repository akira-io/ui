// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { useRouteOpen } from '@/hooks/use-route-open';

function useGroup(holdsCurrentRoute: boolean, route: string) {
    const [open, setOpen] = useState(false);

    return useRouteOpen({ open, setOpen, holdsCurrentRoute, route });
}

describe('useRouteOpen', () => {
    it('opens for its route and closes when asked', () => {
        const { result } = renderHook(() => useGroup(true, '/a'));

        expect(result.current.expanded).toBe(true);
        act(() => result.current.setExpanded(false));
        expect(result.current.expanded).toBe(false);
    });

    it('opens again after leaving the group and coming back to the same route', () => {
        const { result, rerender } = renderHook(
            ({ holds, route }) => useGroup(holds, route),
            { initialProps: { holds: true, route: '/a' } },
        );

        act(() => result.current.setExpanded(false));
        rerender({ holds: false, route: '' });
        rerender({ holds: true, route: '/a' });

        expect(result.current.expanded).toBe(true);
    });

    it('opens again for another route inside the same group', () => {
        const { result, rerender } = renderHook(
            ({ holds, route }) => useGroup(holds, route),
            { initialProps: { holds: true, route: '/a' } },
        );

        act(() => result.current.setExpanded(false));
        rerender({ holds: true, route: '/b' });

        expect(result.current.expanded).toBe(true);
    });
});
