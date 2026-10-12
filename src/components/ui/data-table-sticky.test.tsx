/** @vitest-environment jsdom */

import type { ColumnDef } from '@tanstack/react-table';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { DataTable } from '@/components/ui/data-table';

interface Row {
    name: string;
}

const columns: ColumnDef<Row>[] = [{ accessorKey: 'name', header: 'Name' }];
const data: Row[] = [{ name: 'Ada' }];

afterEach(cleanup);

function tableClasses(container: HTMLElement): string {
    return container.innerHTML;
}

describe('the sticky last column of a data table', () => {
    it('stays in the flow when the last column is ordinary data', () => {
        const { container } = render(
            <DataTable columns={columns} data={data} />,
        );

        expect(tableClasses(container)).not.toContain(':sticky');
    });

    it('sticks when the table carries row actions', () => {
        const { container } = render(
            <DataTable
                columns={columns}
                data={data}
                rowActions={[{ label: 'Open', onClick: vi.fn() }]}
            />,
        );

        expect(tableClasses(container)).toContain(':sticky');
    });

    it('sticks when asked explicitly', () => {
        const { container } = render(
            <DataTable columns={columns} data={data} stickyLastColumn />,
        );

        expect(tableClasses(container)).toContain(':sticky');
        expect(tableClasses(container)).toContain(':bg-(--sticky-cell-fill)');
    });
});
