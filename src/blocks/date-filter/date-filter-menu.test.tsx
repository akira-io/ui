// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    DateFilterItem,
    DateFilterSeparator,
} from '@/blocks/date-filter/date-filter';
import { compactRadius } from '@/lib/language';

afterEach(cleanup);

function classesOf(slot: string): string[] {
    return (
        document
            .querySelector(`[data-slot="${slot}"]`)
            ?.className.split(/\s+/) ?? []
    );
}

describe('a date filter row', () => {
    it('takes the menu-item radius rather than staying square', () => {
        render(
            <DateFilterItem active onSelect={() => {}}>
                All
            </DateFilterItem>,
        );

        expect(classesOf('date-filter-item')).toContain(compactRadius);
    });

    it('sits inset from the panel edge, so the fill does not bleed', () => {
        render(
            <DateFilterItem active onSelect={() => {}}>
                All
            </DateFilterItem>,
        );

        const classes = classesOf('date-filter-item');

        expect(classes).toContain('mx-1');
        expect(classes).not.toContain('px-4');
    });

    it('keeps the neutral highlight of every other menu', () => {
        render(
            <DateFilterItem active onSelect={() => {}}>
                All
            </DateFilterItem>,
        );

        expect(classesOf('date-filter-item')).toContain('bg-accent');
    });

    it('reaches the caller through a slot', () => {
        render(
            <DateFilterItem active onSelect={() => {}}>
                All
            </DateFilterItem>,
        );

        expect(screen.getByText('All').dataset.slot).toBe('date-filter-item');
    });
});

describe('the separator between groups', () => {
    it('is inset to the same edge as the rows above it', () => {
        render(<DateFilterSeparator />);

        expect(classesOf('date-filter-separator')).toContain('mx-1');
    });
});

describe('the faceted filter next to it', () => {
    it('compensates the leading icon on the trailing side', async () => {
        const { ServerFacetedFilter } =
            await import('@/components/ui/data-table-faceted-filter');

        render(
            <ServerFacetedFilter
                filter={{
                    paramKey: 'status',
                    label: 'Estado',
                    options: [{ value: 'paid', label: 'Pago' }],
                }}
                selected={[]}
                onChange={() => {}}
            />,
        );

        expect(classesOf('data-table-faceted-filter')).toContain('pr-5');
    });
});
