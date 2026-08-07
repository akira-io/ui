// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TextLink } from '@/components/ui/text-link';

afterEach(cleanup);

interface RouterLinkProps extends React.ComponentProps<'a'> {
    to: string;
}

function RouterLink({ to, children, ...props }: RouterLinkProps) {
    return (
        <a data-router="test" href={to} {...props}>
            {children}
        </a>
    );
}

describe('TextLink', () => {
    it('renders a plain anchor by default', () => {
        render(<TextLink href="/terms">Terms</TextLink>);

        const link = screen.getByRole('link', { name: 'Terms' });

        expect(link.tagName).toBe('A');
        expect(link.getAttribute('href')).toBe('/terms');
        expect(link.getAttribute('data-slot')).toBe('text-link');
    });

    it('renders through a caller supplied component and keeps its props', () => {
        render(
            <TextLink asChild>
                <RouterLink to="/terms">Terms</RouterLink>
            </TextLink>,
        );

        const link = screen.getByRole('link', { name: 'Terms' });

        expect(link.getAttribute('data-router')).toBe('test');
        expect(link.getAttribute('href')).toBe('/terms');
    });

    it('keeps its own styling on the slotted component', () => {
        render(
            <TextLink asChild>
                <RouterLink to="/terms" className="col-span-2">
                    Terms
                </RouterLink>
            </TextLink>,
        );

        const link = screen.getByRole('link', { name: 'Terms' });

        expect(link.className).toContain('underline');
        expect(link.className).toContain('decoration-border');
        expect(link.className).toContain('underline-offset-4');
        expect(link.className).toContain('col-span-2');
        expect(link.getAttribute('data-slot')).toBe('text-link');
    });

    it('keeps the slotted component handlers working', async () => {
        const onClick = vi.fn();
        const { default: userEvent } =
            await import('@testing-library/user-event');

        render(
            <TextLink asChild>
                <RouterLink to="/terms" onClick={onClick}>
                    Terms
                </RouterLink>
            </TextLink>,
        );

        await userEvent
            .setup()
            .click(screen.getByRole('link', { name: 'Terms' }));

        expect(onClick).toHaveBeenCalledOnce();
    });

    it('marks the muted variant on the element', () => {
        render(
            <TextLink href="/terms" variant="muted">
                Terms
            </TextLink>,
        );

        const link = screen.getByRole('link', { name: 'Terms' });

        expect(link.getAttribute('data-variant')).toBe('muted');
        expect(link.className).toContain('text-muted-foreground');
    });
});
