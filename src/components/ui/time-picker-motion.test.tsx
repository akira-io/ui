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

describe('a time picker on motion', () => {
    it('hands focus back to the field once its columns finish closing', async () => {
        const user = userEvent.setup();

        render(<TimePicker defaultValue="18:45" />);

        await user.click(
            document.querySelector<HTMLElement>(
                '[data-slot="time-picker-trigger"]',
            )!,
        );
        await screen.findAllByRole('listbox');

        await user.keyboard('{Escape}');

        await waitFor(
            () => {
                expect(
                    document.querySelector('[data-slot="time-picker-content"]'),
                ).toBeNull();
                expect(document.activeElement?.getAttribute('role')).toBe(
                    'spinbutton',
                );
            },
            { timeout: 1000 },
        );
    });
});
