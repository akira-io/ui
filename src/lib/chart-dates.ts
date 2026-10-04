const MONTH_YEAR: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
};

const DAY_MONTH: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
};

const SEPARATOR = /^[\s/.-]+$/;
const NUMERIC = /^\d+$/;

function toDate(value: unknown): Date {
    return value instanceof Date ? value : new Date(value as string | number);
}

function isValidDate(date: Date): boolean {
    return !Number.isNaN(date.getTime());
}

export function defaultTimeFormat(
    values: readonly unknown[],
): Intl.DateTimeFormatOptions {
    const dates = values.map(toDate).filter(isValidDate);
    const monthly =
        dates.length > 0 && dates.every((date) => date.getDate() === 1);

    return monthly ? MONTH_YEAR : DAY_MONTH;
}

function spellMonth(parts: Intl.DateTimeFormatPart[], month: string): string {
    const numeric = parts.some(
        (part) => part.type === 'month' && NUMERIC.test(part.value),
    );

    return parts
        .map((part) => {
            if (part.type === 'month') {
                return (numeric ? month : part.value).replace(/\.$/, '');
            }

            if (
                numeric &&
                part.type === 'literal' &&
                SEPARATOR.test(part.value)
            ) {
                return ' ';
            }

            return part.value;
        })
        .join('');
}

export function dateFormatter(
    options?: Intl.DateTimeFormatOptions,
    locale?: string,
): (value: unknown) => string {
    const format = new Intl.DateTimeFormat(locale, options);
    const month =
        options?.month === 'short'
            ? new Intl.DateTimeFormat(locale, {
                  month: 'short',
                  timeZone: options.timeZone,
              })
            : undefined;

    return (value) => {
        const date = toDate(value);

        if (!isValidDate(date)) {
            return String(value);
        }

        if (!month) {
            return format.format(date);
        }

        return spellMonth(format.formatToParts(date), month.format(date));
    };
}
