// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';

import { installMatchMedia } from '../../tests/fixtures/match-media';
import { AppSidebarHeader } from './app-sidebar-header';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

function header(sticky?: boolean): HTMLElement {
    render(
        <SidebarProvider>
            <AppSidebarHeader sticky={sticky} />
        </SidebarProvider>,
    );

    return document.querySelector('header') as HTMLElement;
}

function searchButton(): HTMLElement {
    return document.querySelector(
        'button[aria-label="Search..."]',
    ) as HTMLElement;
}

function trigger(): HTMLElement {
    return document.querySelector('[data-sidebar="trigger"]') as HTMLElement;
}

describe('the app header', () => {
    it('sticks to the top without a bar of its own', () => {
        const classes = header().className.split(' ');

        expect(classes).toContain('sticky');
        expect(classes).toContain('top-0');
        expect(classes).not.toContain('glass-bar');
        expect(classes).not.toContain('border-b');
    });

    it('fades the content that scrolls under it into the page', () => {
        expect(header().className).toContain('before:from-background');
    });

    it('floats its controls on their own glass capsules', () => {
        render(
            <SidebarProvider>
                <AppSidebarHeader onSearchClick={() => {}} />
            </SidebarProvider>,
        );

        expect(trigger().classList).toContain('glass-bar');
        expect(searchButton().classList).toContain('glass-bar');
    });

    it('stays a static bordered strip when sticky is off', () => {
        const classes = header(false).className.split(' ');

        expect(classes).not.toContain('sticky');
        expect(classes).toContain('border-b');
        expect(classes.join(' ')).not.toContain('before:from-background');
    });
});
