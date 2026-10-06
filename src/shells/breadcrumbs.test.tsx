// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Breadcrumbs } from './breadcrumbs';

afterEach(cleanup);

const trail = [
    { title: 'Reports', href: '/reports' },
    { title: 'Sales', href: '/reports/sales' },
    { title: 'Operators', href: '/reports/sales/operators' },
];

function classesOf(element: Element | null): string[] {
    expect(element).not.toBeNull();

    return (element as Element).className.split(' ');
}

describe('the breadcrumbs collapsed below sm', () => {
    it('keep the trail on one line', () => {
        render(<Breadcrumbs breadcrumbs={trail} collapseBelowSm />);

        const list = classesOf(
            document.querySelector('[data-slot="breadcrumb-list"]'),
        );

        expect(list).toContain('flex-nowrap');
        expect(list).not.toContain('flex-wrap');
    });

    it('let the trail shrink below its content', () => {
        render(<Breadcrumbs breadcrumbs={trail} collapseBelowSm />);

        expect(
            classesOf(document.querySelector('[data-slot="breadcrumb"]')),
        ).toContain('min-w-0');
        expect(
            classesOf(document.querySelector('[data-slot="breadcrumb-list"]')),
        ).toContain('min-w-0');
    });

    it('hide every crumb but the last below sm', () => {
        render(<Breadcrumbs breadcrumbs={trail} collapseBelowSm />);

        for (const title of ['Reports', 'Sales']) {
            expect(
                classesOf(
                    screen
                        .getByRole('link', { name: title })
                        .closest('[data-slot="breadcrumb-item"]'),
                ),
            ).toEqual(expect.arrayContaining(['hidden', 'sm:inline-flex']));
        }
    });

    it('hide the separators below sm', () => {
        render(<Breadcrumbs breadcrumbs={trail} collapseBelowSm />);

        const separators = document.querySelectorAll(
            '[data-slot="breadcrumb-separator"]',
        );

        expect(separators).toHaveLength(2);
        separators.forEach((separator) => {
            expect(classesOf(separator)).toEqual(
                expect.arrayContaining(['hidden', 'sm:inline-flex']),
            );
        });
    });

    it('let the earlier crumbs shrink and truncate from sm up', () => {
        render(<Breadcrumbs breadcrumbs={trail} collapseBelowSm />);

        const link = screen.getByRole('link', { name: 'Reports' });

        expect(classesOf(link)).toContain('truncate');
        expect(
            classesOf(link.closest('[data-slot="breadcrumb-item"]')),
        ).toContain('min-w-0');
    });

    it('name every truncated crumb in full on hover', () => {
        render(<Breadcrumbs breadcrumbs={trail} collapseBelowSm />);

        expect(
            screen.getByRole('link', { name: 'Reports' }).getAttribute('title'),
        ).toBe('Reports');
        expect(screen.getByText('Operators').getAttribute('title')).toBe(
            'Operators',
        );
    });

    it('truncate the last crumb instead of wrapping it', () => {
        render(<Breadcrumbs breadcrumbs={trail} collapseBelowSm />);

        const page = screen.getByText('Operators');
        const item = classesOf(page.closest('[data-slot="breadcrumb-item"]'));

        expect(classesOf(page)).toContain('truncate');
        expect(item).toContain('min-w-0');
        expect(item).not.toContain('hidden');
    });
});

describe('the breadcrumbs by default', () => {
    it('keep every crumb and let the trail wrap', () => {
        render(<Breadcrumbs breadcrumbs={trail} />);

        const list = classesOf(
            document.querySelector('[data-slot="breadcrumb-list"]'),
        );

        expect(list).toContain('flex-wrap');
        expect(list).not.toContain('flex-nowrap');
        document
            .querySelectorAll(
                '[data-slot="breadcrumb-item"], [data-slot="breadcrumb-separator"]',
            )
            .forEach((element) => {
                expect(classesOf(element)).not.toContain('hidden');
            });
        expect(classesOf(screen.getByText('Operators'))).not.toContain(
            'truncate',
        );
    });
});
