import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

function read(path: string): string {
    return readFileSync(
        fileURLToPath(new URL(`../src/${path}`, import.meta.url)),
        'utf8',
    );
}

const stack = read('components/ui/floating-sheet-stack.tsx');
const sidebar = read('components/ui/sidebar.tsx');

function componentBody(source: string, component: string): string {
    const start = source.indexOf(`function ${component}(`);

    if (start < 0) {
        throw new Error(`component not found: ${component}`);
    }

    const next = source.indexOf('\nfunction ', start + 1);

    return source.slice(start, next === -1 ? source.length : next);
}

describe('the sheet on a phone', () => {
    it('keeps a margin instead of filling the screen edge to edge', () => {
        expect(stack).toContain('inset-2');
        expect(stack).not.toContain('inset-y-0 right-0');
    });

    it('reads every safe-area inset', () => {
        for (const side of ['top', 'right', 'bottom', 'left']) {
            expect(stack).toContain(`env(safe-area-inset-${side})`);
        }
    });

    it('drops that padding once there is room for the desktop panel', () => {
        expect(stack).toContain('sm:p-0');
    });

    it('keeps the desktop panel anchored to the right', () => {
        expect(stack).toContain('sm:right-4');
        expect(stack).toContain('sm:max-w-lg');
    });
});

describe('the sidebar on a phone', () => {
    it('squares off, because a curve against the screen edge reads as a bug', () => {
        expect(componentBody(sidebar, 'Sidebar')).toContain('rounded-none');
    });

    it('keeps the footer clear of the gesture bar', () => {
        expect(componentBody(sidebar, 'SidebarFooter')).toContain(
            'pb-[max(0.5rem,env(safe-area-inset-bottom))]',
        );
    });

    it('leaves the header padding alone', () => {
        expect(componentBody(sidebar, 'SidebarHeader')).not.toContain(
            'safe-area',
        );
    });
});
