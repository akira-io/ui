import { PanelLeftIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import {
    SIDEBAR_WIDTH_MOBILE,
    sidebarDefaultLabels,
    useSidebar,
} from '@/components/ui/sidebar-context';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

export {
    sidebarDefaultLabels,
    useSidebar,
    type SidebarLabels,
} from '@/components/ui/sidebar-context';
export {
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
} from '@/components/ui/sidebar-menu';
export {
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar-menu-sub';
export { SidebarProvider } from '@/components/ui/sidebar-provider';
export {
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarSeparator,
} from '@/components/ui/sidebar-sections';

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
                    className="p-0 w-(--sidebar-width) rounded-none bg-sidebar text-sidebar-foreground [&>button]:hidden"
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
    label,
    slotName = 'sidebar-trigger',
    ...props
}: React.ComponentProps<typeof Button> & { label?: string } & SlotNameProps) {
    const { toggleSidebar } = useSidebar();
    const labels = useUiLabels('sidebar', sidebarDefaultLabels, {
        toggleLabel: label,
    });

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
            <span className="sr-only">{labels.toggleLabel}</span>
        </Button>
    );
}

function SidebarRail({
    className,
    label,
    slotName = 'sidebar-rail',
    ...props
}: React.ComponentProps<'button'> & { label?: string } & SlotNameProps) {
    const { toggleSidebar } = useSidebar();
    const labels = useUiLabels('sidebar', sidebarDefaultLabels, {
        toggleLabel: label,
    });

    return (
        <button
            data-sidebar="rail"
            aria-label={labels.toggleLabel}
            tabIndex={-1}
            onClick={toggleSidebar}
            title={labels.toggleLabel}
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

export { Sidebar, SidebarInset, SidebarRail, SidebarTrigger };
