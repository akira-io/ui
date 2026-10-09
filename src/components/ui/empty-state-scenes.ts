import {
    CircleCheck,
    CloudOff,
    FileQuestionMark,
    Inbox,
    SearchX,
    TriangleAlert,
    type LucideIcon,
} from 'lucide-react';

export type EmptyStateScene =
    | 'no-results'
    | 'empty'
    | 'offline'
    | 'error'
    | 'caught-up'
    | 'not-found';

export type EmptyStateSceneTitleKey =
    | 'noResultsTitle'
    | 'emptyTitle'
    | 'offlineTitle'
    | 'errorTitle'
    | 'caughtUpTitle'
    | 'notFoundTitle';

export const emptyStateScenes: Record<
    EmptyStateScene,
    { icon: LucideIcon; titleKey: EmptyStateSceneTitleKey }
> = {
    'no-results': { icon: SearchX, titleKey: 'noResultsTitle' },
    empty: { icon: Inbox, titleKey: 'emptyTitle' },
    offline: { icon: CloudOff, titleKey: 'offlineTitle' },
    error: { icon: TriangleAlert, titleKey: 'errorTitle' },
    'caught-up': { icon: CircleCheck, titleKey: 'caughtUpTitle' },
    'not-found': { icon: FileQuestionMark, titleKey: 'notFoundTitle' },
};
