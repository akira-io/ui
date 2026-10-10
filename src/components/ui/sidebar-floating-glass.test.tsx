// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';

import { installMatchMedia } from '../../../tests/fixtures/match-media';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

function panel(variant: 'sidebar' | 'floating'): string {
    render(
        <SidebarProvider>
            <Sidebar variant={variant} />
        </SidebarProvider>,
    );

    const element = document.querySelector('[data-sidebar="sidebar"]');

    expect(element).not.toBeNull();

    return (element as HTMLElement).className;
}

describe('the sidebar panel', () => {
    it('floats on the sidebar glass, tinted like the docked sidebar', () => {
        const classes = panel('floating').split(' ');

        expect(classes).toContain('glass-sidebar');
        expect(classes).not.toContain('glass-panel');
    });

    it('drops its solid fill and border when floating', () => {
        const classes = panel('floating').split(' ');

        expect(classes).not.toContain('bg-sidebar');
        expect(classes.join(' ')).not.toContain('border-sidebar-border');
    });

    it('stays solid when docked', () => {
        expect(panel('sidebar').split(' ')).toContain('bg-sidebar');
    });
});
