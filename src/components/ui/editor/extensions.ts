import type { Extensions } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { NAVIGABLE_SCHEMES, hasNavigableScheme } from '@/lib/safe-url';

export function isSafeEditorUrl(url: string): boolean {
    return hasNavigableScheme(url);
}

export function defaultEditorExtensions(): Extensions {
    return [
        StarterKit.configure({
            link: {
                openOnClick: false,
                autolink: true,
                protocols: NAVIGABLE_SCHEMES,
                isAllowedUri: (url) => isSafeEditorUrl(url),
                HTMLAttributes: {
                    rel: 'noopener noreferrer nofollow',
                    target: '_blank',
                },
            },
        }),
    ];
}
