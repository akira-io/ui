// @vitest-environment jsdom

import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    OVERLAY_LABEL,
    panels,
    patchPointerApis,
    renderInSheet,
} from '../../../tests/fixtures/sheet-overlay';

const tooltip = (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>Open tooltip</TooltipTrigger>
            <TooltipContent>{OVERLAY_LABEL}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

beforeAll(patchPointerApis);

afterEach(cleanup);

async function openTooltip() {
    const trigger = screen.getByText('Open tooltip');

    fireEvent.pointerMove(trigger, { pointerType: 'mouse' });
    fireEvent.focus(trigger);

    await waitFor(() =>
        expect(screen.queryAllByText(OVERLAY_LABEL).length).toBeGreaterThan(0),
    );
}

describe('a tooltip', () => {
    it('renders its content inside the sheet panels', async () => {
        const user = userEvent.setup();

        await renderInSheet(user, tooltip);
        const trigger = screen.getByText('Open tooltip');

        fireEvent.pointerMove(trigger, { pointerType: 'mouse' });
        fireEvent.focus(trigger);
        await waitFor(() =>
            expect(screen.queryAllByText(OVERLAY_LABEL).length).toBeGreaterThan(
                0,
            ),
        );

        const matches = await screen.findAllByText(OVERLAY_LABEL);

        expect(matches.some((node) => panels()?.contains(node))).toBe(true);
    });

    it('keeps its content on the body with no sheet around it', async () => {
        render(tooltip);

        await openTooltip();

        const matches = await screen.findAllByText(OVERLAY_LABEL);

        expect(panels()).toBeNull();
        expect(matches.every((node) => document.body.contains(node))).toBe(
            true,
        );
    });
});
