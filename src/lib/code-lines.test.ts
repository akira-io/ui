import { describe, expect, it } from 'vitest';

import {
    parseLineRanges,
    splitHighlightedLines,
    splitSourceLines,
} from '@/lib/code-lines';

describe('splitSourceLines', () => {
    it('drops the trailing newline a file usually ends with', () => {
        expect(splitSourceLines('one\ntwo\n')).toEqual(['one', 'two']);
    });

    it('keeps the blank lines inside the source', () => {
        expect(splitSourceLines('one\n\ntwo')).toEqual(['one', '', 'two']);
    });
});

describe('parseLineRanges', () => {
    it('reads single lines and ranges from one specification', () => {
        expect([...parseLineRanges('1,4-6')]).toEqual([1, 4, 5, 6]);
    });

    it('ignores whitespace around the bounds', () => {
        expect([...parseLineRanges(' 2 - 3 ')]).toEqual([2, 3]);
    });

    it('takes an array of line numbers', () => {
        expect([...parseLineRanges([3, 7])]).toEqual([3, 7]);
    });

    it('is empty when nothing is asked for', () => {
        expect(parseLineRanges(undefined).size).toBe(0);
    });
});

describe('splitHighlightedLines', () => {
    it('splits shiki markup into one entry per line, nesting included', () => {
        const html =
            '<pre class="shiki"><code>' +
            '<span class="line"><span style="color:#000">const</span></span>\n' +
            '<span class="line"><span><span>two</span></span></span>' +
            '</code></pre>';

        expect(splitHighlightedLines(html)).toEqual([
            '<span style="color:#000">const</span>',
            '<span><span>two</span></span>',
        ]);
    });

    it('returns nothing for markup that carries no lines', () => {
        expect(
            splitHighlightedLines('<pre><code>plain</code></pre>'),
        ).toBeNull();
    });
});
