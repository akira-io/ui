import { describe, expect, it } from 'vitest';

import { hasNavigableScheme, normalizeUrl } from '@/lib/safe-url';

const TAB = String.fromCharCode(9);
const NEWLINE = String.fromCharCode(10);
const RETURN = String.fromCharCode(13);
const CONTROL = String.fromCharCode(1);

describe('a URL the browser will reassemble', () => {
    it.each([
        ['a tab inside the scheme', `java${TAB}script:steal()`],
        ['a newline inside the scheme', `java${NEWLINE}script:steal()`],
        ['a return inside the scheme', `java${RETURN}script:steal()`],
        ['a leading control character', `${CONTROL}javascript:steal()`],
        ['leading spaces', '  javascript:steal()'],
    ])('refuses %s', (_name, url) => {
        expect(hasNavigableScheme(url)).toBe(false);
    });

    it.each([
        ['data:', 'data:text/html,<script>steal()</script>'],
        ['vbscript:', 'vbscript:steal()'],
        ['file:', 'file:///etc/passwd'],
    ])('refuses %s', (_name, url) => {
        expect(hasNavigableScheme(url)).toBe(false);
    });

    it.each([
        ['http', 'http://example.com'],
        ['https', 'https://example.com'],
        ['mailto with parameters', 'mailto:a@example.com?subject=Hi%20there'],
        ['tel', 'tel:+244900000000'],
        ['a relative path', '/invoices/1'],
        ['a fragment', '#section'],
    ])('keeps %s', (_name, url) => {
        expect(hasNavigableScheme(url)).toBe(true);
    });

    it('leaves a scheme the parser cannot reassemble alone', () => {
        expect(
            hasNavigableScheme(`java${String.fromCharCode(0)}script:x()`),
        ).toBe(true);
    });
});

describe('the value a normalized URL carries', () => {
    it('drops the characters the parser removes from inside', () => {
        expect(normalizeUrl(`ht${TAB}tps://example.com/a${NEWLINE}b`)).toBe(
            'https://example.com/ab',
        );
    });

    it('drops a leading control character', () => {
        expect(normalizeUrl(`${CONTROL}/invoices/1`)).toBe('/invoices/1');
    });

    it('drops trailing spaces and control characters', () => {
        expect(normalizeUrl(`https://example.com/a ${CONTROL}`)).toBe(
            'https://example.com/a',
        );
    });

    it('keeps a query string and a fragment intact', () => {
        expect(normalizeUrl('https://example.com/a?b=c%20d#e')).toBe(
            'https://example.com/a?b=c%20d#e',
        );
    });
});
