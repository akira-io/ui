import { describe, expect, it } from 'vitest';

import { modalScrim } from '@/lib/language';

describe('the modal scrim token', () => {
    it('is a light unblurred veil so the glass surface stays white', () => {
        expect(modalScrim.split(' ')).toContain('bg-black/10');
        expect(modalScrim).not.toMatch(/backdrop-blur|bg-black\/[2-9]0/);
    });
});
