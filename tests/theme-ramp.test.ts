import { describe, expect, it } from 'vitest';
import { isInGamut, oklchToSrgb, parseOklch, toHex } from './helpers/color';
import { declarationsIn, readStylesheet } from './helpers/css';

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const theme = declarationsIn(readStylesheet('theme.css'), '@theme');

describe('the akira ramp', () => {
    it('declares every step', () => {
        for (const step of STEPS) {
            expect(theme).toHaveProperty(`--color-akira-${step}`);
        }
    });

    it('places step 500 on the brand purple', () => {
        expect(toHex(parseOklch(theme['--color-akira-500']))).toBe('#7c5cf0');
    });

    it('darkens monotonically from 50 to 950', () => {
        const lightness = STEPS.map(
            (step) => parseOklch(theme[`--color-akira-${step}`]).l,
        );

        for (let index = 1; index < lightness.length; index += 1) {
            expect(lightness[index]).toBeLessThan(lightness[index - 1]);
        }
    });

    it('holds a single hue', () => {
        for (const step of STEPS) {
            expect(parseOklch(theme[`--color-akira-${step}`]).h).toBe(288);
        }
    });

    it('renders every step inside the sRGB gamut', () => {
        for (const step of STEPS) {
            const color = parseOklch(theme[`--color-akira-${step}`]);
            expect(isInGamut(oklchToSrgb(color))).toBe(true);
        }
    });
});
