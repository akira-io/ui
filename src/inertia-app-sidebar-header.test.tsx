// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebarHeader } from '@/inertia';

import { installMatchMedia } from '../tests/fixtures/match-media';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

describe('the Inertia sidebar header', () => {
    it('forwards the actions to the header', () => {
        render(
            <SidebarProvider>
                <AppSidebarHeader
                    actions={<button type="button">Notifications</button>}
                />
            </SidebarProvider>,
        );

        expect(
            screen
                .getByRole('button', { name: 'Notifications' })
                .closest('[data-slot="app-sidebar-header-actions"]'),
        ).not.toBeNull();
    });
});
