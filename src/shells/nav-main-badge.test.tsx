// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { installMatchMedia } from '../../tests/fixtures/match-media';
import {
    BadgedFooter,
    BadgedGroup,
    BadgedRail,
    navBadge,
    navBadgeDot,
    navLink,
    railIsCollapsed,
} from '../../tests/fixtures/nav-main';
import { installResizeObserver } from '../../tests/fixtures/resize-observer';

beforeAll(() => {
    installMatchMedia();
    installResizeObserver();
});

afterEach(cleanup);

describe('a nav item badge', () => {
    it('paints nothing when the count is zero or the item carries no badge', () => {
        render(
            <BadgedGroup
                items={[
                    { title: 'Refunds', href: '/refunds', badge: 0 },
                    { title: 'Orders', href: '/orders' },
                ]}
            />,
        );

        expect(navBadge('Refunds')).toBeNull();
        expect(navBadge('Orders')).toBeNull();
        expect(navBadgeDot('Refunds')).toBeNull();
    });

    it('paints the count when there is work pending', () => {
        render(
            <BadgedGroup
                items={[{ title: 'Refunds', href: '/refunds', badge: 42 }]}
            />,
        );

        expect(navBadge('Refunds')?.textContent).toBe('42');
    });

    it('paints the ceiling itself and truncates only past it', () => {
        render(
            <BadgedGroup
                items={[
                    { title: 'Refunds', href: '/refunds', badge: 99 },
                    { title: 'Orders', href: '/orders', badge: 100 },
                    { title: 'Payouts', href: '/payouts', badge: 1200 },
                ]}
            />,
        );

        expect(navBadge('Refunds')?.textContent).toBe('99');
        expect(navBadge('Orders')?.textContent).toBe('99+');
        expect(navBadge('Payouts')?.textContent).toBe('99+');
    });

    it('drops every count that is not a whole figure to show', () => {
        render(
            <BadgedGroup
                items={[
                    { title: 'Refunds', href: '/refunds', badge: -3 },
                    { title: 'Orders', href: '/orders', badge: 0.4 },
                    { title: 'Payouts', href: '/payouts', badge: Number.NaN },
                    {
                        title: 'Disputes',
                        href: '/disputes',
                        badge: Number.POSITIVE_INFINITY,
                    },
                ]}
            />,
        );

        for (const title of ['Refunds', 'Orders', 'Payouts', 'Disputes']) {
            expect(navBadge(title)).toBeNull();
        }
    });

    it('rounds a fractional count down to the figure it shows', () => {
        render(
            <BadgedGroup
                items={[{ title: 'Refunds', href: '/refunds', badge: 7.9 }]}
            />,
        );

        expect(navBadge('Refunds')?.textContent).toBe('7');
    });

    it('takes a node for anything that is not a count', () => {
        render(
            <BadgedGroup
                items={[
                    {
                        title: 'Refunds',
                        href: '/refunds',
                        badge: <span data-testid="custom">new</span>,
                    },
                ]}
            />,
        );

        expect(navBadge('Refunds')?.textContent).toBe('new');
        expect(screen.getByTestId('custom')).toBeDefined();
    });

    it('paints no empty pill for a value that renders nothing', () => {
        render(
            <BadgedGroup
                items={[
                    { title: 'Refunds', href: '/refunds', badge: [] },
                    { title: 'Orders', href: '/orders', badge: false },
                    { title: 'Payouts', href: '/payouts', badge: true },
                ]}
            />,
        );

        for (const title of ['Refunds', 'Orders', 'Payouts']) {
            expect(navBadge(title)).toBeNull();
            expect(navBadgeDot(title)).toBeNull();
        }
    });

    it('drops an empty string but keeps a short one', () => {
        render(
            <BadgedGroup
                items={[
                    { title: 'Refunds', href: '/refunds', badge: '   ' },
                    { title: 'Orders', href: '/orders', badge: 'new' },
                ]}
            />,
        );

        expect(navBadge('Refunds')).toBeNull();
        expect(navBadge('Orders')?.textContent).toBe('new');
    });

    it('keeps room for the pill so the label truncates beside it', () => {
        render(
            <BadgedGroup
                items={[
                    { title: 'Refunds', href: '/refunds', badge: 1200 },
                    { title: 'Orders', href: '/orders' },
                ]}
            />,
        );

        expect(navLink('Refunds').className).toContain('pr-10');
        expect(navLink('Orders').className).not.toContain('pr-10');
    });

    it('names what the count measures on the link and hides the bare number', () => {
        render(
            <BadgedGroup
                items={[
                    {
                        title: 'Refunds',
                        href: '/refunds',
                        badge: 7,
                        badgeLabel: '7 requests awaiting review',
                    },
                ]}
            />,
        );

        expect(navLink('Refunds').getAttribute('aria-label')).toBe(
            'Refunds, 7 requests awaiting review',
        );
        expect(navBadge('Refunds')?.getAttribute('aria-hidden')).toBe('true');
    });

    it('leaves the number readable when the app names nothing', () => {
        render(
            <BadgedGroup
                items={[{ title: 'Refunds', href: '/refunds', badge: 7 }]}
            />,
        );

        expect(navLink('Refunds').getAttribute('aria-label')).toBeNull();
        expect(navBadge('Refunds')?.getAttribute('aria-hidden')).toBeNull();
    });

    it('reaches a badge inside a collapsible group', () => {
        render(
            <BadgedGroup
                collapsible
                items={[{ title: 'Refunds', href: '/refunds', badge: 7 }]}
            />,
        );

        expect(navBadge('Refunds')?.textContent).toBe('7');
    });

    it('ignores the field in the footer, whose items are external links', () => {
        render(
            <BadgedFooter
                items={[
                    { title: 'Docs', href: 'https://example.test', badge: 7 },
                ]}
            />,
        );

        expect(navBadge('Docs')).toBeNull();
        expect(navBadgeDot('Docs')).toBeNull();
    });
});

