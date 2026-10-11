// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Sidebar,
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';

import { installMatchMedia } from '../../../tests/fixtures/match-media';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

function renderInset() {
    render(
        <SidebarProvider>
            <Sidebar variant="inset" />
            <SidebarInset>
                <p>content</p>
            </SidebarInset>
        </SidebarProvider>,
    );

    return {
        wrapper: (
            document.querySelector(
                '[data-slot="sidebar-wrapper"]',
            ) as HTMLElement
        ).className.split(' '),
        inset: (
            document.querySelector('[data-slot="sidebar-inset"]') as HTMLElement
        ).className.split(' '),
    };
}

describe('the inset content area, as in Finder', () => {
    it('keeps the window still and scrolls only the content inside it', () => {
        const { wrapper, inset } = renderInset();

        expect(wrapper).toContain('has-data-[variant=inset]:h-svh');
        expect(wrapper).toContain('has-data-[variant=inset]:overflow-hidden');
        expect(inset).toContain('peer-data-[variant=inset]:overflow-y-auto');
        expect(inset).toContain('peer-data-[variant=inset]:overscroll-none');
    });

    it('meets the right and bottom edges of the window with no margin or corner there', () => {
        const { inset } = renderInset();

        expect(inset).toContain('md:peer-data-[variant=inset]:mt-item');
        expect(inset).toContain('md:peer-data-[variant=inset]:rounded-tl-xl');
        expect(inset).not.toContain('md:peer-data-[variant=inset]:m-item');
        expect(inset).not.toContain('md:peer-data-[variant=inset]:rounded-xl');
    });
});
