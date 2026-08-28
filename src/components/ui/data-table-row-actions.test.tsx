// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    type DataTableRowAction,
    RowActionsMenu,
} from '@/components/ui/data-table-row-actions';

interface Ticket {
    id: string;
    hasDriver: boolean;
}

function actionsFor(): DataTableRowAction<Ticket>[] {
    return [
        { label: 'Edit', onClick: vi.fn() },
        {
            label: 'Remove driver',
            hidden: (ticket) => !ticket.hasDriver,
            onClick: vi.fn(),
        },
    ];
}

afterEach(cleanup);

describe('the row actions menu', () => {
    it('offers an action the row qualifies for', async () => {
        const user = userEvent.setup();

        render(
            <RowActionsMenu
                row={{ id: 'NF-1', hasDriver: true }}
                actions={actionsFor()}
            />,
        );

        await user.click(screen.getByRole('button'));

        expect(screen.getByText('Remove driver')).toBeTruthy();
    });

    it('leaves out an action the row does not qualify for', async () => {
        const user = userEvent.setup();

        render(
            <RowActionsMenu
                row={{ id: 'NF-2', hasDriver: false }}
                actions={actionsFor()}
            />,
        );

        await user.click(screen.getByRole('button'));

        expect(screen.getByText('Edit')).toBeTruthy();
        expect(screen.queryByText('Remove driver')).toBeNull();
    });

    it('renders nothing when the row qualifies for no action at all', () => {
        render(
            <RowActionsMenu
                row={{ id: 'NF-3', hasDriver: false }}
                actions={[
                    {
                        label: 'Remove driver',
                        hidden: (ticket) => !ticket.hasDriver,
                        onClick: vi.fn(),
                    },
                ]}
            />,
        );

        expect(screen.queryByRole('button')).toBeNull();
    });
});
