/** @vitest-environment jsdom */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
    Field,
    FieldControl,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from './field';
import { Input } from './input';

function form() {
    return render(
        <FieldGroup variant="grouped" title="Product">
            <Field orientation="horizontal">
                <FieldLabel>Name</FieldLabel>
                <FieldControl>
                    <Input defaultValue="Standing Desk" />
                </FieldControl>
            </Field>
        </FieldGroup>,
    ).container;
}

describe('a grouped form', () => {
    it('sits on a solid grouped fill, never on glass', () => {
        const group = form().querySelector('[data-slot="field-group"]')!;
        const box = group.querySelector('[data-slot="field-group-rows"]')!;

        expect(box.className).toContain('bg-(--grouped-fill)');
        expect(box.className).not.toContain('glass');
        expect(box.className).toContain('divide-y');
    });

    it('insets its title to the content of the rows', () => {
        const title = form().querySelector('[data-slot="field-group-title"]')!;

        expect(title.textContent).toBe('Product');
        expect(title.className).toContain('ps-row');
    });

    it('pads every row by the content inset around the control height', () => {
        const rows = form().querySelector('[data-slot="field-group-rows"]')!;

        expect(rows.className).toContain('[&>[data-slot=field]]:p-row');
        expect(rows.className).toContain(
            '[&>[data-slot=field]]:min-h-[calc(var(--control-h)+2*var(--space-row))]',
        );
    });

    it('gives a row holding a switch the height of a row holding a field', () => {
        const rows = form().querySelector('[data-slot="field-group-rows"]')!;

        expect(rows.className).toContain(
            '[&>[data-slot=field]]:content-center',
        );
    });

    it('centres the label of a row on the row', () => {
        const label = form().querySelector('[data-slot="field-label"]')!;

        expect(label.className).toContain(
            'group-data-[orientation=horizontal]/field:self-center',
        );
    });

    it('keeps the label of a described row on the first line, above its description', () => {
        const { container } = render(
            <Field orientation="horizontal">
                <FieldLabel>Weekly digest</FieldLabel>
                <FieldDescription>One email every Monday.</FieldDescription>
                <FieldControl>
                    <Input />
                </FieldControl>
            </Field>,
        );
        const label = container.querySelector('[data-slot="field-label"]')!;

        expect(label.className).not.toContain('row-span-2');
        expect(label.className).toContain(
            'group-data-[orientation=horizontal]/field:row-start-1',
        );
    });

    it('keeps the small fixed corner of an Apple settings group, whatever it holds', () => {
        const rows = form().querySelector('[data-slot="field-group-rows"]')!;

        expect(rows.className).toContain('rounded-2xl');
    });
});
