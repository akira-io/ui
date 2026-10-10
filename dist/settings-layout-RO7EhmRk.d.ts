import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { S as SlotNameProps, N as NavItem, L as LinkComponent } from './types-Be72a3UT.js';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
    toned?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const BUTTON_TONES: {
    readonly primary: "primary";
    readonly destructive: "destructive";
    readonly success: "success";
    readonly warning: "warning";
    readonly info: "info";
};
type ButtonTone = keyof typeof BUTTON_TONES;

interface ButtonProps extends React.ComponentProps<'button'>, Omit<VariantProps<typeof buttonVariants>, 'toned'> {
    asChild?: boolean;
    tone?: ButtonTone;
    loading?: boolean;
    loadingLabel?: string;
    slotName?: string;
}
declare function Button({ className, variant, size, tone, style, asChild, loading, loadingLabel, slotName, disabled, children, onClick, ...props }: ButtonProps): React.JSX.Element;

declare function Input({ className, type, slotName, ...props }: React.ComponentProps<'input'> & SlotNameProps): React.JSX.Element;

declare function Separator({ className, orientation, decorative, slotName, ...props }: React.ComponentProps<typeof SeparatorPrimitive.Root> & SlotNameProps): React.JSX.Element;

declare function TooltipProvider({ delayDuration, slotName, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider> & SlotNameProps): React.JSX.Element;
declare function Tooltip({ slotName, ...props }: React.ComponentProps<typeof TooltipPrimitive.Root> & SlotNameProps): React.JSX.Element;
declare function TooltipTrigger({ slotName, ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger> & SlotNameProps): React.JSX.Element;
declare function TooltipContent({ className, sideOffset, children, slotName, container, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content> & SlotNameProps & {
    container?: HTMLElement | null;
}): React.JSX.Element;

interface SidebarLabels {
    toggleLabel: string;
}
declare const sidebarDefaultLabels: SidebarLabels;
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
declare function SidebarTrigger({ className, onClick, label, slotName, ...props }: React.ComponentProps<typeof Button> & {
    label?: string;
} & SlotNameProps): React.JSX.Element;
declare function SidebarRail({ className, label, slotName, ...props }: React.ComponentProps<'button'> & {
    label?: string;
} & SlotNameProps): React.JSX.Element;
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
    size?: "default" | "sm" | "lg" | null | undefined;
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

interface SettingsLayoutLabels {
    title: string;
    description: string;
}
declare const settingsLayoutDefaultLabels: SettingsLayoutLabels;
interface SettingsLayoutProps {
    items: NavItem[];
    linkComponent?: LinkComponent;
    currentPath?: string;
    title?: string;
    description?: string;
    wide?: boolean;
}
declare function SettingsLayout({ items, linkComponent, currentPath, title, description, wide, children, }: PropsWithChildren<SettingsLayoutProps>): React.JSX.Element;

export { TooltipContent as A, Button as B, TooltipProvider as C, TooltipTrigger as D, buttonVariants as E, sidebarDefaultLabels as F, useSidebar as G, type SettingsLayoutLabels as H, Input as I, SettingsLayout as J, type SettingsLayoutProps as K, settingsLayoutDefaultLabels as L, Separator as S, Tooltip as T, type ButtonProps as a, type ButtonTone as b, Sidebar as c, SidebarContent as d, SidebarFooter as e, SidebarGroup as f, SidebarGroupAction as g, SidebarGroupContent as h, SidebarGroupLabel as i, SidebarHeader as j, SidebarInput as k, SidebarInset as l, type SidebarLabels as m, SidebarMenu as n, SidebarMenuAction as o, SidebarMenuBadge as p, SidebarMenuButton as q, SidebarMenuItem as r, SidebarMenuSkeleton as s, SidebarMenuSub as t, SidebarMenuSubButton as u, SidebarMenuSubItem as v, SidebarProvider as w, SidebarRail as x, SidebarSeparator as y, SidebarTrigger as z };
