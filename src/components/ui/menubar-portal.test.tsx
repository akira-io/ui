// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/ui/menubar';
import {
    OVERLAY_LABEL,
    panels,
    parentContent,
    patchPointerApis,
    renderInSheet,
} from '../../../tests/fixtures/sheet-overlay';

const menubar = (
    <Menubar>
        <MenubarMenu>
            <MenubarTrigger>Open menubar</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>{OVERLAY_LABEL}</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    </Menubar>
);

const menubarWithSubmenu = (
    <Menubar>
        <MenubarMenu>
            <MenubarTrigger>Open menubar</MenubarTrigger>
            <MenubarContent slotName="parent-content">
                <MenubarSub>
                    <MenubarSubTrigger>More</MenubarSubTrigger>
                    <MenubarSubContent>
                        <MenubarItem>{OVERLAY_LABEL}</MenubarItem>
                    </MenubarSubContent>
                </MenubarSub>
            </MenubarContent>
        </MenubarMenu>
    </Menubar>
);

async function openSubmenu(user: ReturnType<typeof userEvent.setup>) {
    await user.click(screen.getByText('Open menubar'));
    await user.click(await screen.findByText('More'));

    return screen.findByText(OVERLAY_LABEL);
}

beforeAll(patchPointerApis);

afterEach(cleanup);

describe('a menubar menu', () => {
    it('renders its content inside the sheet panels', async () => {
        const user = userEvent.setup();

        await renderInSheet(user, menubar);
        await user.click(screen.getByText('Open menubar'));

        const content = await screen.findByText(OVERLAY_LABEL);

        expect(panels()?.contains(content)).toBe(true);
    });

    it('keeps its content on the body with no sheet around it', async () => {
        const user = userEvent.setup();

        render(menubar);

        await user.click(screen.getByText('Open menubar'));

        const content = await screen.findByText(OVERLAY_LABEL);

        expect(panels()).toBeNull();
        expect(document.body.contains(content)).toBe(true);
    });
});

describe('a menubar submenu', () => {
    it('renders outside the parent content that clips it', async () => {
        const user = userEvent.setup();

        render(menubarWithSubmenu);

        const submenu = await openSubmenu(user);

        expect(parentContent()?.contains(submenu)).toBe(false);
        expect(document.body.contains(submenu)).toBe(true);
    });

    it('renders inside the sheet panels', async () => {
        const user = userEvent.setup();

        await renderInSheet(user, menubarWithSubmenu);

        const submenu = await openSubmenu(user);

        expect(parentContent()?.contains(submenu)).toBe(false);
        expect(panels()?.contains(submenu)).toBe(true);
    });

    it('renders into the container it is given', async () => {
        const user = userEvent.setup();
        const target = document.createElement('div');

        document.body.append(target);

        render(
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>Open menubar</MenubarTrigger>
                    <MenubarContent>
                        <MenubarSub>
                            <MenubarSubTrigger>More</MenubarSubTrigger>
                            <MenubarSubContent container={target}>
                                <MenubarItem>{OVERLAY_LABEL}</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>,
        );

        await user.click(screen.getByText('Open menubar'));
        await user.click(await screen.findByText('More'));

        expect(target.contains(await screen.findByText(OVERLAY_LABEL))).toBe(
            true,
        );

        target.remove();
    });
});
