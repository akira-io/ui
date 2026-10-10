// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

afterEach(cleanup);

const panels: [string, string, ReactNode][] = [
    [
        'dialog',
        'dialog-content',
        <Dialog key="dialog" open>
            <DialogContent>
                <DialogTitle>Title</DialogTitle>
                <DialogDescription>Body</DialogDescription>
            </DialogContent>
        </Dialog>,
    ],
    [
        'sheet',
        'sheet-content',
        <Sheet key="sheet" open>
            <SheetContent>
                <SheetTitle>Title</SheetTitle>
                <SheetDescription>Body</SheetDescription>
            </SheetContent>
        </Sheet>,
    ],
    [
        'popover',
        'popover-content',
        <Popover key="popover" open>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent>Body</PopoverContent>
        </Popover>,
    ],
    [
        'hover card',
        'hover-card-content',
        <HoverCard key="hover" open>
            <HoverCardTrigger>Open</HoverCardTrigger>
            <HoverCardContent>Body</HoverCardContent>
        </HoverCard>,
    ],
    [
        'dropdown menu',
        'dropdown-menu-content',
        <DropdownMenu key="menu" open>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Item</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>,
    ],
];

describe('the floating panels', () => {
    it.each(panels)('put the %s on the panel glass', (_, slot, tree) => {
        render(tree);

        const panel = document.querySelector(`[data-slot="${slot}"]`);

        expect(panel).not.toBeNull();
        expect(panel?.classList).toContain('glass-panel');
    });
});

describe('cn', () => {
    it('lets a later fill replace the glass, and the glass replace an earlier fill', () => {
        expect(cn('glass-panel', 'bg-popover/90')).toBe('bg-popover/90');
        expect(cn('bg-popover/90', 'glass-panel')).toBe('glass-panel');
        expect(cn('glass-bar', 'glass-panel')).toBe('glass-panel');
    });

    it('keeps the glass next to a gradient', () => {
        expect(cn('glass-bar', 'bg-linear-to-b')).toBe(
            'glass-bar bg-linear-to-b',
        );
    });
});
