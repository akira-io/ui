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

describe('the app header', () => {
    it('sticks to the top on the bar glass by default', () => {
        const element = header();

        expect(element.classList).toContain('sticky');
        expect(element.classList).toContain('top-0');
        expect(element.classList).toContain('glass-bar');
    });

    it('stays static and unfilled when sticky is off', () => {
        const element = header(false);

        expect(element.classList).not.toContain('sticky');
        expect(element.classList).not.toContain('glass-bar');
    });
});
