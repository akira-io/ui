// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { DataTable } from '@/components/ui/data-table';
import { fieldFocus, focusRing } from '@/lib/language';

interface Ticket {
    id: string;
    holder: string;
}

const columns = [
    { accessorKey: 'id', header: 'Reference' },
    { accessorKey: 'holder', header: 'Holder' },
];

const data: Ticket[] = [{ id: 'NF-1', holder: 'Ana Lima' }];

function searchClasses(): string {
    render(<DataTable columns={columns} data={data} searchKey="holder" />);

    return screen.getByPlaceholderText('Search...').className;
}

afterEach(cleanup);

describe('the data table search field', () => {
    it('carries the one focus treatment the language defines', () => {
        const classes = searchClasses();

        for (const utility of fieldFocus.split(' ')) {
            expect(classes).toContain(utility);
        }
    });

    it('signals focus with a ring and not with a shadow alone', () => {
        const classes = searchClasses();

        expect(classes).toContain('focus-visible:outline-ring');
        expect(focusRing).toContain('focus-visible:outline-ring');
    });

    it('no longer reads its focus as the near invisible surface ring', () => {
        expect(searchClasses()).not.toContain(
            'focus-visible:ring-surface-ring',
        );
    });

    it('keeps the resting surface ring, which was never the focus indicator', () => {
        expect(searchClasses()).toContain('ring-surface-ring');
    });
});
