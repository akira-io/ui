import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { SidebarTrigger } from '@/components/ui/sidebar';
import type {
    BreadcrumbItem as BreadcrumbItemType,
    LinkComponent,
} from '@/types';
import { Breadcrumbs } from './breadcrumbs';

interface AppSidebarHeaderProps {
    breadcrumbs?: BreadcrumbItemType[];
    linkComponent?: LinkComponent;
    onSearchClick?: () => void;
    searchLabel?: string;
}

export function AppSidebarHeader({
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
            <div className="gap-2 flex items-center">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs
                    breadcrumbs={breadcrumbs}
                    linkComponent={linkComponent}
                />
            </div>

            {onSearchClick && (
                <button
                    type="button"
                    onClick={onSearchClick}
                    className="h-9 w-56 gap-2 rounded-xl px-3 text-sm ml-auto flex items-center border border-border/60 bg-muted/30 text-muted-foreground transition-colors hover:bg-muted/50"
                >
                    <Search className="size-4" />
                    <span>{searchLabel}</span>
                    <kbd className="gap-0.5 px-1.5 py-0.5 font-semibold rounded-xl ml-auto inline-flex items-center border border-border/60 bg-background font-sans text-[10px] text-muted-foreground">
                        <span>{modifier}</span>
                        <span>K</span>
                    </kbd>
                </button>
            )}
        </header>
    );
}
