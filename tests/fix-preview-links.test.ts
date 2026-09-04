import { describe, expect, it } from 'vitest';
import { refreshPreviewLinks } from '../scripts/fix-preview-links.mjs';

describe('refreshPreviewLinks', () => {
    it('replaces Pending with the live demo URL for a slug with a demo', () => {
        const markdown =
            '| `accordion` | Pending |\n| `carousel` | Pending |\n';

        const updated = refreshPreviewLinks(markdown, new Set(['accordion']));

        expect(updated).toBe(
            '| `accordion` | https://ui.akira-io.com/components/accordion/ |\n| `carousel` | Pending |\n',
        );
    });

    it('leaves a row untouched when no demo exists for the slug', () => {
        const markdown = '| `carousel` | Pending |\n';

        expect(refreshPreviewLinks(markdown, new Set())).toBe(markdown);
    });

    it('leaves an already-published row untouched', () => {
        const markdown =
            '| `button` | https://ui.akira-io.com/components/button/ |\n';

        expect(refreshPreviewLinks(markdown, new Set(['button']))).toBe(
            markdown,
        );
    });

    it('replaces a row that carries an annotation after the slug', () => {
        const markdown = '| `sonner` (toasts) | Pending |\n';

        expect(refreshPreviewLinks(markdown, new Set(['sonner']))).toBe(
            '| `sonner` (toasts) | https://ui.akira-io.com/components/sonner/ |\n',
        );
    });
});
