// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fr } from 'date-fns/locale';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { DateFilter } from '@/blocks/date-filter/date-filter';
import { formatRangePreview } from '@/blocks/date-filter/range';
import { UiLocaleProvider } from '@/locales/context';
import { installMatchMedia } from '../../../tests/fixtures/match-media';

beforeEach(() => installMatchMedia());

afterEach(cleanup);

function monthOptions(): string[] {
    const dropdown = document.querySelector<HTMLSelectElement>(
        '.rdp-months_dropdown',
    );

    if (!dropdown) {
        throw new Error('the calendar rendered no month dropdown');
    }

    return [...dropdown.options].map((option) => option.textContent ?? '');
}

describe('the date filter date locale', () => {
    it('summarises a fixed date filter', () => {
        render(
            <UiLocaleProvider labels={{}} dateLocale={fr}>
                <DateFilter
                    value={{
                        mode: 'fixed',
                        operator: 'between',
                        start: '2026-01-01',
                        end: '2026-03-31',
                    }}
                    onChange={() => undefined}
                />
            </UiLocaleProvider>,
        );

        expect(screen.getByText('1 janvier 2026 - 31 mars 2026')).toBeDefined();
    });

    it('keeps the fixed range calendar of a date filter in portuguese outside a provider', async () => {
        render(
            <DateFilter
                value={{
                    mode: 'fixed',
                    operator: 'on',
                    start: '2026-09-15',
                }}
                onChange={() => undefined}
            />,
        );

        await userEvent.click(screen.getByRole('button'));
        await userEvent.click(screen.getByText('Fixed range...'));

        expect(monthOptions()).toContain('set');
    });

    it('keeps the date filter in portuguese outside a provider', () => {
        render(
            <DateFilter
                value={{
                    mode: 'fixed',
                    operator: 'between',
                    start: '2026-01-01',
                    end: '2026-03-31',
                }}
                onChange={() => undefined}
            />,
        );

        expect(
            screen.getByText('1 de janeiro de 2026 - 31 de março de 2026'),
        ).toBeDefined();
    });

    it('previews a relative range in the given locale', () => {
        expect(
            formatRangePreview(
                { start: new Date(2026, 0, 1), end: new Date(2026, 2, 31) },
                fr,
            ),
        ).toBe('1 janv. - 31 mars 2026');
    });
});
