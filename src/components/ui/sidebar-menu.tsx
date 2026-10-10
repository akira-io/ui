import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { useSidebar } from '@/components/ui/sidebar-context';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function SidebarMenu({
    className,
    slotName = 'sidebar-menu',
    ...props
}: React.ComponentProps<'ul'> & SlotNameProps) {
    return (
        <ul
            data-sidebar="menu"
            className={cn(
                'min-w-0 gap-0.5 flex w-full flex-col group-data-[collapsible=icon]:items-center',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarMenuItem({
    className,
    slotName = 'sidebar-menu-item',
    ...props
}: React.ComponentProps<'li'> & SlotNameProps) {
    return (
        <li
            data-sidebar="menu-item"
            className={cn('group/menu-item relative', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

const sidebarMenuButtonVariants = cva(
    'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-xl px-2.5 py-1.5 text-left text-sm font-medium outline-hidden ring-sidebar-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-primary/10 data-[active=true]:font-semibold data-[active=true]:text-primary group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:p-2.5! [&>span:last-child]:truncate group-data-[collapsible=icon]:[&>span:last-child]:hidden [&>svg]:size-4.5 [&>svg]:shrink-0',
    {
        variants: {
            variant: {
                default:
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                outline:
                    'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
            },
            size: {
                default: 'h-8 text-sm',
                sm: 'h-7 text-sm',
                lg: 'h-12 text-sm',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

function SidebarMenuButton({
    asChild = false,
    isActive = false,
    variant = 'default',
    size = 'default',
    tooltip,
    className,
    slotName = 'sidebar-menu-button',
    ...props
}: React.ComponentProps<'button'> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants> &
    SlotNameProps) {
    const Comp = asChild ? Slot : 'button';
    const { isMobile, state } = useSidebar();

    const button = (
        <Comp
            data-sidebar="menu-button"
            data-size={size}
            data-active={isActive}
            className={cn(
                sidebarMenuButtonVariants({ variant, size }),
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );

    if (!tooltip) {
        return button;
    }

    if (typeof tooltip === 'string') {
        tooltip = {
            children: tooltip,
        };
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent
                side="right"
                align="center"
                hidden={state !== 'collapsed' || isMobile}
                {...tooltip}
            />
        </Tooltip>
    );
}

function SidebarMenuAction({
    className,
    asChild = false,
    showOnHover = false,
    slotName = 'sidebar-menu-action',
    ...props
}: React.ComponentProps<'button'> & {
    asChild?: boolean;
    showOnHover?: boolean;
} & SlotNameProps) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-sidebar="menu-action"
            className={cn(
                'top-1.5 right-1 w-5 p-0 [&>svg]:size-4 rounded-xl absolute flex aspect-square items-center justify-center text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring focus-visible:outline-solid [&>svg]:shrink-0',
                // Increases the hit area of the button on mobile.
                'after:-inset-2 md:after:hidden after:absolute',
                'peer-data-[size=sm]/menu-button:top-1',
                'peer-data-[size=default]/menu-button:top-1.5',
                'peer-data-[size=lg]/menu-button:top-3.5',
                'group-data-[collapsible=icon]:hidden',
                showOnHover &&
                    'md:opacity-0 group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:opacity-100',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarMenuBadge({
    className,
    slotName = 'sidebar-menu-badge',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            data-sidebar="menu-badge"
            className={cn(
                'right-1 h-5 min-w-5 px-1 text-xs font-medium rounded-xl pointer-events-none absolute flex items-center justify-center text-sidebar-foreground tabular-nums select-none',
                'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
                'peer-data-[size=sm]/menu-button:top-1',
                'peer-data-[size=default]/menu-button:top-1.5',
                'peer-data-[size=lg]/menu-button:top-3.5',
                'group-data-[collapsible=icon]:hidden',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarMenuSkeleton({
    className,
    showIcon = false,
    slotName = 'sidebar-menu-skeleton',
    ...props
}: React.ComponentProps<'div'> & {
    showIcon?: boolean;
} & SlotNameProps) {
    // Random width between 50 to 90%.
    const width = React.useMemo(() => {
        return `${Math.floor(Math.random() * 40) + 50}%`;
    }, []);

    return (
        <div
            data-sidebar="menu-skeleton"
            className={cn(
                'h-8 gap-2 px-2 rounded-xl flex items-center',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            {showIcon && (
                <Skeleton
                    className="size-4 rounded-xl"
                    data-sidebar="menu-skeleton-icon"
                />
            )}
            <Skeleton
                className="h-4 max-w-(--skeleton-width) flex-1"
                data-sidebar="menu-skeleton-text"
                style={
                    {
                        '--skeleton-width': width,
                    } as React.CSSProperties
                }
            />
        </div>
    );
}

export {
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    sidebarMenuButtonVariants,
};
