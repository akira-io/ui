// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { JsonViewer } from '@/components/ui/json-viewer';

afterEach(cleanup);

const payload = {
    reference: 'PR-1',
    amount: 1250,
    paid: false,
    cancelledAt: null,
    lines: [{ label: 'Ticket', quantity: 2 }],
};

function toggles(container: HTMLElement): HTMLElement[] {
    return [
        ...container.querySelectorAll<HTMLElement>(
            '[data-slot="json-viewer-toggle"]',
        ),
    ];
}

describe('JsonViewer', () => {
    it('renders a parsed value without the caller stringifying it', () => {
        render(<JsonViewer value={payload} />);

        expect(screen.getByText('reference:')).toBeDefined();
        expect(screen.getByText('"PR-1"')).toBeDefined();
        expect(screen.getByText('1250')).toBeDefined();
        expect(screen.getByText('false')).toBeDefined();
        expect(screen.getByText('null')).toBeDefined();
    });

    it('opens only as deep as the initial depth asks for', () => {
        const { container } = render(
            <JsonViewer value={payload} initialDepth={1} />,
        );

        expect(screen.queryByText('label:')).toBeNull();
        expect(toggles(container)[1].getAttribute('aria-expanded')).toBe(
            'false',
        );
    });

    it('opens the whole payload when the initial depth allows it', () => {
        render(<JsonViewer value={payload} initialDepth={5} />);

        expect(screen.getByText('label:')).toBeDefined();
        expect(screen.getByText('"Ticket"')).toBeDefined();
    });

    it('expands and collapses a nested node', async () => {
        const user = userEvent.setup();
        const { container } = render(
            <JsonViewer value={payload} initialDepth={1} />,
        );

        await user.click(toggles(container)[1]);
        await user.click(toggles(container)[2]);
        expect(screen.getByText('label:')).toBeDefined();

        await user.click(toggles(container)[1]);
        expect(screen.queryByText('label:')).toBeNull();
    });

    it('counts the entries hidden behind a collapsed node', () => {
        render(<JsonViewer value={payload} initialDepth={1} />);

        expect(screen.getByText('1 entry')).toBeDefined();
    });

    it('reads an array by index and keeps deep nesting reachable', async () => {
        const user = userEvent.setup();
        const deep = { a: { b: { c: { d: 'bottom' } } } };
        const { container } = render(
            <JsonViewer value={deep} initialDepth={1} />,
        );

        for (const step of ['a', 'b', 'c']) {
            await user.click(
                toggles(container).find((toggle) =>
                    toggle.textContent?.startsWith(`${step}:`),
                ) as HTMLElement,
            );
        }

        expect(screen.getByText('"bottom"')).toBeDefined();
    });

    it('indexes the entries of an array', () => {
        render(<JsonViewer value={['first', 'second']} initialDepth={2} />);

        expect(screen.getByText('0:')).toBeDefined();
        expect(screen.getByText('"second"')).toBeDefined();
    });

    it('marks a circular reference instead of throwing', () => {
        const circular: Record<string, unknown> = { name: 'root' };
        circular.self = circular;

        render(<JsonViewer value={circular} initialDepth={3} />);

        expect(screen.getByText('Circular reference')).toBeDefined();
    });

    it('copies valid json rather than the rendered text', async () => {
        const user = userEvent.setup();

        render(<JsonViewer value={payload} initialDepth={0} />);

        await user.click(screen.getByRole('button', { name: 'Copy' }));

        expect(JSON.parse(await navigator.clipboard.readText())).toEqual(
            payload,
        );
    });

    it('copies a payload holding a circular reference as valid json', async () => {
        const user = userEvent.setup();
        const circular: Record<string, unknown> = { name: 'root' };
        circular.self = circular;

        render(<JsonViewer value={circular} />);

        await user.click(screen.getByRole('button', { name: 'Copy' }));

        expect(JSON.parse(await navigator.clipboard.readText())).toEqual({
            name: 'root',
            self: '[Circular]',
        });
    });

    it('translates the labels a consumer overrides', () => {
        const { container } = render(
            <JsonViewer
                value={payload}
                initialDepth={0}
                copyLabel="Copiar"
                expandLabel="Expandir"
                entriesLabel={(count) => `${count} campos`}
            />,
        );

        expect(screen.getByRole('button', { name: 'Copiar' })).toBeDefined();
        expect(toggles(container)[0].getAttribute('aria-label')).toBe(
            'Expandir',
        );
        expect(screen.getByText('5 campos')).toBeDefined();
    });
});
