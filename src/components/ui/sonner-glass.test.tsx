/** @vitest-environment jsdom */

import { act, render } from '@testing-library/react';
import { toast } from 'sonner';
import { afterEach, describe, expect, it } from 'vitest';

import { Toaster } from './sonner';

afterEach(() => {
    act(() => toast.dismiss());
});

describe('the toaster', () => {
    it.each([
        ['success', 'text-success'],
        ['error', 'text-destructive'],
        ['warning', 'text-warning'],
        ['info', 'text-info'],
    ] as const)(
        'paints the %s icon in its role colour',
        async (kind, colour) => {
            render(<Toaster />);
            act(() => {
                toast[kind]('Ticket issued');
            });

            const icon = await new Promise<Element | null>((resolve) =>
                setTimeout(
                    () => resolve(document.querySelector('[data-icon] svg')),
                    50,
                ),
            );

            expect(icon?.getAttribute('class')).toContain(colour);
        },
    );

    it('floats on the approved glass rather than an opaque popover', async () => {
        render(<Toaster />);
        act(() => {
            toast('Ticket issued');
        });

        const toaster = await new Promise<HTMLElement | null>((resolve) =>
            setTimeout(
                () =>
                    resolve(
                        document.querySelector<HTMLElement>(
                            '[data-sonner-toaster]',
                        ),
                    ),
                50,
            ),
        );

        expect(toaster?.getAttribute('style') ?? '').toContain(
            'var(--glass-button-tint)',
        );
    });
});
