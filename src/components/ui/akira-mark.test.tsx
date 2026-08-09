// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { AkiraMark } from '@/components/ui/akira-mark';

afterEach(cleanup);

describe('the akira mark', () => {
    it('renders decorative and hidden from assistive tech by default', () => {
        const { container } = render(<AkiraMark />);
        const svg = container.querySelector('svg');

        expect(svg?.getAttribute('aria-hidden')).toBe('true');
        expect(svg?.hasAttribute('role')).toBe(false);
    });

    it('exposes itself as an image once a consumer supplies a label', () => {
        const { container } = render(<AkiraMark aria-label="Akira" />);
        const svg = container.querySelector('svg');

        expect(svg?.hasAttribute('aria-hidden')).toBe(false);
        expect(svg?.getAttribute('role')).toBe('img');
        expect(svg?.getAttribute('aria-label')).toBe('Akira');
    });

    it('takes its colour from currentColor, never a literal', () => {
        const { container } = render(<AkiraMark />);
        const svg = container.querySelector('svg');

        expect(svg?.getAttribute('fill')).toBe('currentColor');
    });

    it('carries the default data-slot and honours an override', () => {
        const { container, rerender } = render(<AkiraMark />);

        expect(container.querySelector('svg')?.getAttribute('data-slot')).toBe(
            'akira-mark',
        );

        rerender(<AkiraMark slotName="custom-mark" />);

        expect(container.querySelector('svg')?.getAttribute('data-slot')).toBe(
            'custom-mark',
        );
    });

    it('accepts sizing and other svg props from the consumer', () => {
        const { container } = render(
            <AkiraMark className="size-8" data-testid="mark" />,
        );
        const svg = container.querySelector('svg');

        expect(svg?.getAttribute('class')).toContain('size-8');
        expect(svg?.getAttribute('data-testid')).toBe('mark');
    });
});
