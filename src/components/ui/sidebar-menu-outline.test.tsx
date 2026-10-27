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

describe('the outline sidebar button', () => {
    it('is a glass bubble rather than an opaque box with an hsl ring', () => {
        render(
            <SidebarProvider>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton variant="outline">
                            Inbox
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarProvider>,
        );

        const classes = document
            .querySelector('[data-sidebar="menu-button"]')!
            .className.split(' ');

        expect(classes).toContain('glass-button');
        expect(classes).not.toContain('bg-background');
        expect(classes.join(' ')).not.toContain('hsl(var(');
        expect(classes).toContain('hover:bg-(--glass-highlight)');
        expect(classes).not.toContain('hover:bg-(--glass-button-tint)');
    });
});
