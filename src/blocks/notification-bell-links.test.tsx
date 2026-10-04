/** @vitest-environment jsdom */

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { NotificationBell } from './notification-bell';

afterEach(cleanup);

describe('NotificationBell links that are not navigable', () => {
    it.each(['javascript:alert(1)', ' \tjavascript:alert(1)'])(
        'renders %j as plain text and drops the footer link',
        async (href) => {
            render(
                <NotificationBell
                    items={[{ id: 'a', title: 'Export ready', href }]}
                    unread={1}
                    viewAllHref={{ url: href }}
                />,
            );

            await userEvent.click(
                screen.getByRole('button', { name: /Notifications/ }),
            );

            expect(screen.getByText('Export ready')).not.toBeNull();
            expect(screen.queryAllByRole('link')).toEqual([]);
        },
    );

    it('keeps an https link and a relative footer link', async () => {
        render(
            <NotificationBell
                items={[
                    { id: 'a', title: 'Export ready', href: 'https://x.test' },
                ]}
                unread={1}
                viewAllHref="/notifications"
            />,
        );

        await userEvent.click(
            screen.getByRole('button', { name: /Notifications/ }),
        );

        expect(
            screen
                .getAllByRole('link')
                .map((link) => link.getAttribute('href')),
        ).toEqual(['https://x.test', '/notifications']);
    });
});
