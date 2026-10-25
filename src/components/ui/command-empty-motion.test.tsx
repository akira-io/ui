// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { Command, CommandEmpty, CommandList } from '@/components/ui/command';
import { installResizeObserver } from '../../../tests/fixtures/resize-observer';

beforeAll(() => {
    installResizeObserver();
    MotionGlobalConfig.skipAnimations = false;
});

afterAll(() => {
    MotionGlobalConfig.skipAnimations = true;
});

afterEach(cleanup);

describe('an empty command list', () => {
    it('draws its no results icon in, as an empty state does', () => {
        render(
            <Command>
                <CommandList>
                    <CommandEmpty>No results found</CommandEmpty>
                </CommandList>
            </Command>,
        );

        const strokes = [
            ...document.querySelectorAll(
                '[data-slot="command-empty"] svg :is(path, line, circle)',
            ),
        ];

        expect(strokes.length).toBeGreaterThan(0);
        expect(
            strokes.every(
                (stroke) => stroke.getAttribute('pathLength') === '1',
            ),
        ).toBe(true);
    });
});
