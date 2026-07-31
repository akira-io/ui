import { type PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { hrefToString, resolveLink } from '@/lib/href';
import { cn } from '@/lib/utils';
import type { LinkComponent, NavItem } from '@/types';
import { Heading } from './heading';

export interface SettingsLayoutProps {
    items: NavItem[];
    linkComponent?: LinkComponent;
    currentPath?: string;
    title?: string;
    description?: string;
    wide?: boolean;
}

export function SettingsLayout({
    items,
    linkComponent,
    currentPath,
    title = 'Settings',
    description = 'Manage your profile and account settings',
    wide = false,
    children,
}: PropsWithChildren<SettingsLayoutProps>) {
    const Link = resolveLink(linkComponent);
    const activePath =
        currentPath ??
        (typeof window === 'undefined' ? '' : window.location.pathname);

    return (
        <div className="px-4 py-6">
            <Heading title={title} description={description} />

            <div className="lg:flex-row lg:space-x-12 flex flex-col">
                <aside className="max-w-xl lg:w-48 w-full">
                    <nav className="space-y-1 space-x-0 flex flex-col">
                        {items.map((item, index) => {
                            const href = hrefToString(item.href);
                            return (
                                <Button
                                    key={`${href}-${index}`}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={cn('w-full justify-start', {
                                        'bg-muted': activePath === href,
                                    })}
                                >
                                    <Link href={item.href}>
                                        {item.icon && (
                                            <item.icon className="h-4 w-4" />
                                        )}
                                        {item.title}
                                    </Link>
                                </Button>
                            );
                        })}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div
                    className={cn(
                        wide ? 'min-w-0 flex-1' : 'md:max-w-2xl flex-1',
                    )}
                >
                    <section
                        className={cn(
                            'space-y-12',
                            wide ? 'max-w-5xl' : 'max-w-xl',
                        )}
                    >
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
