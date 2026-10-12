// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    installIntersectionObserver,
    setIntersecting,
} from '../../../tests/fixtures/intersection-observer';

const HEADER_SHADOW = 'shadow-(--scroll-shadow-top)';
const FOOTER_SHADOW = 'shadow-(--scroll-shadow-bottom)';

function part(slot: string): HTMLElement {
    return document.querySelector(`[data-slot="${slot}"]`) as HTMLElement;
}

function ScrollableDialog() {
    return (
        <Dialog open>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cancel order</DialogTitle>
                </DialogHeader>
                <DialogBody>Order details</DialogBody>
                <DialogFooter>Keep order</DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

beforeEach(() => {
    installIntersectionObserver();
});

afterEach(cleanup);

describe('the dialog scroll edges', () => {
    it('draws no fixed line above the footer', () => {
        render(<ScrollableDialog />);

        expect(part('dialog-footer').className).not.toMatch(/\bborder-t\b/);
    });

    it('shades neither edge while the body fits', () => {
        render(<ScrollableDialog />);

        expect(part('dialog-header').className).not.toContain(HEADER_SHADOW);
        expect(part('dialog-footer').className).not.toContain(FOOTER_SHADOW);
    });

    it('shades the header once the body scrolls away from the top, as a sheet does', () => {
        render(<ScrollableDialog />);

        act(() => {
            setIntersecting(part('dialog-top-sentinel'), false);
        });

        expect(part('dialog-header').className).toContain(HEADER_SHADOW);
    });

    it('shades the footer while content runs under it', () => {
        render(<ScrollableDialog />);

        act(() => {
            setIntersecting(part('dialog-bottom-sentinel'), false);
        });

        expect(part('dialog-footer').className).toContain(FOOTER_SHADOW);
        expect(screen.getByText('Order details')).toBeTruthy();
    });
});
