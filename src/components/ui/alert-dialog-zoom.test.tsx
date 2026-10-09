// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';
import { expectCutToTheButton } from '../../../tests/fixtures/zoom-origin';

const original = HTMLElement.prototype.getBoundingClientRect;

beforeAll(() => {
    patchPointerApis();
    MotionGlobalConfig.skipAnimations = false;
    HTMLElement.prototype.getBoundingClientRect = function () {
        if (this.dataset.origin !== undefined) {
            return { left: 0, top: 0, width: 40, height: 40 } as DOMRect;
        }

        if (this.getAttribute('role')?.includes('dialog')) {
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

const surface = () =>
    document.querySelector<HTMLElement>(
        '[role="alertdialog"], [role="dialog"]',
    );

function Confirming() {
    const { confirm, ConfirmDialog } = useConfirmDialog();

    return (
        <>
            <button data-origin="" onClick={() => confirm(() => undefined)}>
                Delete
            </button>
            <ConfirmDialog />
        </>
    );
}

describe('an alert dialog growing from its button', () => {
    it('starts small on the button and settles in place', async () => {
        const user = userEvent.setup();

        render(
            <AlertDialog>
                <AlertDialogTrigger data-origin="">Remove</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>Remove the member?</AlertDialogTitle>
                </AlertDialogContent>
            </AlertDialog>,
        );

        await user.click(screen.getByText('Remove'));
        await new Promise((resolve) => setTimeout(resolve, 20));

        expectCutToTheButton(surface());
    });

    it('grows a confirm dialog opened from code out of the button pressed', async () => {
        const user = userEvent.setup();

        render(<Confirming />);

        await user.click(screen.getByText('Delete'));
        await new Promise((resolve) => setTimeout(resolve, 20));

        expectCutToTheButton(surface());
    });

    it('keeps a confirm dialog from code mounted while it shrinks away', async () => {
        const user = userEvent.setup();

        render(<Confirming />);

        await user.click(screen.getByText('Delete'));
        await new Promise((resolve) => setTimeout(resolve, 600));
        await user.keyboard('{Escape}');

        expect(surface()).not.toBeNull();
        await waitFor(() => expect(surface()).toBeNull(), { timeout: 1500 });
    });
});
