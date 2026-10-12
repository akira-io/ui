// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { DateFilter, DateFilterItem } from '@/blocks/date-filter/date-filter';
import { fieldSurface } from '@/lib/language';
import { installMatchMedia } from '../../../tests/fixtures/match-media';

beforeEach(() => installMatchMedia());

afterEach(cleanup);

describe('the date filter trigger', () => {
    it('looks like every other field: a gray capsule at the control height', () => {
        render(<DateFilter value={{ mode: 'all' }} onChange={() => {}} />);

        const classes = screen.getByRole('button').className.split(/\s+/);

        for (const name of fieldSurface.split(/\s+/)) {
            expect(classes).toContain(name);
        }
        expect(classes).toContain('h-control');
        expect(classes).toContain('px-inset');
    });

    it('ends on the same up and down chevrons as a select', () => {
        render(<DateFilter value={{ mode: 'all' }} onChange={() => {}} />);

        expect(
            screen
                .getByRole('button')
                .querySelector('.lucide-chevrons-up-down'),
        ).not.toBeNull();
    });
});

describe('a date filter row', () => {
    it('marks the chosen row with a check at its trailing edge, as a select does', () => {
        render(
            <DateFilterItem active onSelect={() => {}}>
                All time
            </DateFilterItem>,
        );

        const row = document.querySelector('[data-slot="date-filter-item"]')!;

        expect(row.querySelector('.lucide-check')).not.toBeNull();
        expect(
            row.querySelector('.lucide-check')!.getAttribute('class'),
        ).toContain('ms-auto');
    });

    it('leaves a row that is not chosen without a check', () => {
        render(
            <DateFilterItem active={false} onSelect={() => {}}>
                Today
            </DateFilterItem>,
        );

        expect(
            document.querySelector(
                '[data-slot="date-filter-item"] .lucide-check',
            ),
        ).toBeNull();
    });
});

describe('the date filter menu', () => {
    it('grows out of its trigger like every other menu', async () => {
        render(<DateFilter value={{ mode: 'all' }} onChange={() => {}} />);

        await userEvent.click(screen.getByRole('button'));

        expect(
            document
                .querySelector('[data-slot="popover-content"]')
                ?.hasAttribute('data-morph-surface'),
        ).toBe(true);
    });
});
