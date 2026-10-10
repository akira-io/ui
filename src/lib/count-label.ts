export function countLabel(
    total: number,
    locale: string,
    nouns: { one: string; other: string },
): string {
    const noun =
        new Intl.PluralRules(locale).select(total) === 'one'
            ? nouns.one
            : nouns.other;

    return `${total.toLocaleString(locale)} ${noun}`;
}
