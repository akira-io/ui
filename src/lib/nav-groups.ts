import { hrefToString } from '@/lib/href';
import type { NavGroup, NavItem } from '@/types';

export function groupKey(parentKey: string, label: string): string {
    return parentKey === '' ? label : `${parentKey}/${label}`;
}

export function collectItems(
    group: Pick<NavGroup, 'items' | 'groups'>,
): NavItem[] {
    return [
        ...group.items,
        ...(group.groups ?? []).flatMap((subgroup) => collectItems(subgroup)),
    ];
}

export function markActiveItems(
    groups: NavGroup[],
    activeHref: string,
): NavGroup[] {
    return groups.map((group) => ({
        ...group,
        items: group.items.map((item) => ({
            ...item,
            isActive:
                activeHref !== '' && hrefToString(item.href) === activeHref,
        })),
        groups: group.groups && markActiveItems(group.groups, activeHref),
    }));
}
