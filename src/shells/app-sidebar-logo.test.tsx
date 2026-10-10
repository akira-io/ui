// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { Ship } from 'lucide-react';
import type { ReactNode } from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { BrandLogo } from '@/blocks/brand-logo';
import { SidebarProvider } from '@/components/ui/sidebar';

import { installMatchMedia } from '../../tests/fixtures/match-media';
import { AppSidebar } from './app-sidebar';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

function renderRail(logo: ReactNode) {
    render(
        <SidebarProvider defaultOpen={false}>
            <AppSidebar
                logo={logo}
                logoHref="/"
                groups={[]}
                user={{ name: 'Ana', email: 'ana@example.test', avatar: '' }}
                settingsHref="/settings"
                logoutHref="/logout"
            />
        </SidebarProvider>,
    );
}

function logoButtonClasses(): string[] {
    const button = document.querySelector<HTMLElement>(
        '[data-slot="sidebar-header"] [data-slot="sidebar-menu-button"]',
    );

    expect(button).not.toBeNull();

    return (button as HTMLElement).className.split(' ');
}

describe('the sidebar logo on the icon rail', () => {
    it('drops the padding so a 40px brand mark fills the 40px button', () => {
        renderRail(<BrandLogo icon={Ship} name="NosFerry" />);

        const classes = logoButtonClasses();

        expect(classes).toContain('group-data-[collapsible=icon]:p-0!');
        expect(classes).not.toContain('group-data-[collapsible=icon]:p-2.5!');
        expect(classes).toEqual(
            expect.arrayContaining([
                'group-data-[collapsible=icon]:size-10!',
                'group-data-[collapsible=icon]:justify-center',
            ]),
        );
    });

    it('keeps a bare svg logo at icon size, centred in the button', () => {
        renderRail(<Ship />);

        expect(logoButtonClasses()).toEqual(
            expect.arrayContaining([
                '[&>svg]:size-4.5',
                'group-data-[collapsible=icon]:justify-center',
            ]),
        );
    });
});
