// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { Inbox } from 'lucide-react';
import * as React from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { useStrokeDraw } from '@/lib/motion/use-stroke-draw';

beforeAll(() => {
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
});

afterEach(cleanup);

function Drawn() {
    const ref = React.useRef<HTMLSpanElement>(null);

    useStrokeDraw(ref);

    return (
        <span ref={ref}>
            <Inbox />
        </span>
    );
}

describe('useStrokeDraw under reduced motion', () => {
    it('leaves the strokes as they are', () => {
        const { container } = render(<Drawn />);

        expect(container.querySelector('[pathLength]')).toBeNull();
    });
});
