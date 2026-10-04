/** @vitest-environment jsdom */

import { cleanup, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const poll = vi.hoisted(() => ({
    start: vi.fn(),
    stop: vi.fn(),
    usePoll: vi.fn(),
}));

vi.mock('@inertiajs/react', () => ({
    Form: () => null,
    Link: ({ href, children }: { href: string; children?: ReactNode }) => (
        <a href={href} data-inertia-link="">
            {children}
        </a>
    ),
    router: { visit: vi.fn() },
    usePage: () => ({ url: '/', props: {} }),
    usePoll: poll.usePoll,
}));

import { InertiaNotificationBell } from '@/inertia';

beforeEach(() => {
    poll.usePoll.mockImplementation(() => ({
        start: poll.start,
        stop: poll.stop,
    }));
});

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

describe('the Inertia notification bell', () => {
    it('reloads only the props it is told to, without starting on its own', () => {
        render(
            <InertiaNotificationBell
                items={[]}
                unread={0}
                poll={{
                    interval: 10000,
                    only: ['notifications'],
                    active: false,
                }}
            />,
        );

        expect(poll.usePoll).toHaveBeenCalledWith(
            10000,
            { only: ['notifications'] },
            { autoStart: false },
        );
        expect(poll.start).not.toHaveBeenCalled();
    });

    it('starts polling while active and stops once it is not', () => {
        const { rerender } = render(
            <InertiaNotificationBell
                items={[]}
                unread={0}
                poll={{ interval: 10000, active: true }}
            />,
        );

        expect(poll.start).toHaveBeenCalledTimes(1);

        rerender(
            <InertiaNotificationBell
                items={[]}
                unread={1}
                poll={{ interval: 10000, active: true }}
            />,
        );

        expect(poll.start).toHaveBeenCalledTimes(1);
        expect(poll.stop).not.toHaveBeenCalled();

        rerender(
            <InertiaNotificationBell
                items={[]}
                unread={1}
                poll={{ interval: 10000, active: false }}
            />,
        );

        expect(poll.stop).toHaveBeenCalledTimes(1);
    });

    it('stops polling when it unmounts', () => {
        const { unmount } = render(
            <InertiaNotificationBell
                items={[]}
                unread={0}
                poll={{ interval: 10000, active: true }}
            />,
        );

        unmount();

        expect(poll.stop).toHaveBeenCalledTimes(1);
    });

    it('never polls without a poll configuration', () => {
        render(<InertiaNotificationBell items={[]} unread={0} />);

        expect(poll.start).not.toHaveBeenCalled();
    });

    it('links through the Inertia Link', () => {
        render(
            <InertiaNotificationBell
                items={[]}
                unread={0}
                open
                viewAllHref="/notifications"
            />,
        );

        expect(
            screen
                .getByRole('link', { name: 'View all' })
                .hasAttribute('data-inertia-link'),
        ).toBe(true);
    });
});
