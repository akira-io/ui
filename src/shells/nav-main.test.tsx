// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { SIDEBAR_COLLAPSED_GROUPS_KEY } from '@/hooks/use-collapsed-groups';
import {
    CollapsibleGroup,
    ControlledGroup,
    groupIsOpen,
    groupTrigger,
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
