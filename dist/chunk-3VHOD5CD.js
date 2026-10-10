// src/lib/count-label.ts
function countLabel(total, locale, nouns) {
  const noun = new Intl.PluralRules(locale).select(total) === "one" ? nouns.one : nouns.other;
  return `${total.toLocaleString(locale)} ${noun}`;
}

export {
  countLabel
};
//# sourceMappingURL=chunk-3VHOD5CD.js.map