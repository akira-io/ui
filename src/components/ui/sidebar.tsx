import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import { PanelLeftIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContext = {
    state: 'expanded' | 'collapsed';
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider.');
    }

    return context;
}

function SidebarProvider({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    slotName = 'sidebar-wrapper',
    ...props
}: React.ComponentProps<'div'> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
} & SlotNameProps) {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
            const openState = typeof value === 'function' ? value(open) : value;
            if (setOpenProp) {
                setOpenProp(openState);
            } else {
                _setOpen(openState);
            }

            // This sets the cookie to keep the sidebar state.
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        },
        [setOpenProp, open],
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
        return isMobile
            ? setOpenMobile((open) => !open)
            : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
                (event.metaKey || event.ctrlKey)
            ) {
                event.preventDefault();
                toggleSidebar();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? 'expanded' : 'collapsed';

    const contextValue = React.useMemo<SidebarContext>(
        () => ({
            state,
            open,
            setOpen,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar,
        }),
        [
            state,
            open,
            setOpen,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar,
        ],
    );

    return (
        <SidebarContext.Provider value={contextValue}>
            <TooltipProvider delayDuration={0}>
                <div
                    style={
                        {
                            '--sidebar-width': SIDEBAR_WIDTH,
                            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
                            ...style,
                        } as React.CSSProperties
                    }
                    className={cn(
                        'group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar',
                        className,
                    )}
                    {...props}
                    data-slot={slotName}
                >
                    {children}
                </div>
            </TooltipProvider>
        </SidebarContext.Provider>
    );
}

