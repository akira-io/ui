import { Search } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type {
    BreadcrumbItem as BreadcrumbItemType,
    LinkComponent,
} from '@/types';
import { Breadcrumbs } from './breadcrumbs';

export interface AppSidebarHeaderProps {
    actions?: ReactNode;
    breadcrumbs?: BreadcrumbItemType[];
    linkComponent?: LinkComponent;
    onSearchClick?: () => void;
    searchLabel?: string;
}

export function AppSidebarHeader({
    actions,
    breadcrumbs = [],
    linkComponent,
    onSearchClick,
    searchLabel = 'Search...',
}: AppSidebarHeaderProps) {
    const [modifier, setModifier] = useState('Ctrl');

    useEffect(() => {
        const platform = navigator.userAgent;
        setModifier(/Mac|iPhone|iPad|iPod/.test(platform) ? '⌘' : 'Ctrl');
    }, []);

    return (
        <header className="h-16 gap-2 px-6 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4 flex shrink-0 items-center border-b border-sidebar-border/50 transition-[width,height] ease-linear">
            <div className="min-w-0 gap-2 flex items-center">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs
                    breadcrumbs={breadcrumbs}
                    linkComponent={linkComponent}
                    collapseBelowSm
                />
            </div>

            {onSearchClick && (
                <button
                    type="button"
                    onClick={onSearchClick}
                    aria-label={searchLabel}
                    className="h-9 w-9 gap-2 rounded-xl text-sm sm:w-56 sm:justify-start sm:px-3 ml-auto flex shrink-0 items-center justify-center border border-border/60 bg-muted/30 text-muted-foreground transition-colors hover:bg-muted/50"
                >
                    <Search className="size-4" />
                    <span className="sm:inline hidden">{searchLabel}</span>
                    <kbd className="gap-0.5 px-1.5 py-0.5 font-semibold rounded-xl sm:inline-flex ml-auto hidden items-center border border-border/60 bg-background font-sans text-[10px] text-muted-foreground">
                        <span>{modifier}</span>
                        <span>K</span>
                    </kbd>
                </button>
            )}

            {actions ? (
                <div
                    data-slot="app-sidebar-header-actions"
                    className={cn(
                        'gap-2 flex items-center',
                        !onSearchClick && 'ml-auto',
                    )}
                >
                    {actions}
                </div>
            ) : null}
        </header>
    );
}
