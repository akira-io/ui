// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import type { Locale } from 'date-fns';
import { fr, pt } from 'date-fns/locale';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { Calendar } from '@/components/ui/calendar';
import { DatePicker } from '@/components/ui/date-picker';
import { DateRangeFilter } from '@/components/ui/date-range-filter';
import { UiLocaleProvider, useUiDateLocale } from '@/locales/context';
import { installMatchMedia } from '../../tests/fixtures/match-media';

beforeEach(() => installMatchMedia());

afterEach(cleanup);

const september = new Date(2026, 8, 1);

function within(dateLocale: Locale, children: ReactNode) {
    return render(
        <UiLocaleProvider labels={{}} dateLocale={dateLocale}>
            {children}
        </UiLocaleProvider>,
    );
}

function monthOptions(): string[] {
    const dropdown = document.querySelector<HTMLSelectElement>(
        '.rdp-months_dropdown',
    );

    if (!dropdown) {
        throw new Error('the calendar rendered no month dropdown');
    }

    return [...dropdown.options].map((option) => option.textContent ?? '');
}

describe('the date locale of the provider', () => {
    it('is undefined outside a provider', () => {
        function Probe() {
            return <p>{useUiDateLocale()?.code ?? 'none'}</p>;
        }

        render(<Probe />);

        expect(screen.getByText('none')).toBeDefined();
    });

    it('stays english for a calendar outside a provider', () => {
        render(<Calendar month={september} />);

        expect(screen.getByText('September 2026')).toBeDefined();
        expect(screen.getByText('Su')).toBeDefined();
    });

    it('translates the weekdays and the month of a calendar', () => {
        within(pt, <Calendar month={september} />);

        expect(screen.getByText('setembro 2026')).toBeDefined();
        expect(screen.getByText('dom')).toBeDefined();
        expect(screen.queryByText('Su')).toBeNull();
    });

    it('loses to a locale passed to the calendar itself', () => {
        within(pt, <Calendar month={september} locale={fr} />);

        expect(screen.getByText('septembre 2026')).toBeDefined();
    });

    it('names the dropdown months in that locale rather than the browser language', () => {
        within(
            pt,
            <Calendar
                month={september}
                captionLayout="dropdown"
                startMonth={new Date(2026, 0, 1)}
                endMonth={new Date(2026, 11, 31)}
            />,
        );

        expect(monthOptions()).toContain('set');
        expect(monthOptions()).not.toContain('Sep');
    });

    it('names the dropdown months in an explicit locale without a provider', () => {
        render(
            <Calendar
                month={september}
                locale={fr}
                captionLayout="dropdown"
                startMonth={new Date(2026, 0, 1)}
                endMonth={new Date(2026, 11, 31)}
            />,
        );

        expect(monthOptions()).toContain('sept.');
    });

    it('formats the date picker trigger', () => {
        within(pt, <DatePicker value={new Date(2026, 8, 15)} />);

        expect(screen.getByText('15 set 26')).toBeDefined();
    });

    it('formats the date range filter trigger', () => {
        within(
            fr,
            <DateRangeFilter
                from="2026-09-15"
                to="2026-09-20"
                onChange={() => undefined}
            />,
        );

        expect(screen.getByText('15 sept. 26 - 20 sept. 26')).toBeDefined();
    });
});
