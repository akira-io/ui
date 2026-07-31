import { describe, expect, it } from 'vitest';
import {
    contrastRatio,
    isInGamut,
    oklchToSrgb,
    parseOklch,
    toHex,
} from './color';

describe('parseOklch', () => {
    it('reads the three components', () => {
        expect(parseOklch('oklch(0.588 0.212 288)')).toEqual({
            l: 0.588,
            c: 0.212,
            h: 288,
        });
    });

    it('rejects anything that is not oklch', () => {
        expect(() => parseOklch('#7c5cf0')).toThrow('not an oklch value');
    });
});

describe('toHex', () => {
    it('converts the Akira brand purple', () => {
        expect(toHex(parseOklch('oklch(0.588 0.212 288)'))).toBe(
            '#7c5cf0',
        );
    });

    it('converts the brand ink', () => {
        expect(toHex(parseOklch('oklch(0.161 0.027 294)'))).toBe(
            '#0e0b18',
        );
    });
});

describe('isInGamut', () => {
    it('accepts a displayable color', () => {
        expect(isInGamut(oklchToSrgb(parseOklch('oklch(0.588 0.212 288)')))).toBe(
            true,
        );
    });

    it('rejects a chroma no display can render', () => {
        expect(isInGamut(oklchToSrgb(parseOklch('oklch(0.7 0.4 288)')))).toBe(
            false,
        );
    });
});

describe('contrastRatio', () => {
    it('is 21 for black on white', () => {
        expect(
            contrastRatio(
                parseOklch('oklch(1 0 0)'),
                parseOklch('oklch(0 0 0)'),
            ),
        ).toBeCloseTo(21, 4);
    });

    it('is symmetric', () => {
        const a = parseOklch('oklch(0.523 0.238 288)');
        const b = parseOklch('oklch(0.985 0 0)');
        expect(contrastRatio(a, b)).toBeCloseTo(contrastRatio(b, a), 10);
    });

    it('matches the verified Akira 600 on white', () => {
        expect(
            contrastRatio(
                parseOklch('oklch(0.523 0.238 288)'),
                parseOklch('oklch(0.985 0 0)'),
            ),
        ).toBeCloseTo(5.84, 2);
    });
});
