// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
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

function renderTable(bleed?: boolean) {
    return render(
        <Table bleed={bleed}>
            <TableHeader>
                <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Olivia Martin</TableCell>
                    <TableCell>$149.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>,
    );
}

function container(): HTMLElement {
    return document.querySelector<HTMLElement>(
        '[data-slot="table-container"]',
    )!;
}

describe('a bleeding table', () => {
    it('says so, so a card can style around it', () => {
        renderTable(true);

        expect(container().dataset.bleed).toBe('true');
    });

    it('pulls itself out to the edges by the padding a card gives its children', () => {
        renderTable(true);

        expect(container().className).toContain('-mx-6');
        expect(container().className).toContain('w-[calc(100%+3rem)]');
    });

    it('puts that padding back on the outer cells, so the content stays aligned', () => {
        renderTable(true);

        expect(container().className).toContain('[&_td:first-child]:pl-6');
        expect(container().className).toContain('[&_th:last-child]:pr-6');
    });

    it('drops the surface of its own, because the card already draws one', () => {
        renderTable(true);

        expect(container().className).not.toContain('rounded-3xl');
        expect(container().className).toContain('shadow-none');
    });
});

describe('the scroller inside a bleeding table', () => {
    it('gives up its radius too, so the content is not clipped at the edges', () => {
        renderTable(true);

        const scroller = container().firstElementChild as HTMLElement;

        expect(scroller.className).toContain('rounded-none');
    });

    it('keeps its radius when the table stands on its own', () => {
        renderTable(false);

        const scroller = container().firstElementChild as HTMLElement;

        expect(scroller.className).toContain('rounded-2xl');
    });
});

describe('a bleeding table a caller styles', () => {
    it('lets the caller class through', () => {
        render(
            <Table bleed className="text-xs">
                <TableBody>
                    <TableRow>
                        <TableCell>Olivia Martin</TableCell>
                    </TableRow>
                </TableBody>
            </Table>,
        );

        expect(document.querySelector('table')?.className).toContain('text-xs');
    });
});

describe('a table that does not bleed', () => {
    it('carries no marker', () => {
        renderTable();

        expect(container().dataset.bleed).toBeUndefined();
    });

    it('keeps the surface and the margins it always had', () => {
        renderTable(false);

        expect(container().className).not.toContain('-mx-6');
        expect(container().className).toContain('rounded-3xl');
        expect(container().className).toContain('bg-card');
    });
});
