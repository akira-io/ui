import { describe, expect, it } from 'vitest';

import { isSafeEditorUrl } from '@/components/ui/editor/extensions';

const TAB = String.fromCharCode(9);
const NEWLINE = String.fromCharCode(10);
const CONTROL = String.fromCharCode(1);

describe('the address the editor accepts for a link', () => {
    it.each([
        ['a plain script scheme', 'javascript:steal()'],
        ['a tab inside the scheme', `java${TAB}script:steal()`],
        ['a newline inside the scheme', `java${NEWLINE}script:steal()`],
        ['a leading control character', `${CONTROL}javascript:steal()`],
        ['a data document', 'data:text/html,<script>steal()</script>'],
    ])('refuses %s', (_name, url) => {
        expect(isSafeEditorUrl(url)).toBe(false);
    });

    it.each([
        ['an https address', 'https://example.com'],
        ['a mailto address', 'mailto:a@example.com'],
        ['a relative path', '/invoices/1'],
    ])('keeps %s', (_name, url) => {
        expect(isSafeEditorUrl(url)).toBe(true);
    });
});
