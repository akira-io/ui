// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { DataTable } from '@/components/ui/data-table';
import { focusRing, quietFocus } from '@/lib/language';

interface Ticket {
    id: string;
    holder: string;
}

const columns = [
    { accessorKey: 'id', header: 'Reference' },
    { accessorKey: 'holder', header: 'Holder' },
];

const data: Ticket[] = [{ id: 'NF-1', holder: 'Ana Lima' }];

const brandRing = focusRing
    .split(' ')
    .filter((utility) => utility.includes('ring-'));

function searchClasses(): string {
    render(<DataTable columns={columns} data={data} searchKey="holder" />);

    return screen.getByPlaceholderText('Search...').className;
}

afterEach(cleanup);

describe('the data table search field', () => {
    it('reads its focus as depth rather than as the brand color', () => {
        const classes = searchClasses();

        for (const utility of brandRing) {
            expect(classes).not.toContain(utility);
        }
    });

    it('keeps the focus indicator the quiet treatment defines', () => {
        const classes = searchClasses();

        for (const utility of quietFocus.split(' ')) {
            expect(classes).toContain(utility);
        }
    });
});
