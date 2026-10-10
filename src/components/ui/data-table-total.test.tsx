// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { type ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { installResizeObserver } from '../../../tests/fixtures/resize-observer';

import { DataTable } from '@/components/ui/data-table';
import { UiLocaleProvider } from '@/locales/context';
import { ptLabels } from '@/locales/pt';

beforeEach(installResizeObserver);

afterEach(cleanup);

function paginationSummary(text: string): HTMLElement {
    return screen.getByText(
        (_, element) =>
            element?.tagName === 'SPAN' && element.textContent === text,
    );
}

function table(total: number): ReactNode {
    return (
        <DataTable
            columns={[{ accessorKey: 'name', header: 'Name' }]}
            data={[{ name: 'Ada' }]}
            manualPagination
            pageCount={1}
            pageIndex={0}
            total={total}
        />
    );
}

describe('the data table pagination total', () => {
    it.each([
        [1, 'Page 1 of 1 · 1 record'],
        [2, 'Page 1 of 1 · 2 records'],
    ])('reads a total of %s in English as "%s"', (total, expected) => {
        render(table(total));

        expect(paginationSummary(expected)).toBeDefined();
    });

    it.each([
        [1, 'Página 1 de 1 · 1 registo'],
        [2, 'Página 1 de 1 · 2 registos'],
    ])('reads a total of %s in Portuguese as "%s"', (total, expected) => {
        render(
            <UiLocaleProvider labels={ptLabels}>
                {table(total)}
            </UiLocaleProvider>,
        );

        expect(paginationSummary(expected)).toBeDefined();
    });
});
