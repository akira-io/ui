import { describe, expect, it } from 'vitest';

import { mostSpecificActiveHref } from '@/lib/href';
import { collectItems, groupKey, markActiveItems } from '@/lib/nav-groups';
import type { NavGroup } from '@/types';

const components: NavGroup = {
    label: 'Components',
    items: [{ title: 'Overview', href: '/components' }],
    groups: [
        {
            label: 'Forms',
            items: [{ title: 'Input', href: '/components/forms/input' }],
            groups: [
                {
                    label: 'Pickers',
                    items: [
                        {
                            title: 'Date',
                            href: '/components/forms/pickers/date',
                        },
                    ],
                },
            ],
        },
    ],
};

function activeTitles(group: NavGroup): string[] {
    return collectItems(group)
        .filter((item) => item.isActive)
        .map((item) => item.title);
}

describe('groupKey', () => {
    it('joins labels into a path', () => {
        expect(groupKey('', 'Forms')).toBe('Forms');
        expect(groupKey('Components', 'Forms')).toBe('Components/Forms');
    });
});

describe('collectItems', () => {
    it('walks every subgroup depth first', () => {
        expect(collectItems(components).map((item) => item.title)).toEqual([
            'Overview',
            'Input',
            'Date',
        ]);
    });
});

describe('the active item in a tree of groups', () => {
    it('is the most specific href at any depth', () => {
        const hrefs = collectItems(components).map((item) => item.href);
        const active = mostSpecificActiveHref(
            hrefs,
            '/components/forms/pickers/date',
        );

        expect(activeTitles(markActiveItems([components], active)[0])).toEqual([
            'Date',
        ]);
    });

    it('lights every item that shares the winning href', () => {
        const twins: NavGroup = {
            label: 'Guides',
            items: [],
            groups: [
                { label: 'A', items: [{ title: 'Setup', href: '/setup' }] },
                {
                    label: 'B',
                    items: [{ title: 'Setup again', href: '/setup' }],
                },
            ],
        };

        expect(activeTitles(markActiveItems([twins], '/setup')[0])).toEqual([
            'Setup',
            'Setup again',
        ]);
    });

    it('lights nothing when no route matches', () => {
        const blank: NavGroup = {
            items: [{ title: 'Home', href: '' }],
        };

        expect(activeTitles(markActiveItems([blank], '')[0])).toEqual([]);
    });
});
