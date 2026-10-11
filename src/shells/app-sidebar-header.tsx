import { Search } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { focusRing } from '@/lib/language';
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
    sticky?: boolean;
}

export function AppSidebarHeader({
    actions,
    breadcrumbs = [],
    linkComponent,
    onSearchClick,
    searchLabel = 'Search...',
    sticky = true,
}: AppSidebarHeaderProps) {
    const [modifier, setModifier] = useState('Ctrl');

    useEffect(() => {
        const platform = navigator.userAgent;
        setModifier(/Mac|iPhone|iPad|iPod/.test(platform) ? '⌘' : 'Ctrl');
    }, []);

    return (
        <header
            className={cn(
                'h-16 flex shrink-0 items-center gap-item border-b border-sidebar-border/50 px-inset transition-[width,height] ease-linear',
                sticky && 'top-0 sticky z-30 glass-bar',
            )}
        >
            <div className="min-w-0 flex items-center gap-item">
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
                    className={cn(
                        'h-9 w-9 text-sm sm:w-56 sm:justify-start sm:px-item ml-auto flex shrink-0 items-center justify-center gap-item transition-colors',
                        focusRing,
                        'rounded-xl border border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/50',
                    )}
                >
                    <Search className="size-icon" />
                    <span className="sm:inline hidden">{searchLabel}</span>
                    <kbd className="gap-0.5 py-0.5 font-semibold rounded-xl sm:inline-flex ml-auto hidden items-center border border-border/60 bg-background px-tight font-sans text-[10px] text-muted-foreground">
                        <span>{modifier}</span>
                        <span>K</span>
                    </kbd>
                </button>
            )}

            {actions ? (
                <div
                    data-slot="app-sidebar-header-actions"
                    className={cn(
                        'flex items-center gap-item',
                        !onSearchClick && 'ml-auto',
                    )}
                >
                    {actions}
                </div>
            ) : null}
        </header>
    );
}
