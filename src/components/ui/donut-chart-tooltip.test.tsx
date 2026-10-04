// @vitest-environment jsdom

import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { DonutChart } from '@/components/ui/donut-chart';

afterEach(cleanup);

const revenue = [
    { label: 'Subscriptions', value: 48_250 },
    { label: 'Services', value: 24_100 },
];

function hoverFirstSlice(container: HTMLElement): string {
    const sector = container.querySelector('.recharts-pie-sector');

    act(() => {
        fireEvent.mouseEnter(sector as Element);
    });

    return (
        document.querySelector('.recharts-tooltip-wrapper .font-mono')
            ?.textContent ?? ''
    );
}

describe('the tooltip of a donut chart', () => {
    it('prints the exact slice value in the currency of the chart', () => {
        const { container } = render(
            <DonutChart
                data={revenue}
                format={{ style: 'currency', currency: 'EUR' }}
                locale="en-US"
            />,
        );

        expect(hoverFirstSlice(container)).toBe('€48,250');
    });
});
