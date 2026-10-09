// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionGlobalConfig } from 'motion/react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

const original = HTMLElement.prototype.getBoundingClientRect;

beforeAll(() => {
    patchPointerApis();
    MotionGlobalConfig.skipAnimations = false;
    HTMLElement.prototype.getBoundingClientRect = function () {
        if (this.dataset.slot === 'dialog-trigger') {
            return { left: 0, top: 0, width: 40, height: 40 } as DOMRect;
        }

        if (this.dataset.slot === 'dialog-content') {
            return { left: 300, top: 200, width: 400, height: 300 } as DOMRect;
        }

        return original.call(this);
    };
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
    HTMLElement.prototype.getBoundingClientRect = original;
});

afterEach(cleanup);

const content = () =>
    document.querySelector<HTMLElement>('[data-slot="dialog-content"]');

const dialog = (
    <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
            <DialogTitle>Invoice</DialogTitle>
        </DialogContent>
    </Dialog>
);

describe('a dialog growing from its button', () => {
    it('starts small on the button and settles in place', async () => {
        const user = userEvent.setup();

        render(dialog);
        await user.click(screen.getByText('Open'));
        await new Promise((resolve) => setTimeout(resolve, 20));

        expect(content()?.style.transform).toMatch(/scale\(0\.[0-4]/);

        await waitFor(
            () =>
                expect(content()?.style.transform).toMatch(
                    /none|^$|scale\(1\)/,
                ),
            { timeout: 1500 },
        );
    });

    it('shrinks back before it unmounts and hands focus to the button', async () => {
        const user = userEvent.setup();

        render(dialog);
        await user.click(screen.getByText('Open'));
        await new Promise((resolve) => setTimeout(resolve, 600));
        await user.keyboard('{Escape}');

        expect(content()).not.toBeNull();

        await waitFor(() => expect(content()).toBeNull(), { timeout: 1500 });
        expect(document.activeElement?.textContent).toBe('Open');
    });

    it('still opens and closes under a radix root', async () => {
        const user = userEvent.setup();

        render(
            <DialogPrimitive.Root>
                <DialogPrimitive.Trigger>Open</DialogPrimitive.Trigger>
                <DialogContent>
                    <DialogTitle>Invoice</DialogTitle>
                </DialogContent>
            </DialogPrimitive.Root>,
        );

        await user.click(screen.getByText('Open'));
        expect(await screen.findByText('Invoice')).toBeTruthy();

        await user.keyboard('{Escape}');
        await waitFor(() => expect(content()).toBeNull(), { timeout: 1500 });
    });
});
