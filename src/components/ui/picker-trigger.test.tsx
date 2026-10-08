// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { PickerClearButton } from '@/components/ui/picker-trigger';

afterEach(cleanup);

describe('PickerClearButton', () => {
    it('clears under the name and slot its picker gives it', async () => {
        const onClear = vi.fn();
        const user = userEvent.setup();

        render(
            <PickerClearButton
                label="Clear date"
                onClear={onClear}
                slotName="date-picker-clear"
            />,
        );

        const button = screen.getByRole('button', { name: 'Clear date' });

        await user.click(button);

        expect(onClear).toHaveBeenCalledTimes(1);
        expect(button.dataset.slot).toBe('date-picker-clear');
    });
});
