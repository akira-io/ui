import { Search } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { useScrolledUnder } from '@/hooks/use-scrolled-under';
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
    const [barRef, scrolled] = useScrolledUnder<HTMLElement>();

    useEffect(() => {
        const platform = navigator.userAgent;
        setModifier(/Mac|iPhone|iPad|iPod/.test(platform) ? '⌘' : 'Ctrl');
    }, []);

    return (
        <header
            ref={sticky ? barRef : undefined}
            data-scrolled={(sticky && scrolled) || undefined}
            className={cn(
                'h-16 flex shrink-0 items-center gap-item border-b px-inset transition-[width,height,background-color,border-color] ease-linear',
                sticky
                    ? 'top-0 sticky z-30 border-transparent data-[scrolled]:border-sidebar-border/50 data-[scrolled]:glass-bar'
                    : 'border-sidebar-border/50',
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
                        'rounded-full bg-(--field-fill) text-muted-foreground hover:bg-(--glass-highlight) dark:glass-button dark:glass-edge',
                    )}
                >
                    <Search className="size-icon" />
                    <span className="sm:inline hidden">{searchLabel}</span>
                    <kbd className="gap-0.5 py-0.5 font-semibold rounded-xl sm:inline-flex ml-auto hidden items-center px-tight font-sans text-[10px] text-muted-foreground">
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
