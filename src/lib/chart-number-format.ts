export function compactFormat(
    options?: Intl.NumberFormatOptions,
): Intl.NumberFormatOptions {
    const unit =
        options?.style === 'currency'
            ? {}
            : {
                  style: options?.style,
                  unit: options?.unit,
                  unitDisplay: options?.unitDisplay,
              };

    return { ...unit, notation: 'compact', compactDisplay: 'short' };
}

function isPercent(options: Intl.NumberFormatOptions): boolean {
    return options.style === 'percent' || options.unit === 'percent';
}

export function exactFormat(
    options?: Intl.NumberFormatOptions,
): Intl.NumberFormatOptions | undefined {
    if (!options) {
        return undefined;
    }

    const digits = isPercent(options)
        ? {
              minimumFractionDigits: options.minimumFractionDigits,
              maximumFractionDigits: options.maximumFractionDigits,
          }
        : { minimumFractionDigits: 0, maximumFractionDigits: 0 };

    return {
        style: options.style,
        currency: options.currency,
        currencyDisplay: options.currencyDisplay,
        unit: options.unit,
        unitDisplay: options.unitDisplay,
        ...digits,
    };
}
