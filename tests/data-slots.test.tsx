// @vitest-environment jsdom

import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { cleanup, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SelectField, TextField } from '@/blocks/settings-fields';
import { AppearanceToggle } from '@/components/ui/appearance-toggle';
import { Button } from '@/components/ui/button';
import { CalendarPopover } from '@/components/ui/calendar-popover';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Combobox } from '@/components/ui/combobox';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ServerFacetedFilter } from '@/components/ui/data-table-faceted-filter';
import { DateRangeFilter } from '@/components/ui/date-range-filter';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { EditorHistory, EditorMark } from '@/components/ui/editor/controls';
import { Field, FieldControl, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { SidebarInput, SidebarSeparator } from '@/components/ui/sidebar';
import { Textarea } from '@/components/ui/textarea';

import { ControlledEditor } from './fixtures/editor';
import { installMatchMedia } from './fixtures/match-media';

const uiDir = resolve(process.cwd(), 'src/components/ui');

const WITHOUT_MARKUP = ['icon.tsx', 'sonner.tsx'];

class ObserverStub {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): [] {
        return [];
    }
}

beforeAll(() => {
    globalThis.ResizeObserver ??=
        ObserverStub as unknown as typeof ResizeObserver;
    globalThis.IntersectionObserver ??=
        ObserverStub as unknown as typeof IntersectionObserver;
    installMatchMedia();
});

afterEach(cleanup);

function componentFiles(): string[] {
    return readdirSync(uiDir)
        .filter((name) => name.endsWith('.tsx'))
        .filter((name) => !name.endsWith('.test.tsx'))
        .filter((name) => !WITHOUT_MARKUP.includes(name))
        .sort();
}

function noop(): void {}

interface SlotCase {
    owner: string;
    slot: string;
    element: () => ReactElement;
}

const composed: SlotCase[] = [
    {
        owner: 'Combobox',
        slot: 'combobox',
        element: () => <Combobox value="" options={[]} onChange={noop} />,
    },
    {
        owner: 'DateRangeFilter',
        slot: 'date-range-filter',
        element: () => <DateRangeFilter onChange={noop} />,
    },
    {
        owner: 'PasswordInput',
        slot: 'password-input-toggle',
        element: () => <PasswordInput />,
    },
    {
        owner: 'CarouselPrevious',
        slot: 'carousel-previous',
        element: () => (
            <Carousel>
                <CarouselContent>
                    <CarouselItem>One</CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        ),
    },
    {
        owner: 'CarouselNext',
        slot: 'carousel-next',
        element: () => (
            <Carousel>
                <CarouselContent>
                    <CarouselItem>One</CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        ),
    },
    {
        owner: 'AppearanceToggle',
        slot: 'appearance-toggle-trigger',
        element: () => <AppearanceToggle variant="menu" />,
    },
    {
        owner: 'ServerFacetedFilter',
        slot: 'data-table-faceted-filter',
        element: () => (
            <ServerFacetedFilter
                filter={{
                    paramKey: 'status',
                    label: 'Status',
                    options: [{ label: 'Open', value: 'open' }],
                }}
                selected={[]}
                onChange={noop}
            />
        ),
    },
    {
        owner: 'EditorHistory',
        slot: 'editor-history',
        element: () => (
            <ControlledEditor>
                <EditorHistory action="undo" />
            </ControlledEditor>
        ),
    },
    {
        owner: 'EditorMark',
        slot: 'editor-control',
        element: () => (
            <ControlledEditor>
                <EditorMark mark="bold" />
            </ControlledEditor>
        ),
    },
    {
        owner: 'ConfirmDialog',
        slot: 'confirm-dialog',
        element: () => (
            <ConfirmDialog open onOpenChange={noop} onConfirm={noop} />
        ),
    },
    {
        owner: 'CalendarPopover',
        slot: 'calendar-popover',
        element: () => (
            <CalendarPopover
                open
                onOpenChange={noop}
                trigger={<Button>Pick</Button>}
            >
                <p>Calendar</p>
            </CalendarPopover>
        ),
    },
    {
        owner: 'FieldLabel',
        slot: 'field-label',
        element: () => (
            <Field>
                <FieldLabel>Departure</FieldLabel>
            </Field>
        ),
    },
    {
        owner: 'TextField',
        slot: 'text-field',
        element: () => <TextField label="Name" value="" onChange={noop} />,
    },
    {
        owner: 'SelectField',
        slot: 'select-field',
        element: () => (
            <SelectField
                label="Status"
                value=""
                options={[{ label: 'Open', value: 'open' }]}
                onChange={noop}
            />
        ),
    },
    {
        owner: 'SidebarInput',
        slot: 'sidebar-input',
        element: () => <SidebarInput />,
    },
    {
        owner: 'SidebarSeparator',
        slot: 'sidebar-separator',
        element: () => <SidebarSeparator />,
    },
];

