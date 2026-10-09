'use client';

import { animate, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { drawStagger, drawTransition } from '@/lib/motion/tokens';

const STROKES = 'path, line, circle, rect, polyline, polygon, ellipse';

export function useStrokeDraw(ref: React.RefObject<HTMLElement | null>): void {
    const reduced = useReducedMotion() ?? false;

    React.useLayoutEffect(() => {
        if (reduced || !ref.current) {
            return undefined;
        }

        const strokes = [...ref.current.querySelectorAll<SVGElement>(STROKES)];
        const controls = strokes.map((stroke, index) => {
            stroke.setAttribute('pathLength', '1');
            stroke.style.strokeDasharray = '1';
            stroke.style.strokeDashoffset = '1';

            return animate(
                stroke,
                { strokeDashoffset: 0 },
                { ...drawTransition, delay: index * drawStagger },
            );
        });

        return () => controls.forEach((control) => control.stop());
    }, [reduced, ref]);
}
