import type { NavGroup } from '@/types';

export const twoLevels: NavGroup = {
    label: 'Workspace',
    items: [],
    groups: [
        { label: 'Reports', items: [{ title: 'Revenue', href: '/revenue' }] },
    ],
};

export const threeLevels: NavGroup = {
    label: 'Workspace',
    items: [],
    groups: [
        {
            label: 'Archive',
            items: [],
            // @ts-expect-error a sidebar shows two levels at most
            groups: [{ label: 'Older', items: [] }],
        },
    ],
};
