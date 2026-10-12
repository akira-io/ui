// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

const played: Keyframe[][] = [];
const original = HTMLElement.prototype.animate;

beforeAll(() => {
    patchPointerApis();
    HTMLElement.prototype.animate = function animate(
        keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    ) {
        played.push((keyframes ?? []) as Keyframe[]);

        return {
            cancel() {},
            finish() {},
            set onfinish(callback: (() => void) | null) {
                callback?.();
            },
        } as unknown as Animation;
    };
});

afterAll(() => {
    HTMLElement.prototype.animate = original;
});

afterEach(async () => {
    cleanup();
    played.length = 0;
    await new Promise((resolve) => setTimeout(resolve, 0));
});

describe('a popover closing', () => {
    it('shrinks back into its trigger, as the theme toggle menu does', async () => {
        const user = userEvent.setup();

        render(
            <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent>Body</PopoverContent>
            </Popover>,
        );

        await user.click(screen.getByText('Open'));
        await screen.findByText('Body');
        await new Promise((resolve) => requestAnimationFrame(resolve));

        played.length = 0;
        await user.keyboard('{Escape}');
        await new Promise((resolve) => requestAnimationFrame(resolve));

        await waitFor(() =>
            expect(
                played.some((frames) =>
                    frames.some((frame) => 'clipPath' in frame),
                ),
            ).toBe(true),
        );
    });
});
