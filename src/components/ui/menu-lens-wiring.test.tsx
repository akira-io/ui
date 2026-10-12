// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { Command, CommandItem, CommandList } from '@/components/ui/command';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { installResizeObserver } from '../../../tests/fixtures/resize-observer';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(() => {
    patchPointerApis();
    installResizeObserver();
});

afterEach(cleanup);

function lensHost(): HTMLElement | null {
    return document
        .querySelector('[data-slot="menu-lens"]')
        ?.closest('[data-menu-lens]') as HTMLElement | null;
}

describe.each([
    [
        'a dropdown menu',
        () => (
            <DropdownMenu open>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    ],
    [
        'a select',
        () => (
            <Select open defaultValue="net-15">
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="net-15">Net 15 days</SelectItem>
                </SelectContent>
            </Select>
        ),
    ],
    [
        'a command list',
        () => (
            <Command>
                <CommandList>
                    <CommandItem>Rename</CommandItem>
                </CommandList>
            </Command>
        ),
    ],
    [
        'a context menu',
        () => (
            <ContextMenu>
                <ContextMenuTrigger>Area</ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem>Rename</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        ),
    ],
])('%s', (_, draw) => {
    it('slides a glass lens under its highlighted item', () => {
        render(draw());

        const area = screen.queryByText('Area');

        if (area) {
            fireEvent.contextMenu(area);
        }

        const host = lensHost();

        expect(host).not.toBeNull();
        expect(host!.className).toContain('relative');
        expect(host!.className).toContain('isolate');
    });
});
