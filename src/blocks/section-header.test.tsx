// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { Users } from 'lucide-react';
import { afterEach, describe, expect, it } from 'vitest';

import { SectionHeader } from '@/blocks/section-header';

afterEach(cleanup);

function tile(): HTMLElement | null {
    return document.querySelector('[data-slot="section-header-icon"]');
}

describe('the icon of a section header', () => {
    it('sits on the same glass tile as every other icon', () => {
        render(<SectionHeader icon={<Users />} title="Team members" />);

        expect(tile()!.className).toContain('glass-button');
        expect(tile()!.className).toContain('icon-tile-shape');
        expect(tile()!.querySelector('svg')).not.toBeNull();
    });

    it('takes a colour from the page', () => {
        render(
            <SectionHeader
                icon={<Users />}
                iconClassName="text-primary"
                title="Team members"
            />,
        );

        expect(tile()!.className).toContain('text-primary');
    });

    it('draws no tile without an icon', () => {
        render(<SectionHeader title="Team members" />);

        expect(tile()).toBeNull();
    });
});
