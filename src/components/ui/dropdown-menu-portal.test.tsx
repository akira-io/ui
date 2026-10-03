// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    OVERLAY_LABEL,
    panels,
    parentContent,
    patchPointerApis,
    renderInSheet,
} from '../../../tests/fixtures/sheet-overlay';

const dropdownMenuWithSubmenu = (
    <DropdownMenu>
        <DropdownMenuTrigger>Open dropdown menu</DropdownMenuTrigger>
        <DropdownMenuContent slotName="parent-content">
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                    <DropdownMenuItem>{OVERLAY_LABEL}</DropdownMenuItem>
                </DropdownMenuSubContent>
            </DropdownMenuSub>
        </DropdownMenuContent>
    </DropdownMenu>
);

const dropdownMenuWithPortalledSubmenu = (
    <DropdownMenu>
        <DropdownMenuTrigger>Open dropdown menu</DropdownMenuTrigger>
        <DropdownMenuContent slotName="parent-content">
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem>{OVERLAY_LABEL}</DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
        </DropdownMenuContent>
    </DropdownMenu>
);

async function openSubmenu(user: ReturnType<typeof userEvent.setup>) {
    await user.click(screen.getByText('Open dropdown menu'));
    await user.click(await screen.findByText('More'));

    return screen.findByText(OVERLAY_LABEL);
}

beforeAll(patchPointerApis);

afterEach(cleanup);

describe('a dropdown menu submenu', () => {
    it('renders outside the parent content that clips it', async () => {
        const user = userEvent.setup();

        render(dropdownMenuWithSubmenu);

        const submenu = await openSubmenu(user);

        expect(parentContent()?.contains(submenu)).toBe(false);
        expect(document.body.contains(submenu)).toBe(true);
    });

    it('renders inside the sheet panels', async () => {
        const user = userEvent.setup();

        await renderInSheet(user, dropdownMenuWithSubmenu);

        const submenu = await openSubmenu(user);

        expect(parentContent()?.contains(submenu)).toBe(false);
        expect(panels()?.contains(submenu)).toBe(true);
    });

    it('still opens once when the caller wraps it in its own portal', async () => {
        const user = userEvent.setup();

        render(dropdownMenuWithPortalledSubmenu);

        const submenu = await openSubmenu(user);

        expect(screen.getAllByText(OVERLAY_LABEL)).toHaveLength(1);
        expect(parentContent()?.contains(submenu)).toBe(false);
        expect(document.body.contains(submenu)).toBe(true);

        await user.keyboard('{Escape}');

        await waitFor(() =>
            expect(screen.queryByText(OVERLAY_LABEL)).toBeNull(),
        );
    });

    it('renders into the container it is given', async () => {
        const user = userEvent.setup();
        const target = document.createElement('div');

        document.body.append(target);

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open dropdown menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent container={target}>
                            <DropdownMenuItem>{OVERLAY_LABEL}</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        await user.click(screen.getByText('Open dropdown menu'));
        await user.click(await screen.findByText('More'));

        expect(target.contains(await screen.findByText(OVERLAY_LABEL))).toBe(
            true,
        );

        target.remove();
    });
});
