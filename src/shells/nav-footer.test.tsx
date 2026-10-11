// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { BookOpen } from 'lucide-react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';

import { installMatchMedia } from '../../tests/fixtures/match-media';
import { NavFooter } from './nav-footer';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

function renderFooter() {
    render(
        <SidebarProvider>
            <NavFooter
                items={[
                    { title: 'Documentation', href: '/docs', icon: BookOpen },
                ]}
            />
        </SidebarProvider>,
    );

    return screen.getByRole('link', { name: 'Documentation' });
}

describe('the sidebar footer links', () => {
    it('add no padding of their own, so they align with the rows above', () => {
        const link = renderFooter();

        expect(
            (
                link.closest('[data-sidebar="group"]') as HTMLElement
            ).className.split(' '),
        ).toContain('p-0');
    });

    it('size their icons like every other row', () => {
        const link = renderFooter();

        expect(link.querySelector('svg')?.getAttribute('class')).not.toMatch(
            /size-/,
        );
    });
});
