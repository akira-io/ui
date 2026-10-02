// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card } from '@/components/ui/card';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
    Menubar,
    MenubarContent,
    MenubarMenu,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/ui/menubar';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';

import { installMatchMedia } from './fixtures/match-media';
import { patchPointerApis, renderInSheet } from './fixtures/sheet-overlay';
import { nestedSurfaceSelector, slot } from './helpers/nested-surface';

const innerCard = <Card slotName="inner-card" />;

const surfaces: Array<[string, () => ReactElement]> = [
    [
        'dialog',
        () => (
            <Dialog open>
                <DialogContent>
                    <DialogTitle>Dialog</DialogTitle>
                    {innerCard}
                </DialogContent>
            </Dialog>
        ),
    ],
    [
        'alert dialog',
        () => (
            <AlertDialog open>
                <AlertDialogContent>
                    <AlertDialogTitle>Alert</AlertDialogTitle>
                    {innerCard}
                </AlertDialogContent>
            </AlertDialog>
        ),
    ],
    [
        'sheet',
        () => (
            <Sheet open>
                <SheetContent>
                    <SheetTitle>Sheet</SheetTitle>
                    {innerCard}
                </SheetContent>
            </Sheet>
        ),
    ],
    [
        'drawer',
        () => (
            <Drawer open>
                <DrawerContent>
                    <DrawerTitle>Drawer</DrawerTitle>
                    {innerCard}
                </DrawerContent>
            </Drawer>
        ),
    ],
    [
        'dropdown menu',
        () => (
            <DropdownMenu open>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>{innerCard}</DropdownMenuContent>
            </DropdownMenu>
        ),
    ],
    [
        'dropdown submenu',
        () => (
            <DropdownMenu open>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSub open>
                        <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            {innerCard}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    ],
    [
        'hover card',
        () => (
            <HoverCard open>
                <HoverCardTrigger>Hover</HoverCardTrigger>
                <HoverCardContent>{innerCard}</HoverCardContent>
            </HoverCard>
        ),
    ],
    [
        'menubar menu',
        () => (
            <Menubar value="file">
                <MenubarMenu value="file">
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>{innerCard}</MenubarContent>
                </MenubarMenu>
            </Menubar>
        ),
    ],
    [
        'menubar submenu',
        () => (
            <Menubar value="file">
                <MenubarMenu value="file">
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarSub open>
                            <MenubarSubTrigger>More</MenubarSubTrigger>
                            <MenubarSubContent>{innerCard}</MenubarSubContent>
                        </MenubarSub>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        ),
    ],
    [
        'select list',
        () => (
            <Select open>
                <SelectTrigger>
                    <SelectValue placeholder="Pick" />
                </SelectTrigger>
                <SelectContent>{innerCard}</SelectContent>
            </Select>
        ),
    ],
    [
        'navigation menu',
        () => (
            <NavigationMenu value="products">
                <NavigationMenuList>
                    <NavigationMenuItem value="products">
                        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            {innerCard}
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        ),
    ],
];

beforeAll(() => {
    patchPointerApis();
    installMatchMedia();
});

afterEach(cleanup);

describe('a card inside an open surface', () => {
    it.each(surfaces)('drops its own surface in the %s', async (_, surface) => {
        render(surface());

        await waitFor(() => slot('inner-card'));

        expect(slot('inner-card').matches(nestedSurfaceSelector())).toBe(true);
    });

    it('drops its own surface in a context menu and its submenu', async () => {
        const user = userEvent.setup();

        render(
            <ContextMenu>
                <ContextMenuTrigger>Open context menu</ContextMenuTrigger>
                <ContextMenuContent>
                    <Card slotName="menu-card" />
                    <ContextMenuSub open>
                        <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                            {innerCard}
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                </ContextMenuContent>
            </ContextMenu>,
        );

        await user.pointer({
            target: screen.getByText('Open context menu'),
            keys: '[MouseRight]',
        });
        await waitFor(() => slot('inner-card'));

        expect(slot('menu-card').matches(nestedSurfaceSelector())).toBe(true);
        expect(slot('inner-card').matches(nestedSurfaceSelector())).toBe(true);
    });

    it('drops its own surface in a floating sheet', async () => {
        await renderInSheet(userEvent.setup(), innerCard);

        expect(slot('inner-card').matches(nestedSurfaceSelector())).toBe(true);
    });
});
