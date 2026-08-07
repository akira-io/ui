import type { Extensions } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

const SAFE_PROTOCOLS = ['http', 'https', 'mailto', 'tel'];

export function isSafeEditorUrl(url: string): boolean {
    const protocol = /^([a-z][a-z0-9+.-]*):/i.exec(url.trim())?.[1];

    return (
        protocol === undefined ||
        SAFE_PROTOCOLS.includes(protocol.toLowerCase())
    );
}

export function defaultEditorExtensions(): Extensions {
    return [
        StarterKit.configure({
            link: {
                openOnClick: false,
                autolink: true,
                protocols: SAFE_PROTOCOLS,
                isAllowedUri: (url) => isSafeEditorUrl(url),
                HTMLAttributes: {
                    rel: 'noopener noreferrer nofollow',
                    target: '_blank',
                },
            },
        }),
    ];
}
