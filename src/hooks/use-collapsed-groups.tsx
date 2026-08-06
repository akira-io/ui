import { useCallback, useEffect, useState } from 'react';

export const SIDEBAR_COLLAPSED_GROUPS_KEY = 'akira-ui:collapsed-nav-groups';

function readCollapsedGroups(): string[] | null {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const raw = window.localStorage.getItem(SIDEBAR_COLLAPSED_GROUPS_KEY);

        if (raw === null) {
            return null;
        }

        const parsed: unknown = JSON.parse(raw);

        return Array.isArray(parsed)
            ? parsed.filter(
                  (entry): entry is string => typeof entry === 'string',
              )
            : null;
    } catch {
        return null;
    }
}

function writeCollapsedGroups(groups: string[]): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        window.localStorage.setItem(
            SIDEBAR_COLLAPSED_GROUPS_KEY,
            JSON.stringify(groups),
        );
    } catch {
        return;
    }
}

function withGroup(groups: string[], group: string, collapsed: boolean) {
    if (!collapsed) {
        return groups.filter((entry) => entry !== group);
    }

    return groups.includes(group) ? groups : [...groups, group];
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

    const [storedGroups, setStoredGroups] = useState<string[]>(() =>
        defaultOpen ? [] : [group],
    );

    useEffect(() => {
        if (isControlled) {
            return;
        }

        const persisted = readCollapsedGroups();

        if (persisted !== null) {
            setStoredGroups(persisted);
        }
    }, [isControlled]);

    const setOpen = useCallback(
        (open: boolean) => {
            if (isControlled) {
                onCollapsedChange(withGroup(collapsedGroups, group, !open));

                return;
            }

            const next = withGroup(
                readCollapsedGroups() ?? storedGroups,
                group,
                !open,
            );

            setStoredGroups(next);
            writeCollapsedGroups(next);
        },
        [collapsedGroups, group, isControlled, onCollapsedChange, storedGroups],
    );

    const source = isControlled ? collapsedGroups : storedGroups;

    return { open: !source.includes(group), setOpen };
}
