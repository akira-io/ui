/** @vitest-environment jsdom */

import { render } from '@testing-library/react';
import { Bold } from 'lucide-react';
import { describe, expect, it } from 'vitest';

import { GlassPillAction, GlassPillGroup, GlassToolbar } from './glass-toolbar';

function bar(size?: 'sm' | 'md' | 'default', pressed = false) {
    return render(
        <GlassToolbar label="Text" size={size}>
            <GlassPillGroup>
                <GlassPillAction
                    label="Bold"
                    icon={<Bold />}
                    aria-pressed={pressed}
                />
            </GlassPillGroup>
        </GlassToolbar>,
    ).container;
}

const slot = (container: HTMLElement, name: string) =>
    container.querySelector(`[data-slot="${name}"]`)!;

describe('Glass pill press', () => {
    it('draws the highlight as a glass bubble', () => {
        expect(
            slot(bar(), 'glass-pill-highlight').className.split(' '),
        ).toContain('glass-button');
    });

    it('grows the pressed action and the highlight with the spring', () => {
        const container = bar();

        expect(slot(container, 'glass-pill-action').className).toContain(
            'data-[pressed]:scale-[1.18]',
        );
        expect(slot(container, 'glass-pill-group').className).toContain(
            'has-[[data-pressed]]:[&>[data-slot=glass-pill-highlight]]:scale-[1.18]',
        );
    });

    it('paints the icon of an action that is on', () => {
        expect(
            slot(bar(undefined, true), 'glass-pill-action').className,
        ).toContain('aria-pressed:text-primary');
    });

    it.each([
        [undefined, 'size-9'],
        ['md', 'size-8'],
        ['sm', 'size-7'],
    ] as const)(
        'sizes actions for size %s and keeps 44px with touch',
        (size, expected) => {
            const action = slot(bar(size), 'glass-pill-action').className;

            expect(action.split(' ')).toContain(expected);
            expect(action).toContain('pointer-coarse:size-11');
        },
    );
});
