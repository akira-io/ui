// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    Field,
    FieldControl,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

afterEach(cleanup);

function control(): HTMLElement {
    return screen.getByLabelText('Display name', { exact: false });
}

describe('the field family', () => {
    it('points the label at the control it wraps', () => {
        render(
            <Field>
                <FieldLabel>Display name</FieldLabel>
                <FieldControl>
                    <Input defaultValue="Ada" />
                </FieldControl>
            </Field>,
        );

        const label = document.querySelector('[data-slot="field-label"]');

        expect(control().id).not.toBe('');
        expect(label?.getAttribute('for')).toBe(control().id);
    });

    it('names the control from the id the caller gives the field', () => {
        render(
            <Field id="chosen">
                <FieldLabel>Display name</FieldLabel>
                <FieldControl>
                    <Input />
                </FieldControl>
            </Field>,
        );

        expect(control().id).toBe('chosen');
        expect(
            document
                .querySelector('[data-slot="field-label"]')
                ?.getAttribute('for'),
        ).toBe('chosen');
    });

    it('describes the control with the description when one is rendered', () => {
        render(
            <Field>
                <FieldLabel>Display name</FieldLabel>
                <FieldDescription>Shown on your profile</FieldDescription>
                <FieldControl>
                    <Input />
                </FieldControl>
            </Field>,
        );

        const description = document.querySelector(
            '[data-slot="field-description"]',
        );

        expect(control().getAttribute('aria-describedby')).toBe(
            description?.id,
        );
    });

    it('leaves the control undescribed when there is no description', () => {
        render(
            <Field>
                <FieldLabel>Display name</FieldLabel>
                <FieldControl>
                    <Input />
                </FieldControl>
            </Field>,
        );

        expect(control().hasAttribute('aria-describedby')).toBe(false);
    });

    it('describes the control with both the description and the error', () => {
        render(
            <Field error="Pick a shorter name">
                <FieldLabel>Display name</FieldLabel>
                <FieldDescription>Shown on your profile</FieldDescription>
                <FieldControl>
                    <Input />
                </FieldControl>
            </Field>,
        );

        const description = document.querySelector(
            '[data-slot="field-description"]',
        );
        const error = document.querySelector('[data-slot="field-error"]');

        expect(error?.textContent).toBe('Pick a shorter name');
        expect(control().getAttribute('aria-describedby')).toBe(
            `${description?.id} ${error?.id}`,
        );
    });

    it('marks an errored field invalid on the control itself', () => {
        render(
            <Field error="Pick a shorter name">
                <FieldLabel>Display name</FieldLabel>
                <FieldControl>
                    <Input />
                </FieldControl>
            </Field>,
        );

        expect(control().getAttribute('aria-invalid')).toBe('true');
        expect(
            document
                .querySelector('[data-slot="field"]')
                ?.getAttribute('data-invalid'),
        ).toBe('true');
    });

    it('leaves a valid field without an invalid marker', () => {
        render(
            <Field>
                <FieldLabel>Display name</FieldLabel>
                <FieldControl>
                    <Input />
                </FieldControl>
            </Field>,
        );

        expect(control().hasAttribute('aria-invalid')).toBe(false);
    });

    it('marks a required field on the control and in the label', () => {
        render(
            <Field required>
                <FieldLabel>Display name</FieldLabel>
                <FieldControl>
                    <Input />
                </FieldControl>
            </Field>,
        );

        expect((control() as HTMLInputElement).required).toBe(true);
        expect(
            document.querySelector('[data-slot="field-required"]')?.textContent,
        ).toBe('*');
        expect(screen.getByText('Required')).not.toBeNull();
    });

    it('takes an overridden required label', () => {
        render(
            <Field required>
                <FieldLabel requiredLabel="Obrigatório">
                    Display name
                </FieldLabel>
                <FieldControl>
                    <Input />
                </FieldControl>
            </Field>,
        );

        expect(screen.getByText('Obrigatório')).not.toBeNull();
    });

    it('wires a switch the same way it wires an input', () => {
        render(
            <Field orientation="horizontal" error="Turn this on first">
                <FieldLabel>Display name</FieldLabel>
                <FieldDescription>Shown on your profile</FieldDescription>
                <FieldControl>
                    <Switch />
                </FieldControl>
            </Field>,
        );

        const control = screen.getByRole('switch');
        const description = document.querySelector(
            '[data-slot="field-description"]',
        );
        const error = document.querySelector('[data-slot="field-error"]');

        expect(control.getAttribute('aria-invalid')).toBe('true');
        expect(control.getAttribute('aria-describedby')).toBe(
            `${description?.id} ${error?.id}`,
        );
    });

    it('lays a horizontal field out beside its label', () => {
        render(
            <Field orientation="horizontal">
                <FieldLabel>Display name</FieldLabel>
                <FieldControl>
                    <Switch />
                </FieldControl>
            </Field>,
        );

        const field = document.querySelector('[data-slot="field"]');

        expect(field?.getAttribute('data-orientation')).toBe('horizontal');
        expect(field?.className).toContain('grid-cols-[1fr_auto]');
        expect(field?.className).not.toContain('flex-col');
    });

    it('gives every field in a group the same rhythm', () => {
        render(
            <FieldGroup>
                <Field>
                    <FieldLabel>Display name</FieldLabel>
                    <FieldControl>
                        <Input />
                    </FieldControl>
                </Field>
            </FieldGroup>,
        );

        expect(
            document.querySelector('[data-slot="field-group"]')?.className,
        ).toContain('gap-6');
    });

    it('gives two fields on a page distinct ids', () => {
        render(
            <FieldGroup>
                <Field>
                    <FieldLabel>Display name</FieldLabel>
                    <FieldControl>
                        <Input />
                    </FieldControl>
                </Field>
                <Field>
                    <FieldLabel>Nickname</FieldLabel>
                    <FieldControl>
                        <Input />
                    </FieldControl>
                </Field>
            </FieldGroup>,
        );

        expect(control().id).not.toBe(screen.getByLabelText('Nickname').id);
    });
});
