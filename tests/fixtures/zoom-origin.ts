import { expect } from 'vitest';

export function expectCutToTheButton(surface: HTMLElement | null): void {
    const inset = /^inset\((\d+(?:\.\d+)?)px (\d+(?:\.\d+)?)px/.exec(
        surface?.style.clipPath ?? '',
    );

    const shift = /translateX\((-?[\d.]+)px\) translateY\((-?[\d.]+)px\)/.exec(
        surface?.style.transform ?? '',
    );

    expect(surface?.style.opacity).toBe('1');
    expect(Number(shift?.[1])).toBeLessThan(-200);
    expect(Number(shift?.[2])).toBeLessThan(-150);
    expect(surface?.style.transform).not.toMatch(/scale\(0\./);
    expect(Number(inset?.[1])).toBeGreaterThan(40);
    expect(Number(inset?.[2])).toBeGreaterThan(60);
}
