// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(cleanup);

describe('a tooltip on motion', () => {
    it('shows on focus and unmounts on Escape', async () => {
        const user = userEvent.setup();

        render(
            <Tooltip>
                <TooltipTrigger>Save</TooltipTrigger>
                <TooltipContent>Saves the draft</TooltipContent>
            </Tooltip>,
        );

        await user.tab();
        expect(
            (await screen.findAllByText('Saves the draft')).length,
        ).toBeGreaterThan(0);

        await user.keyboard('{Escape}');
        await waitFor(() =>
            expect(screen.queryAllByText('Saves the draft')).toHaveLength(0),
        );
    });

    it('honours a controlled open state', () => {
        render(
            <Tooltip open>
                <TooltipTrigger>Save</TooltipTrigger>
                <TooltipContent>Saves the draft</TooltipContent>
            </Tooltip>,
        );

        expect(screen.getAllByText('Saves the draft').length).toBeGreaterThan(
            0,
        );
    });

    it('scales from the trigger origin', () => {
        render(
            <Tooltip open>
                <TooltipTrigger>Save</TooltipTrigger>
                <TooltipContent>Saves the draft</TooltipContent>
            </Tooltip>,
        );

        const content = document.querySelector('[data-slot="tooltip-content"]');

        expect(content?.className).toContain(
            'origin-(--radix-tooltip-content-transform-origin)',
        );
    });
});
