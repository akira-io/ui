import { useSheetPortalContainer } from '@/hooks/use-sheet-portal-container';
import { menuSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { type ReactElement, type ReactNode } from 'react';

export interface ShareTooltipProps {
    label: string;
    value: ReactNode;
    shareLabel?: string;
    color: string;
    children: ReactElement;
}

export function ShareTooltip({
    label,
    value,
    shareLabel,
    color,
    children,
}: ShareTooltipProps) {
    const container = useSheetPortalContainer();

    return (
        <TooltipPrimitive.Provider delayDuration={0}>
            <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>
                    {children}
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal container={container}>
                    <TooltipPrimitive.Content
                        sideOffset={4}
                        className={cn(
                            menuSurface,
                            'gap-1.5 px-3 py-2 text-xs min-w-36 z-50 grid',
                        )}
                    >
                        <span className="font-medium">{label}</span>
                        <span className="gap-3 flex items-center justify-between">
                            <span className="gap-1.5 flex items-center text-muted-foreground">
                                <span
                                    className="size-2.5 shrink-0 rounded-md"
                                    style={{ backgroundColor: color }}
                                />
                                {shareLabel}
                            </span>
                            <span className="font-mono font-medium text-foreground tabular-nums">
                                {value}
                            </span>
                        </span>
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}
