// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from '@/components/ui/sidebar';

import { installMatchMedia } from '../../../tests/fixtures/match-media';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

function menu(size?: 'default' | 'sm' | 'lg') {
    render(
        <SidebarProvider>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size={size}>Downloads</SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarProvider>,
    );

    return {
        list: document.querySelector('[data-sidebar="menu"]') as HTMLElement,
        button: document.querySelector(
            '[data-sidebar="menu-button"]',
        ) as HTMLElement,
    };
}

describe('the sidebar menu', () => {
    it('sets its rows as compactly as a desktop sidebar', () => {
        const classes = menu().button.className.split(' ');

        expect(classes).toContain('h-8');
        expect(classes).toContain('gap-2');
        expect(classes).toContain('[&>svg]:size-4.5');
    });

    it('keeps the smaller and larger rows in proportion', () => {
        expect(menu('sm').button.className.split(' ')).toContain('h-7');
        cleanup();
        expect(menu('lg').button.className.split(' ')).toContain('h-12');
    });

    it('stacks its rows two pixels apart', () => {
        expect(menu().list.className.split(' ')).toContain('gap-0.5');
    });
});
