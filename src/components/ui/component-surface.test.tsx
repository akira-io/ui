// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { installMatchMedia } from '../../../tests/fixtures/match-media';
import { installResizeObserver } from '../../../tests/fixtures/resize-observer';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { Alert } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { ChartContainer } from '@/components/ui/chart-container';
import { CodeBlock } from '@/components/ui/code-block';
import { Command } from '@/components/ui/command';
import { DataTable } from '@/components/ui/data-table';
import { DonutChart } from '@/components/ui/donut-chart';
import { Dropzone } from '@/components/ui/dropzone';
import { JsonViewer } from '@/components/ui/json-viewer';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import type { ContentSurface } from '@/lib/language';

class ObserverStub {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): [] {
        return [];
    }
}

beforeAll(() => {
    globalThis.IntersectionObserver ??=
        ObserverStub as unknown as typeof IntersectionObserver;
    installMatchMedia();
    patchPointerApis();
});

beforeEach(installResizeObserver);

afterEach(cleanup);

type Renderer = (surface?: ContentSurface) => ReactElement;

const components: [string, string, Renderer][] = [
    [
        'Accordion',
        'accordion',
        (surface) => (
            <Accordion type="single" surface={surface}>
                <AccordionItem value="one">One</AccordionItem>
            </Accordion>
        ),
    ],
    ['Alert', 'alert', (surface) => <Alert surface={surface}>Body</Alert>],
    ['Calendar', 'calendar', (surface) => <Calendar surface={surface} />],
    ['Card', 'card', (surface) => <Card surface={surface}>Body</Card>],
    [
        'Carousel',
        'carousel',
        (surface) => (
            <Carousel surface={surface}>
                <CarouselContent>
                    <CarouselItem>One</CarouselItem>
                </CarouselContent>
            </Carousel>
        ),
    ],
    [
        'ChartContainer',
        'chart',
        (surface) => (
            <ChartContainer config={{}} surface={surface}>
                <div />
            </ChartContainer>
        ),
    ],
    [
        'CodeBlock',
        'code-block',
        (surface) => <CodeBlock code="const one = 1;" surface={surface} />,
    ],
    ['Command', 'command', (surface) => <Command surface={surface} />],
    [
        'DataTable',
        'data-table',
        (surface) => (
            <DataTable
                columns={[{ accessorKey: 'name', header: 'Name' }]}
                data={[{ name: 'Ada' }]}
                surface={surface}
            />
        ),
    ],
    [
        'DonutChart',
        'donut-chart',
        (surface) => (
            <DonutChart data={[{ label: 'One', value: 1 }]} surface={surface} />
        ),
    ],
    ['Dropzone', 'dropzone', (surface) => <Dropzone surface={surface} />],
    [
        'JsonViewer',
        'json-viewer',
        (surface) => <JsonViewer value={{ one: 1 }} surface={surface} />,
    ],
    [
        'ResizablePanelGroup',
        'resizable-panel-group',
        (surface) => (
            <ResizablePanelGroup surface={surface}>
                <ResizablePanel>One</ResizablePanel>
            </ResizablePanelGroup>
        ),
    ],
    [
        'ScrollArea',
        'scroll-area',
        (surface) => <ScrollArea surface={surface}>Body</ScrollArea>,
    ],
    [
        'Table',
        'table-container',
        (surface) => (
            <Table surface={surface}>
                <TableBody>
                    <TableRow>
                        <TableCell>One</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        ),
    ],
    [
        'TabsContent',
        'tabs-content',
        (surface) => (
            <Tabs value="one">
                <TabsContent value="one" surface={surface}>
                    Body
                </TabsContent>
            </Tabs>
        ),
    ],
];

function rootClasses(slot: string, element: ReactElement): string[] {
    const { container } = render(element);
    const root = container.querySelector(`[data-slot="${slot}"]`);

    return root?.className.split(/\s+/) ?? [];
}

describe.each(components)('%s surface', (_, slot, renderWith) => {
    it('fills with the grouped fill by default', () => {
        const classes = rootClasses(slot, renderWith());

        expect(classes).toContain('bg-(--grouped-fill)');
        expect(classes).not.toContain('glass-panel');
    });

    it('floats as glass when asked', () => {
        const classes = rootClasses(slot, renderWith('glass'));

        expect(classes).toContain('glass-panel');
        expect(classes).not.toContain('bg-(--grouped-fill)');
    });

    it('draws no fill when the surface is none', () => {
        const classes = rootClasses(slot, renderWith('none'));

        expect(classes).not.toContain('glass-panel');
        expect(classes).not.toContain('bg-(--grouped-fill)');
    });

    it('keeps the surface prop off the DOM', () => {
        const { container } = render(renderWith('glass'));

        expect(container.querySelector('[surface]')).toBeNull();
    });
});
