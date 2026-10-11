/** @vitest-environment jsdom */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar, AvatarFallback } from './avatar';
import { Badge } from './badge';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from './pagination';
import { Tabs, TabsList, TabsTrigger } from './tabs';

const classes = (element: Element | null) => element!.className.split(' ');

describe('glass across the release', () => {
    it('draws the tabs as a capsule track with a glass lens', () => {
        const { container } = render(
            <Tabs defaultValue="a">
                <TabsList>
                    <TabsTrigger value="a">A</TabsTrigger>
                    <TabsTrigger value="b">B</TabsTrigger>
                </TabsList>
            </Tabs>,
        );

        expect(
            classes(container.querySelector('[data-slot="tabs-list"]')),
        ).toEqual(
            expect.arrayContaining(['h-control', 'rounded-full', 'bg-muted']),
        );
        expect(
            classes(container.querySelector('[data-slot="tabs-indicator"]')),
        ).toContain('glass-button');
    });

    it('marks the current page with prominent glass and the others with glass', () => {
        const { container } = render(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink href="#1" isActive>
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#2">2</PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>,
        );
        const [current, other] = container.querySelectorAll('a');

        expect(classes(current)).toContain('glass-prominent');
        expect(classes(other)).toContain('glass-button');
    });

    it.each([
        ['default', 'glass-prominent'],
        ['secondary', 'glass-button'],
        ['outline', 'glass-button'],
        ['destructive', 'glass-prominent'],
    ] as const)('draws the %s badge in glass', (variant, material) => {
        const { container } = render(<Badge variant={variant}>New</Badge>);

        expect(
            classes(container.querySelector('[data-slot="badge"]')),
        ).toContain(material);
    });

    it('draws the avatar fallback as a glass bubble', () => {
        const { container } = render(
            <Avatar>
                <AvatarFallback>AL</AvatarFallback>
            </Avatar>,
        );

        expect(
            classes(container.querySelector('[data-slot="avatar-fallback"]')),
        ).toContain('glass-button');
    });
});
