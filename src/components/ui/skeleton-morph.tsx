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
                className={className}
                {...props}
                data-slot={slotName}
            />
        </SkeletonMorphContext.Provider>
    );
}

function useStretch(
    morphing: boolean,
    size: React.RefObject<Size | null>,
    refs: {
        container: React.RefObject<HTMLDivElement | null>;
        content: React.RefObject<HTMLDivElement | null>;
        block: React.RefObject<HTMLSpanElement | null>;
    },
    root: React.RefObject<HTMLDivElement | null>,
    done: () => void,
) {
    React.useLayoutEffect(() => {
        const container = refs.container.current;
        const content = refs.content.current;
        const block = refs.block.current;
        const from = size.current;

        if (!morphing || !container || !content || !block || !from) {
            return undefined;
        }

        const to = container.getBoundingClientRect();
        const items = [...(root.current?.querySelectorAll(ITEM) ?? [])];
        const delay =
            Math.min(
                Math.max(items.indexOf(container), 0),
                slotStaggerColumns,
            ) * slotStagger;
        const running: ReturnType<typeof animate>[] = [];

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
            const fade = animate(block, { opacity: 0 }, FADE);

            running.push(fade, animate(content, { opacity: 1 }, FADE));
            fade.then(done);
        });

        return () => {
            running.forEach((controls) => controls.stop());
            content.style.opacity = '';
        };
    }, [done, morphing, refs, root, size]);
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
    const [morphing, setMorphing] = React.useState(false);
    const refs = React.useMemo(
        () => ({
            container: React.createRef<HTMLDivElement>(),
            content: React.createRef<HTMLDivElement>(),
            block: React.createRef<HTMLSpanElement>(),
        }),
        [],
    );
    const done = React.useCallback(() => setMorphing(false), []);

    React.useLayoutEffect(() => {
        if (loading) {
            const rect = placeholder.current?.getBoundingClientRect();

            size.current =
                rect && rect.width > 0 && rect.height > 0
                    ? { width: rect.width, height: rect.height }
                    : null;
            wasLoading.current = true;
            setMorphing(false);

            return;
        }

        if (wasLoading.current && size.current && !reduced) {
            setMorphing(true);
        }

        wasLoading.current = false;
    }, [loading, reduced]);

    useStretch(morphing && !loading, size, refs, root, done);

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
            {morphing && from ? (
                <span
                    ref={refs.block}
                    aria-hidden="true"
                    data-slot="skeleton-morph-block"
                    className="top-0 left-0 rounded-xl pointer-events-none absolute bg-muted"
                    style={{ width: from.width, height: from.height }}
                />
            ) : null}
        </div>
    );
}

export { SkeletonMorph, SkeletonMorphItem };
