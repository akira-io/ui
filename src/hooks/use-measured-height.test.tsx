// @vitest-environment jsdom

import { act, cleanup, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { useMeasuredHeight } from '@/hooks/use-measured-height';

afterEach(() => {
    cleanup();
    Reflect.deleteProperty(window, 'ResizeObserver');
});

function Probe() {
    const ref = React.useRef<HTMLDivElement>(null);
    const height = useMeasuredHeight(ref);

    return <div ref={ref}>{String(height)}</div>;
}

describe('useMeasuredHeight', () => {
    it('reports the height the observer measures', () => {
        let report: (height: number) => void = () => undefined;

        window.ResizeObserver = class {
            constructor(callback: ResizeObserverCallback) {
                report = (height) =>
                    callback(
                        [{ contentRect: { height } } as ResizeObserverEntry],
                        this as unknown as ResizeObserver,
                    );
            }
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver;

        render(<Probe />);
        act(() => report(48));

        expect(screen.getByText('48')).toBeTruthy();
    });

    it('stays unmeasured without a ResizeObserver', () => {
        render(<Probe />);

        expect(screen.getByText('undefined')).toBeTruthy();
    });
});
