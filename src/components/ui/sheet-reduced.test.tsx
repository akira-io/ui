// @vitest-environment jsdom

import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

const originalMatchMedia = window.matchMedia;

beforeAll(() => {
    patchPointerApis();
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
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
    window.matchMedia = originalMatchMedia;
});

afterEach(cleanup);

const content = () =>
    document.querySelector<HTMLElement>('[data-slot="sheet-content"]');

describe('a sheet under reduced motion', () => {
    it('fades in place without sliding', async () => {
        const user = userEvent.setup();
        render(
            <Sheet>
                <SheetTrigger>Filters</SheetTrigger>
                <SheetContent>
                    <SheetTitle>Filters</SheetTitle>
                </SheetContent>
            </Sheet>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'Filters' }));

        expect(content()?.style.opacity).toBe('0');
        expect(content()?.style.transform).not.toMatch(/translate/);

        await user.keyboard('{Escape}');
        await waitFor(() => expect(content()).toBeNull(), { timeout: 1500 });
    });
});
