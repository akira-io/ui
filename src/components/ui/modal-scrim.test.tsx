// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { modalScrim } from '@/lib/language';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

patchPointerApis();

afterEach(cleanup);

const modals: [string, string, ReactNode][] = [
    [
        'dialog',
        'dialog-overlay',
        <Dialog open>
            <DialogContent>
                <DialogTitle>Title</DialogTitle>
            </DialogContent>
        </Dialog>,
    ],
    [
        'alert dialog',
        'alert-dialog-overlay',
        <AlertDialog open>
            <AlertDialogContent>
                <AlertDialogTitle>Title</AlertDialogTitle>
            </AlertDialogContent>
        </AlertDialog>,
    ],
    [
        'sheet',
        'sheet-overlay',
        <Sheet open>
            <SheetContent>
                <SheetTitle>Title</SheetTitle>
            </SheetContent>
        </Sheet>,
    ],
    [
        'drawer',
        'drawer-overlay',
        <Drawer open>
            <DrawerContent>
                <DrawerTitle>Title</DrawerTitle>
            </DrawerContent>
        </Drawer>,
    ],
];

describe('the scrim behind a modal', () => {
    it.each(modals)(
        'sits on the shared modal scrim behind the %s',
        (_, slot, modal) => {
            render(modal);

            const scrim = document.querySelector(`[data-slot="${slot}"]`);

            const classes = scrim?.className.split(' ') ?? [];

            modalScrim
                .split(' ')
                .forEach((name) => expect(classes).toContain(name));
            expect(
                classes.some((name) => name.startsWith('backdrop-blur')),
            ).toBe(false);
        },
    );
});
