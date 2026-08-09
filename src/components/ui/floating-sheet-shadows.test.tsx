// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
    ScrollableSheet,
    sheetPart,
} from '../../../tests/fixtures/floating-sheet';
import {
    installIntersectionObserver,
    setIntersecting,
} from '../../../tests/fixtures/intersection-observer';

const HEADER_SHADOW = 'shadow-(--scroll-shadow-top)';
const FOOTER_SHADOW = 'shadow-(--scroll-shadow-bottom)';

function topSentinel(): Element {
    const sentinel = document.querySelector(
        '[data-slot="floating-sheet-top-sentinel"]',
    );

    if (!sentinel) {
        throw new Error('the body renders no top sentinel');
    }

    return sentinel;
}

function bottomSentinel(): Element {
    const sentinel = document.querySelector(
        '[data-slot="floating-sheet-bottom-sentinel"]',
    );

    if (!sentinel) {
        throw new Error('the body renders no bottom sentinel');
    }

    return sentinel;
}

function hasHeaderShadow(): boolean {
    return sheetPart('header').className.includes(HEADER_SHADOW);
}

function hasFooterShadow(): boolean {
    return sheetPart('footer').className.includes(FOOTER_SHADOW);
}

beforeEach(() => {
    installIntersectionObserver();
});

afterEach(cleanup);

describe('the sheet scroll shadows', () => {
    it('shows neither shadow when the content fits without scrolling', () => {
        render(<ScrollableSheet />);

        expect(hasHeaderShadow()).toBe(false);
        expect(hasFooterShadow()).toBe(false);
    });

    it('gives the header a shadow once the body scrolls away from the top', () => {
        render(<ScrollableSheet />);

        expect(hasHeaderShadow()).toBe(false);

        act(() => {
            setIntersecting(topSentinel(), false);
        });

        expect(hasHeaderShadow()).toBe(true);
        expect(hasFooterShadow()).toBe(false);
    });

    it('drops the header shadow once the body scrolls back to the top', () => {
        render(<ScrollableSheet />);

        act(() => {
            setIntersecting(topSentinel(), false);
        });

        expect(hasHeaderShadow()).toBe(true);

        act(() => {
            setIntersecting(topSentinel(), true);
        });

        expect(hasHeaderShadow()).toBe(false);
    });

    it('gives the footer a shadow while there is more content below the fold', () => {
        render(<ScrollableSheet />);

        expect(hasFooterShadow()).toBe(false);

        act(() => {
            setIntersecting(bottomSentinel(), false);
        });

        expect(hasFooterShadow()).toBe(true);
        expect(hasHeaderShadow()).toBe(false);
    });

    it('drops the footer shadow once the body is scrolled to the end', () => {
        render(<ScrollableSheet />);

        act(() => {
            setIntersecting(bottomSentinel(), false);
        });

        expect(hasFooterShadow()).toBe(true);

        act(() => {
            setIntersecting(bottomSentinel(), true);
        });

        expect(hasFooterShadow()).toBe(false);
    });

    it('notices content that grows after mount without any scroll, since the observer reacts to layout changes on its own', () => {
        render(<ScrollableSheet />);

        expect(hasFooterShadow()).toBe(false);

        act(() => {
            setIntersecting(bottomSentinel(), false);
        });

        expect(hasFooterShadow()).toBe(true);
    });

    it('keeps the close button above the header that carries the shadow', () => {
        render(<ScrollableSheet />);

        const header = document.querySelector<HTMLElement>(
            '[data-slot="floating-sheet-header"]',
        );
        const close = document.querySelector<HTMLElement>(
            '[data-slot="floating-sheet-close"]',
        );
        const layer = (element: HTMLElement | null) =>
            Number(
                [...(element?.classList ?? [])]
                    .find((name) => name.startsWith('z-'))
                    ?.slice(2) ?? 0,
            );

        expect(layer(close)).toBeGreaterThan(layer(header));
    });

    it('shows no shadows and does not throw for a sheet rendered without a body', () => {
        expect(() => render(<ScrollableSheet hasBody={false} />)).not.toThrow();

        expect(hasHeaderShadow()).toBe(false);
        expect(hasFooterShadow()).toBe(false);
    });
});
