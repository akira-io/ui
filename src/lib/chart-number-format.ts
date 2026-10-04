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
