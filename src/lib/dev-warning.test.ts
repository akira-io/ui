import { afterEach, describe, expect, it, vi } from 'vitest';

import { resetDevWarnings, warnInDevelopment } from '@/lib/dev-warning';

afterEach(() => {
    resetDevWarnings();
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
});

describe('warnInDevelopment', () => {
    it('warns once per message', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

        warnInDevelopment('three levels');
        warnInDevelopment('three levels');

        expect(warn).toHaveBeenCalledTimes(1);
    });

    it('stays quiet in production', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        vi.stubEnv('NODE_ENV', 'production');

        warnInDevelopment('three levels');

        expect(warn).not.toHaveBeenCalled();
    });
});
