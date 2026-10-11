import { hrefToString } from '@/lib/href';
import type { NavGroup, NavItem, NavSubgroup } from '@/types';

export const NAV_DEPTH_WARNING =
    'A sidebar shows two levels at most (Apple HIG, Sidebars). Groups inside a subgroup are not drawn: move them into the subgroup items or into a content list.';

export function groupKey(parentKey: string, label: string): string {
    return parentKey === '' ? label : `${parentKey}/${label}`;
}

export function hasDeeperGroups(subgroup: NavSubgroup): boolean {
    return (subgroup as { groups?: unknown }).groups !== undefined;
}

export function collectItems(
    group: Pick<NavGroup, 'items' | 'groups'>,
): NavItem[] {
    return [
        ...group.items,
        ...(group.groups ?? []).flatMap((subgroup) => subgroup.items),
    ];
}

export function markActiveItems(
    groups: NavGroup[],
    activeHref: string,
): NavGroup[] {
    const mark = (items: NavItem[]): NavItem[] =>
        items.map((item) => ({
            ...item,
            isActive:
                activeHref !== '' && hrefToString(item.href) === activeHref,
        }));

    return groups.map((group) => ({
        ...group,
        items: mark(group.items),
        groups: group.groups?.map(({ label, icon, items, defaultOpen }) => ({
            label,
            icon,
            items: mark(items),
            defaultOpen,
        })),
    }));
}
