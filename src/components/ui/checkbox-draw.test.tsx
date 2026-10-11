/** @vitest-environment jsdom */

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Checkbox } from './checkbox';
import { RadioGroup, RadioGroupItem } from './radio-group';

describe('Checkbox check', () => {
    it('keeps the stroke mounted and draws it with the dash offset', () => {
        const { container } = render(<Checkbox />);
        const path = container.querySelector('[data-slot="checkbox-check"]')!;

        expect(path.getAttribute('pathLength')).toBe('1');
        expect(path.getAttribute('class')).toContain('[stroke-dashoffset:1]');
        expect(path.getAttribute('class')).toContain(
            'group-data-[state=checked]/checkbox:[stroke-dashoffset:0]',
        );
        fireEvent.click(container.querySelector('button')!);
        expect(
            container.querySelector('[data-slot="checkbox-check"]'),
        ).not.toBeNull();
    });

    it('skips the drawing under reduced motion', () => {
        const { container } = render(<Checkbox />);

        expect(
            container
                .querySelector('[data-slot="checkbox-check"]')!
                .getAttribute('class'),
        ).toContain('motion-reduce:transition-none');
    });

    it('sizes the box at 16px with a pointer and 22px with touch', () => {
        const className = render(<Checkbox />).container.querySelector(
            'button',
        )!.className;

        expect(className).toContain('size-4');
        expect(className).toContain('pointer-coarse:size-[22px]');
    });
});

describe('Radio', () => {
    it('fills the circle with the accent and a light dot when chosen', () => {
        const { container } = render(
            <RadioGroup defaultValue="a">
                <RadioGroupItem value="a" />
            </RadioGroup>,
        );

        expect(container.querySelector('[role="radio"]')!.className).toContain(
            'data-[state=checked]:glass-prominent',
        );
        expect(
            container.querySelector('[data-slot="radio-group-dot"]')!.className,
        ).toContain('bg-primary-foreground');
    });
});
