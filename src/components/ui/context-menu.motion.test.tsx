// @vitest-environment jsdom

import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
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
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(cleanup);

const menu = (
    <ContextMenu>
        <ContextMenuTrigger>Canvas</ContextMenuTrigger>
        <ContextMenuContent>
            <ContextMenuItem>Paste</ContextMenuItem>
            <ContextMenuSub>
                <ContextMenuSubTrigger>Arrange</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                    <ContextMenuItem>Bring to front</ContextMenuItem>
                </ContextMenuSubContent>
            </ContextMenuSub>
        </ContextMenuContent>
    </ContextMenu>
);

describe('a context menu on motion', () => {
    it('opens at the pointer and unmounts after Escape', async () => {
        const user = userEvent.setup();

        render(menu);

        fireEvent.contextMenu(screen.getByText('Canvas'), {
            clientX: 40,
            clientY: 40,
        });
        expect(await screen.findByText('Paste')).toBeTruthy();

        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('Paste')).toBeNull());
    });

    it('opens a submenu from its item', async () => {
        const user = userEvent.setup();

        render(menu);

        fireEvent.contextMenu(screen.getByText('Canvas'), {
            clientX: 40,
            clientY: 40,
        });
        await user.click(await screen.findByText('Arrange'));

        expect(await screen.findByText('Bring to front')).toBeTruthy();
    });

    it('scales the menu from the pointer origin', async () => {
        render(menu);

        fireEvent.contextMenu(screen.getByText('Canvas'), {
            clientX: 40,
            clientY: 40,
        });
        const content = (await screen.findByText('Paste')).closest(
            '[data-slot="context-menu-content"]',
        );

        expect(content?.className).toContain(
            'origin-(--radix-context-menu-content-transform-origin)',
        );
    });
});
