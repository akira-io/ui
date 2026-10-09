// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(cleanup);

const menu = (
    <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                    <DropdownMenuItem>Copy link</DropdownMenuItem>
                </DropdownMenuSubContent>
            </DropdownMenuSub>
        </DropdownMenuContent>
    </DropdownMenu>
);

describe('a dropdown menu on motion', () => {
    it('opens from its trigger and unmounts after Escape', async () => {
        const user = userEvent.setup();

        render(menu);

        await user.click(screen.getByText('Actions'));
        expect(await screen.findByText('Rename')).toBeTruthy();

        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('Rename')).toBeNull());
    });

    it('opens a submenu from its item', async () => {
        const user = userEvent.setup();

        render(menu);

        await user.click(screen.getByText('Actions'));
        await user.click(await screen.findByText('Share'));

        expect(await screen.findByText('Copy link')).toBeTruthy();
    });

    it('unmounts the submenu with its parent', async () => {
        const user = userEvent.setup();

        render(menu);

        await user.click(screen.getByText('Actions'));
        await user.click(await screen.findByText('Share'));
        await screen.findByText('Copy link');

        await user.keyboard('{Escape}');

        await waitFor(() => {
            expect(screen.queryByText('Copy link')).toBeNull();
            expect(screen.queryByText('Rename')).toBeNull();
        });
    });

    it('scales the menu from its trigger origin', async () => {
        const user = userEvent.setup();

        render(menu);

        await user.click(screen.getByText('Actions'));
        const content = (await screen.findByText('Rename')).closest(
            '[data-slot="dropdown-menu-content"]',
        );

        expect(content?.className).toContain(
            'origin-(--radix-dropdown-menu-content-transform-origin)',
        );
    });
});
