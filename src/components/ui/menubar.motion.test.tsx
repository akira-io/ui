// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(cleanup);

const bar = (
    <Menubar>
        <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>New tab</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>Undo</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    </Menubar>
);

describe('a menubar on motion', () => {
    it('opens one menu and unmounts it after Escape', async () => {
        const user = userEvent.setup();

        render(bar);

        await user.click(screen.getByText('File'));
        expect(await screen.findByText('New tab')).toBeTruthy();
        expect(screen.queryByText('Undo')).toBeNull();

        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('New tab')).toBeNull());
    });

    it('moves to the neighbouring menu with the arrow key', async () => {
        const user = userEvent.setup();

        render(bar);

        await user.click(screen.getByText('File'));
        await screen.findByText('New tab');
        await user.keyboard('{ArrowRight}');

        expect(await screen.findByText('Undo')).toBeTruthy();
        await waitFor(() => expect(screen.queryByText('New tab')).toBeNull());
        expect(screen.getByText('Undo')).toBeTruthy();
    });

    it('honours a controlled value naming the open menu', () => {
        render(
            <Menubar value="edit">
                <MenubarMenu value="file">
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>New tab</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu value="edit">
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Undo</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>,
        );

        expect(screen.getByText('Undo')).toBeTruthy();
        expect(screen.queryByText('New tab')).toBeNull();
    });

    it('opens a menu whose value is an empty string', async () => {
        const user = userEvent.setup();

        render(
            <Menubar>
                <MenubarMenu value="">
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>New tab</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>,
        );

        expect(screen.queryByText('New tab')).toBeNull();

        await user.click(screen.getByText('File'));

        expect(await screen.findByText('New tab')).toBeTruthy();
    });
});
