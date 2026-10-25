// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { contentFill } from '@/lib/language';

afterEach(cleanup);

function classesOf(name: string): string[] {
    return screen.getByText(name).className.split(/\s+/);
}

describe('the active tab', () => {
    it('draws its pill as a glass bubble rather than the page background', () => {
        render(
            <Tabs value="one">
                <TabsList>
                    <TabsTrigger value="one">One</TabsTrigger>
                </TabsList>
            </Tabs>,
        );

        const pill = document.querySelector('[data-slot="tabs-indicator"]');

        expect(pill?.className.split(' ')).toContain('glass-button');
        expect(classesOf('One')).not.toContain(
            'data-[state=active]:bg-background',
        );
    });
});

function panelOf(container: HTMLElement): HTMLElement {
    const panel = container.querySelector<HTMLElement>(
        '[data-slot="tabs-content"]',
    );

    if (!panel) {
        throw new Error('the tab panel did not render');
    }

    return panel;
}

function panelClasses(container: HTMLElement): string[] {
    return panelOf(container).className.split(/\s+/);
}

const SURFACE = contentFill().split(/\s+/);

describe('the padding axis of a tab panel', () => {
    it('names a surface worth keeping, so the assertions below are not vacuous', () => {
        expect(SURFACE).toContain('bg-(--grouped-fill)');
    });

    it('pads the panel by default', () => {
        const { container } = render(
            <Tabs value="one">
                <TabsContent value="one">Body</TabsContent>
            </Tabs>,
        );

        expect(panelClasses(container)).toContain('p-5');
    });

    it('drops the padding when asked, so a child owns the spacing', () => {
        const { container } = render(
            <Tabs value="one">
                <TabsContent value="one" padding="none">
                    Body
                </TabsContent>
            </Tabs>,
        );

        expect(panelClasses(container)).not.toContain('p-5');
    });

    it('keeps the surface without its padding', () => {
        const { container } = render(
            <Tabs value="one">
                <TabsContent value="one" padding="none">
                    Body
                </TabsContent>
            </Tabs>,
        );

        expect(panelClasses(container)).toEqual(
            expect.arrayContaining(SURFACE),
        );
    });
});
