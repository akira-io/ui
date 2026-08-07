// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    Alert,
    AlertDescription,
    AlertTitle,
    alertDefaultLabels,
} from '@/components/ui/alert';
import { UiLocaleProvider } from '@/locales/context';
import { alertLabelsPt } from '@/locales/pt';

afterEach(cleanup);

const SEVERITIES = ['warning', 'info'] as const;

function classesOf(): string {
    return screen.getByRole('alert').className;
}

describe('the severity variants', () => {
    it.each(SEVERITIES)('tints %s from its own token pair', (variant) => {
        render(<Alert variant={variant}>Body</Alert>);

        expect(classesOf()).toContain(`bg-${variant}/10`);
        expect(classesOf()).toContain(`text-${variant}`);
        expect(classesOf()).toContain(`ring-${variant}/20`);
    });

    it.each(SEVERITIES)('reads %s from a token, never a literal', (variant) => {
        render(<Alert variant={variant}>Body</Alert>);

        expect(classesOf()).not.toMatch(
            /(?:bg|text|ring|border)-(?:amber|blue|yellow|sky)-\d/,
        );
    });

    it.each(SEVERITIES)('names %s without relying on colour', (variant) => {
        render(
            <Alert variant={variant}>
                <AlertTitle>Ferry delayed</AlertTitle>
                <AlertDescription>Boarding moves to 14:20.</AlertDescription>
            </Alert>,
        );

        const name =
            variant === 'warning'
                ? alertDefaultLabels.warningLabel
                : alertDefaultLabels.infoLabel;

        expect(screen.getByRole('alert', { name })).toBeDefined();
        expect(screen.getByText('Ferry delayed')).toBeDefined();
    });

    it('translates the name through the locale provider', () => {
        render(
            <UiLocaleProvider labels={{ alert: alertLabelsPt }}>
                <Alert variant="warning">Body</Alert>
            </UiLocaleProvider>,
        );

        expect(
            screen.getByRole('alert', { name: alertLabelsPt.warningLabel }),
        ).toBeDefined();
    });

    it('lets a caller name the alert itself', () => {
        render(
            <Alert variant="info" aria-label="Sailing notice">
                Body
            </Alert>,
        );

        expect(
            screen.getByRole('alert', { name: 'Sailing notice' }),
        ).toBeDefined();
    });
});

describe('the variants that already shipped', () => {
    it.each(['default', 'destructive'] as const)(
        'leaves %s without a name of its own',
        (variant) => {
            render(<Alert variant={variant}>Body</Alert>);

            expect(screen.getByRole('alert').hasAttribute('aria-label')).toBe(
                false,
            );
        },
    );

    it('keeps the destructive tint', () => {
        render(<Alert variant="destructive">Body</Alert>);

        expect(classesOf()).toContain('bg-destructive/10');
    });

    it('keeps its data-slot after the prop spread', () => {
        render(
            <Alert variant="warning" data-slot="hijacked">
                Body
            </Alert>,
        );

        expect(screen.getByRole('alert').dataset.slot).toBe('alert');
    });
});
