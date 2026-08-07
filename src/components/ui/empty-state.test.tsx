/** @vitest-environment jsdom */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { elevatedSurface } from '@/lib/language';
import { Inbox } from 'lucide-react';
import { EmptyState, emptyStateLabels } from './empty-state';

(
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;
let container: HTMLDivElement | undefined;

function render(element: React.ReactNode) {
    container ??= document.createElement('div');
    if (!container.isConnected) document.body.append(container);
    root ??= createRoot(container);
    act(() => root!.render(element));
    return container;
}

afterEach(() => {
    act(() => root?.unmount());
    container?.remove();
    root = undefined;
    container = undefined;
});

describe('EmptyState', () => {
    it('renders the icon, the title, the description and the actions', () => {
        const view = render(
            <EmptyState
                icon={Inbox}
                title="No invoices"
                description="Invoices you issue will appear here."
                actions={<Button>New invoice</Button>}
            />,
        );
        const block = view.querySelector('[data-slot="empty-state"]');

        expect(
            block?.querySelector('[data-slot="empty-state-title"]')
                ?.textContent,
        ).toBe('No invoices');
        expect(
            block?.querySelector('[data-slot="empty-state-description"]')
                ?.textContent,
        ).toBe('Invoices you issue will appear here.');
        expect(
            block?.querySelector('[data-slot="empty-state-icon"] svg'),
        ).not.toBeNull();
        expect(
            block?.querySelector('[data-slot="empty-state-actions"] button')
                ?.textContent,
        ).toBe('New invoice');
    });

    it('fires the action the caller supplied', () => {
        const onClick = vi.fn();
        const view = render(
            <EmptyState
                title="No invoices"
                actions={<Button onClick={onClick}>New invoice</Button>}
            />,
        );

        act(() => {
            view.querySelector<HTMLButtonElement>(
                '[data-slot="empty-state-actions"] button',
            )?.click();
        });

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('falls back to the English default title', () => {
        const view = render(<EmptyState />);

        expect(
            view.querySelector('[data-slot="empty-state-title"]')?.textContent,
        ).toBe(emptyStateLabels.title);
    });

    it('renders without a description and without actions', () => {
        const view = render(<EmptyState title="No invoices" />);

        expect(
            view.querySelector('[data-slot="empty-state-description"]'),
        ).toBeNull();
        expect(
            view.querySelector('[data-slot="empty-state-actions"]'),
        ).toBeNull();
    });

    it('marks the compact density so small panels get the smaller treatment', () => {
        const view = render(<EmptyState title="No invoices" compact />);
        const block = view.querySelector('[data-slot="empty-state"]');

        expect(block?.getAttribute('data-compact')).toBe('true');
        expect(
            block
                ?.querySelector('[data-slot="empty-state-icon"]')
                ?.className.includes('size-8'),
        ).toBe(true);
    });

    it('paints no surface of its own so it can sit inside a card', () => {
        const view = render(<EmptyState title="No invoices" />);
        const className =
            view.querySelector('[data-slot="empty-state"]')?.className ?? '';

        for (const surfaceClass of elevatedSurface.split(' ')) {
            expect(className).not.toContain(surfaceClass);
        }
        expect(className).toContain('h-full');
    });
});

interface Invoice {
    id: string;
    reference: string;
}

const invoiceColumns = [{ accessorKey: 'reference', header: 'Reference' }];

describe('DataTable empty body', () => {
    it('renders the block when there are no rows', () => {
        const view = render(
            <DataTable<Invoice, unknown> columns={invoiceColumns} data={[]} />,
        );

        expect(view.querySelector('[data-slot="empty-state"]')).not.toBeNull();
    });

    it('honours a caller-supplied empty label', () => {
        const view = render(
            <DataTable<Invoice, unknown>
                columns={invoiceColumns}
                data={[]}
                emptyLabel="Sem faturas"
            />,
        );

        expect(
            view.querySelector('[data-slot="empty-state-title"]')?.textContent,
        ).toBe('Sem faturas');
    });

    it('does not render the block when there are rows', () => {
        const view = render(
            <DataTable<Invoice, unknown>
                columns={invoiceColumns}
                data={[{ id: '1', reference: 'FT 2026/1' }]}
            />,
        );

        expect(view.querySelector('[data-slot="empty-state"]')).toBeNull();
        expect(view.textContent).toContain('FT 2026/1');
    });
});
