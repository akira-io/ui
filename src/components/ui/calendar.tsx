import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from 'lucide-react';
import * as React from 'react';
import {
    DayPicker,
    defaultDateLib,
    getDefaultClassNames,
    type DayButton,
} from 'react-day-picker';

import { Button, buttonVariants } from '@/components/ui/button';
import {
    contentFill,
    nestedSurfaceReset,
    type ContentSurfaceProps,
} from '@/lib/language';
import { useContentSurface } from '@/lib/surface-context';
import { cn } from '@/lib/utils';
import { useUiDateLocale } from '@/locales/context';
import type { SlotNameProps } from '@/types';

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    captionLayout = 'label',
    buttonVariant = 'ghost',
    formatters,
    components,
    slotName = 'calendar',
    locale,
    surface,
    ...props
}: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>['variant'];
} & SlotNameProps &
    ContentSurfaceProps) {
    const defaultClassNames = getDefaultClassNames();
    const dateLocale = useUiDateLocale();

    return (
        <DayPicker
            locale={locale ?? dateLocale}
            showOutsideDays={showOutsideDays}
            className={cn(
                contentFill(useContentSurface(surface)),
                nestedSurfaceReset,
                'group/calendar p-4 [--cell-size:--spacing(8)]',
                String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
                String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
                className,
            )}
            captionLayout={captionLayout}
            formatters={{
                formatMonthDropdown: (date, dateLib = defaultDateLib) =>
                    dateLib.format(date, 'LLL'),
                ...formatters,
            }}
            classNames={{
                root: cn('w-fit', defaultClassNames.root),
                months: cn(
                    'gap-4 md:flex-row relative flex flex-col',
                    defaultClassNames.months,
                ),
                month: cn(
                    'gap-4 flex w-full flex-col',
                    defaultClassNames.month,
                ),
                nav: cn(
                    'inset-x-0 top-0 gap-1 absolute flex w-full items-center justify-between',
                    defaultClassNames.nav,
                ),
                button_previous: cn(
                    buttonVariants({ variant: buttonVariant }),
                    'p-0 size-(--cell-size) select-none aria-disabled:opacity-50',
                    defaultClassNames.button_previous,
                ),
                button_next: cn(
                    buttonVariants({ variant: buttonVariant }),
                    'p-0 size-(--cell-size) select-none aria-disabled:opacity-50',
                    defaultClassNames.button_next,
                ),
                month_caption: cn(
                    'flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)',
                    defaultClassNames.month_caption,
                ),
                dropdowns: cn(
                    'gap-1.5 text-sm font-medium flex h-(--cell-size) w-full items-center justify-center',
                    defaultClassNames.dropdowns,
                ),
                dropdown_root: cn(
                    'shadow-xs rounded-xl relative border border-border has-focus:outline-1 has-focus:outline-offset-0 has-focus:outline-ring has-focus:outline-solid',
                    defaultClassNames.dropdown_root,
                ),
                dropdown: cn(
                    'inset-0 absolute bg-popover opacity-0',
                    defaultClassNames.dropdown,
                ),
                caption_label: cn(
                    'font-medium select-none',
                    captionLayout === 'label'
                        ? 'text-sm'
                        : 'h-8 gap-1 pr-1 pl-2 text-sm rounded-xl flex items-center [&>svg]:size-icon-sm [&>svg]:text-muted-foreground',
                    defaultClassNames.caption_label,
                ),
                month_grid: cn(
                    'w-full border-collapse',
                    defaultClassNames.month_grid,
                ),
                weekdays: cn('flex', defaultClassNames.weekdays),
                weekday: cn(
                    'font-normal rounded-xl flex-1 text-[0.8rem] text-muted-foreground select-none',
                    defaultClassNames.weekday,
                ),
                week: cn('mt-2 flex w-full', defaultClassNames.week),
                week_number_header: cn(
                    'w-(--cell-size) select-none',
                    defaultClassNames.week_number_header,
                ),
                week_number: cn(
                    'text-[0.8rem] text-muted-foreground select-none',
                    defaultClassNames.week_number,
                ),
                day: cn(
                    'group/day p-0 relative aspect-square h-full w-full text-center select-none',
                    defaultClassNames.day,
                ),
                range_start: cn(
                    'rounded-l-full bg-(--glass-highlight)',
                    defaultClassNames.range_start,
                ),
                range_middle: cn(
                    'rounded-none',
                    defaultClassNames.range_middle,
                ),
                range_end: cn(
                    'rounded-r-full bg-(--glass-highlight)',
                    defaultClassNames.range_end,
                ),
                today: cn(
                    'rounded-full bg-(--glass-highlight) text-foreground data-[selected=true]:rounded-none',
                    defaultClassNames.today,
                ),
                outside: cn(
                    'text-muted-foreground aria-selected:text-muted-foreground',
                    defaultClassNames.outside,
                ),
                disabled: cn(
                    'text-muted-foreground opacity-50',
                    defaultClassNames.disabled,
                ),
                hidden: cn('invisible', defaultClassNames.hidden),
                ...classNames,
            }}
            components={{
                Root: ({ className, rootRef, ...props }) => {
                    return (
                        <div
                            ref={rootRef}
                            className={cn(className)}
                            {...props}
                            data-slot={slotName}
                        />
                    );
                },
                Chevron: ({ className, orientation, ...props }) => {
                    if (orientation === 'left') {
                        return (
                            <ChevronLeftIcon
                                className={cn('size-icon', className)}
                                {...props}
                            />
                        );
                    }

                    if (orientation === 'right') {
                        return (
                            <ChevronRightIcon
                                className={cn('size-icon', className)}
                                {...props}
                            />
                        );
                    }

                    return (
                        <ChevronDownIcon
                            className={cn('size-icon', className)}
                            {...props}
                        />
                    );
                },
                DayButton: CalendarDayButton,
                WeekNumber: ({ children, ...props }) => {
                    return (
                        <td {...props}>
                            <div className="flex size-(--cell-size) items-center justify-center text-center">
                                {children}
                            </div>
                        </td>
                    );
                },
                ...components,
            }}
            {...props}
        />
    );
}

function CalendarDayButton({
    className,
    day,
    modifiers,
    ...props
}: React.ComponentProps<typeof DayButton>) {
    const defaultClassNames = getDefaultClassNames();

    const ref = React.useRef<HTMLButtonElement>(null);
    React.useEffect(() => {
        if (modifiers.focused) ref.current?.focus();
    }, [modifiers.focused]);

    return (
        <Button
            ref={ref}
            variant="ghost"
            size="icon"
            data-day={day.date.toLocaleDateString()}
            data-selected-single={
                modifiers.selected &&
                !modifiers.range_start &&
                !modifiers.range_end &&
                !modifiers.range_middle
            }
            data-range-start={modifiers.range_start}
            data-range-end={modifiers.range_end}
            data-range-middle={modifiers.range_middle}
            className={cn(
                'gap-1 font-normal [&>span]:text-xs flex aspect-square size-auto w-full min-w-(--cell-size) flex-col rounded-full leading-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-(--glass-highlight) data-[range-middle=true]:text-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:opacity-70',
                defaultClassNames.day,
                className,
            )}
            {...props}
        />
    );
}

export { Calendar, CalendarDayButton };
