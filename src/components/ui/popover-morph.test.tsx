// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { triggerOf } from '@/lib/motion/morph-surface';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(async () => {
    cleanup();
    await new Promise((resolve) => setTimeout(resolve, 0));
});

function Menu({ morph }: { morph?: boolean }) {
    return (
        <Popover>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent morph={morph}>Body</PopoverContent>
        </Popover>
    );
}

describe('a popover asked to morph', () => {
    it('grows out of its trigger like a menu', async () => {
        const user = userEvent.setup();

        render(<Menu morph />);
        await user.click(screen.getByText('Open'));

        const content = await waitFor(() => {
            const node = document.querySelector(
                '[data-slot="popover-content"]',
            );

            expect(node).not.toBeNull();

            return node as HTMLElement;
        });

        expect(content.hasAttribute('data-morph-surface')).toBe(true);
        expect(triggerOf(content)).toBe(screen.getByText('Open'));
    });

    it('keeps the plain overlay motion by default', async () => {
        const user = userEvent.setup();

        render(<Menu />);
        await user.click(screen.getByText('Open'));

        await screen.findByText('Body');

        expect(
            document
                .querySelector('[data-slot="popover-content"]')!
                .hasAttribute('data-morph-surface'),
        ).toBe(false);
    });
});
