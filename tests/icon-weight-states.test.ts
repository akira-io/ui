import { describe, expect, it } from 'vitest';

import { componentSources, readSource } from './helpers/sources';

const STRING_LITERAL = /'[^'\n]*'|"[^"\n]*"|`[^`]*`/g;

const TEXT_WEIGHT = /(?<![\w-])((?:\S+:)?)font-(medium|semibold)(?![\w-])/g;

function unmatchedTextWeights(source: string): string[] {
    return [...source.matchAll(STRING_LITERAL)]
        .map(([literal]) => literal.slice(1, -1))
        .filter((literal) => literal.includes('icon-weight-'))
        .flatMap((literal) =>
            [...literal.matchAll(TEXT_WEIGHT)]
                .map(([, prefix, weight]) => `${prefix}icon-weight-${weight}`)
                .filter((expected) => !literal.split(/\s+/).includes(expected)),
        );
}

describe('icon weights follow the text weight', () => {
    it('flags a state that makes the text semibold and leaves the icon medium', () => {
        expect(
            unmatchedTextWeights(
                "'font-medium icon-weight-medium data-[state=on]:font-semibold'",
            ),
        ).toEqual(['data-[state=on]:icon-weight-semibold']);
    });

    it('accepts a string whose weights match', () => {
        expect(
            unmatchedTextWeights(
                "'font-medium icon-weight-medium focus:font-semibold focus:icon-weight-semibold'",
            ),
        ).toEqual([]);
    });

    it.each(componentSources())(
        '%s weights its icons like its text',
        (file) => {
            expect(unmatchedTextWeights(readSource(file))).toEqual([]);
        },
    );
});
