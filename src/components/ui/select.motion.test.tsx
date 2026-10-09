// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(cleanup);

const select = (
    <Select>
        <SelectTrigger aria-label="Fruit">
            <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="pear">Pear</SelectItem>
        </SelectContent>
    </Select>
);

describe('a select on motion', () => {
    it('opens its list from the trigger and unmounts after choosing', async () => {
        const user = userEvent.setup();

        render(select);

        await user.click(screen.getByLabelText('Fruit'));
        await user.click(await screen.findByRole('option', { name: 'Pear' }));

        await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
        expect(screen.getByLabelText('Fruit').textContent).toContain('Pear');
    });

    it('still shows the chosen value while closed', () => {
        render(
            <Select defaultValue="apple">
                <SelectTrigger aria-label="Fruit">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                </SelectContent>
            </Select>,
        );

        expect(screen.getByLabelText('Fruit').textContent).toContain('Apple');
    });

    it('scales the list from its trigger origin', async () => {
        const user = userEvent.setup();

        render(select);

        await user.click(screen.getByLabelText('Fruit'));
        const content = (
            await screen.findByRole('option', { name: 'Pear' })
        ).closest('[data-slot="select-content"]');

        expect(content?.className).toContain(
            'origin-(--radix-select-content-transform-origin)',
        );
    });
});
