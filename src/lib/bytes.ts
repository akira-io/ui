const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const;

export function formatBytes(bytes: number, locale = 'en-US'): string {
    const step = bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(1024)) : 0;
    const unit = Math.min(step, UNITS.length - 1);
    const size = bytes / 1024 ** unit;

    return `${size.toLocaleString(locale, {
        maximumFractionDigits: unit === 0 ? 0 : 1,
    })} ${UNITS[unit]}`;
}
