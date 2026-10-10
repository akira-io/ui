// @vitest-environment jsdom

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

afterEach(cleanup);

const theme = readFileSync(join(process.cwd(), 'theme.css'), 'utf8');

const springing = (radixVariable: string) => [
    `[--motion-content-height:var(${radixVariable})]`,
    'data-[state=open]:animate-height-open',
    'data-[state=closed]:animate-height-close',
    'motion-reduce:animate-none',
];

describe('height on a spring', () => {
    it('defines the open and close animations in the theme', () => {
        expect(theme).toMatch(
            /--animate-height-open:\s*height-open[^;]*linear\(/,
        );
        expect(theme).toMatch(/--animate-height-close:\s*height-close/);
        expect(theme).toContain('@keyframes height-open');
        expect(theme).toContain('@keyframes height-close');
    });

    it('springs the accordion content', () => {
        render(
            <Accordion type="single" defaultValue="one">
                <AccordionItem value="one">
                    <AccordionTrigger>One</AccordionTrigger>
                    <AccordionContent>Body</AccordionContent>
                </AccordionItem>
            </Accordion>,
        );

        const content = document.querySelector(
            '[data-slot="accordion-content"]',
        );

        springing('--radix-accordion-content-height').forEach((name) =>
            expect(content?.className).toContain(name),
        );
    });

    it('springs the collapsible content', () => {
        render(
            <Collapsible defaultOpen>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent className="pt-2">Body</CollapsibleContent>
            </Collapsible>,
        );

        const content = document.querySelector(
            '[data-slot="collapsible-content"]',
        );

        springing('--radix-collapsible-content-height').forEach((name) =>
            expect(content?.className).toContain(name),
        );
        expect(content?.className).toContain('pt-2');
        expect(content?.className).toContain(
            ['data-[animating=true]:overflow', 'hidden'].join('-'),
        );
        expect(content?.className.split(' ')).not.toContain(
            ['overflow', 'hidden'].join('-'),
        );
    });
});
