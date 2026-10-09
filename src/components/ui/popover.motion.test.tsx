// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover as PopoverPrimitive } from 'radix-ui';
import * as React from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(cleanup);

function Controlled({ allowClose }: { allowClose: boolean }) {
    const [open, setOpen] = React.useState(true);

    return (
        <Popover
            open={open}
            onOpenChange={(next) => (allowClose || next) && setOpen(next)}
        >
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent>Body</PopoverContent>
            <output>{open ? 'open' : 'closed'}</output>
        </Popover>
    );
}

const uncontrolled = (
    <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Body</PopoverContent>
    </Popover>
);

describe('a popover on motion', () => {
    it('opens from its trigger and unmounts after closing on Escape', async () => {
        const user = userEvent.setup();

        render(uncontrolled);

        await user.click(screen.getByText('Open'));
        expect(await screen.findByText('Body')).toBeTruthy();

        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('Body')).toBeNull());
    });

    it('keeps its content while a controlling parent refuses to close', async () => {
        const user = userEvent.setup();

        render(<Controlled allowClose={false} />);

        await user.keyboard('{Escape}');

        expect(screen.getByText('Body')).toBeTruthy();
        expect(screen.getByText('open')).toBeTruthy();
    });

    it('closes when a controlling parent lets it', async () => {
        const user = userEvent.setup();

        render(<Controlled allowClose />);

        await user.keyboard('{Escape}');

        await waitFor(() => expect(screen.queryByText('Body')).toBeNull());
    });

    it('reopens while closing without leaving two contents behind', async () => {
        const user = userEvent.setup();

        render(uncontrolled);

        await user.click(screen.getByText('Open'));
        await user.keyboard('{Escape}');
        await user.click(screen.getByText('Open'));

        await waitFor(() =>
            expect(screen.getAllByText('Body')).toHaveLength(1),
        );
    });

    it('still opens and closes under the radix root without an akira root', async () => {
        const user = userEvent.setup();

        render(
            <PopoverPrimitive.Root>
                <PopoverPrimitive.Trigger>Open</PopoverPrimitive.Trigger>
                <PopoverContent>Body</PopoverContent>
            </PopoverPrimitive.Root>,
        );

        await user.click(screen.getByText('Open'));
        expect(await screen.findByText('Body')).toBeTruthy();

        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('Body')).toBeNull());
    });

    it('keeps its slot, surface mark and trigger origin on the animated element', async () => {
        const user = userEvent.setup();

        render(uncontrolled);

        await user.click(screen.getByText('Open'));
        const content = (await screen.findByText('Body')).closest(
            '[data-slot="popover-content"]',
        );

        expect(content?.hasAttribute('data-surface')).toBe(true);
        expect(content?.className).toContain(
            'origin-(--radix-popover-content-transform-origin)',
        );
    });
});
