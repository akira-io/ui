// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    DropdownMenu as DropdownMenuPrimitive,
    Menubar as MenubarPrimitive,
} from 'radix-ui';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(cleanup);

describe('an overlay state never leaks into another overlay', () => {
    it('keeps a radix submenu closed while its akira parent menu is open', async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuPrimitive.Sub>
                        <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>Copy link</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPrimitive.Sub>
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        await user.click(screen.getByText('Actions'));
        await screen.findByText('Rename');

        expect(screen.queryByText('Copy link')).toBeNull();
    });

    it('keeps a radix dropdown closed inside an open akira popover', async () => {
        const user = userEvent.setup();

        render(
            <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent>
                    <DropdownMenuPrimitive.Root>
                        <DropdownMenuPrimitive.Trigger>
                            More
                        </DropdownMenuPrimitive.Trigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenuPrimitive.Root>
                </PopoverContent>
            </Popover>,
        );

        await user.click(screen.getByText('Open'));
        await screen.findByText('More');

        expect(screen.queryByText('Archive')).toBeNull();
    });

    it('opens an akira menubar menu under a radix menubar root', async () => {
        const user = userEvent.setup();

        render(
            <MenubarPrimitive.Root>
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>New tab</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </MenubarPrimitive.Root>,
        );

        await user.click(screen.getByText('File'));

        expect(await screen.findByText('New tab')).toBeTruthy();
    });

    it('keeps a radix menu inside an open dialog closed', async () => {
        const user = userEvent.setup();

        render(
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                    <DialogTitle>Invoice</DialogTitle>
                    <DropdownMenuPrimitive.Root>
                        <DropdownMenuTrigger>More</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenuPrimitive.Root>
                </DialogContent>
            </Dialog>,
        );

        await user.click(screen.getByText('Open'));

        expect(screen.getByText('More')).toBeTruthy();
        expect(screen.queryByText('Archive')).toBeNull();
    });
});
