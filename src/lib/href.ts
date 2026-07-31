import type { ComponentType } from 'react';
import { createElement } from 'react';

import type { LinkComponent, LinkProps, UrlLike } from '@/types';

export function hrefToString(href: UrlLike): string {
    return typeof href === 'string' ? href : href.url;
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
