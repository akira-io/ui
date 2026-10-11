/** @vitest-environment jsdom */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from './input';
import { Textarea } from './textarea';

describe('field shape', () => {
    it('draws a one line field as a capsule', () => {
        const className = render(<Input />).container.querySelector(
            'input',
        )!.className;

        expect(className).toContain('rounded-full');
        expect(className).toContain('px-inset');
    });

    it('rounds a text area by 16px, since a capsule cannot hold several lines', () => {
        const className = render(<Textarea />).container.querySelector(
            'textarea',
        )!.className;

        expect(className).toContain('rounded-2xl');
        expect(className).not.toContain('rounded-full');
    });
});
