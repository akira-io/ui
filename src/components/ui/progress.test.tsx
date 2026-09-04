// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Progress } from '@/components/ui/progress';

afterEach(cleanup);

function bar(): HTMLElement {
    return screen.getByRole('progressbar');
}

describe('a progress bar with a value', () => {
    it('reports that value, so a screen reader announces the percentage', () => {
        render(<Progress value={40} />);

        expect(bar().getAttribute('aria-valuenow')).toBe('40');
        expect(bar().dataset.state).toBe('loading');
    });

    it('fills the track to match', () => {
        render(<Progress value={40} />);

        expect(
            bar().querySelector<HTMLElement>('[data-slot="progress-indicator"]')
                ?.style.transform,
        ).toBe('translateX(-60%)');
    });
});

describe('a progress bar without one', () => {
    it('stays indeterminate rather than claiming zero', () => {
        render(<Progress />);

        expect(bar().getAttribute('aria-valuenow')).toBeNull();
        expect(bar().dataset.state).toBe('indeterminate');
    });
});
