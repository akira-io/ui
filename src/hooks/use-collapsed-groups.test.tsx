// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
    SIDEBAR_COLLAPSED_GROUPS_KEY,
    SIDEBAR_EXPANDED_GROUPS_KEY,
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

function persistExpanded(groups: string[]): void {
    window.localStorage.setItem(
        SIDEBAR_EXPANDED_GROUPS_KEY,
        JSON.stringify(groups),
    );
}

function Toggle({
    group,
    defaultOpen,
}: {
    group: string;
    defaultOpen?: boolean;
}) {
    const { open, setOpen } = useCollapsedGroup({ group, defaultOpen });

    return (
        <button
            type="button"
            data-group={group}
            data-open={open}
            onClick={() => setOpen(!open)}
        >
            {group}
        </button>
    );
}

function isOpen(group: string, index = 0): boolean {
    return (
        document
            .querySelectorAll(`[data-group="${group}"]`)
            [index]?.getAttribute('data-open') === 'true'
    );
}

describe('a group that starts closed', () => {
    it('stays closed on the next page after another group is collapsed', () => {
        render(
            <>
                <Toggle group="Reports" />
                <Toggle group="Components/Forms" defaultOpen={false} />
            </>,
        );

        fireEvent.click(screen.getByText('Reports'));
        cleanup();
        render(<Toggle group="Components/Forms" defaultOpen={false} />);

        expect(isOpen('Components/Forms')).toBe(false);
    });

    it('remembers being opened', () => {
        persistExpanded(['Components/Forms']);

        expect(
            renderPasses({ group: 'Components/Forms', defaultOpen: false })[0],
        ).toBe(true);
    });
});

describe('the same group drawn twice', () => {
    it('toggles both copies', () => {
        render(
            <>
                <Toggle group="Reports" />
                <Toggle group="Reports" />
            </>,
        );

        fireEvent.click(screen.getAllByText('Reports')[0]);

        expect(isOpen('Reports', 0)).toBe(false);
        expect(isOpen('Reports', 1)).toBe(false);
    });
});

describe('a group collapsed in another tab', () => {
    it('follows the storage event', () => {
        render(<Toggle group="Reports" />);

        act(() => {
            persist(['Reports']);
            window.dispatchEvent(
                new StorageEvent('storage', {
                    key: SIDEBAR_COLLAPSED_GROUPS_KEY,
                }),
            );
        });

        expect(isOpen('Reports')).toBe(false);
    });
});

describe('storage that refuses access', () => {
    it('follows defaultOpen and toggles without throwing', () => {
        const own = Object.getOwnPropertyDescriptor(window, 'localStorage');

        Object.defineProperty(window, 'localStorage', {
            configurable: true,
            get() {
                throw new DOMException('denied', 'SecurityError');
            },
        });

        try {
            render(<Toggle group="Reports" defaultOpen={false} />);

            expect(isOpen('Reports')).toBe(false);
            expect(() =>
                fireEvent.click(screen.getByText('Reports')),
            ).not.toThrow();
        } finally {
            if (own) {
                Object.defineProperty(window, 'localStorage', own);
            } else {
                Reflect.deleteProperty(window, 'localStorage');
            }
        }
    });
});
