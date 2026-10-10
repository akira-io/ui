// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { useRef } from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { useSlidingIndicator } from '@/lib/motion/use-sliding-indicator';

const lefts: Record<string, number> = { one: 300, two: 500 };
const originalMatchMedia = window.matchMedia;
const originalOffsetLeft = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetLeft',
);

beforeAll(() => {
    MotionGlobalConfig.skipAnimations = false;
    window.matchMedia = (query: string) =>
        ({
            matches: query.includes('prefers-reduced-motion'),
            media: query,
            onchange: null,
            addListener: () => undefined,
            removeListener: () => undefined,
            addEventListener: () => undefined,
            removeEventListener: () => undefined,
            dispatchEvent: () => false,
        }) as MediaQueryList;
    Object.defineProperty(HTMLElement.prototype, 'offsetLeft', {
        configurable: true,
        get() {
            return lefts[(this as HTMLElement).dataset.key ?? ''] ?? 0;
        },
    });
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
    window.matchMedia = originalMatchMedia;
    if (originalOffsetLeft) {
        Object.defineProperty(
            HTMLElement.prototype,
            'offsetLeft',
            originalOffsetLeft,
        );
    }
});

afterEach(cleanup);

function List({ active }: { active: string }) {
    const list = useRef<HTMLDivElement>(null);
    const pill = useRef<HTMLSpanElement>(null);

    useSlidingIndicator(list, pill, '[data-state="active"]');

    return (
        <div ref={list}>
            <span ref={pill} data-testid="pill" />
            {['one', 'two'].map((key) => (
                <button
                    key={key}
                    data-key={key}
                    data-state={key === active ? 'active' : 'inactive'}
                >
                    {key}
                </button>
            ))}
        </div>
    );
}

describe('useSlidingIndicator under reduced motion', () => {
    it('jumps to the new item without sliding', async () => {
        const { rerender } = render(<List active="one" />);

        rerender(<List active="two" />);

        await waitFor(() =>
            expect(screen.getByTestId('pill').style.transform).toContain(
                'translateX(500px)',
            ),
        );
    });
});
