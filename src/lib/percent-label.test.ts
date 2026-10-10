import { describe, expect, it } from 'vitest';

import { percentLabel, trendLabel } from '@/lib/percent-label';

describe('a share label', () => {
    it('keeps one decimal with a point in English', () => {
        expect(percentLabel(45.83, 'en-US')).toBe('45.8%');
    });

    it('uses a decimal comma in Portuguese', () => {
        expect(percentLabel(45.83, 'pt-PT')).toBe('45,8%');
    });

    it('falls back to English without a locale', () => {
        expect(percentLabel(60, undefined)).toBe('60.0%');
    });

    it.each(['', 'pt_PT'])(
        'falls back to English for the malformed locale "%s"',
        (locale) => {
            expect(percentLabel(45.83, locale)).toBe('45.8%');
            expect(trendLabel(-2.5, locale)).toBe('-2.5%');
        },
    );
});

describe('a trend label', () => {
    it('signs a rise and a fall in English', () => {
        expect(trendLabel(12.34, 'en-US')).toBe('+12.3%');
        expect(trendLabel(-100, 'en-US')).toBe('-100.0%');
    });

    it('signs a rise and a fall with a decimal comma in Portuguese', () => {
        expect(trendLabel(12.34, 'pt-PT')).toBe('+12,3%');
        expect(trendLabel(-100, 'pt-PT')).toBe('-100,0%');
    });

    it('reads a flat trend as 0% in every locale', () => {
        expect(trendLabel(0, 'en-US')).toBe('0%');
        expect(trendLabel(0, 'pt-PT')).toBe('0%');
    });
});
