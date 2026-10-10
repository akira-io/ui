// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { installResizeObserver } from '../../../tests/fixtures/resize-observer';

import { DataTable } from '@/components/ui/data-table';
import { UiLocaleProvider, type UiLabels } from '@/locales/context';
import { esLabels } from '@/locales/es';
import { frLabels } from '@/locales/fr';
import { ptLabels } from '@/locales/pt';
import type { ColumnDef } from '@tanstack/react-table';

beforeEach(installResizeObserver);

afterEach(cleanup);

interface Row {
    name: string;
}

const columns: ColumnDef<Row>[] = [{ accessorKey: 'name', header: 'Name' }];

const data: Row[] = Array.from({ length: 12 }, (_, i) => ({
    name: `Row ${i + 1}`,
}));

function table(
    props: Partial<Parameters<typeof DataTable<Row, unknown>>[0]> = {},
): ReactNode {
    return (
        <DataTable
            columns={columns}
            data={data}
            rowActions={[{ label: 'Download', onClick: vi.fn() }]}
            {...props}
        />
    );
}

function under(labels: UiLabels, children: ReactNode) {
    return render(
        <UiLocaleProvider labels={labels}>{children}</UiLocaleProvider>,
    );
}

function expectNamedControls(
    actions: string,
    previous: string,
    next: string,
    pageSize: string,
): void {
    expect(screen.getAllByRole('button', { name: actions })).toHaveLength(10);
    expect(screen.getByRole('button', { name: previous })).toBeDefined();
    expect(screen.getByRole('button', { name: next })).toBeDefined();
    expect(screen.getByRole('combobox', { name: pageSize })).toBeDefined();
}

describe('the data table controls', () => {
    it('leave no button or combobox without a name', () => {
        render(table());

        const unnamed = (name: string) => name.trim() === '';

        expect(screen.queryAllByRole('button', { name: unnamed })).toEqual([]);
        expect(screen.queryAllByRole('combobox', { name: unnamed })).toEqual(
            [],
        );
    });

    it('name themselves in English by default', () => {
        render(table());

        expectNamedControls(
            'Actions',
            'Previous page',
            'Next page',
            'Rows per page',
        );
    });

    it.each([
        [
            'Portuguese',
            ptLabels,
            'Ações',
            'Página anterior',
            'Página seguinte',
            'Linhas por página',
        ],
        [
            'Spanish',
            esLabels,
            'Acciones',
            'Página anterior',
            'Página siguiente',
            'Filas por página',
        ],
        [
            'French',
            frLabels,
            'Actions',
            'Page précédente',
            'Page suivante',
            'Lignes par page',
        ],
    ])(
        'read their names from the %s locale',
        (_, labels, actions, previous, next, pageSize) => {
            under(labels, table());

            expectNamedControls(actions, previous, next, pageSize);
        },
    );

    it('let the names the app hands it outrank the locale', () => {
        under(
            ptLabels,
            table({
                rowActionsLabel: 'Opções',
                previousPageLabel: 'Recuar',
                nextPageLabel: 'Avançar',
                pageSizeLabel: 'Por página',
            }),
        );

        expectNamedControls('Opções', 'Recuar', 'Avançar', 'Por página');
    });
});
