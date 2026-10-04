/** @vitest-environment jsdom */

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { UiLocaleProvider } from '@/locales/context';
import { ptLabels } from '@/locales/pt';

import {
    NotificationBell,
    type NotificationBellItem,
} from './notification-bell';

afterEach(cleanup);

const ready: NotificationBellItem = {
    id: 'a',
    title: 'Export ready',
    description: 'Sales report, 1,204 rows.',
    time: '2 minutes ago',
    unread: true,
};

const failed: NotificationBellItem = {
    id: 'b',
    title: 'Export failed',
    description: 'Timed out.',
    tone: 'destructive',
};

function badge() {
    return document.querySelector('[data-slot="notification-bell-badge"]');
}

async function openBell(name: RegExp | string = /Notifications/) {
    await userEvent.click(screen.getByRole('button', { name }));
}

describe('NotificationBell', () => {
    it('caps the badge at the ceiling it is given', () => {
        const { rerender } = render(
            <NotificationBell items={[]} unread={150} />,
        );

        expect(badge()?.textContent).toBe('99+');

        rerender(<NotificationBell items={[]} unread={12} max={9} />);

        expect(badge()?.textContent).toBe('9+');

        rerender(<NotificationBell items={[]} unread={7} />);

        expect(badge()?.textContent).toBe('7');
    });

    it('hides the badge when nothing is unread', () => {
        render(<NotificationBell items={[]} unread={0} />);

        expect(badge()).toBeNull();
        expect(
            screen.getByRole('button', { name: 'Notifications' }),
        ).not.toBeNull();
    });

    it('names the unread count on the trigger, uncapped', () => {
        render(<NotificationBell items={[]} unread={150} />);

        expect(
            screen.getByRole('button', {
                name: 'Notifications, 150 unread',
            }),
        ).not.toBeNull();
    });

    it('marks one notification as read', async () => {
        const onMarkRead = vi.fn();
        render(
            <NotificationBell
                items={[ready, failed]}
                unread={1}
                onMarkRead={onMarkRead}
            />,
        );

        await openBell();

        expect(
            screen.queryByRole('button', {
                name: 'Mark as read: Export failed',
            }),
        ).toBeNull();

        await userEvent.click(
            screen.getByRole('button', { name: 'Mark as read: Export ready' }),
        );

        expect(onMarkRead).toHaveBeenCalledWith('a');
    });

    it('marks every notification as read while some are unread', async () => {
        const onMarkAllRead = vi.fn();
        const { rerender } = render(
            <NotificationBell
                items={[ready]}
                unread={1}
                onMarkAllRead={onMarkAllRead}
            />,
        );

        await openBell();
        await userEvent.click(
            screen.getByRole('button', { name: 'Mark all as read' }),
        );

        expect(onMarkAllRead).toHaveBeenCalledTimes(1);

        rerender(
            <NotificationBell
                items={[ready]}
                unread={0}
                onMarkAllRead={onMarkAllRead}
            />,
        );

        expect(
            screen.queryByRole('button', { name: 'Mark all as read' }),
        ).toBeNull();
    });

    it('highlights unread items and tints failures', async () => {
        render(<NotificationBell items={[ready, failed]} unread={1} />);

        await openBell();

        const rows = document.querySelectorAll(
            '[data-slot="notification-bell-item"]',
        );

        expect(rows[0].className).toContain('bg-muted/50');
        expect(rows[1].className).not.toContain('bg-muted/50');
        expect(
            rows[1].querySelector(
                '[data-slot="notification-bell-item-description"]',
            )?.className,
        ).toContain('text-destructive');
    });

    it('says when there is nothing to show', async () => {
        render(<NotificationBell items={[]} unread={0} />);

        await openBell();

        expect(screen.getByText('No notifications.')).not.toBeNull();
    });

    it('announces loading instead of the list', async () => {
        render(<NotificationBell items={[ready]} unread={1} loading />);

        await openBell();

        expect(screen.getByRole('status').textContent).toContain('Loading');
        expect(screen.queryByText('Export ready')).toBeNull();
    });

    it('closes when a linked notification or the footer is followed', async () => {
        const onOpenChange = vi.fn();
        render(
            <NotificationBell
                items={[{ ...ready, href: '/exports/1' }]}
                unread={1}
                viewAllHref="/notifications"
                onOpenChange={onOpenChange}
            />,
        );

        await openBell();

        const link = screen.getByRole('link', { name: /Export ready/ });

        expect(link.getAttribute('href')).toBe('/exports/1');

        link.addEventListener('click', (event) => event.preventDefault());
        await userEvent.click(link);

        expect(onOpenChange).toHaveBeenLastCalledWith(false);
        expect(screen.queryByText('Export ready')).toBeNull();

        await openBell();

        const footer = screen.getByRole('link', { name: 'View all' });

        expect(footer.getAttribute('href')).toBe('/notifications');

        footer.addEventListener('click', (event) => event.preventDefault());
        await userEvent.click(footer);

        expect(screen.queryByRole('link', { name: 'View all' })).toBeNull();
    });

    it('renders the actions a notification brings', async () => {
        render(
            <NotificationBell
                items={[
                    {
                        ...ready,
                        actions: (
                            <a href="/exports/1/download" download>
                                Download
                            </a>
                        ),
                    },
                ]}
                unread={1}
            />,
        );

        await openBell();

        expect(
            screen
                .getByRole('link', { name: 'Download' })
                .closest('[data-slot="notification-bell-item"]'),
        ).not.toBeNull();
    });

    it('reads its Portuguese copy from the locale provider', async () => {
        render(
            <UiLocaleProvider labels={ptLabels}>
                <NotificationBell
                    items={[]}
                    unread={3}
                    onMarkAllRead={vi.fn()}
                    viewAllHref="/notificacoes"
                />
            </UiLocaleProvider>,
        );

        await openBell('Notificações, 3 por ler');

        expect(
            screen.getByRole('button', { name: 'Marcar todas como lidas' }),
        ).not.toBeNull();
        expect(screen.getByText('Sem notificações.')).not.toBeNull();
        expect(screen.getByRole('link', { name: 'Ver todas' })).not.toBeNull();
    });
});