describe('a nav item badge on the collapsed rail', () => {
    it('shows the dot and keeps the pill out of the icon row', () => {
        render(
            <BadgedRail
                items={[{ title: 'Refunds', href: '/refunds', badge: 7 }]}
            />,
        );

        expect(railIsCollapsed()).toBe(true);
        expect(navBadgeDot('Refunds')).not.toBeNull();
        expect(navBadge('Refunds')?.className).toContain(
            'group-data-[collapsible=icon]:hidden',
        );
        expect(navBadgeDot('Refunds')?.className).toContain(
            'group-data-[collapsible=icon]:block',
        );
    });

    it('carries the named count into the tooltip the rail shows', async () => {
        const user = userEvent.setup();
        render(
            <BadgedRail
                items={[
                    {
                        title: 'Refunds',
                        href: '/refunds',
                        badge: 7,
                        badgeLabel: '7 requests awaiting review',
                    },
                ]}
            />,
        );

        await user.hover(navLink('Refunds'));

        await waitFor(() => {
            const tooltip = screen.getAllByText(
                'Refunds (7 requests awaiting review)',
            );

            expect(tooltip.length).toBeGreaterThan(0);
            expect(tooltip[0].closest('[hidden]')).toBeNull();
        });
    });

    it('falls back to the bare count when the app names nothing', async () => {
        const user = userEvent.setup();
        render(
            <BadgedRail
                items={[{ title: 'Refunds', href: '/refunds', badge: 1200 }]}
            />,
        );

        await user.hover(navLink('Refunds'));

        await waitFor(() =>
            expect(screen.getAllByText('Refunds (99+)').length).toBeGreaterThan(
                0,
            ),
        );
    });

    it('says nothing about a count the row does not show', async () => {
        const user = userEvent.setup();
        render(
            <BadgedRail
                items={[
                    {
                        title: 'Refunds',
                        href: '/refunds',
                        badge: 0,
                        badgeLabel: '0 requests awaiting review',
                    },
                ]}
            />,
        );

        await user.hover(navLink('Refunds'));

        await waitFor(() =>
            expect(screen.getAllByText('Refunds').length).toBeGreaterThan(0),
        );

        expect(
            screen.queryByText('Refunds (0 requests awaiting review)'),
        ).toBeNull();
    });
});
