// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { TimePicker } from '@/components/ui/time-picker';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(() => {
    patchPointerApis();
    MotionGlobalConfig.skipAnimations = false;
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
});

afterEach(cleanup);

const trigger = () =>
    document.querySelector<HTMLElement>('[data-slot="time-picker-trigger"]')!;

const columns = () =>
    document.querySelector('[data-slot="time-picker-content"]');

async function settledFocusOnField() {
    await waitFor(
        () => {
            expect(columns()).toBeNull();
            expect(document.activeElement?.getAttribute('role')).toBe(
                'spinbutton',
            );
        },
        { timeout: 1000 },
    );
}

describe('a time picker on motion', () => {
    it('keeps its columns through the exit and then hands focus back to the field', async () => {
        const user = userEvent.setup();

        render(<TimePicker defaultValue="18:45" />);

        await user.click(trigger());
        await screen.findAllByRole('listbox');
        await user.keyboard('{Escape}');

        expect(columns()).not.toBeNull();

        await settledFocusOnField();
    });

    it('stays closed when it is enabled again after being disabled while open', async () => {
        const user = userEvent.setup();
        const { rerender } = render(<TimePicker defaultValue="18:45" />);

        await user.click(trigger());
        await screen.findAllByRole('listbox');

        rerender(<TimePicker defaultValue="18:45" disabled />);
        await waitFor(() => expect(columns()).toBeNull(), { timeout: 1000 });

        rerender(<TimePicker defaultValue="18:45" />);
        await new Promise((resolve) => setTimeout(resolve, 300));

        expect(columns()).toBeNull();
    });
});
