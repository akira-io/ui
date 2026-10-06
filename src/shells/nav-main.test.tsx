// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { SIDEBAR_COLLAPSED_GROUPS_KEY } from '@/hooks/use-collapsed-groups';
import {
    activeTitles,
    CollapsibleGroup,
    ControlledGroup,
    groupIsOpen,
    groupLabel,
    groupTrigger,
    NestedGroup,
    RailGroup,
    UnlabelledGroup,
} from '../../tests/fixtures/nav-main';

beforeAll(() => {
    window.matchMedia ??= ((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
});

beforeEach(() => {
    window.localStorage.clear();
});

afterEach(cleanup);

describe('a collapsible nav group', () => {
    it('starts open and collapses on the label', async () => {
        const user = userEvent.setup();
        render(<CollapsibleGroup />);

        expect(groupIsOpen()).toBe(true);

        await user.click(groupTrigger());

        await waitFor(() => expect(groupIsOpen()).toBe(false));
    });

    it('remembers the collapsed group across a remount', async () => {
        const user = userEvent.setup();
        render(<CollapsibleGroup />);

        await user.click(groupTrigger());
        await waitFor(() => expect(groupIsOpen()).toBe(false));

        expect(
            JSON.parse(
                window.localStorage.getItem(SIDEBAR_COLLAPSED_GROUPS_KEY) ??
                    '[]',
            ),
        ).toEqual(['Reports']);

        cleanup();
        render(<CollapsibleGroup />);

        await waitFor(() => expect(groupIsOpen()).toBe(false));
    });

    it('leaves other groups untouched when one is collapsed', async () => {
        const user = userEvent.setup();
        window.localStorage.setItem(
            SIDEBAR_COLLAPSED_GROUPS_KEY,
            JSON.stringify(['Platform']),
        );
        render(<CollapsibleGroup />);

        await user.click(groupTrigger());

        await waitFor(() =>
            expect(
                JSON.parse(
                    window.localStorage.getItem(SIDEBAR_COLLAPSED_GROUPS_KEY) ??
                        '[]',
                ),
            ).toEqual(['Platform', 'Reports']),
        );
    });

    it('opens the group holding the current route even when it was collapsed', async () => {
        window.localStorage.setItem(
            SIDEBAR_COLLAPSED_GROUPS_KEY,
            JSON.stringify(['Reports']),
        );
        render(<CollapsibleGroup currentUrl="/reports/churn" />);

        expect(groupIsOpen()).toBe(true);
        expect(screen.getByText('Churn')).toBeDefined();

        await waitFor(() => expect(groupIsOpen()).toBe(true));
    });
});

describe('a controlled nav group', () => {
    it('takes its state from the app', async () => {
        render(<ControlledGroup initialCollapsed={['Reports']} />);

        expect(groupIsOpen()).toBe(false);
    });

    it('writes nothing to storage when the app owns the state', async () => {
        const user = userEvent.setup();
        render(<ControlledGroup />);

        await user.click(groupTrigger());
        await waitFor(() => expect(groupIsOpen()).toBe(false));

        expect(
            window.localStorage.getItem(SIDEBAR_COLLAPSED_GROUPS_KEY),
        ).toBeNull();
    });

    it('ignores anything already in storage', () => {
        window.localStorage.setItem(
            SIDEBAR_COLLAPSED_GROUPS_KEY,
            JSON.stringify(['Reports']),
        );
        render(<ControlledGroup />);

        expect(groupIsOpen()).toBe(true);
    });
});

describe('a nav group without a label', () => {
    it('renders no title', () => {
        render(<UnlabelledGroup />);

        expect(groupLabel()).toBeNull();
        expect(screen.getByText('Revenue')).toBeDefined();
    });

    it('stays expanded and untitled when asked to collapse', () => {
        render(<UnlabelledGroup collapsible />);

        expect(groupLabel()).toBeNull();
        expect(screen.getByText('Churn')).toBeDefined();
    });
});

describe('the active item of a nav group', () => {
    it('lights only the longest matching path', () => {
        render(<NestedGroup currentUrl="/reports/sales/operators?page=2" />);

        expect(activeTitles()).toEqual(['Operators']);
    });

    it('lights the parent on a page only it covers', () => {
        render(<NestedGroup currentUrl="/reports/sales/4821" />);

        expect(activeTitles()).toEqual(['Sales']);
    });

    it('keeps an explicit active state the app sets', () => {
        render(
            <NestedGroup currentUrl="/reports/sales/operators" salesActive />,
        );

        expect(activeTitles()).toEqual(['Sales', 'Operators']);
    });
});

describe('a collapsed group on the icon rail', () => {
    it('shows its items without forgetting it was collapsed', () => {
        window.localStorage.setItem(
            SIDEBAR_COLLAPSED_GROUPS_KEY,
            JSON.stringify(['Reports']),
        );
        render(<RailGroup />);

        expect(groupIsOpen()).toBe(true);
        expect(screen.getByText('Churn')).toBeDefined();
        expect(window.localStorage.getItem(SIDEBAR_COLLAPSED_GROUPS_KEY)).toBe(
            JSON.stringify(['Reports']),
        );
    });

    it('stays collapsed while the sidebar is expanded', () => {
        window.localStorage.setItem(
            SIDEBAR_COLLAPSED_GROUPS_KEY,
            JSON.stringify(['Reports']),
        );
        render(<RailGroup open />);

        expect(groupIsOpen()).toBe(false);
    });
});

describe('the label of a collapsible group', () => {
    it('is a button that reports whether the group is expanded', () => {
        render(<CollapsibleGroup />);

        const trigger = screen.getByRole('button', { name: 'Reports' });

        expect(trigger.tagName).toBe('BUTTON');
        expect(trigger.getAttribute('type')).toBe('button');
        expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('toggles the group from the keyboard', async () => {
        const user = userEvent.setup();
        render(<CollapsibleGroup />);

        await user.tab();

        const trigger = screen.getByRole('button', { name: 'Reports' });

        expect(document.activeElement).toBe(trigger);

        await user.keyboard('{Enter}');
        await waitFor(() =>
            expect(trigger.getAttribute('aria-expanded')).toBe('false'),
        );

        await user.keyboard(' ');
        await waitFor(() =>
            expect(trigger.getAttribute('aria-expanded')).toBe('true'),
        );
    });

    it('leaves the tab order while the rail shows icons only', () => {
        render(<RailGroup />);

        expect(groupTrigger().tagName).toBe('BUTTON');
        expect(groupTrigger().tabIndex).toBe(-1);
    });

    it('stays in the tab order while the sidebar is expanded', () => {
        render(<RailGroup open />);

        expect(groupTrigger().tabIndex).toBe(0);
    });
});
