/** @vitest-environment jsdom */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Field, FieldGroup, FieldLabel } from './field';

function group(columns?: 1 | 2) {
    return render(
        <FieldGroup columns={columns}>
            <Field>
                <FieldLabel>First name</FieldLabel>
            </Field>
            <Field span="full">
                <FieldLabel>Notes</FieldLabel>
            </Field>
        </FieldGroup>,
    ).container;
}

function classesOf(container: HTMLElement, slot: string): string[] {
    return container
        .querySelector(`[data-slot="${slot}"]`)!
        .className.split(/\s+/);
}

describe('a field group in two columns', () => {
    it('lays its fields on a grid of two columns from md up', () => {
        const classes = classesOf(group(2), 'field-group');

        expect(classes).toContain('grid');
        expect(classes).toContain('md:grid-cols-2');
    });

    it('keeps one column below md', () => {
        expect(classesOf(group(2), 'field-group')).not.toContain('grid-cols-2');
    });

    it('lets a field span every column', () => {
        const notes = group(2).querySelectorAll('[data-slot="field"]')[1]!;

        expect(notes.className.split(/\s+/)).toContain('col-span-full');
    });
});

describe('a field group by default', () => {
    it('stacks its fields in one column', () => {
        const classes = classesOf(group(), 'field-group');

        expect(classes).toContain('flex-col');
        expect(classes).not.toContain('md:grid-cols-2');
    });
});
