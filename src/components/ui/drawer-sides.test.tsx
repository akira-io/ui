// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

patchPointerApis();

afterEach(cleanup);

const classesFor = (direction: string) =>
    (document.querySelector('[data-slot="drawer-content"]')?.className ?? '')
        .split(' ')
        .filter((name) => name.includes(`direction=${direction}]`));

describe('the drawer corners', () => {
    it('keeps the side drawers square and curves the top and bottom ones', () => {
        render(
            <Drawer open>
                <DrawerContent>
                    <DrawerTitle>Title</DrawerTitle>
                </DrawerContent>
            </Drawer>,
        );

        expect(classesFor('right').some((name) => name.includes('3xl'))).toBe(
            false,
        );
        expect(classesFor('left').some((name) => name.includes('3xl'))).toBe(
            false,
        );
        expect(classesFor('top').some((name) => name.includes('3xl'))).toBe(
            true,
        );
        expect(classesFor('bottom').some((name) => name.includes('3xl'))).toBe(
            true,
        );
    });
});
