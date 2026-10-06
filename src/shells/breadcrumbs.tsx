import { Fragment } from 'react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { resolveLink } from '@/lib/href';
import { cn } from '@/lib/utils';
import type {
    BreadcrumbItem as BreadcrumbItemType,
    LinkComponent,
} from '@/types';

export function Breadcrumbs({
    breadcrumbs,
    linkComponent,
    collapseBelowSm = false,
}: {
    breadcrumbs: BreadcrumbItemType[];
    linkComponent?: LinkComponent;
    collapseBelowSm?: boolean;
}) {
    const Link = resolveLink(linkComponent);

    if (breadcrumbs.length === 0) {
        return null;
    }

    const truncate = collapseBelowSm ? 'truncate' : undefined;
    const hiddenBelowSm = collapseBelowSm && 'sm:inline-flex hidden';

    return (
        <Breadcrumb className="min-w-0">
            <BreadcrumbList
                className={cn(collapseBelowSm && 'min-w-0 flex-nowrap')}
            >
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    const fullTitle = collapseBelowSm ? item.title : undefined;
                    return (
                        <Fragment key={index}>
                            <BreadcrumbItem
                                className={cn(
                                    collapseBelowSm && 'min-w-0',
                                    !isLast && hiddenBelowSm,
                                )}
                            >
                                {isLast ? (
                                    <BreadcrumbPage
                                        className={truncate}
                                        title={fullTitle}
                                    >
                                        {item.title}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link
                                            href={item.href}
                                            className={truncate}
                                            title={fullTitle}
                                        >
                                            {item.title}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && (
                                <BreadcrumbSeparator
                                    className={cn(hiddenBelowSm)}
                                />
                            )}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
