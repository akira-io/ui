/** @vitest-environment jsdom */

import { describe, expect, it } from 'vitest';

describe('the Inertia login binding', () => {
    it('is exported from the Inertia entry only', async () => {
        const inertia = await import('@/inertia');
        const blocks = await import('@/blocks');

        expect(inertia).toHaveProperty('InertiaLoginForm');
        expect(blocks).not.toHaveProperty('InertiaLoginForm');
    });
});
