// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
    OVERLAY_LABEL,
    panels,
    patchPointerApis,
    renderInSheet,
} from '../../../tests/fixtures/sheet-overlay';

const hoverCard = (
    <HoverCard openDelay={0}>
        <HoverCardTrigger>Open hover card</HoverCardTrigger>
        <HoverCardContent>{OVERLAY_LABEL}</HoverCardContent>
    </HoverCard>
);

beforeAll(patchPointerApis);

afterEach(cleanup);

describe('a hover card', () => {
    it('renders its content inside the sheet panels', async () => {
        const user = userEvent.setup();

        await renderInSheet(user, hoverCard);
        await user.hover(screen.getByText('Open hover card'));

        const content = await screen.findByText(OVERLAY_LABEL);

        expect(panels()?.contains(content)).toBe(true);
    });

    it('keeps its content on the body with no sheet around it', async () => {
        const user = userEvent.setup();

        render(hoverCard);

        await user.hover(screen.getByText('Open hover card'));

        const content = await screen.findByText(OVERLAY_LABEL);

        expect(panels()).toBeNull();
        expect(document.body.contains(content)).toBe(true);
    });
});
