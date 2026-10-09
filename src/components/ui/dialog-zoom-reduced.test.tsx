// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

const original = HTMLElement.prototype.getBoundingClientRect;
const originalMatchMedia = window.matchMedia;

beforeAll(() => {
    patchPointerApis();
    MotionGlobalConfig.skipAnimations = false;
    window.matchMedia = (query: string) =>
        ({
            matches: query.includes('prefers-reduced-motion'),
            media: query,
            onchange: null,
            addListener: () => undefined,
            removeListener: () => undefined,
            addEventListener: () => undefined,
            removeEventListener: () => undefined,
            dispatchEvent: () => false,
        }) as MediaQueryList;
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
    window.matchMedia = originalMatchMedia;
    HTMLElement.prototype.getBoundingClientRect = original;
});

afterEach(cleanup);

const content = () =>
    document.querySelector<HTMLElement>('[data-slot="dialog-content"]');

describe('a dialog under reduced motion', () => {
    it('fades in place without leaving or cutting to the button', async () => {
        const user = userEvent.setup();

        render(
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                    <DialogTitle>Invoice</DialogTitle>
                </DialogContent>
            </Dialog>,
        );
        await user.click(screen.getByText('Open'));

        expect(content()?.style.transform).not.toMatch(/translateX\(-/);
        expect(content()?.style.clipPath).toMatch(/^inset\(0px|^$/);

        await user.keyboard('{Escape}');
        await waitFor(() => expect(content()).toBeNull(), { timeout: 1500 });
    });
});
