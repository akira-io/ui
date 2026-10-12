// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { Hash } from 'lucide-react';
import { afterEach, describe, expect, it } from 'vitest';

import { CompositionBar } from '../src/blocks/composition-bar';
import { InfoField, InfoFieldGroup } from '../src/blocks/info-field';
import type { ContentSurface } from '../src/lib/language';

afterEach(cleanup);

const parts = [
    { id: 'cards', label: 'Cards', value: 3, display: '3', color: 'red' },
];

const blocks = {
    'a composition bar': (surface?: ContentSurface) =>
        render(
            <CompositionBar parts={parts} label="Revenue" surface={surface} />,
        ).container.firstElementChild as HTMLElement,
    'an info field group': (surface?: ContentSurface) =>
        render(
            <InfoFieldGroup surface={surface}>
                <InfoField icon={Hash} label="Customer" value="cus_1" />
            </InfoFieldGroup>,
        ).container.firstElementChild as HTMLElement,
};

describe.each(Object.entries(blocks))('%s', (_, draw) => {
    it('sits on the solid grouped fill by default, as System Settings does', () => {
        const classes = draw().className.split(/\s+/);

        expect(classes).toContain('bg-(--grouped-fill)');
        expect(classes).toContain('rounded-2xl');
        expect(classes).toContain('p-inset');
        expect(classes).not.toContain('glass-panel');
    });

    it('floats on the glass of a card when asked', () => {
        const classes = draw('glass').className.split(/\s+/);

        expect(classes).toContain('glass-panel');
        expect(classes).toContain('p-inset');
        expect(classes).not.toContain('bg-(--grouped-fill)');
    });

    it('drops every surface inside a card that already has one', () => {
        const classes = draw('none').className.split(/\s+/);

        expect(classes).not.toContain('bg-(--grouped-fill)');
        expect(classes).not.toContain('glass-panel');
        expect(classes).not.toContain('p-inset');
    });
});
