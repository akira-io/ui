import { useCallback, useMemo, useSyncExternalStore } from 'react';

export const SIDEBAR_COLLAPSED_GROUPS_KEY = 'akira-ui:collapsed-nav-groups';
export const SIDEBAR_EXPANDED_GROUPS_KEY = 'akira-ui:expanded-nav-groups';

const NOTHING_STORED = JSON.stringify([null, null]);

const listeners = new Set<() => void>();

function readItem(key: string): string | null {
    try {
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
}

function writeItem(key: string, groups: string[]): void {
    try {
        window.localStorage.setItem(key, JSON.stringify(groups));
    } catch {
        return;
    }
}

function parseGroups(raw: string | null): string[] {
    if (raw === null) {
        return [];
    }

    try {
        const parsed: unknown = JSON.parse(raw);

        return Array.isArray(parsed)
            ? parsed.filter(
                  (entry): entry is string => typeof entry === 'string',
              )
            : [];
    } catch {
        return [];
    }
}

function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    window.addEventListener('storage', listener);

    return () => {
        listeners.delete(listener);
        window.removeEventListener('storage', listener);
    };
}

function getSnapshot(): string {
    return JSON.stringify([
        readItem(SIDEBAR_COLLAPSED_GROUPS_KEY),
        readItem(SIDEBAR_EXPANDED_GROUPS_KEY),
    ]);
}

function getServerSnapshot(): string {
    return NOTHING_STORED;
}

function withGroup(groups: string[], group: string, present: boolean) {
    if (!present) {
        return groups.filter((entry) => entry !== group);
    }

    return groups.includes(group) ? groups : [...groups, group];
}

function storeGroup(group: string, open: boolean): void {
    const collapsed = parseGroups(readItem(SIDEBAR_COLLAPSED_GROUPS_KEY));
    const expanded = parseGroups(readItem(SIDEBAR_EXPANDED_GROUPS_KEY));

    writeItem(SIDEBAR_COLLAPSED_GROUPS_KEY, withGroup(collapsed, group, !open));
    writeItem(SIDEBAR_EXPANDED_GROUPS_KEY, withGroup(expanded, group, open));
    listeners.forEach((listener) => listener());
}

export interface CollapsedGroupsOptions {
    group: string;
    defaultOpen?: boolean;
    collapsedGroups?: string[];
    onCollapsedChange?: (collapsedGroups: string[]) => void;
}

export function useCollapsedGroup({
    group,
    defaultOpen = true,
    collapsedGroups,
    onCollapsedChange,
}: CollapsedGroupsOptions) {
    const isControlled =
        collapsedGroups !== undefined && onCollapsedChange !== undefined;

    const snapshot = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );

    const stored = useMemo(() => {
        const [collapsed, expanded] = JSON.parse(snapshot) as [
            string | null,
            string | null,
        ];

        return {
            collapsed: parseGroups(collapsed),
            expanded: parseGroups(expanded),
        };
    }, [snapshot]);

    const setOpen = useCallback(
        (open: boolean) => {
            if (isControlled) {
                onCollapsedChange(withGroup(collapsedGroups, group, !open));

                return;
            }

            storeGroup(group, open);
        },
        [collapsedGroups, group, isControlled, onCollapsedChange],
    );

    if (isControlled) {
        return { open: !collapsedGroups.includes(group), setOpen };
    }

    if (stored.collapsed.includes(group)) {
        return { open: false, setOpen };
    }

    if (stored.expanded.includes(group)) {
        return { open: true, setOpen };
    }

    return { open: defaultOpen, setOpen };
}
