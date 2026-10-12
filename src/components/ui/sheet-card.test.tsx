// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { FloatingSheetCard } from '@/components/ui/floating-sheet';
import { SheetCard } from '@/components/ui/sheet';

afterEach(cleanup);

describe.each([
    ['SheetCard', SheetCard, 'sheet-card'],
    ['FloatingSheetCard', FloatingSheetCard, 'floating-sheet-card'],
] as const)('a %s', (_, SheetCardPart, slot) => {
    it('groups content inside a sheet on the solid grouped surface by default', () => {
        render(<SheetCardPart>Vehicle</SheetCardPart>);

        const card = screen.getByText('Vehicle');

        expect(card.getAttribute('data-slot')).toBe(slot);
        expect(card.className).toContain('bg-(--grouped-fill)');
        expect(card.className).toContain('rounded-2xl');
        expect(card.className).toContain('p-inset');
        expect(card.className).not.toContain('glass-panel');
    });

    it('takes the glass or no surface, as every content block does', () => {
        const { rerender } = render(
            <SheetCardPart surface="glass">Vehicle</SheetCardPart>,
        );

        expect(screen.getByText('Vehicle').className).toContain('glass-panel');

        rerender(<SheetCardPart surface="none">Vehicle</SheetCardPart>);

        expect(screen.getByText('Vehicle').className).not.toContain(
            'bg-(--grouped-fill)',
        );
    });

    it('keeps a custom slot name and class', () => {
        render(
            <SheetCardPart slotName="vehicle-card" className="gap-group">
                Vehicle
            </SheetCardPart>,
        );

        const card = screen.getByText('Vehicle');

        expect(card.getAttribute('data-slot')).toBe('vehicle-card');
        expect(card.className).toContain('gap-group');
    });
});
