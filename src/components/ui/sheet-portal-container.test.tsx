// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    FloatingSheet,
    FloatingSheetBody,
    FloatingSheetStack,
} from '@/components/ui/floating-sheet';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

beforeAll(() => {
    Object.assign(window.HTMLElement.prototype, {
        hasPointerCapture: () => false,
        setPointerCapture: () => undefined,
        releasePointerCapture: () => undefined,
        scrollIntoView: () => undefined,
    });
});

afterEach(cleanup);

function panels(): HTMLElement | null {
    return document.querySelector('[data-slot="floating-sheet-panels"]');
}

function SheetWith({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);

    return (
        <FloatingSheetStack>
            <button type="button" onClick={() => setOpen(true)}>
                Open sheet
            </button>

            <FloatingSheet open={open} onOpenChange={setOpen} title="Passenger">
                <FloatingSheetBody>{children}</FloatingSheetBody>
            </FloatingSheet>
        </FloatingSheetStack>
    );
}

async function openSheet(user: ReturnType<typeof userEvent.setup>) {
    await user.click(screen.getByRole('button', { name: 'Open sheet' }));
    await waitFor(() => expect(panels()).not.toBeNull());
}

describe('overlays opened inside a floating sheet', () => {
    it('renders the popover content inside the sheet panels', async () => {
        const user = userEvent.setup();

        render(
            <SheetWith>
                <Popover>
                    <PopoverTrigger>Pick a date</PopoverTrigger>
                    <PopoverContent>January</PopoverContent>
                </Popover>
            </SheetWith>,
        );

        await openSheet(user);
        await user.click(screen.getByRole('button', { name: 'Pick a date' }));

        const content = await screen.findByText('January');

        expect(panels()?.contains(content)).toBe(true);
    });

    it('renders the select content inside the sheet panels', async () => {
        const user = userEvent.setup();

        render(
            <SheetWith>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Document type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                    </SelectContent>
                </Select>
            </SheetWith>,
        );

        await openSheet(user);
        await user.click(screen.getByRole('combobox'));

        const content = await screen.findByText('Passport');

        expect(panels()?.contains(content)).toBe(true);
    });

    it('renders the dropdown menu content inside the sheet panels', async () => {
        const user = userEvent.setup();

        render(
            <SheetWith>
                <DropdownMenu>
                    <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SheetWith>,
        );

        await openSheet(user);
        await user.click(screen.getByRole('button', { name: 'Actions' }));

        const content = await screen.findByText('Delete');

        expect(panels()?.contains(content)).toBe(true);
    });

    it('keeps portalling to the body when no sheet is open', async () => {
        const user = userEvent.setup();

        render(
            <Popover>
                <PopoverTrigger>Pick a date</PopoverTrigger>
                <PopoverContent>January</PopoverContent>
            </Popover>,
        );

        await user.click(screen.getByRole('button', { name: 'Pick a date' }));

        const content = await screen.findByText('January');

        expect(panels()).toBeNull();
        expect(document.body.contains(content)).toBe(true);
    });
});
