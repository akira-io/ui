const BROWSERS: [RegExp, string][] = [
    [/Edg|Edge/, 'Edge'],
    [/OPR|Opera|OPiOS/, 'Opera'],
    [/Firefox|FxiOS/, 'Firefox'],
    [/Chrome|CriOS/, 'Chrome'],
    [/Safari/, 'Safari'],
];

const SYSTEMS: [RegExp, string][] = [
    [/iPhone/, 'iPhone'],
    [/iPad/, 'iPad'],
    [/Android/, 'Android'],
    [/Macintosh|Mac OS/, 'Mac'],
    [/Windows/, 'Windows'],
];

function firstMatch(userAgent: string, table: [RegExp, string][]) {
    return table.find(([pattern]) => pattern.test(userAgent))?.[1];
}

export function suggestPasskeyName(
    userAgent: string,
    deviceName: (browser: string, system: string) => string,
): string {
    const browser = firstMatch(userAgent, BROWSERS);
    const system = firstMatch(userAgent, SYSTEMS);

    if (browser && system) {
        return deviceName(browser, system);
    }

    return browser ?? system ?? '';
}
