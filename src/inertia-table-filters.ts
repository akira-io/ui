import { useCallback, useEffect, useRef, useState } from 'react';

export type TableFilterValue = string | string[] | number | null | undefined;

export type TableFilterQuery = Record<string, string | string[]>;

export interface TableFiltersVisitOptions {
    data: TableFilterQuery;
    only?: string[];
    preserveState: boolean;
    preserveScroll: boolean;
    replace: boolean;
    onCancelToken: (token: { cancel: () => void }) => void;
}

export interface TableFiltersRouter {
    visit: (url: string, options: TableFiltersVisitOptions) => void;
}

export interface TableFiltersOptions {
    url: string;
    filters: Record<string, TableFilterValue>;
    only?: string[];
    searchKey?: string;
    pageKey?: string;
    debounce?: number;
}

export interface TableFilters {
    search: string;
    setSearch: (value: string) => void;
    filterValues: Record<string, string[]>;
    setFilter: (key: string, values: string[]) => void;
    clearFilters: () => void;
    setPage: (pageIndex: number) => void;
    apply: (changes: Record<string, TableFilterValue>) => void;
}

export type UseTableFilters = (options: TableFiltersOptions) => TableFilters;

const DEFAULT_DEBOUNCE = 300;

export function toQuery(
    filters: Record<string, TableFilterValue>,
): TableFilterQuery {
    const query: TableFilterQuery = {};

    for (const [key, value] of Object.entries(filters)) {
        if (Array.isArray(value)) {
            const values = value.filter((entry) => entry !== '');

            if (values.length > 0) {
                query[key] = values;
            }

            continue;
        }

        if (value === null || value === undefined || value === '') {
            continue;
        }

        query[key] = String(value);
    }

    return query;
}

export function toFilterValues(
    filters: Record<string, TableFilterValue>,
    exclude: string[] = [],
): Record<string, string[]> {
    const values: Record<string, string[]> = {};

    for (const [key, value] of Object.entries(toQuery(filters))) {
        if (exclude.includes(key)) {
            continue;
        }

        values[key] = Array.isArray(value) ? value : [value];
    }

    return values;
}

export function createTableFiltersHook(
    router: TableFiltersRouter,
): UseTableFilters {
    return function useTableFilters({
        url,
        filters,
        only,
        searchKey = 'search',
        pageKey = 'page',
        debounce = DEFAULT_DEBOUNCE,
    }: TableFiltersOptions): TableFilters {
        const initialSearch = filters[searchKey];
        const [search, setSearchState] = useState(
            typeof initialSearch === 'string' ? initialSearch : '',
        );
        const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
        const pending = useRef<{ cancel: () => void } | null>(null);
        const state = useRef({ url, filters, only, searchKey, pageKey });

        state.current = { url, filters, only, searchKey, pageKey };

        const visit = useCallback(
            (changes: Record<string, TableFilterValue>) => {
                const current = state.current;

                pending.current?.cancel();

                router.visit(current.url, {
                    data: toQuery({ ...current.filters, ...changes }),
                    only: current.only,
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    onCancelToken: (token) => {
                        pending.current = token;
                    },
                });
            },
            [],
        );

        const cancelPendingSearch = useCallback(() => {
            if (timer.current !== null) {
                clearTimeout(timer.current);
                timer.current = null;
            }
        }, []);

        useEffect(() => cancelPendingSearch, [cancelPendingSearch]);

        const setSearch = useCallback(
            (value: string) => {
                setSearchState(value);
                cancelPendingSearch();

                timer.current = setTimeout(() => {
                    timer.current = null;
                    visit({
                        [state.current.searchKey]: value,
                        [state.current.pageKey]: null,
                    });
                }, debounce);
            },
            [cancelPendingSearch, debounce, visit],
        );

        const setFilter = useCallback(
            (key: string, values: string[]) => {
                cancelPendingSearch();
                visit({ [key]: values, [state.current.pageKey]: null });
            },
            [cancelPendingSearch, visit],
        );

        const clearFilters = useCallback(() => {
            cancelPendingSearch();
            setSearchState('');

            const current = state.current;
            const cleared = Object.fromEntries(
                Object.keys(current.filters).map((key) => [key, null]),
            );

            visit({ ...cleared, [current.pageKey]: null });
        }, [cancelPendingSearch, visit]);

        const setPage = useCallback(
            (pageIndex: number) => {
                visit({
                    [state.current.pageKey]:
                        pageIndex > 0 ? pageIndex + 1 : null,
                });
            },
            [visit],
        );

        const apply = useCallback(
            (changes: Record<string, TableFilterValue>) => {
                cancelPendingSearch();
                visit({ ...changes, [state.current.pageKey]: null });
            },
            [cancelPendingSearch, visit],
        );

        return {
            search,
            setSearch,
            filterValues: toFilterValues(filters, [searchKey, pageKey]),
            setFilter,
            clearFilters,
            setPage,
            apply,
        };
    };
}
