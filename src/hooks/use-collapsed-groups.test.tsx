// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
    SIDEBAR_COLLAPSED_GROUPS_KEY,
    useCollapsedGroup,
    type CollapsedGroupsOptions,
} from '@/hooks/use-collapsed-groups';

beforeEach(() => {
    window.localStorage.clear();
});

afterEach(cleanup);

function renderPasses(options: CollapsedGroupsOptions): boolean[] {
    const passes: boolean[] = [];

    function Probe() {
        passes.push(useCollapsedGroup(options).open);

        return null;
    }

    render(<Probe />);

    return passes;
}

function persist(groups: string[]): void {
    window.localStorage.setItem(
        SIDEBAR_COLLAPSED_GROUPS_KEY,
        JSON.stringify(groups),
    );
}

describe('a group collapsed on an earlier visit', () => {
    it('is already closed on the first render, so it never flashes open', () => {
        persist(['Reports']);

        expect(renderPasses({ group: 'Reports' })[0]).toBe(false);
    });

    it('settles closed without a second render', () => {
        persist(['Reports']);

        expect(renderPasses({ group: 'Reports' })).toEqual([false]);
    });

    it('leaves a group nobody collapsed open on the first render', () => {
        persist(['Platform']);

        expect(renderPasses({ group: 'Reports' })[0]).toBe(true);
    });
});

describe('a group with nothing persisted', () => {
    it('follows defaultOpen on the first render', () => {
        expect(renderPasses({ group: 'Reports' })[0]).toBe(true);
        cleanup();
        expect(renderPasses({ group: 'Reports', defaultOpen: false })[0]).toBe(
            false,
        );
    });

    it('ignores unreadable storage', () => {
        window.localStorage.setItem(SIDEBAR_COLLAPSED_GROUPS_KEY, 'not json');

        expect(renderPasses({ group: 'Reports', defaultOpen: false })[0]).toBe(
            false,
        );
    });
});

describe('a controlled group', () => {
    it('takes its first render from the app, never from storage', () => {
        persist(['Reports']);

        expect(
            renderPasses({
                group: 'Reports',
                collapsedGroups: [],
                onCollapsedChange: () => {},
            }),
        ).toEqual([true]);
    });
});
