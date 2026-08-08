// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

afterEach(cleanup);

function classesOf(name: string): string[] {
    return screen.getByText(name).className.split(/\s+/);
}

describe('the active tab', () => {
    it('paints from the tab token rather than the page background', () => {
        render(
            <Tabs value="one">
                <TabsList>
                    <TabsTrigger value="one">One</TabsTrigger>
                </TabsList>
            </Tabs>,
        );

        const classes = classesOf('One');

        expect(classes).toContain('data-[state=active]:bg-tab-active');
        expect(classes).not.toContain('data-[state=active]:bg-background');
    });
});
