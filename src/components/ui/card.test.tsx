// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Card } from '@/components/ui/card';
import { elevatedSurface, flatSurface, surfaceRadius } from '@/lib/language';
import { cn } from '@/lib/utils';

afterEach(cleanup);

const FLATTENED = cn(elevatedSurface, flatSurface).split(/\s+/);

const ELEVATION = elevatedSurface
    .split(/\s+/)
    .filter((name) => !FLATTENED.includes(name));

function card(): HTMLElement {
    return screen.getByTestId('card');
}

function classes(): string[] {
    return card().className.split(/\s+/);
}

describe('the flat axis', () => {
    it('cancels a ring width and a shadow, so the assertions below are not vacuous', () => {
        expect(ELEVATION.some((name) => name.startsWith('shadow-'))).toBe(true);
        expect(ELEVATION.some((name) => /^ring-\d/.test(name))).toBe(true);
    });
});

describe('a card by default', () => {
    it('stays elevated', () => {
        render(<Card data-testid="card" />);

        expect(classes()).toEqual(expect.arrayContaining(ELEVATION));
    });

    it('claims no flat marker', () => {
        render(<Card data-testid="card" />);

        expect(card().dataset.flat).toBeUndefined();
    });
});

describe('a flat card', () => {
    it('drops every elevation class', () => {
        render(<Card flat data-testid="card" />);

        for (const className of ELEVATION) {
            expect(classes()).not.toContain(className);
        }
    });

    it('keeps its fill', () => {
        render(<Card flat data-testid="card" />);

        expect(classes()).toContain('bg-card/60');
    });

    it.each(['default', 'subtle', 'solid'] as const)(
        'keeps the fill of the %s variant',
        (variant) => {
            render(<Card flat variant={variant} data-testid="card" />);

            expect(classes().some((name) => name.startsWith('bg-card'))).toBe(
                true,
            );
        },
    );

    it('keeps its surface radius', () => {
        render(<Card flat data-testid="card" />);

        expect(classes()).toContain(surfaceRadius);
    });

    it('marks itself for a consumer to target', () => {
        render(<Card flat data-testid="card" />);

        expect(card().dataset.flat).toBe('true');
    });

    it('keeps its data-slot after the prop spread', () => {
        render(<Card flat data-slot="hijacked" data-testid="card" />);

        expect(card().dataset.slot).toBe('card');
    });
});

describe('a flat card that is also inset', () => {
    it('takes the recessed fill, because a recessed surface is already flat', () => {
        render(<Card flat inset data-testid="card" />);

        expect(classes()).toContain('bg-surface-recessed/30');
    });

    it('carries no elevation either way', () => {
        render(<Card flat inset data-testid="card" />);

        for (const className of ELEVATION) {
            expect(classes()).not.toContain(className);
        }
    });

    it('reports both axes', () => {
        render(<Card flat inset data-testid="card" />);

        expect(card().dataset.flat).toBe('true');
        expect(card().dataset.inset).toBe('true');
    });
});
