const FALLBACK_LOCALE = 'en-US';

function supportedLocale(locale: string | undefined): string {
    if (!locale) {
        return FALLBACK_LOCALE;
    }

    try {
        return Intl.getCanonicalLocales(locale)[0] ?? FALLBACK_LOCALE;
    } catch {
        return FALLBACK_LOCALE;
    }
}

function oneDecimal(
    value: number,
    locale: string | undefined,
    signDisplay: Intl.NumberFormatOptions['signDisplay'],
): string {
    const formatted = new Intl.NumberFormat(supportedLocale(locale), {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        signDisplay,
    }).format(value);

    return `${formatted}%`;
}

export function percentLabel(
    value: number,
    locale: string | undefined,
): string {
    return oneDecimal(value, locale, 'auto');
}

export function trendLabel(trend: number, locale: string | undefined): string {
    if (trend === 0) {
        return '0%';
    }

    return oneDecimal(trend, locale, 'always');
}