const wrapped: SlotCase[] = [
    {
        owner: 'Button',
        slot: 'button',
        element: () => <Button>Save</Button>,
    },
    {
        owner: 'Input',
        slot: 'input',
        element: () => <Input />,
    },
    {
        owner: 'Textarea',
        slot: 'textarea',
        element: () => <Textarea />,
    },
    {
        owner: 'Combobox',
        slot: 'combobox',
        element: () => <Combobox value="" options={[]} onChange={noop} />,
    },
    {
        owner: 'DateRangeFilter',
        slot: 'date-range-filter',
        element: () => <DateRangeFilter onChange={noop} />,
    },
];

function spreadElements(source: string): string[] {
    const elements: string[] = [];

    for (const match of source.matchAll(/\{\.\.\.props\}/g)) {
        const at = match.index ?? 0;
        const opensAt = source.lastIndexOf('<', at);
        const closesAt = source.indexOf('>', at);

        elements.push(source.slice(opensAt, closesAt));
    }

    return elements;
}

function slotsNotOwnedByTheComponent(source: string): string[] {
    return spreadElements(source)
        .filter((element) => element.includes('data-slot'))
        .filter((element) => {
            const spreadAt = element.indexOf('{...props}');
            const slotAt = element.indexOf('data-slot');

            return (
                slotAt < spreadAt || !element.includes('data-slot={slotName')
            );
        });
}

describe('data slots in the source', () => {
    it.each(componentFiles())('%s names its slot with a prop', (name) => {
        const source = readFileSync(`${uiDir}/${name}`, 'utf8');

        expect(source).toMatch(/slotName\s*=\s*'[a-z0-9-]+'/);
    });

    it.each(componentFiles())(
        '%s writes that slot after the spread, so a wrapper cannot rename it',
        (name) => {
            const source = readFileSync(`${uiDir}/${name}`, 'utf8');

            expect(slotsNotOwnedByTheComponent(source)).toEqual([]);
        },
    );

    it('keeps the exemption list free of files that now render markup', () => {
        for (const name of WITHOUT_MARKUP) {
            const source = readFileSync(`${uiDir}/${name}`, 'utf8');

            expect(source).not.toMatch(/(?:data-slot|slotName)/);
        }
    });
});

describe('a component that composes another component', () => {
    it.each(composed)('renders $owner as $slot', ({ slot, element }) => {
        render(element());

        expect(document.querySelector(`[data-slot="${slot}"]`)).not.toBeNull();
    });
});

describe('a control the field family wires up', () => {
    it.each(wrapped)('keeps $owner labelled $slot', ({ slot, element }) => {
        render(
            <Field>
                <FieldControl>{element()}</FieldControl>
            </Field>,
        );

        expect(
            document.querySelector('[data-slot="field-control"]'),
        ).toBeNull();
        expect(document.querySelector(`[data-slot="${slot}"]`)).not.toBeNull();
        expect(
            document.querySelector('[data-field-control="true"]'),
        ).not.toBeNull();
    });
});

interface SlotNameComponent {
    path: string;
    name: string;
    block: string;
}

function slotNameComponents(directory: string): SlotNameComponent[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = `${directory}/${entry.name}`;

        if (entry.isDirectory()) {
            return slotNameComponents(path);
        }

        if (!entry.name.endsWith('.tsx') || entry.name.endsWith('.test.tsx')) {
            return [];
        }

        const source = readFileSync(path, 'utf8');
        const matches = [...source.matchAll(/^export function (\w+)\(/gm)];

        return matches.flatMap((match, index) => {
            const start = match.index ?? 0;
            const end = matches[index + 1]?.index ?? source.length;
            const block = source.slice(start, end);

            return block.includes('SlotNameProps')
                ? [{ path, name: match[1], block }]
                : [];
        });
    });
}

describe('data slots in src/blocks and src/shells', () => {
    const components = [
        ...slotNameComponents(resolve(process.cwd(), 'src/blocks')),
        ...slotNameComponents(resolve(process.cwd(), 'src/shells')),
    ];

    it('finds at least one component that opts into SlotNameProps, so this guard is not vacuous', () => {
        expect(components.length).toBeGreaterThan(0);
    });

    it.each(components)(
        '$path :: $name declares a default for the slotName it accepts',
        ({ block }) => {
            expect(block).toMatch(/slotName\s*=\s*'[a-z0-9-]+'/);
        },
    );

    it.each(components)(
        '$path :: $name actually wires slotName into what it renders, instead of accepting and ignoring it',
        ({ block }) => {
            expect(block).toMatch(/(?:data-slot|slotName)=\{slotName\}/);
        },
    );
});

describe('a button handed to a trigger that slots its child', () => {
    it('keeps the button slot rather than the trigger slot', () => {
        render(
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Open</Button>
                </DialogTrigger>
            </Dialog>,
        );

        expect(document.querySelector('[data-slot="button"]')).not.toBeNull();
    });
});
