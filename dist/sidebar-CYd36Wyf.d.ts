import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { I as Input, B as Button } from './input-R3dvXqSY.js';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { S as SlotNameProps } from './types-CMZRvMV5.js';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

declare function Separator({ className, orientation, decorative, slotName, ...props }: React.ComponentProps<typeof SeparatorPrimitive.Root> & SlotNameProps): React.JSX.Element;

declare function TooltipProvider({ delayDuration, slotName, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider> & SlotNameProps): React.JSX.Element;
declare function Tooltip({ slotName, ...props }: React.ComponentProps<typeof TooltipPrimitive.Root> & SlotNameProps): React.JSX.Element;
declare function TooltipTrigger({ slotName, ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger> & SlotNameProps): React.JSX.Element;
declare function TooltipContent({ className, sideOffset, children, slotName, container, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content> & SlotNameProps & {
    container?: HTMLElement | null;
}): React.JSX.Element;

type SidebarContext = {
    state: 'expanded' | 'collapsed';
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
};
declare const SidebarContext: React.Context<SidebarContext | null>;
declare function useSidebar(): SidebarContext;
declare function SidebarProvider({ defaultOpen, open: openProp, onOpenChange: setOpenProp, className, style, children, slotName, ...props }: React.ComponentProps<'div'> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
} & SlotNameProps): React.JSX.Element;
declare function Sidebar({ side, variant, collapsible, className, children, slotName, ...props }: React.ComponentProps<'div'> & {
    side?: 'left' | 'right';
    variant?: 'sidebar' | 'floating' | 'inset';
    collapsible?: 'offcanvas' | 'icon' | 'none';
} & SlotNameProps): React.JSX.Element;
declare function SidebarTrigger({ className, onClick, slotName, ...props }: React.ComponentProps<typeof Button> & SlotNameProps): React.JSX.Element;
declare function SidebarRail({ className, slotName, ...props }: React.ComponentProps<'button'> & SlotNameProps): React.JSX.Element;
declare function SidebarInset({ className, slotName, ...props }: React.ComponentProps<'main'> & SlotNameProps): React.JSX.Element;
declare function SidebarInput({ className, slotName, ...props }: React.ComponentProps<typeof Input> & SlotNameProps): React.JSX.Element;
declare function SidebarHeader({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;
declare function SidebarFooter({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;
declare function SidebarSeparator({ className, slotName, ...props }: React.ComponentProps<typeof Separator> & SlotNameProps): React.JSX.Element;
declare function SidebarContent({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;
declare function SidebarGroup({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;
declare function SidebarGroupLabel({ className, asChild, slotName, ...props }: React.ComponentProps<'div'> & {
    asChild?: boolean;
} & SlotNameProps): React.JSX.Element;
declare function SidebarGroupAction({ className, asChild, slotName, ...props }: React.ComponentProps<'button'> & {
    asChild?: boolean;
} & SlotNameProps): React.JSX.Element;
declare function SidebarGroupContent({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;
declare function SidebarMenu({ className, slotName, ...props }: React.ComponentProps<'ul'> & SlotNameProps): React.JSX.Element;
declare function SidebarMenuItem({ className, slotName, ...props }: React.ComponentProps<'li'> & SlotNameProps): React.JSX.Element;
declare const sidebarMenuButtonVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "sm" | "default" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function SidebarMenuButton({ asChild, isActive, variant, size, tooltip, className, slotName, ...props }: React.ComponentProps<'button'> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants> & SlotNameProps): React.JSX.Element;
declare function SidebarMenuAction({ className, asChild, showOnHover, slotName, ...props }: React.ComponentProps<'button'> & {
    asChild?: boolean;
    showOnHover?: boolean;
} & SlotNameProps): React.JSX.Element;
declare function SidebarMenuBadge({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;
declare function SidebarMenuSkeleton({ className, showIcon, slotName, ...props }: React.ComponentProps<'div'> & {
    showIcon?: boolean;
} & SlotNameProps): React.JSX.Element;
declare function SidebarMenuSub({ className, slotName, ...props }: React.ComponentProps<'ul'> & SlotNameProps): React.JSX.Element;
declare function SidebarMenuSubItem({ className, slotName, ...props }: React.ComponentProps<'li'> & SlotNameProps): React.JSX.Element;
declare function SidebarMenuSubButton({ asChild, size, isActive, className, slotName, ...props }: React.ComponentProps<'a'> & {
    asChild?: boolean;
    size?: 'sm' | 'md';
    isActive?: boolean;
} & SlotNameProps): React.JSX.Element;

export { useSidebar as A, Separator as S, Tooltip as T, Sidebar as a, SidebarContent as b, SidebarFooter as c, SidebarGroup as d, SidebarGroupAction as e, SidebarGroupContent as f, SidebarGroupLabel as g, SidebarHeader as h, SidebarInput as i, SidebarInset as j, SidebarMenu as k, SidebarMenuAction as l, SidebarMenuBadge as m, SidebarMenuButton as n, SidebarMenuItem as o, SidebarMenuSkeleton as p, SidebarMenuSub as q, SidebarMenuSubButton as r, SidebarMenuSubItem as s, SidebarProvider as t, SidebarRail as u, SidebarSeparator as v, SidebarTrigger as w, TooltipContent as x, TooltipProvider as y, TooltipTrigger as z };
