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
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    FloatingSheet,
    FloatingSheetBody,
    FloatingSheetStack,
} from '@/components/ui/floating-sheet';
import { panels, TwoLevels } from '../../../tests/fixtures/floating-sheet';

beforeAll(() => {
    MotionGlobalConfig.skipAnimations = false;
    window.innerWidth = 1000;
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
});

afterEach(cleanup);

const overlay = () =>
    document.querySelector('[data-slot="floating-sheet-overlay"]');

describe('the floating sheet stack in motion', () => {
    it('slides a pushed panel in while the one below recedes', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await user.click(screen.getByRole('button', { name: 'Open cluster' }));
        await user.click(
            await screen.findByRole('button', { name: 'Open tasks' }),
        );

        const [below, top] = panels();

        expect(top.style.transform).toMatch(/^translateX\([1-9]/);
        await waitFor(
            () => expect(below.style.transform).toContain('translateX(-26px)'),
            {
                timeout: 1500,
            },
        );
    });

    it('keeps a popped panel mounted until it has slid out', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await user.click(screen.getByRole('button', { name: 'Open cluster' }));
        await user.click(
            await screen.findByRole('button', { name: 'Open tasks' }),
        );
        await new Promise((resolve) => setTimeout(resolve, 600));
        await user.click(screen.getByRole('button', { name: 'Back' }));

        expect(panels()).toHaveLength(2);
        await waitFor(() => expect(panels()).toHaveLength(1), {
            timeout: 1500,
        });
    });

    it('keeps the stack open until the last panel has slid out', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await user.click(screen.getByRole('button', { name: 'Open cluster' }));
        await new Promise((resolve) => setTimeout(resolve, 600));
        await user.keyboard('{Escape}');

        expect(panels()).toHaveLength(1);
        await waitFor(
            () => {
                expect(panels()).toHaveLength(0);
                expect(overlay()).toBeNull();
            },
            { timeout: 1500 },
        );
        expect(document.activeElement?.textContent).toBe('Open cluster');
    });

    it('pops only the top panel when it is swiped away', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await user.click(screen.getByRole('button', { name: 'Open cluster' }));
        await user.click(
            await screen.findByRole('button', { name: 'Open tasks' }),
        );
        await new Promise((resolve) => setTimeout(resolve, 600));

        const top = panels()[1];
        fireEvent.pointerDown(top, {
            pointerId: 1,
            button: 0,
            clientX: 100,
            clientY: 100,
        });
        fireEvent.pointerMove(top, {
            pointerId: 1,
            buttons: 1,
            clientX: 200,
            clientY: 100,
        });
        fireEvent.pointerMove(top, {
            pointerId: 1,
            buttons: 1,
            clientX: 400,
            clientY: 100,
        });
        fireEvent.pointerUp(top, { pointerId: 1, clientX: 400, clientY: 100 });

        await waitFor(() => expect(panels()).toHaveLength(1), {
            timeout: 1500,
        });
    });

    it('closes a stack from the top down, one panel after another', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await user.click(screen.getByRole('button', { name: 'Open cluster' }));
        await user.click(
            await screen.findByRole('button', { name: 'Open tasks' }),
        );
        await new Promise((resolve) => setTimeout(resolve, 600));

        const [below] = panels();
        await user.click(
            screen.getAllByRole('button', { name: 'Close' }).at(-1)!,
        );

        expect(below.isConnected).toBe(true);
        expect(below.getAttribute('data-depth')).toBe('0');
        await waitFor(() => expect(panels()).toHaveLength(0), {
            timeout: 2000,
        });
    });

    it('springs a persistent panel back when it is swiped', async () => {
        render(
            <FloatingSheetStack>
                <FloatingSheet
                    open
                    onOpenChange={() => {}}
                    title="Unsaved changes"
                    persistent
                >
                    <FloatingSheetBody>Fields</FloatingSheetBody>
                </FloatingSheet>
            </FloatingSheetStack>,
        );
        await new Promise((resolve) => setTimeout(resolve, 600));

        const panel = panels()[0];
        const at = (x: number) => ({
            pointerId: 1,
            buttons: 1,
            button: 0,
            clientX: x,
            clientY: 100,
        });

        fireEvent.pointerDown(panel, at(100));
        fireEvent.pointerMove(panel, at(200));
        fireEvent.pointerMove(panel, at(400));
        fireEvent.pointerUp(panel, at(400));

        expect(panels()).toHaveLength(1);
        await waitFor(
            () => expect(panel.style.transform).toMatch(/^(none)?$/),
            {
                timeout: 1500,
            },
        );
    });

    it('hands focus back to the button that opened a popped panel', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await user.click(screen.getByRole('button', { name: 'Open cluster' }));
        await user.click(
            await screen.findByRole('button', { name: 'Open tasks' }),
        );
        await new Promise((resolve) => setTimeout(resolve, 600));
        await user.click(screen.getByRole('button', { name: 'Back' }));

        await waitFor(() => expect(panels()).toHaveLength(1), {
            timeout: 1500,
        });
        expect(document.activeElement?.textContent).toBe('Open tasks');
    });
});
