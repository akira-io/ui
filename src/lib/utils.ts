import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge<'icon-weight'>({
    extend: {
        theme: {
            spacing: [
                'tight',
                'item',
                'group',
                'inset',
                'row',
                'target',
                'control',
            ],
        },
        classGroups: {
            'bg-color': [
                'glass-bar',
                'glass-panel',
                'glass-sidebar',
                'glass-button',
                'glass-prominent',
            ],
            'font-size': [{ text: ['control'] }],
            size: [{ size: ['icon', 'icon-sm', 'icon-lg'] }],
            'stroke-w': [{ stroke: ['icon'] }],
            'icon-weight': ['icon-weight-medium', 'icon-weight-semibold'],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
