import { glassBubble, glassPress } from '@/lib/language';

const base =
    'gap-1.5 px-3 h-8 text-xs font-semibold rounded-xl inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50';

export const toastActionClasses = `${base} ${glassBubble} ${glassPress} text-foreground`;

export const toastCancelClasses = `${base} transition-colors text-muted-foreground hover:text-foreground`;

export const toastCloseClasses = `rounded-full border-0! ${glassBubble} text-muted-foreground transition-colors hover:text-foreground`;