function Sidebar({
    side = 'left',
    variant = 'sidebar',
    collapsible = 'offcanvas',
    className,
    children,
    slotName = 'sidebar',
    ...props
}: React.ComponentProps<'div'> & {
    side?: 'left' | 'right';
    variant?: 'sidebar' | 'floating' | 'inset';
    collapsible?: 'offcanvas' | 'icon' | 'none';
} & SlotNameProps) {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === 'none') {
        return (
            <div
                className={cn(
                    'flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground',
                    className,
                )}
                {...props}
                data-slot={slotName}
            >
                {children}
            </div>
        );
    }

    if (isMobile) {
        return (
            <Sheet
                open={openMobile}
                onOpenChange={setOpenMobile}
                {...props}
                preserveScroll
            >
                <SheetHeader className="sr-only">
                    <SheetTitle>Sidebar</SheetTitle>
                    <SheetDescription>
                        Displays the mobile sidebar.
                    </SheetDescription>
                </SheetHeader>
                <SheetContent
                    data-sidebar="sidebar"
                    data-mobile="true"
                    className="p-0 w-(--sidebar-width) bg-sidebar text-sidebar-foreground [&>button]:hidden"
                    style={
                        {
                            '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
                        } as React.CSSProperties
                    }
                    side={side}
                    slotName={slotName}
                >
                    <div className="flex h-full w-full flex-col">
                        {children}
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <div
            className="group peer md:block hidden text-sidebar-foreground"
            data-state={state}
            data-collapsible={state === 'collapsed' ? collapsible : ''}
            data-variant={variant}
            data-side={side}
            data-slot={slotName}
        >
            {/* This is what handles the sidebar gap on desktop */}
            <div
                className={cn(
                    'relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
                    'group-data-[collapsible=offcanvas]:w-0',
                    'group-data-[side=right]:rotate-180',
                    variant === 'floating' || variant === 'inset'
                        ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
                        : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
                )}
            />
            <div
                className={cn(
                    'inset-y-0 md:flex fixed z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear',
                    side === 'left'
                        ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
                        : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
                    // Adjust the padding for floating and inset variants.
                    variant === 'floating' || variant === 'inset'
                        ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
                        : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
                    className,
                )}
                {...props}
            >
                <div
                    data-sidebar="sidebar"
                    className="group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:rounded-2xl flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

function SidebarTrigger({
    className,
    onClick,
    slotName = 'sidebar-trigger',
    ...props
}: React.ComponentProps<typeof Button> & SlotNameProps) {
    const { toggleSidebar } = useSidebar();

    return (
        <Button
            data-sidebar="trigger"
            variant="ghost"
            size="icon"
            className={cn('h-7 w-7', className)}
            onClick={(event) => {
                onClick?.(event);
                toggleSidebar();
            }}
            {...props}
            slotName={slotName}
        >
            <PanelLeftIcon />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    );
}

function SidebarRail({
    className,
    slotName = 'sidebar-rail',
    ...props
}: React.ComponentProps<'button'> & SlotNameProps) {
    const { toggleSidebar } = useSidebar();

    return (
        <button
            data-sidebar="rail"
            aria-label="Toggle Sidebar"
            tabIndex={-1}
            onClick={toggleSidebar}
            title="Toggle Sidebar"
            className={cn(
                'inset-y-0 w-4 group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:inset-y-0 sm:flex absolute z-20 hidden -translate-x-1/2 transition-all ease-linear after:absolute after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border',
                'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
                '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
                'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar',
                '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
                '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarInset({
    className,
    slotName = 'sidebar-inset',
    ...props
}: React.ComponentProps<'main'> & SlotNameProps) {
    return (
        <main
            className={cn(
                'relative flex min-h-svh max-w-full flex-1 flex-col bg-background',
                'peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarInput({
    className,
    slotName = 'sidebar-input',
    ...props
}: React.ComponentProps<typeof Input> & SlotNameProps) {
    return (
        <Input
            data-sidebar="input"
            className={cn('h-11 w-full bg-background shadow-none', className)}
            {...props}
            slotName={slotName}
        />
    );
}

function SidebarHeader({
    className,
    slotName = 'sidebar-header',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            data-sidebar="header"
            className={cn('gap-2 p-2 flex flex-col', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarFooter({
    className,
    slotName = 'sidebar-footer',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            data-sidebar="footer"
            className={cn('gap-2 p-2 flex flex-col', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarSeparator({
    className,
    slotName = 'sidebar-separator',
    ...props
}: React.ComponentProps<typeof Separator> & SlotNameProps) {
    return (
        <Separator
            data-sidebar="separator"
            className={cn('mx-2 w-auto bg-sidebar-border', className)}
            {...props}
            slotName={slotName}
        />
    );
}

function SidebarContent({
    className,
    slotName = 'sidebar-content',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            data-sidebar="content"
            className={cn(
                'min-h-0 gap-2 flex flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarGroup({
    className,
    slotName = 'sidebar-group',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            data-sidebar="group"
            className={cn(
                'min-w-0 p-2 relative flex w-full flex-col',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarGroupLabel({
    className,
    asChild = false,
    slotName = 'sidebar-group-label',
    ...props
}: React.ComponentProps<'div'> & { asChild?: boolean } & SlotNameProps) {
    const Comp = asChild ? Slot : 'div';

    return (
        <Comp
            data-sidebar="group-label"
            className={cn(
                'h-8 rounded-xl px-2 text-xs font-medium tracking-wider [&>svg]:size-4 flex shrink-0 items-center text-sidebar-foreground/70 uppercase ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:shrink-0',
                'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:select-none',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarGroupAction({
    className,
    asChild = false,
    slotName = 'sidebar-group-action',
    ...props
}: React.ComponentProps<'button'> & { asChild?: boolean } & SlotNameProps) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-sidebar="group-action"
            className={cn(
                'top-3.5 right-3 w-5 p-0 [&>svg]:size-4 rounded-xl absolute flex aspect-square items-center justify-center text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:shrink-0',
                // Increases the hit area of the button on mobile.
                'after:-inset-2 md:after:hidden after:absolute',
                'group-data-[collapsible=icon]:hidden',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarGroupContent({
    className,
    slotName = 'sidebar-group-content',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            data-sidebar="group-content"
            className={cn('text-sm w-full', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarMenu({
    className,
    slotName = 'sidebar-menu',
    ...props
}: React.ComponentProps<'ul'> & SlotNameProps) {
    return (
        <ul
            data-sidebar="menu"
            className={cn('min-w-0 gap-1 flex w-full flex-col', className)}
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
    'peer/menu-button flex w-full items-center gap-3 overflow-hidden rounded-xl p-2.5 text-left text-sm font-medium outline-hidden ring-sidebar-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-primary/10 data-[active=true]:font-semibold data-[active=true]:text-primary group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:p-3! [&>span:last-child]:truncate [&>svg]:size-5 [&>svg]:shrink-0',
    {
        variants: {
            variant: {
                default:
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                outline:
                    'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
            },
            size: {
                default: 'h-11 text-sm',
                sm: 'h-9 text-sm',
                lg: 'h-14 text-sm group-data-[collapsible=icon]:p-0!',
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
                'top-1.5 right-1 w-5 p-0 [&>svg]:size-4 rounded-xl absolute flex aspect-square items-center justify-center text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:shrink-0',
                // Increases the hit area of the button on mobile.
                'after:-inset-2 md:after:hidden after:absolute',
                'peer-data-[size=sm]/menu-button:top-1',
                'peer-data-[size=default]/menu-button:top-1.5',
                'peer-data-[size=lg]/menu-button:top-2.5',
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
                'peer-data-[size=lg]/menu-button:top-2.5',
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

function SidebarMenuSub({
    className,
    slotName = 'sidebar-menu-sub',
    ...props
}: React.ComponentProps<'ul'> & SlotNameProps) {
    return (
        <ul
            data-sidebar="menu-sub"
            className={cn(
                'mx-3.5 min-w-0 gap-1 px-2.5 py-0.5 flex translate-x-px flex-col border-l border-sidebar-border',
                'group-data-[collapsible=icon]:hidden',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarMenuSubItem({
    className,
    slotName = 'sidebar-menu-sub-item',
    ...props
}: React.ComponentProps<'li'> & SlotNameProps) {
    return (
        <li
            data-sidebar="menu-sub-item"
            className={cn('group/menu-sub-item relative', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarMenuSubButton({
    asChild = false,
    size = 'md',
    isActive = false,
    className,
    slotName = 'sidebar-menu-sub-button',
    ...props
}: React.ComponentProps<'a'> & {
    asChild?: boolean;
    size?: 'sm' | 'md';
    isActive?: boolean;
} & SlotNameProps) {
    const Comp = asChild ? Slot : 'a';

    return (
        <Comp
            data-sidebar="menu-sub-button"
            data-size={size}
            data-active={isActive}
            className={cn(
                'h-9 min-w-0 gap-2 px-2 text-sm font-medium [&>svg]:size-4 rounded-xl flex -translate-x-px items-center overflow-hidden text-sidebar-foreground ring-sidebar-ring outline-hidden hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 active:bg-accent disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:shrink-0 [&>svg]:text-current',
                'data-[active=true]:font-semibold data-[active=true]:bg-primary/10 data-[active=true]:text-primary',
                size === 'sm' && 'h-9 text-sm',
                size === 'md' && 'h-9 text-sm',
                'group-data-[collapsible=icon]:hidden',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
};
