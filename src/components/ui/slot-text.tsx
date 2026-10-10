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

const DIGIT = /^[0-9]$/;

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
    const placed = React.useRef(false);
    const target = column.next ?? '0';
    const start =
        column.previous !== undefined && DIGIT.test(column.previous)
            ? column.previous
            : '0';

    React.useLayoutEffect(() => {
        const element = reel.current;

        if (!element) {
            return undefined;
        }

        if (!placed.current) {
            placed.current = true;
            animate(
                element,
                {
                    y: offsetOf(
                        column.previous === column.next ? target : start,
                    ),
                },
                { duration: 0 },
            );
        }

        if (reduced || column.previous === column.next) {
            const controls = animate(
                element,
                { y: offsetOf(target) },
                { duration: 0 },
            );

            return () => controls.stop();
        }

        const controls = animate(
            element,
            { y: offsetOf(target) },
            { ...overlayTransition.enter, delay },
        );

        return () => controls.stop();
    }, [column.next, column.previous, delay, reduced, start, target]);

    return (
        <span
            data-slot="slot-text-digit"
            className="inline-block h-[1lh] overflow-hidden"
        >
            <span
                ref={reel}
                data-slot="slot-text-reel"
                data-digit={target}
                className="flex flex-col"
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
    const previous = React.useRef<string | null>(null);
    const columns = alignCharacters(previous.current ?? text, text);
    const delays = columnDelays(columns);

    React.useLayoutEffect(() => {
        previous.current = text;
    });

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
                className="inline-flex"
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
