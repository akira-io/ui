// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { Plus } from 'lucide-react';
import { afterEach, describe, expect, it } from 'vitest';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

afterEach(cleanup);

describe('icon weight', () => {
    it('gives a button icon the semibold stroke', () => {
        render(
            <Button>
                <Plus />
                Add
            </Button>,
        );

        expect(screen.getByRole('button').className.split(' ')).toContain(
            'icon-weight-semibold',
        );
    });

    it('gives a badge icon the semibold stroke', () => {
        render(<Badge data-testid="badge">New</Badge>);

        expect(screen.getByTestId('badge').className.split(' ')).toContain(
            'icon-weight-semibold',
        );
    });

    it('sizes button icons with the token and lets a consumer size win', () => {
        render(
            <Button>
                <Plus className="size-8" data-testid="icon" />
                Add
            </Button>,
        );

        expect(screen.getByTestId('icon').getAttribute('class')).toContain(
            'size-8',
        );
        expect(screen.getByRole('button').className).toContain(
            "[&_svg:not([class*='size-'])]:size-icon",
        );
    });

    it('sizes tab icons with the token and weights the active tab like its text', () => {
        render(
            <Tabs defaultValue="mail">
                <TabsList>
                    <TabsTrigger value="mail">
                        <Plus />
                        Mail
                    </TabsTrigger>
                </TabsList>
            </Tabs>,
        );

        const classes = screen.getByRole('tab').className.split(' ');

        expect(classes).toContain("[&_svg:not([class*='size-'])]:size-icon");
        expect(classes).toContain('gap-item');
        expect(classes).toContain('data-[state=active]:icon-weight-semibold');
    });
});
