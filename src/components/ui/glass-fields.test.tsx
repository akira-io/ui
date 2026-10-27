// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { SidebarInput, SidebarProvider } from '@/components/ui/sidebar';

import { installMatchMedia } from '../../../tests/fixtures/match-media';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

const classes = (selector: string) =>
    document.querySelector(selector)!.className.split(' ');

describe('fields and bars over glass', () => {
    it('keeps the sidebar search on the field capsule', () => {
        render(
            <SidebarProvider>
                <SidebarInput placeholder="Search" />
            </SidebarProvider>,
        );

        const input = classes('[data-sidebar="input"]');

        expect(input).not.toContain('bg-background');
        expect(input).toEqual(
            expect.arrayContaining(['bg-(--field-fill)', 'rounded-full']),
        );
        expect(input).not.toContain('border');
    });

    it('lets the navigation trigger sit clear on the bar', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>,
        );

        const trigger = classes('[data-slot="navigation-menu-trigger"]');

        expect(trigger).not.toContain('bg-background');
        expect(trigger).toContain('bg-transparent');
    });

    it('gives links styled as triggers no opaque fill', () => {
        const link = navigationMenuTriggerStyle().split(' ');

        expect(link).not.toContain('bg-background');
        expect(link).toContain('bg-transparent');
    });
});
