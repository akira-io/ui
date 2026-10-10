'use client';

import { animate, useReducedMotion } from 'motion/react';
import * as React from 'react';

import {
    alignCharacters,
    columnDelays,
    type SlotColumn,
} from '@/lib/motion/align-characters';
import { overlayTransition } from '@/lib/motion/tokens';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function offsetOf(digit: string): string {
    return `-${Number(digit) * 10}%`;
}

interface ColumnProps {
    column: SlotColumn;
    delay: number;
    reduced: boolean;
}

function DigitColumn({ column, delay, reduced }: ColumnProps) {
    const reel = React.useRef<HTMLSpanElement>(null);
    const rolling = React.useRef<ReturnType<typeof animate> | null>(null);
    const target = column.next ?? '0';
    const [start] = React.useState(() =>
        column.previous !== undefined && DIGITS.includes(column.previous)
            ? column.previous
            : '0',
    );
    const [initialOffset] = React.useState(
        () => `translateY(${offsetOf(start)})`,
    );
    const shown = React.useRef<string | null>(null);

    React.useLayoutEffect(() => {
        const element = reel.current;

        if (!element || shown.current === target) {
            return;
        }

        const from = shown.current ?? start;

        shown.current = target;

        if (from === target) {
            return;
        }

        rolling.current = animate(
            element,
            { y: [rolling.current ? null : offsetOf(from), offsetOf(target)] },
            reduced ? { duration: 0 } : { ...overlayTransition.enter, delay },
        );
    }, [delay, reduced, start, target]);

    React.useEffect(
        () => () => {
            rolling.current?.stop();
            shown.current = null;
        },
        [],
    );

    return (
        <span
            data-slot="slot-text-digit"
            className="inline-block h-[1lh] overflow-hidden"
        >
            <span
                ref={reel}
                data-slot="slot-text-reel"
                data-digit={target}
                data-delay={delay}
                className="flex flex-col"
                style={{ transform: initialOffset }}
            >
                {DIGITS.map((digit) => (
                    <span key={digit} className="h-[1lh]">
                        {digit}
                    </span>
                ))}
            </span>
        </span>
    );
}

function PlainCharacter({ column, reduced }: Omit<ColumnProps, 'delay'>) {
    const character = React.useRef<HTMLSpanElement>(null);

    React.useLayoutEffect(() => {
        const element = character.current;

        if (!element || reduced || column.previous === column.next) {
            return undefined;
        }

        const controls = animate(
            element,
            { opacity: [0, 1] },
            { duration: 0.15 },
        );

        return () => controls.stop();
    }, [column.next, column.previous, reduced]);

    return (
        <span ref={character} data-slot="slot-text-character">
            {column.next}
        </span>
    );
}

export function SlotText({
    value,
    className,
    slotName = 'slot-text',
    ...props
}: { value: string | number } & React.ComponentProps<'span'> & SlotNameProps) {
    const reduced = useReducedMotion() ?? false;
    const text = String(value);
    const [pair, setPair] = React.useState({ previous: text, next: text });

    if (pair.next !== text) {
        setPair({ previous: pair.next, next: text });
    }

    const columns = alignCharacters(pair.previous, text);
    const delays = columnDelays(columns);

    return (
        <span
            className={cn('inline-flex tabular-nums', className)}
            {...props}
            data-slot={slotName}
        >
            <span className="sr-only">{text}</span>
            <span
                data-slot="slot-text-columns"
                aria-hidden="true"
                className="inline-flex select-none"
            >
                {columns.map((column, index) =>
                    column.digit ? (
                        <DigitColumn
                            key={column.key}
                            column={column}
                            delay={delays[index]}
                            reduced={reduced}
                        />
                    ) : (
                        <PlainCharacter
                            key={column.key}
                            column={column}
                            reduced={reduced}
                        />
                    ),
                )}
            </span>
        </span>
    );
}
