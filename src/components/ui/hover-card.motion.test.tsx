// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(cleanup);

describe('a hover card on motion', () => {
    it('opens on hover and unmounts after the pointer leaves', async () => {
        const user = userEvent.setup();

        render(
            <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger>Profile</HoverCardTrigger>
                <HoverCardContent>Card body</HoverCardContent>
            </HoverCard>,
        );

        await user.hover(screen.getByText('Profile'));
        expect(await screen.findByText('Card body')).toBeTruthy();

        await user.unhover(screen.getByText('Profile'));
        await waitFor(() => expect(screen.queryByText('Card body')).toBeNull());
    });

    it('keeps its content slot and trigger origin on the animated element', async () => {
        const user = userEvent.setup();

        render(
            <HoverCard openDelay={0}>
                <HoverCardTrigger>Profile</HoverCardTrigger>
                <HoverCardContent>Card body</HoverCardContent>
            </HoverCard>,
        );

        await user.hover(screen.getByText('Profile'));
        const content = (await screen.findByText('Card body')).closest(
            '[data-slot="hover-card-content"]',
        );

        expect(content?.className).toContain(
            'origin-(--radix-hover-card-content-transform-origin)',
        );
    });
});
