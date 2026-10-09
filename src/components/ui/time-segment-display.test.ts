import { describe, expect, it } from 'vitest';

import { timePickerDefaultLabels } from '@/components/ui/time-picker-labels';
import {
    segmentNumber,
    segmentRange,
    segmentText,
} from '@/components/ui/time-segment-display';

describe('segmentRange', () => {
    it('bounds the hour by the clock and the other units by the minute', () => {
        expect(segmentRange('hour', 24)).toEqual([0, 23]);
        expect(segmentRange('hour', 12)).toEqual([1, 12]);
        expect(segmentRange('second', 24)).toEqual([0, 59]);
        expect(segmentRange('period', 12)).toEqual([0, 1]);
    });
});

describe('segmentText', () => {
    it('pads a unit and names the period with its label', () => {
        const parts = { hour: 7, period: 'pm' as const };

        expect(segmentText('hour', parts, timePickerDefaultLabels)).toBe('07');
        expect(segmentText('period', parts, timePickerDefaultLabels)).toBe(
            'PM',
        );
    });

    it('has no text for a unit nobody filled', () => {
        expect(
            segmentText('minute', {}, timePickerDefaultLabels),
        ).toBeUndefined();
        expect(
            segmentText('period', {}, timePickerDefaultLabels),
        ).toBeUndefined();
    });
});

describe('segmentNumber', () => {
    it('counts the afternoon as one and an empty period as nothing', () => {
        expect(segmentNumber('period', { period: 'pm' })).toBe(1);
        expect(segmentNumber('period', { period: 'am' })).toBe(0);
        expect(segmentNumber('period', {})).toBeUndefined();
        expect(segmentNumber('minute', { minute: 5 })).toBe(5);
    });
});
