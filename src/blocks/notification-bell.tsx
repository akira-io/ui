import { Bell, Check } from 'lucide-react';
import { useState, type ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { hrefToString, resolveLink } from '@/lib/href';
import { compactRadius, focusRing } from '@/lib/language';
import { hasNavigableScheme } from '@/lib/safe-url';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { LinkComponent, SlotNameProps, UrlLike } from '@/types';

export interface NotificationBellLabels {
    title: string;
    unreadLabel: string;
    markAllReadLabel: string;
    markReadLabel: string;
    viewAllLabel: string;
    emptyLabel: string;
    loadingLabel: string;
}

export const notificationBellLabels: NotificationBellLabels = {
    title: 'Notifications',
    unreadLabel: '{{count}} unread',
    markAllReadLabel: 'Mark all as read',
    markReadLabel: 'Mark as read',
    viewAllLabel: 'View all',
    emptyLabel: 'No notifications.',
    loadingLabel: 'Loading',
};

export interface NotificationBellItem {
    id: string | number;
    title: ReactNode;
    description?: ReactNode;
    time?: ReactNode;
    unread?: boolean;
    href?: UrlLike;
    tone?: 'default' | 'destructive';
    actions?: ReactNode;
}

export interface NotificationBellProps extends SlotNameProps {
    items: NotificationBellItem[];
    unread: number;
    onMarkRead?: (id: NotificationBellItem['id']) => void;
    onMarkAllRead?: () => void;
    viewAllHref?: UrlLike;
    loading?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    max?: number;
    badgeTone?: 'default' | 'destructive';
    linkComponent?: LinkComponent;
    labels?: Partial<NotificationBellLabels>;
    className?: string;
}

const DEFAULT_MAX = 99;

function unreadCount(unread: number): number {
    return Number.isFinite(unread) && unread > 0 ? Math.trunc(unread) : 0;
}

function badgeText(count: number, max: number): string {
    return count > max ? `${max}+` : String(count);
}

function NotificationBellEntry({
    item,
    copy,
    Link,
    onMarkRead,
    onNavigate,
}: {
    item: NotificationBellItem;
    copy: NotificationBellLabels;
    Link: LinkComponent;
    onMarkRead?: (id: NotificationBellItem['id']) => void;
    onNavigate: () => void;
}) {
    const body = (
        <>
            <span className="text-sm font-medium block text-foreground">
                {item.title}
            </span>
            {item.description !== undefined && (
                <span
                    data-slot="notification-bell-item-description"
                    className={cn(
                        'mt-0.5 text-xs line-clamp-2 block',
                        item.tone === 'destructive'
                            ? 'text-destructive'
                            : 'text-muted-foreground',
                    )}
                >
                    {item.description}
                </span>
            )}
            {item.time !== undefined && (
                <span className="mt-1 text-xs block text-muted-foreground">
                    {item.time}
                </span>
            )}
        </>
    );
    const markReadLabel =
        typeof item.title === 'string'
            ? `${copy.markReadLabel}: ${item.title}`
            : copy.markReadLabel;

    return (
        <li
            data-slot="notification-bell-item"
            data-unread={item.unread ? '' : undefined}
            className={cn(
                'gap-2 px-4 py-3 flex items-start',
                item.unread && 'bg-muted/50',
            )}
        >
            {isNavigable(item.href) ? (
                <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                        compactRadius,
                        focusRing,
                        'min-w-0 flex-1 text-left',
                    )}
                >
                    {body}
                </Link>
            ) : (
                <div className="min-w-0 flex-1">{body}</div>
            )}
            <div className="flex shrink-0 items-center">
                {item.unread && onMarkRead && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={markReadLabel}
                        title={copy.markReadLabel}
                        onClick={() => onMarkRead(item.id)}
                    >
                        <Check className="size-4" />
                    </Button>
                )}
                {item.actions}
            </div>
        </li>
    );
}

function isNavigable(href: UrlLike | undefined): href is UrlLike {
    return href !== undefined && hasNavigableScheme(hrefToString(href));
}

export function NotificationBell({
    items,
    unread,
    onMarkRead,
    onMarkAllRead,
    viewAllHref,
    loading = false,
    open,
    onOpenChange,
    max = DEFAULT_MAX,
    badgeTone = 'default',
    linkComponent,
    labels,
    className,
    slotName = 'notification-bell',
}: NotificationBellProps) {
    const copy = useUiLabels(
        'notificationBell',
        notificationBellLabels,
        labels,
    );
    const Link = resolveLink(linkComponent);
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = open ?? internalOpen;
    const count = unreadCount(unread);
    const triggerLabel =
        count > 0
            ? `${copy.title}, ${copy.unreadLabel.replace('{{count}}', String(count))}`
            : copy.title;

    const setOpen = (next: boolean) => {
        if (open === undefined) {
            setInternalOpen(next);
        }

        onOpenChange?.(next);
    };
    const close = () => setOpen(false);

    return (
        <Popover open={isOpen} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={triggerLabel}
                    className={cn('relative', className)}
                    slotName={slotName}
                >
                    <Bell className="size-5" />
                    {count > 0 && (
                        <Badge
                            aria-hidden="true"
                            variant={badgeTone}
                            slotName="notification-bell-badge"
                            className="-top-1 -right-1 h-5 min-w-5 px-1 py-0 absolute leading-none"
                        >
                            {badgeText(count, max)}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                className="w-80 rounded-2xl p-0 sm:w-96 overflow-hidden"
                slotName="notification-bell-content"
            >
                <div className="gap-2 px-4 py-3 flex items-center justify-between border-b border-border">
                    <h2 className="text-sm font-semibold">{copy.title}</h2>
                    {count > 0 && onMarkAllRead && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={onMarkAllRead}
                        >
                            <Check className="size-4" />
                            {copy.markAllReadLabel}
                        </Button>
                    )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                    {loading ? (
                        <div className="p-6 flex items-center justify-center">
                            <Spinner label={copy.loadingLabel} />
                        </div>
                    ) : items.length === 0 ? (
                        <p
                            data-slot="notification-bell-empty"
                            className="px-4 py-8 text-sm text-center text-muted-foreground"
                        >
                            {copy.emptyLabel}
                        </p>
                    ) : (
                        <ul className="divide-y divide-border">
                            {items.map((item) => (
                                <NotificationBellEntry
                                    key={item.id}
                                    item={item}
                                    copy={copy}
                                    Link={Link}
                                    onMarkRead={onMarkRead}
                                    onNavigate={close}
                                />
                            ))}
                        </ul>
                    )}
                </div>
                {isNavigable(viewAllHref) && (
                    <div className="p-2 border-t border-border">
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="w-full justify-center"
                        >
                            <Link href={viewAllHref} onClick={close}>
                                {copy.viewAllLabel}
                            </Link>
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}
