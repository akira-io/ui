// @vitest-environment jsdom

import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
    installResizeObserver,
    resize,
} from '../../../tests/fixtures/resize-observer';

import { DataTable } from '@/components/ui/data-table';
import { TableCell, TableRow } from '@/components/ui/table';
import { elevatedSurface, flatSurface, stickyLastCell } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';

beforeEach(installResizeObserver);

afterEach(cleanup);

const FLATTENED = cn(elevatedSurface, flatSurface).split(/\s+/);

const ELEVATION = elevatedSurface
    .split(/\s+/)
    .filter((name) => !FLATTENED.includes(name));

interface Row {
    name: string;
}

const columns: ColumnDef<Row>[] = [{ accessorKey: 'name', header: 'Name' }];

const data: Row[] = [{ name: 'Ada' }];

function classesOf(container: HTMLElement): string[] {
    const root = container.querySelector('[data-slot="data-table"]');

    if (!root) {
        throw new Error('the data table did not render its root');
    }

    return root.className.split(/\s+/);
}

function markerOf(container: HTMLElement): string | undefined {
    return container.querySelector<HTMLElement>('[data-slot="data-table"]')
        ?.dataset.flat;
}

describe('the flat axis', () => {
    it('cancels a ring width and a shadow, so the assertions below are not vacuous', () => {
        expect(ELEVATION.some((name) => name.startsWith('shadow-'))).toBe(true);
        expect(ELEVATION.some((name) => /^ring-\d/.test(name))).toBe(true);
    });
});

describe('a data table by default', () => {
    it('fills with the grouped fill and no elevation', () => {
        const { container } = render(
            <DataTable columns={columns} data={data} />,
        );

        expect(classesOf(container)).toContain('bg-(--grouped-fill)');

        for (const className of ELEVATION) {
            expect(classesOf(container)).not.toContain(className);
        }
    });

    it('stays elevated as glass', () => {
        const { container } = render(
            <DataTable surface="glass" columns={columns} data={data} />,
        );

        expect(classesOf(container)).toEqual(expect.arrayContaining(ELEVATION));
    });

    it('claims no flat marker', () => {
        const { container } = render(
            <DataTable columns={columns} data={data} />,
        );

        expect(markerOf(container)).toBeUndefined();
    });
});

describe('a flat glass data table', () => {
    it('drops every elevation class', () => {
        const { container } = render(
            <DataTable flat surface="glass" columns={columns} data={data} />,
        );

        for (const className of ELEVATION) {
            expect(classesOf(container)).not.toContain(className);
        }
    });

    it('keeps its own padding, because flat drops the surface and not the spacing', () => {
        const { container } = render(
            <DataTable flat surface="glass" columns={columns} data={data} />,
        );

        expect(classesOf(container)).toContain('p-5');
    });

    it('keeps its fill', () => {
        const { container } = render(
            <DataTable flat surface="glass" columns={columns} data={data} />,
        );

        expect(classesOf(container)).toContain('glass-panel');
    });

    it('marks itself for a consumer to target', () => {
        const { container } = render(
            <DataTable flat surface="glass" columns={columns} data={data} />,
        );

        expect(markerOf(container)).toBe('true');
    });
});

describe('a flat data table on the grouped fill', () => {
    it('keeps the grouped fill, because flat only reaches glass', () => {
        const { container } = render(
            <DataTable flat columns={columns} data={data} />,
        );

        expect(classesOf(container)).toContain('bg-(--grouped-fill)');
        expect(markerOf(container)).toBe('true');
    });
});

function tableOf(container: HTMLElement): HTMLTableElement {
    const table = container.querySelector('table');

    if (!table) {
        throw new Error('the data table did not render a table');
    }

    return table;
}

function scrollerOf(container: HTMLElement): HTMLElement {
    const scroller = container.querySelector<HTMLElement>(
        '[data-slot="table-container"] > div',
    );

    if (!scroller) {
        throw new Error('the table did not render its scroll container');
    }

    return scroller;
}

function widen(scroller: HTMLElement, scrollWidth: number): void {
    Object.defineProperty(scroller, 'scrollWidth', {
        configurable: true,
        get: () => scrollWidth,
    });
    Object.defineProperty(scroller, 'clientWidth', {
        configurable: true,
        get: () => 400,
    });
}

