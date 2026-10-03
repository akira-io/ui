// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { Ship } from 'lucide-react';
import { afterEach, describe, expect, it } from 'vitest';

import { BrandLogo } from '@/blocks/brand-logo';

afterEach(cleanup);

const PALETTE_LITERAL =
    /-(?:red|rose|orange|amber|yellow|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|zinc|slate|gray|neutral|stone)-\d+|\b(?:bg|text|shadow)-(?:white|black)\b/;

function parts(container: HTMLElement) {
    const root = container.querySelector<HTMLElement>(
        '[data-slot="brand-logo"]',
    );
    const mark = container.querySelector<HTMLElement>(
        '[data-slot="brand-logo-mark"]',
    );
    const name = container.querySelector<HTMLElement>(
        '[data-slot="brand-logo-name"]',
    );

    return { root: root!, mark: mark!, name: name! };
}

describe('a brand logo', () => {
    it('renders the name as text and the icon as a decorative mark', () => {
        const { container } = render(<BrandLogo icon={Ship} name="NosFerry" />);
        const { mark } = parts(container);

        expect(screen.getByText('NosFerry')).toBeTruthy();
        expect(mark.querySelector('svg')).not.toBeNull();
        expect(mark.getAttribute('aria-hidden')).toBe('true');
    });

    it('paints the mark from the brand tokens rather than palette literals', () => {
        const { container } = render(<BrandLogo icon={Ship} name="NosFerry" />);
        const { root, mark, name } = parts(container);

        expect(mark.classList).toContain('bg-primary');
        expect(mark.classList).toContain('text-primary-foreground');
        expect(mark.classList).toContain('shadow-primary/20');
        expect(name.classList).toContain('text-foreground');

        for (const element of [root, mark, name]) {
            expect(element.className).not.toMatch(PALETTE_LITERAL);
        }
    });

    it('keeps the name for assistive technology while hiding it in the collapsed icon rail', () => {
        const { container } = render(<BrandLogo icon={Ship} name="NosFerry" />);
        const { root, name } = parts(container);

        expect(name.classList).toContain(
            'group-data-[collapsible=icon]:sr-only',
        );
        expect(name.classList).not.toContain(
            'group-data-[collapsible=icon]:hidden',
        );
        expect(root.tagName).toBe('DIV');
    });

    it('keeps the mark from shrinking inside a narrow button', () => {
        const { container } = render(<BrandLogo icon={Ship} name="NosFerry" />);

        expect(parts(container).mark.classList).toContain('shrink-0');
    });

    it('accepts a custom slot name and merges the class name onto the root', () => {
        const { container } = render(
            <BrandLogo
                icon={Ship}
                name="NosFerry"
                slotName="app-logo"
                className="px-1"
            />,
        );
        const root = container.querySelector('[data-slot="app-logo"]');

        expect(root).not.toBeNull();
        expect(root!.classList).toContain('px-1');
    });
});
