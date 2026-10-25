import { describe, expect, it } from 'vitest';

import { cn } from './utils';

describe('cn with the HIG tokens', () => {
    it('keeps the control text size next to a text color', () => {
        expect(cn('text-control text-foreground')).toBe(
            'text-control text-foreground',
        );
    });

    it('lets a later text size replace the control size', () => {
        expect(cn('text-control', 'text-sm')).toBe('text-sm');
    });

    it('keeps the control height next to a padding', () => {
        expect(cn('px-4 h-control', 'h-8')).toBe('px-4 h-8');
    });

    it('treats the glass materials as one fill', () => {
        expect(cn('glass-button', 'glass-prominent')).toBe('glass-prominent');
    });
});
