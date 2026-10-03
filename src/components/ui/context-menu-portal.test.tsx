// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
    OVERLAY_LABEL,
    panels,
    parentContent,
    patchPointerApis,
    renderInSheet,
} from '../../../tests/fixtures/sheet-overlay';

const contextMenu = (
    <ContextMenu>
        <ContextMenuTrigger>Open context menu</ContextMenuTrigger>
        <ContextMenuContent>
            <ContextMenuItem>{OVERLAY_LABEL}</ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>
);

const contextMenuWithSubmenu = (
    <ContextMenu>
        <ContextMenuTrigger>Open context menu</ContextMenuTrigger>
        <ContextMenuContent slotName="parent-content">
            <ContextMenuSub>
                <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                    <ContextMenuItem>{OVERLAY_LABEL}</ContextMenuItem>
                </ContextMenuSubContent>
            </ContextMenuSub>
        </ContextMenuContent>
    </ContextMenu>
);

async function rightClick(user: ReturnType<typeof userEvent.setup>) {
    await user.pointer({
        target: screen.getByText('Open context menu'),
        keys: '[MouseRight]',
    });
}

beforeAll(patchPointerApis);

afterEach(cleanup);

describe('a context menu', () => {
    it('renders its content inside the sheet panels', async () => {
        const user = userEvent.setup();

        await renderInSheet(user, contextMenu);
        await rightClick(user);

        const content = await screen.findByText(OVERLAY_LABEL);

        expect(panels()?.contains(content)).toBe(true);
    });

    it('keeps its content on the body with no sheet around it', async () => {
        const user = userEvent.setup();

        render(contextMenu);

        await rightClick(user);

        const content = await screen.findByText(OVERLAY_LABEL);

        expect(panels()).toBeNull();
        expect(document.body.contains(content)).toBe(true);
    });
});

describe('a context menu submenu', () => {
    it('renders outside the parent content that clips it', async () => {
        const user = userEvent.setup();

        render(contextMenuWithSubmenu);

        await rightClick(user);
        await user.click(await screen.findByText('More'));

        const submenu = await screen.findByText(OVERLAY_LABEL);

        expect(parentContent()?.contains(submenu)).toBe(false);
        expect(document.body.contains(submenu)).toBe(true);
    });

    it('renders inside the sheet panels', async () => {
        const user = userEvent.setup();

        await renderInSheet(user, contextMenuWithSubmenu);
        await rightClick(user);
        await user.click(await screen.findByText('More'));

        const submenu = await screen.findByText(OVERLAY_LABEL);

        expect(parentContent()?.contains(submenu)).toBe(false);
        expect(panels()?.contains(submenu)).toBe(true);
    });

    it('renders into the container it is given', async () => {
        const user = userEvent.setup();
        const target = document.createElement('div');

        document.body.append(target);

        render(
            <ContextMenu>
                <ContextMenuTrigger>Open context menu</ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
                        <ContextMenuSubContent container={target}>
                            <ContextMenuItem>{OVERLAY_LABEL}</ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                </ContextMenuContent>
            </ContextMenu>,
        );

        await rightClick(user);
        await user.click(await screen.findByText('More'));

        expect(target.contains(await screen.findByText(OVERLAY_LABEL))).toBe(
            true,
        );

        target.remove();
    });
});
