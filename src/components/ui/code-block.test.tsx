// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { Code } from '@/components/ui/code';
import { CodeBlock } from '@/components/ui/code-block';

afterEach(cleanup);

const source = ['const total = 1;', 'const label = "one";', 'export {};'].join(
    '\n',
);

describe('Code', () => {
    it('renders its content verbatim in a code element', () => {
        render(<Code>npm install</Code>);

        const inline = screen.getByText('npm install');

        expect(inline.tagName).toBe('CODE');
        expect(inline.getAttribute('data-slot')).toBe('code');
    });
});

describe('CodeBlock', () => {
    it('renders the source verbatim without a highlighter', () => {
        const { container } = render(<CodeBlock code={source} />);
        const rendered = [
            ...container.querySelectorAll('[data-slot="code-block-source"]'),
        ].map((line) => line.textContent);

        expect(rendered).toEqual(source.split('\n'));
    });

    it('renders markup passed as html instead of the plain source', () => {
        render(
            <CodeBlock
                code="const total = 1;"
                html={
                    '<pre><code><span class="line"><span>tinted</span></span></code></pre>'
                }
            />,
        );

        expect(screen.getByText('tinted')).toBeDefined();
    });

    it('falls back to the plain source when shiki is not installed', async () => {
        render(<CodeBlock code={source} language="ts" />);

        expect(await screen.findByText('export {};')).toBeDefined();
    });

    it('puts the source on the clipboard, without the line numbers', async () => {
        const user = userEvent.setup();

        render(<CodeBlock code={source} lineNumbers />);

        await user.click(screen.getByRole('button', { name: 'Copy' }));

        expect(await navigator.clipboard.readText()).toBe(source);
    });

    it('keeps the gutter out of a selection', () => {
        const { container } = render(<CodeBlock code={source} lineNumbers />);
        const gutter = container.querySelectorAll(
            '[data-slot="code-block-gutter"]',
        );

        expect(gutter).toHaveLength(3);
        expect(gutter[0].className).toContain('select-none');
        expect(gutter[0].getAttribute('aria-hidden')).toBe('true');
    });

    it('renders no gutter unless line numbers are asked for', () => {
        const { container } = render(<CodeBlock code={source} />);

        expect(
            container.querySelector('[data-slot="code-block-gutter"]'),
        ).toBeNull();
    });

    it('tints the single lines and ranges it is given', () => {
        const { container } = render(
            <CodeBlock code={source} highlightLines="1,3-3" />,
        );
        const lines = container.querySelectorAll(
            '[data-slot="code-block-line"]',
        );

        expect(lines[0].hasAttribute('data-highlighted')).toBe(true);
        expect(lines[1].hasAttribute('data-highlighted')).toBe(false);
        expect(lines[2].hasAttribute('data-highlighted')).toBe(true);
    });

    it('accepts the highlighted lines as numbers too', () => {
        const { container } = render(
            <CodeBlock code={source} highlightLines={[2]} />,
        );
        const lines = container.querySelectorAll(
            '[data-slot="code-block-line"]',
        );

        expect(lines[1].hasAttribute('data-highlighted')).toBe(true);
    });

    it('shows the filename, the language and the copy control in a header', () => {
        render(<CodeBlock code={source} filename="totals.ts" language="ts" />);

        expect(screen.getByText('totals.ts')).toBeDefined();
        expect(screen.getByText('ts')).toBeDefined();
        expect(screen.getByRole('button', { name: 'Copy' })).toBeDefined();
    });

    it('renders no header when there is no filename', () => {
        const { container } = render(<CodeBlock code={source} />);

        expect(
            container.querySelector('[data-slot="code-block-header"]'),
        ).toBeNull();
        expect(screen.getByRole('button', { name: 'Copy' })).toBeDefined();
    });

    it('leaves out the expand control when the content fits', () => {
        const { container } = render(
            <CodeBlock code={source} maxHeight={80} />,
        );

        expect(
            container.querySelector('[data-slot="code-block-expander"]'),
        ).toBeNull();
    });

    it('translates the copy label', () => {
        render(<CodeBlock code={source} copyLabel="Copiar" />);

        expect(screen.getByRole('button', { name: 'Copiar' })).toBeDefined();
    });
});
