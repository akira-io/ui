import type { ComponentType } from 'react';
import { createElement } from 'react';

import type { LinkComponent, LinkProps, UrlLike } from '@/types';

export function hrefToString(href: UrlLike): string {
    return typeof href === 'string' ? href : href.url;
}

export function pathOfHref(href: UrlLike | string): string {
    const url = typeof href === 'string' ? href : hrefToString(href);

    return url.split('?')[0].split('#')[0];
}

export function mostSpecificActiveHref(
    hrefs: UrlLike[],
    currentUrl: string,
): string {
    const currentPath = pathOfHref(currentUrl);
    let best = '';
    let bestLength = 0;
    for (const candidate of hrefs) {
        const href = hrefToString(candidate);
        const path = pathOfHref(href);
        const matches =
            currentPath === path || currentPath.startsWith(`${path}/`);
        if (matches && path.length > bestLength) {
            best = href;
            bestLength = path.length;
        }
    }
    return best;
}

export const DefaultLink: ComponentType<LinkProps> = ({
    href,
    children,
    prefetch: _prefetch,
    as: _as,
    ...props
}) => {
    return createElement('a', { href: hrefToString(href), ...props }, children);
};

export function resolveLink(linkComponent?: LinkComponent): LinkComponent {
    return linkComponent ?? DefaultLink;
}
