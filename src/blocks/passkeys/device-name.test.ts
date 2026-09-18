import { describe, expect, it } from 'vitest';

import { suggestPasskeyName } from './device-name';

const on = (browser: string, system: string) => `${browser} on ${system}`;

describe('the suggested passkey name', () => {
    it.each([
        [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
            'Safari on Mac',
        ],
        [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36 Edg/124.0',
            'Edge on Windows',
        ],
        [
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/124.0 Mobile/15E148 Safari/604.1',
            'Chrome on iPhone',
        ],
        [
            'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36',
            'Chrome on Android',
        ],
        [
            'Mozilla/5.0 (X11; Linux x86_64; rv:125.0) Gecko/20100101 Firefox/125.0',
            'Firefox',
        ],
    ])('names %s after its browser and system', (userAgent, expected) => {
        expect(suggestPasskeyName(userAgent, on)).toBe(expected);
    });

    it('stays empty when it recognises neither', () => {
        expect(suggestPasskeyName('curl/8.0', on)).toBe('');
    });
});
