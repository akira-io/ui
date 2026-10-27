// @vitest-environment jsdom

import { act, cleanup, render, screen } from '@testing-library/react';
import { toast as sonner } from 'sonner';
import { afterEach, describe, expect, it } from 'vitest';

import { Toaster } from '@/components/ui/sonner';
import { toast } from '@/components/ui/toast';

afterEach(() => {
    act(() => sonner.dismiss());
    cleanup();
});

describe('the action inside a toast', () => {
    it('sits at the trailing edge because the message grows to fill the row', async () => {
        render(<Toaster />);
        act(() => {
            toast('Ava Torres mentioned you', {
                action: { label: 'Reply', onClick: () => undefined },
            });
        });

        const reply = await screen.findByRole('button', { name: 'Reply' });
        const content = reply
            .closest('[data-sonner-toast]')
            ?.querySelector('[data-content]');

        expect(content?.className.split(' ')).toContain('flex-1');
        expect(
            content!.compareDocumentPosition(reply) &
                Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
    });
});
