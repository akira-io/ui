import * as React from 'react';
import { ReactNode } from 'react';
import { B as BreadcrumbItem, L as LinkComponent } from './types-r3VHXAG2.js';

interface AppSidebarHeaderProps {
    actions?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    linkComponent?: LinkComponent;
    onSearchClick?: () => void;
    searchLabel?: string;
}
declare function AppSidebarHeader({ actions, breadcrumbs, linkComponent, onSearchClick, searchLabel, }: AppSidebarHeaderProps): React.JSX.Element;

export { type AppSidebarHeaderProps as A, AppSidebarHeader as a };
