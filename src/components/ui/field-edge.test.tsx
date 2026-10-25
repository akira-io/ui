/** @vitest-environment jsdom */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Field, FieldDescription, FieldLabel } from './field';

function marginsOf(element: Element): string[] {
    return element.className
        .split(/\s+/)
        .filter((name) => /^(m[lsx]|ps|pl)-/.test(name));
}

describe('the text of a field', () => {
    it('starts its description and its error on the leading edge of the label', () => {
        const { container } = render(
            <Field error="Enter a complete email address.">
                <FieldLabel>Delivery address</FieldLabel>
                <FieldDescription>Every alert is sent here.</FieldDescription>
            </Field>,
        );

        const label = container.querySelector('[data-slot="field-label"]')!;
        const description = container.querySelector(
            '[data-slot="field-description"]',
        )!;
        const error = container.querySelector('[data-slot="field-error"]')!;

        expect(marginsOf(description)).toEqual(marginsOf(label));
        expect(marginsOf(error)).toEqual(marginsOf(label));
    });
});
