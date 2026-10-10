import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            spacing: ['tight', 'item', 'group', 'inset', 'target'],
        },
        classGroups: {
            'bg-color': ['glass-bar', 'glass-panel', 'glass-sidebar'],
            size: [{ size: ['icon', 'icon-sm', 'icon-lg'] }],
            'stroke-w': [{ stroke: ['icon'] }],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
