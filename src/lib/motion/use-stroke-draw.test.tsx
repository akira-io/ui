// @vitest-environment jsdom

import { cleanup, render, waitFor } from '@testing-library/react';
import { Inbox } from 'lucide-react';
import * as React from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { useStrokeDraw } from '@/lib/motion/use-stroke-draw';

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

describe('useStrokeDraw', () => {
    it('draws every stroke of the icon to its end', async () => {
        const { container } = render(<Drawn />);
        const strokes = [...container.querySelectorAll('path, polyline')];

        expect(strokes.length).toBeGreaterThan(0);
        expect(
            strokes.every(
                (stroke) => stroke.getAttribute('pathLength') === '1',
            ),
        ).toBe(true);

        await waitFor(() => {
            expect(
                strokes.every(
                    (stroke) =>
                        (stroke as SVGElement).style.strokeDashoffset === '0',
                ),
            ).toBe(true);
        });
    });
});
