// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { Calendar } from '@/components/ui/calendar';
import { CalendarPopover } from '@/components/ui/calendar-popover';
import { Card } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Popover, PopoverContent } from '@/components/ui/popover';

import { nestedSurfaceSelector, slot } from './helpers/nested-surface';

afterEach(cleanup);

describe('the nested-surface variant', () => {
    it('drops the surface of the calendar inside an open date picker', async () => {
        render(<DatePicker />);

        await userEvent.click(slot('date-picker-trigger'));

        const calendar = slot('calendar');

        expect(calendar.matches(nestedSurfaceSelector())).toBe(true);
        expect(calendar.className).toContain('nested-surface:bg-transparent');
        expect(calendar.className).toContain('nested-surface:ring-0');
        expect(calendar.className).toContain('nested-surface:shadow-none');
    });

    it('drops the surface of a calendar in a renamed calendar popover', () => {
        render(
            <CalendarPopover
                open
                onOpenChange={() => {}}
                trigger={<button type="button">open</button>}
                slotName="booking-calendar"
            >
                <Calendar mode="single" />
            </CalendarPopover>,
        );

        expect(slot('calendar').matches(nestedSurfaceSelector())).toBe(true);
    });

    it('drops the surface of a card in a popover a consumer renamed', () => {
        render(
            <Popover open>
                <PopoverContent slotName="consumer-panel">
                    <Card slotName="inner-card" />
                </PopoverContent>
            </Popover>,
        );

        expect(slot('inner-card').matches(nestedSurfaceSelector())).toBe(true);
    });

    it('keeps the surface of a card inside a recessed card', () => {
        render(
            <Card inset>
                <Card slotName="inner-card" />
            </Card>,
        );

        expect(slot('inner-card').matches(nestedSurfaceSelector())).toBe(false);
    });

    it('keeps the surface of a card standing on the page', () => {
        render(<Card slotName="lone-card" />);

        expect(slot('lone-card').matches(nestedSurfaceSelector())).toBe(false);
    });
});
