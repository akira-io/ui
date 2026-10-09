// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { waitForTargets } from '@/blocks/tour/wait-for-targets';

function addTarget(name: string): void {
    const element = document.createElement('div');
    element.dataset.tour = name;
    document.body.appendChild(element);
}

const targets = ['[data-tour="a"]', '[data-tour="b"]'];

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
});

describe('waitForTargets', () => {
    it('settles at once when every target is already there', () => {
        addTarget('a');
        addTarget('b');
        let settled = 0;

        waitForTargets(targets, 4000, () => settled++);

        expect(settled).toBe(1);
    });

    it('settles once the last missing target renders', async () => {
        addTarget('a');
        let settled = 0;

        waitForTargets(targets, 4000, () => settled++);
        expect(settled).toBe(0);

        addTarget('b');
        await vi.advanceTimersByTimeAsync(0);

        expect(settled).toBe(1);
    });

    it('settles when the wait runs out with a target still missing', async () => {
        addTarget('a');
        let settled = 0;

        waitForTargets(targets, 4000, () => settled++);
        await vi.advanceTimersByTimeAsync(3999);
        expect(settled).toBe(0);

        await vi.advanceTimersByTimeAsync(1);

        expect(settled).toBe(1);
    });

    it('settles only once whatever happens afterwards', async () => {
        addTarget('a');
        let settled = 0;

        waitForTargets(targets, 4000, () => settled++);
        addTarget('b');
        await vi.advanceTimersByTimeAsync(0);
        addTarget('c');
        await vi.advanceTimersByTimeAsync(5000);

        expect(settled).toBe(1);
    });

    it('never settles once stopped', async () => {
        let settled = 0;

        const stop = waitForTargets(targets, 4000, () => settled++);
        stop();
        addTarget('a');
        addTarget('b');
        await vi.advanceTimersByTimeAsync(5000);

        expect(settled).toBe(0);
    });
});
