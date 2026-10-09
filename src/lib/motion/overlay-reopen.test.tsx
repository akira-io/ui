// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(() => {
    patchPointerApis();
    MotionGlobalConfig.skipAnimations = false;
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
});

afterEach(cleanup);

const settle = () => new Promise((resolve) => setTimeout(resolve, 400));

describe('an overlay reopened while it plays its exit', () => {
    it('keeps a dropdown menu open after a second click on its trigger', async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        await user.click(screen.getByText('Actions'));
        await settle();
        await user.keyboard('{Escape}');
        await user.click(screen.getByText('Actions'));
        await settle();

        expect(screen.getByText('Actions').getAttribute('aria-expanded')).toBe(
            'true',
        );
    });

    it('keeps a context menu open when it is reopened during the exit', async () => {
        const user = userEvent.setup();

        render(
            <ContextMenu>
                <ContextMenuTrigger>Canvas</ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem>Paste</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>,
        );

        await user.pointer({
            keys: '[MouseRight]',
            target: screen.getByText('Canvas'),
        });
        await settle();
        await user.keyboard('{Escape}');
        await user.pointer({
            keys: '[MouseRight]',
            target: screen.getByText('Canvas'),
        });
        await settle();

        expect(screen.queryByText('Paste')).not.toBeNull();
    });
});
