const base =
    'gap-1.5 px-3 h-8 text-xs font-semibold rounded-xl inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50';

export const toastActionClasses = `${base} bg-secondary text-secondary-foreground hover:bg-secondary/80`;

export const toastCancelClasses = `${base} text-muted-foreground hover:text-foreground`;

export const toastCloseClasses =
    'rounded-full border-border bg-popover text-muted-foreground transition-colors hover:text-foreground';
