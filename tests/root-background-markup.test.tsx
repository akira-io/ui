// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';

import { INSET_SIDEBAR } from './helpers/inset-sidebar';

beforeAll(() => {
    window.matchMedia ??= ((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
});

afterEach(cleanup);

describe('the markup the root background keys on', () => {
    it('is rendered by an inset sidebar', () => {
        render(
            <SidebarProvider>
                <Sidebar variant="inset" />
            </SidebarProvider>,
        );

        expect(document.querySelector(INSET_SIDEBAR)).not.toBeNull();
    });

    it('is absent from a sidebar that is not inset', () => {
        render(
            <SidebarProvider>
                <Sidebar variant="sidebar" />
            </SidebarProvider>,
        );

        expect(document.querySelector(INSET_SIDEBAR)).toBeNull();
    });
});
