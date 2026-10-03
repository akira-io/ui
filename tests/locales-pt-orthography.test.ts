import * as pt from '@/locales/pt';
import { ptLabels } from '@/locales/pt';
import { describe, expect, it } from 'vitest';

const BRAZILIAN_VOCABULARY = [
    /\bnavegador\b/i,
    /\barquivos?\b/i,
    /\bbaixar\b/i,
    /\btelas?\b/i,
    /\busuários?\b/i,
    /\bsenhas?\b/i,
    /\bregistros?\b/i,
    /\bcontatos?\b/i,
    /\bequipes?\b/i,
];

function strings(value: unknown): string[] {
    if (typeof value === 'string') {
        return [value];
    }

    if (typeof value === 'function') {
        return strings(value(3, 'Safari', 'macOS'));
    }

    if (value !== null && typeof value === 'object') {
        return Object.values(value).flatMap(strings);
    }

    return [];
}

const everyString = [...strings(ptLabels), ...strings(pt)];

describe('the Portuguese locale', () => {
    it('ships strings to check', () => {
        expect(everyString.length).toBeGreaterThan(100);
    });

    it.each(BRAZILIAN_VOCABULARY)(
        'writes European Portuguese, never %s',
        (pattern) => {
            expect(everyString.filter((text) => pattern.test(text))).toEqual(
                [],
            );
        },
    );
});
