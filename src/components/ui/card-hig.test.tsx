// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';

afterEach(cleanup);

const classesOf = (slot: string) =>
    document.querySelector(`[data-slot="${slot}"]`)?.className.split(' ') ?? [];

describe('the card on the HIG scale', () => {
    it('pads itself with the inset token on every side', () => {
        render(
            <Card>
                <CardHeader>Title</CardHeader>
                <CardContent>Body</CardContent>
                <CardFooter>Actions</CardFooter>
            </Card>,
        );

        expect(classesOf('card')).toContain('py-inset');
        expect(classesOf('card')).toContain('gap-group');
        expect(classesOf('card-header')).toEqual(
            expect.arrayContaining(['px-inset', 'gap-tight']),
        );
        expect(classesOf('card-content')).toContain('px-inset');
        expect(classesOf('card-footer')).toContain('px-inset');
    });

    it('scales the small and large paddings from the inset', () => {
        render(<Card padding="sm">Small</Card>);

        expect(classesOf('card')).toContain(
            'py-[calc(var(--space-inset)*0.5)]',
        );
    });

    it('lets a consumer padding replace the inset', () => {
        render(<Card className="py-2">Body</Card>);

        expect(classesOf('card')).toContain('py-2');
        expect(classesOf('card')).not.toContain('py-inset');
    });
});
