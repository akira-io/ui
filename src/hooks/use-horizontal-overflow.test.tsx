// @vitest-environment jsdom

import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
    installResizeObserver,
    resize,
} from '../../tests/fixtures/resize-observer';
import { useHorizontalOverflow } from './use-horizontal-overflow';

function setupContainer(widths: { scroll: number; client: number }) {
    const container = document.createElement('div');

    Object.defineProperty(container, 'scrollWidth', {
        configurable: true,
        get: () => widths.scroll,
    });
    Object.defineProperty(container, 'clientWidth', {
        configurable: true,
        get: () => widths.client,
    });

    document.body.append(container);

    return { container, containerRef: { current: container } };
}

beforeEach(() => {
    installResizeObserver();
});

afterEach(cleanup);

describe('useHorizontalOverflow', () => {
    it('reports nothing hidden while the content fits', () => {
        const { containerRef } = setupContainer({ scroll: 400, client: 400 });

        const { result } = renderHook(() =>
            useHorizontalOverflow(containerRef),
        );

        expect(result.current).toBe(false);
    });

    it('reports hidden content while the content is wider than the container', () => {
        const { containerRef } = setupContainer({ scroll: 900, client: 400 });

        const { result } = renderHook(() =>
            useHorizontalOverflow(containerRef),
        );

        expect(result.current).toBe(true);
    });

    it('stops reporting once the container is scrolled to the end', () => {
        const { container, containerRef } = setupContainer({
            scroll: 900,
            client: 400,
        });

        const { result } = renderHook(() =>
            useHorizontalOverflow(containerRef),
        );

        act(() => {
            container.scrollLeft = 500;
            container.dispatchEvent(new Event('scroll'));
        });

        expect(result.current).toBe(false);
    });

    it('still measures once without a ResizeObserver, as on a server-rendered first paint', () => {
        const observer = globalThis.ResizeObserver;
        Reflect.deleteProperty(globalThis, 'ResizeObserver');

        try {
            const { containerRef } = setupContainer({
                scroll: 900,
                client: 400,
            });

            const { result } = renderHook(() =>
                useHorizontalOverflow(containerRef),
            );

            expect(result.current).toBe(true);
        } finally {
            globalThis.ResizeObserver = observer;
        }
    });

    it('notices content that grows after mount, without a scroll', () => {
        const widths = { scroll: 400, client: 400 };
        const { container, containerRef } = setupContainer(widths);

        const { result } = renderHook(() =>
            useHorizontalOverflow(containerRef),
        );

        expect(result.current).toBe(false);

        act(() => {
            widths.scroll = 900;
            resize(container);
        });

        expect(result.current).toBe(true);
    });
});
