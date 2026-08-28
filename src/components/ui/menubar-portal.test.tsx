// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';
import {
    OVERLAY_LABEL,
    panels,
    patchPointerApis,
    renderInSheet,
} from '../../../tests/fixtures/sheet-overlay';

const menubar = (
    <Menubar>
        <MenubarMenu>
            <MenubarTrigger>Open menubar</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>{OVERLAY_LABEL}</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    </Menubar>
);

beforeAll(patchPointerApis);

afterEach(cleanup);

describe('a menubar menu', () => {
    it('renders its content inside the sheet panels', async () => {
        const user = userEvent.setup();

        await renderInSheet(user, menubar);
        await user.click(screen.getByText('Open menubar'));

        const content = await screen.findByText(OVERLAY_LABEL);

        expect(panels()?.contains(content)).toBe(true);
    });

    it('keeps its content on the body with no sheet around it', async () => {
        const user = userEvent.setup();

        render(menubar);

        await user.click(screen.getByText('Open menubar'));

        const content = await screen.findByText(OVERLAY_LABEL);

        expect(panels()).toBeNull();
        expect(document.body.contains(content)).toBe(true);
    });
});
