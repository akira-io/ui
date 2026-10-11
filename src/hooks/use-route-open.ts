import { useState } from 'react';

interface RouteOpenOptions {
    open: boolean;
    setOpen: (open: boolean) => void;
    holdsCurrentRoute: boolean;
    route: string;
}

export function useRouteOpen({
    open,
    setOpen,
    holdsCurrentRoute,
    route,
}: RouteOpenOptions): {
    expanded: boolean;
    setExpanded: (open: boolean) => void;
} {
    const [closedOnRoute, setClosedOnRoute] = useState<string | null>(null);

    if (!holdsCurrentRoute && closedOnRoute !== null) {
        setClosedOnRoute(null);
    }
    const expanded = open || (holdsCurrentRoute && closedOnRoute !== route);

    function setExpanded(next: boolean): void {
        setClosedOnRoute(next ? null : route);
        setOpen(next);
    }

    return { expanded, setExpanded };
}
