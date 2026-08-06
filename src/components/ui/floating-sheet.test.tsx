// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import {
    FloatingSheet,
    FloatingSheetBody,
} from '@/components/ui/floating-sheet';
import {
    panels,
    panelTitles,
    TwoLevels,
} from '../../../tests/fixtures/floating-sheet';

afterEach(cleanup);

async function openBothLevels(user: ReturnType<typeof userEvent.setup>) {
    await user.click(screen.getByRole('button', { name: 'Open cluster' }));
    await user.click(await screen.findByRole('button', { name: 'Open tasks' }));

    await waitFor(() => expect(panelTitles()).toContain('Scheduled tasks'));
}

describe('the floating sheet stack', () => {
    it('renders nothing until a panel opens', () => {
        render(<TwoLevels />);

        expect(panels()).toHaveLength(0);
        expect(
            document.querySelectorAll('[data-slot="floating-sheet-overlay"]'),
        ).toHaveLength(0);
    });

    it('keeps the panel below mounted when a second one opens', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        expect(panels()).toHaveLength(2);
        expect(panelTitles()).toEqual([
            'App cluster settings',
            'Scheduled tasks',
        ]);
    });

    it('renders a single overlay for the whole stack', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        expect(
            document.querySelectorAll('[data-slot="floating-sheet-overlay"]'),
        ).toHaveLength(1);
    });

    it('leaves every panel below the top inert', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        const [below, top] = panels();

        expect(below.hasAttribute('inert')).toBe(true);
        expect(top.hasAttribute('inert')).toBe(false);
    });

    it('offsets the panel below and leaves the top one in place', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        const [below, top] = panels();

        expect(below.getAttribute('data-depth')).toBe('1');
        expect(below.style.transform).toContain('translateX(-26px)');
        expect(top.getAttribute('data-depth')).toBe('0');
        expect(top.style.transform).toContain('translateX(-0px)');
    });

    it('shows a back control on the panel above the first and none on the first', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        expect(
            document.querySelectorAll('[data-slot="floating-sheet-back"]'),
        ).toHaveLength(1);
    });

    it('pops one level when back is pressed', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        await user.click(screen.getByRole('button', { name: 'Back' }));

        await waitFor(() => expect(panels()).toHaveLength(1));
        expect(panelTitles()).toEqual(['App cluster settings']);
    });

    it('closes only the topmost panel on escape', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        await user.keyboard('{Escape}');

        await waitFor(() => expect(panels()).toHaveLength(1));
        expect(panelTitles()).toEqual(['App cluster settings']);
    });

    it('dismisses the whole stack from the close control', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        const closeControls = screen.getAllByRole('button', { name: 'Close' });

        await user.click(closeControls[closeControls.length - 1]);

        await waitFor(() => expect(panels()).toHaveLength(0));
    });

    it('keeps the stack order when the consumer passes a new callback on every render', async () => {
        const user = userEvent.setup();
        render(<TwoLevels inlineCallbacks />);

        await openBothLevels(user);
        await user.click(screen.getByRole('button', { name: 'Re-render' }));

        await waitFor(() => expect(panels()).toHaveLength(2));

        const [below, top] = panels();

        expect(below.getAttribute('data-depth')).toBe('1');
        expect(top.getAttribute('data-depth')).toBe('0');
        expect(panelTitles()).toEqual([
            'App cluster settings',
            'Scheduled tasks',
        ]);
    });

    it('throws when a panel is used outside a stack', () => {
        expect(() =>
            render(
                <FloatingSheet open onOpenChange={() => {}} title="Alone">
                    <FloatingSheetBody>Body</FloatingSheetBody>
                </FloatingSheet>,
            ),
        ).toThrow(/FloatingSheetStack/);
    });
});
