// @vitest-environment jsdom

import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
    createTableFiltersHook,
    type TableFilterQuery,
    type TableFiltersOptions,
    type TableFiltersRouter,
    type TableFiltersVisitOptions,
} from '@/inertia-table-filters';

interface Visit {
    url: string;
    options: TableFiltersVisitOptions;
}

let visits: Visit[];
let cancelled: number;

const router: TableFiltersRouter = {
    visit: (url, options) => {
        visits.push({ url, options });
        options.onCancelToken({
            cancel: () => {
                cancelled += 1;
            },
        });
    },
};

const useTableFilters = createTableFiltersHook(router);

const baseOptions: TableFiltersOptions = {
    url: '/admin/tickets',
    filters: { search: 'boat', status: ['open'], page: '2' },
    only: ['tickets', 'filters'],
};

function lastVisit(): Visit {
    return visits[visits.length - 1];
}

function queryString(data: TableFilterQuery): string {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
            value.forEach((entry) => params.append(`${key}[]`, entry));
            continue;
        }

        params.set(key, value);
    }

    return params.toString();
}

function readQueryString(query: string): Record<string, string | string[]> {
    const filters: Record<string, string | string[]> = {};

    for (const [key, value] of new URLSearchParams(query)) {
        if (!key.endsWith('[]')) {
            filters[key] = value;
            continue;
        }

        const name = key.slice(0, -2);
        const current = filters[name];

        filters[name] = Array.isArray(current) ? [...current, value] : [value];
    }

    return filters;
}

beforeEach(() => {
    visits = [];
    cancelled = 0;
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    cleanup();
});

describe('useTableFilters', () => {
    it('seeds the search from the filters the server rendered', () => {
        const { result } = renderHook(() => useTableFilters(baseOptions));

        expect(result.current.search).toBe('boat');
        expect(result.current.filterValues).toEqual({ status: ['open'] });
    });

    it('collapses rapid typing into a single visit', () => {
        const { result } = renderHook(() => useTableFilters(baseOptions));

        act(() => {
            result.current.setSearch('f');
            result.current.setSearch('fe');
            result.current.setSearch('fer');
        });

        expect(visits).toHaveLength(0);

        act(() => vi.advanceTimersByTime(300));

        expect(visits).toHaveLength(1);
        expect(lastVisit().options.data.search).toBe('fer');
    });

    it('honours a custom debounce delay', () => {
        const { result } = renderHook(() =>
            useTableFilters({ ...baseOptions, debounce: 800 }),
        );

        act(() => result.current.setSearch('ferry'));
        act(() => vi.advanceTimersByTime(700));

        expect(visits).toHaveLength(0);

        act(() => vi.advanceTimersByTime(100));

        expect(visits).toHaveLength(1);
    });

    it('asks only for the declared props and preserves state and scroll', () => {
        const { result } = renderHook(() => useTableFilters(baseOptions));

        act(() => result.current.setFilter('status', ['closed']));

        const { url, options } = lastVisit();

        expect(url).toBe('/admin/tickets');
        expect(options.only).toEqual(['tickets', 'filters']);
        expect(options.preserveState).toBe(true);
        expect(options.preserveScroll).toBe(true);
        expect(options.replace).toBe(true);
    });

    it('cancels a pending visit when a newer one starts', () => {
        const { result } = renderHook(() => useTableFilters(baseOptions));

        act(() => result.current.setFilter('status', ['closed']));

        expect(cancelled).toBe(0);

        act(() => result.current.setFilter('status', ['open']));

        expect(cancelled).toBe(1);
        expect(visits).toHaveLength(2);
    });

    it('drops a cleared filter from the query instead of sending a blank', () => {
        const { result } = renderHook(() => useTableFilters(baseOptions));

        act(() => result.current.setFilter('status', []));

        expect(lastVisit().options.data).not.toHaveProperty('status');
        expect(queryString(lastVisit().options.data)).toBe('search=boat');
    });

    it('drops every filter and the page when the filters are cleared', () => {
        const { result } = renderHook(() => useTableFilters(baseOptions));

        act(() => result.current.clearFilters());

        expect(lastVisit().options.data).toEqual({});
        expect(result.current.search).toBe('');
    });

    it('resets the page when the search or a filter changes', () => {
        const { result } = renderHook(() => useTableFilters(baseOptions));

        act(() => result.current.setFilter('status', ['closed']));

        expect(lastVisit().options.data).not.toHaveProperty('page');

        act(() => result.current.setSearch('ferry'));
        act(() => vi.advanceTimersByTime(300));

        expect(lastVisit().options.data).not.toHaveProperty('page');
    });

    it('sends a one-based page and omits the first one', () => {
        const { result } = renderHook(() => useTableFilters(baseOptions));

        act(() => result.current.setPage(3));

        expect(lastVisit().options.data.page).toBe('4');

        act(() => result.current.setPage(0));

        expect(lastVisit().options.data).not.toHaveProperty('page');
    });

    it('round trips the filter state through the url', () => {
        const { result } = renderHook(() => useTableFilters(baseOptions));

        act(() => result.current.setFilter('status', ['open', 'pending']));

        const reloaded = readQueryString(queryString(lastVisit().options.data));

        expect(reloaded).toEqual({
            search: 'boat',
            status: ['open', 'pending'],
        });

        const { result: next } = renderHook(() =>
            useTableFilters({ ...baseOptions, filters: reloaded }),
        );

        expect(next.current.search).toBe('boat');
        expect(next.current.filterValues).toEqual({
            status: ['open', 'pending'],
        });
    });

    it('applies several changes in one visit', () => {
        const { result } = renderHook(() => useTableFilters(baseOptions));

        act(() =>
            result.current.apply({ status: ['closed'], created_at: 'today' }),
        );

        expect(lastVisit().options.data).toEqual({
            search: 'boat',
            status: ['closed'],
            created_at: 'today',
        });
    });

    it('clears the debounce timer on unmount', () => {
        const { result, unmount } = renderHook(() =>
            useTableFilters(baseOptions),
        );

        act(() => result.current.setSearch('ferry'));
        unmount();
        act(() => vi.advanceTimersByTime(600));

        expect(visits).toHaveLength(0);
    });
});
