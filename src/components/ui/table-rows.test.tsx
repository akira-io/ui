// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

afterEach(cleanup);

function table(striped?: boolean) {
    return render(
        <Table striped={striped}>
            <TableHeader>
                <TableRow>
                    <TableHead>Member</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Ava Torres</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Diego Ramirez</TableCell>
                </TableRow>
            </TableBody>
        </Table>,
    ).container;
}

describe('the rows of a table', () => {
    it('part with a translucent hairline that shows on any surface, glass included', () => {
        const row = table().querySelector('tbody tr')!;

        expect(row.className).toContain('border-(--hairline)');
    });

    it('highlight on hover with the glass highlight, as menus and the pinned column do', () => {
        const row = table().querySelector('tbody tr')!;

        expect(row.className).toContain('hover:bg-(--glass-highlight)');
        expect(row.className).not.toContain('hover:bg-muted/50');
    });

    it('alternate their fill when asked for stripes, as macOS tables do', () => {
        const element = table(true).querySelector('table')!;

        expect(element.className).toContain(
            '[&_tbody_tr:nth-child(even)]:bg-(--glass-highlight)',
        );
    });

    it('draw no stripes by default', () => {
        expect(table().querySelector('table')!.className).not.toContain(
            'nth-child(even)',
        );
    });
});

describe('the hairline token', () => {
    it('is defined translucent in light and dark', () => {
        const css = readFileSync(resolve(process.cwd(), 'glass.css'), 'utf8');

        expect(css.match(/--hairline:\s*color-mix\(/g)).toHaveLength(2);
    });
});

describe('a data table asked for stripes', () => {
    it('hands the stripes to its table', async () => {
        const { DataTable } = await import('@/components/ui/data-table');
        const { container } = render(
            <DataTable
                striped
                columns={[{ accessorKey: 'name', header: 'Name' }]}
                data={[{ name: 'Ava' }, { name: 'Diego' }]}
            />,
        );

        expect(container.querySelector('table')!.className).toContain(
            'nth-child(even)',
        );
    });
});
