// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
    OVERLAY_LABEL,
    panels,
    patchPointerApis,
    renderInSheet,
} from '../../../tests/fixtures/sheet-overlay';

const contextMenu = (
    <ContextMenu>
        <ContextMenuTrigger>Open context menu</ContextMenuTrigger>
        <ContextMenuContent>
            <ContextMenuItem>{OVERLAY_LABEL}</ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>
);

async function rightClick(user: ReturnType<typeof userEvent.setup>) {
    await user.pointer({
        target: screen.getByText('Open context menu'),
        keys: '[MouseRight]',
    });
}

beforeAll(patchPointerApis);

afterEach(cleanup);

describe('a context menu', () => {
    it('renders its content inside the sheet panels', async () => {
        const user = userEvent.setup();

        await renderInSheet(user, contextMenu);
        await rightClick(user);

        const content = await screen.findByText(OVERLAY_LABEL);

        expect(panels()?.contains(content)).toBe(true);
    });

    it('keeps its content on the body with no sheet around it', async () => {
        const user = userEvent.setup();

        render(contextMenu);

        await rightClick(user);

        const content = await screen.findByText(OVERLAY_LABEL);

        expect(panels()).toBeNull();
        expect(document.body.contains(content)).toBe(true);
    });
});
