// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { Inbox } from 'lucide-react';
import { MotionGlobalConfig } from 'motion/react';
import * as React from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { useStrokeDraw } from '@/lib/motion/use-stroke-draw';

beforeAll(() => {
    MotionGlobalConfig.skipAnimations = false;
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
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

describe('useStrokeDraw with motion on', () => {
    it('passes through the partly drawn stroke on its way to the end', async () => {
        const { container } = render(<Drawn />);
        const stroke = container.querySelector('path') as SVGElement;

        await new Promise((resolve) => setTimeout(resolve, 150));

        const offset = Number.parseFloat(stroke.style.strokeDashoffset);

        expect(offset).toBeGreaterThan(0);
        expect(offset).toBeLessThan(1);
    });
});
