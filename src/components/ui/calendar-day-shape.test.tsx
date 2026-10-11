// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Calendar } from '@/components/ui/calendar';

afterEach(cleanup);

describe('the calendar day shape', () => {
    it('draws a chosen day as a circle', () => {
        render(
            <Calendar
                mode="single"
                selected={new Date(2024, 5, 14)}
                defaultMonth={new Date(2024, 5, 1)}
            />,
        );

        const chosen = document.querySelector(
            '[data-selected-single="true"]',
        ) as HTMLElement;

        expect(chosen.className.split(' ')).toContain('rounded-full');
    });

    it('marks today with a circle too', () => {
        render(<Calendar mode="single" />);

        const today = document.querySelector('.rdp-today') as HTMLElement;

        expect(today.className.split(' ')).toContain('rounded-full');
    });
});
