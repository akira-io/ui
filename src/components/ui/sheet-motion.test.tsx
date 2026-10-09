// @vitest-environment jsdom

import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionGlobalConfig } from 'motion/react';
import { Dialog as SheetPrimitive } from 'radix-ui';
import {
    afterAll,
    afterEach,
    beforeAll,
    describe,
    expect,
    it,
    vi,
} from 'vitest';

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

const original = HTMLElement.prototype.getBoundingClientRect;

beforeAll(() => {
    patchPointerApis();
    MotionGlobalConfig.skipAnimations = false;
    window.innerWidth = 1000;
    HTMLElement.prototype.getBoundingClientRect = function () {
        return this.dataset.slot === 'sheet-content'
            ? ({
                  left: 700,
                  top: 0,
                  right: 1000,
                  bottom: 800,
                  width: 300,
                  height: 800,
              } as DOMRect)
            : original.call(this);
    };
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
    HTMLElement.prototype.getBoundingClientRect = original;
});

afterEach(cleanup);

const content = () =>
    document.querySelector<HTMLElement>('[data-slot="sheet-content"]');

const sheet = (
    <Sheet>
        <SheetTrigger>Filters</SheetTrigger>
        <SheetContent>
            <SheetTitle>Filters</SheetTitle>
        </SheetContent>
    </Sheet>
);

describe('a sheet sliding from its side', () => {
    it('starts off screen on its side', async () => {
        const user = userEvent.setup();
        render(sheet);

        await user.click(screen.getByRole('button', { name: 'Filters' }));

        expect(content()?.style.transform).toMatch(/^translateX\(\d{2,3}/);
        expect(content()?.className).not.toMatch(/slide-in|animate-in/);
    });

    it('stays mounted while it slides out and hands focus back', async () => {
        const user = userEvent.setup();
        render(sheet);

        await user.click(screen.getByRole('button', { name: 'Filters' }));
        await new Promise((resolve) => setTimeout(resolve, 600));
        await user.keyboard('{Escape}');

        expect(content()).not.toBeNull();
        await waitFor(() => expect(content()).toBeNull(), { timeout: 1500 });
        expect(document.activeElement?.textContent).toBe('Filters');
    });

    it('closes when swiped towards its side', async () => {
        const user = userEvent.setup();
        render(sheet);

        await user.click(screen.getByRole('button', { name: 'Filters' }));
        await new Promise((resolve) => setTimeout(resolve, 600));

        const surface = content()!;
        fireEvent.pointerDown(surface, {
            pointerId: 1,
            button: 0,
            clientX: 750,
            clientY: 100,
        });
        fireEvent.pointerMove(surface, {
            pointerId: 1,
            buttons: 1,
            clientX: 800,
            clientY: 100,
        });
        fireEvent.pointerMove(surface, {
            pointerId: 1,
            buttons: 1,
            clientX: 900,
            clientY: 100,
        });
        fireEvent.pointerUp(surface, {
            pointerId: 1,
            clientX: 900,
            clientY: 100,
        });

        await waitFor(() => expect(content()).toBeNull(), { timeout: 1500 });
    });

    it.each([
        ['right', /^translateX\([1-9]/],
        ['left', /^translateX\(-[1-9]/],
        ['top', /^translateY\(-[1-9]/],
        ['bottom', /^translateY\([1-9]/],
    ] as const)('slides in from the %s', async (side, start) => {
        const user = userEvent.setup();
        render(
            <Sheet>
                <SheetTrigger>Filters</SheetTrigger>
                <SheetContent side={side}>
                    <SheetTitle>Filters</SheetTitle>
                </SheetContent>
            </Sheet>,
        );

        await user.click(screen.getByRole('button', { name: 'Filters' }));

        expect(content()?.style.transform).toMatch(start);
    });

    it('asks a controlled owner to close when swiped away', async () => {
        const onOpenChange = vi.fn();
        render(
            <Sheet open onOpenChange={onOpenChange}>
                <SheetContent>
                    <SheetTitle>Filters</SheetTitle>
                </SheetContent>
            </Sheet>,
        );
        await new Promise((resolve) => setTimeout(resolve, 600));

        const surface = content()!;
        const at = (x: number) => ({
            pointerId: 1,
            buttons: 1,
            button: 0,
            clientX: x,
            clientY: 100,
        });

        fireEvent.pointerDown(surface, at(750));
        fireEvent.pointerMove(surface, at(800));
        fireEvent.pointerMove(surface, at(900));
        fireEvent.pointerUp(surface, at(900));

        expect(onOpenChange).toHaveBeenCalledWith(false);
        expect(content()).not.toBeNull();
    });

    it('still opens and closes under a radix root', async () => {
        const user = userEvent.setup();
        render(
            <SheetPrimitive.Root>
                <SheetPrimitive.Trigger>Filters</SheetPrimitive.Trigger>
                <SheetContent>
                    <SheetTitle>Filters</SheetTitle>
                </SheetContent>
            </SheetPrimitive.Root>,
        );

        await user.click(screen.getByRole('button', { name: 'Filters' }));
        expect(content()).not.toBeNull();

        await user.keyboard('{Escape}');
        await waitFor(() => expect(content()).toBeNull(), { timeout: 1500 });
    });
});
