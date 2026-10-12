'use client';

import { useReducedMotion } from 'motion/react';
import * as React from 'react';

import { overlayOpenDuration, springEase } from '@/lib/motion/tokens';

const HIGHLIGHTED = '[data-highlighted], [data-selected="true"]';

function place(lens: HTMLElement, host: HTMLElement, reduced: boolean) {
    const item = host.querySelector<HTMLElement>(HIGHLIGHTED);

    if (!item) {
        lens.style.opacity = '0';

        return;
    }

    const box = host.getBoundingClientRect();
    const target = item.getBoundingClientRect();
    const appearing = lens.style.opacity !== '1';
    const glide = `${overlayOpenDuration}ms ${springEase}`;

    lens.style.transition =
        appearing || reduced
            ? 'none'
            : `transform ${glide}, width ${glide}, height ${glide}`;
    lens.style.transform = `translate(${target.left - box.left + host.scrollLeft}px, ${target.top - box.top + host.scrollTop}px)`;
    lens.style.width = `${target.width}px`;
    lens.style.height = `${target.height}px`;
    lens.style.opacity = '1';
}

export function MenuLens() {
    const ref = React.useRef<HTMLSpanElement>(null);
    const reduced = useReducedMotion() ?? false;

    React.useLayoutEffect(() => {
        const lens = ref.current;
        const host = lens?.parentElement;

        if (!lens || !host) {
            return undefined;
        }

        const follow = () => place(lens, host, reduced);
        const observer = new MutationObserver(follow);

        observer.observe(host, {
            subtree: true,
            attributes: true,
            attributeFilter: ['data-highlighted', 'data-selected'],
        });
        follow();

        return () => observer.disconnect();
    }, [reduced]);

    return (
        <span
            ref={ref}
            aria-hidden="true"
            data-slot="menu-lens"
            style={{ opacity: 0 }}
            className="top-0 left-0 rounded-xl pointer-events-none absolute -z-10 glass-button glass-edge"
        />
    );
}