describe('the last column of a data table', () => {
    const PINNED = '[&_:is(th,td):last-child:not([colspan])]';

    it('stays pinned to the inline end, header included, and clear while the table fits so it reads as the row', () => {
        const { container } = render(
            <DataTable columns={columns} data={data} stickyLastColumn />,
        );

        const className = tableOf(container).className;

        expect(className).toContain(`${PINNED}:sticky`);
        expect(className).toContain(`${PINNED}:end-0`);
        expect(className).toContain(`${PINNED}:z-[1]`);
        expect(className).not.toContain(`${PINNED}:bg-(--sticky-cell-fill)`);
        expect(className).not.toContain(`${PINNED}:glass-panel`);
    });

    it('covers the content under it with the table fill and follows the row once a column hides behind it', () => {
        const { container } = render(
            <DataTable columns={columns} data={data} stickyLastColumn />,
        );
        const scroller = scrollerOf(container);

        act(() => {
            widen(scroller, 900);
            resize(scroller);
        });

        const className = tableOf(container).className;

        expect(className).toContain(`${PINNED}:bg-(--sticky-cell-fill)`);
        expect(className).toContain(
            '[&_tr:hover>td:last-child:not([colspan])]:[background-image:linear-gradient(var(--glass-highlight),var(--glass-highlight))]',
        );
        expect(className).toContain(
            '[&_tr[data-state=selected]>td:last-child:not([colspan])]:bg-(--sticky-cell-selected)',
        );
    });

    it('adds no hover of its own while the table fits, so the row hover alone shows', () => {
        const { container } = render(
            <DataTable columns={columns} data={data} stickyLastColumn />,
        );

        expect(tableOf(container).className).not.toContain(
            '[&_tr:hover>td:last-child:not([colspan])]',
        );
    });

    it('transitions its fill, so the cell and the row read as one hover', () => {
        const { container } = render(
            <DataTable columns={columns} data={data} stickyLastColumn />,
        );

        expect(tableOf(container).className).toContain(
            `${PINNED}:transition-[background-color,box-shadow]`,
        );
    });

    it('leaves a cell that spans columns alone, the empty state included', () => {
        const { container } = render(
            <DataTable columns={columns} data={[]} stickyLastColumn />,
        );

        const cell = container.querySelector('tbody td');

        expect(cell?.getAttribute('colspan')).toBe('1');
        expect(stickyLastCell).toContain(':not([colspan])');
    });

    it('leaves a spanning row a custom renderer opens alone', () => {
        const { container } = render(
            <DataTable
                stickyLastColumn
                columns={columns}
                data={data}
                renderRow={(row) => (
                    <TableRow key={row.id}>
                        <TableCell colSpan={2}>{row.original.name}</TableCell>
                    </TableRow>
                )}
            />,
        );

        const cell = container.querySelector('tbody td');

        expect(cell?.getAttribute('colspan')).toBe('2');
        expect(tableOf(container).className).toContain(
            '[&_:is(th,td):last-child:not([colspan])]:sticky',
        );
    });
});

describe('the shadow on the pinned column', () => {
    const SHADOW =
        '[&_:is(th,td):last-child:not([colspan])]:shadow-(--scroll-shadow-start)';

    it('stays away while the table fits', () => {
        const { container } = render(
            <DataTable columns={columns} data={data} stickyLastColumn />,
        );

        expect(tableOf(container).className).not.toContain(SHADOW);
    });

    it('appears once a column is hidden behind it', () => {
        const { container } = render(
            <DataTable columns={columns} data={data} stickyLastColumn />,
        );
        const scroller = scrollerOf(container);

        act(() => {
            widen(scroller, 900);
            resize(scroller);
        });

        expect(tableOf(container).className).toContain(SHADOW);
    });

    it('goes away again once the table is scrolled to the end', () => {
        const { container } = render(
            <DataTable columns={columns} data={data} stickyLastColumn />,
        );
        const scroller = scrollerOf(container);

        act(() => {
            widen(scroller, 900);
            resize(scroller);
        });

        act(() => {
            scroller.scrollLeft = 500;
            scroller.dispatchEvent(new Event('scroll'));
        });

        expect(tableOf(container).className).not.toContain(SHADOW);
    });
});

describe('truncated cells', () => {
    const CAPPED = '[&_:is(th,td):not(:last-child)]';

    it('let the text run by default', () => {
        const { container } = render(
            <DataTable columns={columns} data={data} />,
        );

        expect(tableOf(container).className).not.toContain(
            `${CAPPED}:max-w-72`,
        );
        expect(tableOf(container).className).not.toContain(
            `${CAPPED}:truncate`,
        );
    });

    it('cap every column but the pinned one once asked for', () => {
        const { container } = render(
            <DataTable truncateCells columns={columns} data={data} />,
        );

        expect(tableOf(container).className).toContain(`${CAPPED}:max-w-72`);
        expect(tableOf(container).className).toContain(`${CAPPED}:truncate`);
    });
});
