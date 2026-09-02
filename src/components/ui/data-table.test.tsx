// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { DataTable } from '@/components/ui/data-table';
import { elevatedSurface, flatSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';

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
    it('stays elevated', () => {
        const { container } = render(
            <DataTable columns={columns} data={data} />,
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

describe('a flat data table', () => {
    it('drops every elevation class', () => {
        const { container } = render(
            <DataTable flat columns={columns} data={data} />,
        );

        for (const className of ELEVATION) {
            expect(classesOf(container)).not.toContain(className);
        }
    });

    it('keeps its own padding, because flat drops the surface and not the spacing', () => {
        const { container } = render(
            <DataTable flat columns={columns} data={data} />,
        );

        expect(classesOf(container)).toContain('p-5');
    });

    it('keeps its fill', () => {
        const { container } = render(
            <DataTable flat columns={columns} data={data} />,
        );

        expect(classesOf(container)).toContain('bg-card');
    });

    it('marks itself for a consumer to target', () => {
        const { container } = render(
            <DataTable flat columns={columns} data={data} />,
        );

        expect(markerOf(container)).toBe('true');
    });
});
