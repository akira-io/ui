'use client';

import { animate, useReducedMotion } from 'motion/react';
import * as React from 'react';

import {
    overlayTransition,
    slotStagger,
    slotStaggerColumns,
} from '@/lib/motion/tokens';
import { useHeightMorph } from '@/lib/motion/use-height-morph';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

interface SkeletonMorphState {
    loading: boolean;
    reduced: boolean;
    root: React.RefObject<HTMLDivElement | null>;
}

interface Size {
    width: number;
    height: number;
}

const SkeletonMorphContext = React.createContext<SkeletonMorphState | null>(
    null,
);

const ITEM = '[data-skeleton-morph-item]';

const ROOT = '[data-skeleton-morph]';

const FADE = { duration: 0.15 };

function useSkeletonMorph(): SkeletonMorphState {
    const state = React.useContext(SkeletonMorphContext);

    if (!state) {
        throw new Error(
            'SkeletonMorphItem must be used within a SkeletonMorph.',
        );
    }

    return state;
}

function SkeletonMorph({
    loading,
    className,
    slotName = 'skeleton-morph',
    ...props
}: { loading: boolean } & React.ComponentProps<'div'> & SlotNameProps) {
    const root = React.useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion() ?? false;
    const state = React.useMemo(
        () => ({ loading, reduced, root }),
        [loading, reduced],
    );

    useHeightMorph(root, loading);

    return (
        <SkeletonMorphContext.Provider value={state}>
            <div
                ref={root}
                aria-busy={loading}
                data-skeleton-morph=""
                className={className}
                {...props}
                data-slot={slotName}
            />
        </SkeletonMorphContext.Provider>
    );
}

function useStretch(
    delay: number | null,
    size: React.RefObject<Size | null>,
    refs: {
        container: React.RefObject<HTMLDivElement | null>;
        content: React.RefObject<HTMLDivElement | null>;
        block: React.RefObject<HTMLSpanElement | null>;
    },
    done: () => void,
) {
    React.useLayoutEffect(() => {
        const container = refs.container.current;
        const content = refs.content.current;
        const block = refs.block.current;
        const from = size.current;

        if (delay === null || !container || !content || !block || !from) {
            return undefined;
        }

        const to = container.getBoundingClientRect();
        const running: ReturnType<typeof animate>[] = [];
        let cancelled = false;

        content.style.opacity = '0';

        const stretch = animate(
            block,
            {
                width: [`${from.width}px`, `${to.width}px`],
                height: [`${from.height}px`, `${to.height}px`],
            },
            { ...overlayTransition.enter, delay },
        );

        running.push(stretch);
        stretch.then(() => {
            if (cancelled) {
                return;
            }

            const fade = animate(block, { opacity: 0 }, FADE);

            running.push(fade, animate(content, { opacity: 1 }, FADE));
            fade.then(() => {
                if (!cancelled) {
                    done();
                }
            });
        });

        return () => {
            cancelled = true;
            running.forEach((controls) => controls.stop());
            content.style.opacity = '';
        };
    }, [delay, done, refs, size]);
}

function readingDelay(
    item: HTMLElement | null,
    root: HTMLElement | null,
): number {
    const own = [...(root?.querySelectorAll<HTMLElement>(ITEM) ?? [])].filter(
        (candidate) => candidate.parentElement?.closest(ROOT) === root,
    );
    const index = item ? Math.max(own.indexOf(item), 0) : 0;

    return Math.min(index, slotStaggerColumns) * slotStagger;
}

function SkeletonMorphItem({
    skeleton,
    children,
    className,
    slotName = 'skeleton-morph-item',
}: {
    skeleton: React.ReactNode;
    children: React.ReactNode;
    className?: string;
} & SlotNameProps) {
    const { loading, reduced, root } = useSkeletonMorph();
    const placeholder = React.useRef<HTMLSpanElement>(null);
    const size = React.useRef<Size | null>(null);
    const wasLoading = React.useRef(false);
    const [delay, setDelay] = React.useState<number | null>(null);
    const refs = React.useMemo(
        () => ({
            container: React.createRef<HTMLDivElement>(),
            content: React.createRef<HTMLDivElement>(),
            block: React.createRef<HTMLSpanElement>(),
        }),
        [],
    );
    const done = React.useCallback(() => setDelay(null), []);

    React.useLayoutEffect(() => {
        if (loading) {
            const shape =
                placeholder.current?.firstElementChild ?? placeholder.current;
            const rect = shape?.getBoundingClientRect();

            size.current =
                rect && rect.width > 0 && rect.height > 0
                    ? { width: rect.width, height: rect.height }
                    : null;
            wasLoading.current = true;
            setDelay(null);

            return;
        }

        if (wasLoading.current && size.current && !reduced) {
            setDelay(readingDelay(refs.container.current, root.current));
        }

        wasLoading.current = false;
    }, [loading, reduced, refs, root]);

    useStretch(loading ? null : delay, size, refs, done);

    if (loading) {
        return (
            <div
                data-skeleton-morph-item=""
                className={className}
                data-slot={slotName}
            >
                <span
                    ref={placeholder}
                    aria-hidden="true"
                    data-slot="skeleton-morph-placeholder"
                    className="block"
                >
                    {skeleton}
                </span>
            </div>
        );
    }

    const from = size.current;

    return (
        <div
            ref={refs.container}
            data-skeleton-morph-item=""
            className={cn('relative', className)}
            data-slot={slotName}
        >
            <div ref={refs.content} data-slot="skeleton-morph-content">
                {children}
            </div>
            {delay !== null && from ? (
                <span
                    ref={refs.block}
                    aria-hidden="true"
                    data-slot="skeleton-morph-block"
                    data-delay={delay}
                    className="top-0 left-0 rounded-xl pointer-events-none absolute bg-muted"
                    style={{ width: from.width, height: from.height }}
                />
            ) : null}
        </div>
    );
}

export { SkeletonMorph, SkeletonMorphItem };
