import { expect } from 'vitest';

export function expectCutToTheButton(surface: HTMLElement | null): void {
    const inset = /^inset\((\d+(?:\.\d+)?)px (\d+(?:\.\d+)?)px/.exec(
        surface?.style.clipPath ?? '',
    );

    expect(surface?.style.opacity).toBe('1');
    expect(surface?.style.transform).not.toMatch(/scale\(0\./);
    expect(Number(inset?.[1])).toBeGreaterThan(40);
    expect(Number(inset?.[2])).toBeGreaterThan(60);
}
