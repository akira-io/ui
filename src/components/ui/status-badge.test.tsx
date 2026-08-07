// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    StatusBadge,
    type StatusBadgeStatus,
} from '@/components/ui/status-badge';

afterEach(cleanup);

const STATUSES: StatusBadgeStatus[] = [
    'neutral',
    'info',
    'success',
    'warning',
    'danger',
];

describe('StatusBadge', () => {
    it.each(STATUSES)(
        'names the %s state in text, not colour alone',
        (status) => {
            render(<StatusBadge status={status}>Paid</StatusBadge>);

            const badge = screen.getByText('Paid');

            expect(badge.textContent?.trim()).toBe('Paid');
            expect(badge.getAttribute('data-status')).toBe(status);
            expect(badge.getAttribute('data-slot')).toBe('status-badge');
        },
    );

    it.each(STATUSES)(
        'keeps the %s state readable when it carries a dot',
        (status) => {
            render(
                <StatusBadge status={status} dot>
                    Paid
                </StatusBadge>,
            );

            const badge = screen.getByText('Paid');
            const dot = badge.querySelector(
                '[data-slot="status-badge-dot"]',
            ) as HTMLElement;

            expect(dot).not.toBeNull();
            expect(dot.getAttribute('aria-hidden')).toBe('true');
            expect(badge.textContent?.trim()).toBe('Paid');
        },
    );

    it('defaults to the neutral state', () => {
        render(<StatusBadge>Draft</StatusBadge>);

        expect(screen.getByText('Draft').getAttribute('data-status')).toBe(
            'neutral',
        );
    });

    it('renders no dot unless asked for one', () => {
        render(<StatusBadge status="success">Paid</StatusBadge>);

        expect(
            screen
                .getByText('Paid')
                .querySelector('[data-slot="status-badge-dot"]'),
        ).toBeNull();
    });

    it('paints every state from a token rather than a literal colour', () => {
        const tints: Record<StatusBadgeStatus, string> = {
            neutral: 'bg-muted',
            info: 'bg-info/10',
            success: 'bg-success/10',
            warning: 'bg-warning/10',
            danger: 'bg-destructive/10',
        };

        for (const status of STATUSES) {
            const view = render(
                <StatusBadge status={status}>Paid</StatusBadge>,
            );

            expect(screen.getByText('Paid').className).toContain(tints[status]);

            view.unmount();
        }
    });

    it('keeps layout classes from the caller', () => {
        render(
            <StatusBadge status="info" className="ml-2">
                Held
            </StatusBadge>,
        );

        expect(screen.getByText('Held').className).toContain('ml-2');
    });
});
