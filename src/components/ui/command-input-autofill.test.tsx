// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { Command, CommandInput, CommandList } from '@/components/ui/command';

import { installResizeObserver } from '../../../tests/fixtures/resize-observer';

beforeAll(() => {
    installResizeObserver();
    Element.prototype.scrollIntoView = () => {};
});

afterEach(cleanup);

function renderSearch() {
    render(
        <Command>
            <CommandInput placeholder="Search" />
            <CommandList />
        </Command>,
    );

    return screen.getByPlaceholderText('Search');
}

describe('the command search field', () => {
    it('reads as a search, so password managers leave it alone', () => {
        const input = renderSearch();

        expect(input.getAttribute('type')).toBe('search');
        expect(input.getAttribute('autocomplete')).toBe('off');
        expect(input.getAttribute('data-1p-ignore')).not.toBeNull();
        expect(input.getAttribute('data-lpignore')).toBe('true');
        expect(input.getAttribute('data-form-type')).toBe('other');
    });

    it('stays a search when a caller passes its own ref', () => {
        const ref = createRef<HTMLInputElement>();
        render(
            <Command>
                <CommandInput ref={ref} placeholder="Find" />
                <CommandList />
            </Command>,
        );

        expect(ref.current).toBe(screen.getByPlaceholderText('Find'));
        expect(ref.current?.getAttribute('type')).toBe('search');
    });
});
