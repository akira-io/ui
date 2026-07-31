import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { ChevronLeft } from 'lucide-react';

import { useDateFilter } from '@/blocks/date-filter/context';
import type { DateFilterOperator } from '@/blocks/date-filter/types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const CALENDAR_START = new Date(2020, 0, 1);

const CALENDAR_END = new Date(new Date().getFullYear() + 1, 11, 31);

const toDate = (value?: string) =>
    value ? new Date(`${value}T00:00:00`) : undefined;

const toIso = (value?: Date) =>
    value ? format(value, 'yyyy-MM-dd') : undefined;

export function DateFilterFixedPanel() {
    const { draft, operators, labels, setDraft, backToRoot, commit } =
        useDateFilter();

    const operator = draft.operator ?? 'between';
    const isRange = operator === 'between';
    const canApply = Boolean(draft.start) && (!isRange || Boolean(draft.end));

    return (
        <div className="w-auto">
            <div className="gap-1 px-2 py-2 flex items-center border-b">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={backToRoot}
                    aria-label={labels.back}
                >
                    <ChevronLeft className="size-4" />
                </Button>
                {operators.map((item) => (
                    <button
                        key={item.value}
                        type="button"
                        onClick={() =>
                            setDraft({
                                ...draft,
                                operator: item.value as DateFilterOperator,
                            })
                        }
                        className={cn(
                            'px-3 py-1.5 text-sm font-medium rounded-xl cursor-pointer transition-colors',
                            operator === item.value
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground',
                        )}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="p-3">
                {isRange ? (
                    <Calendar
                        mode="range"
                        numberOfMonths={2}
                        locale={pt}
                        captionLayout="dropdown"
                        startMonth={CALENDAR_START}
                        endMonth={CALENDAR_END}
                        defaultMonth={toDate(draft.start)}
                        selected={{
                            from: toDate(draft.start),
                            to: toDate(draft.end),
                        }}
                        onSelect={(range) =>
                            setDraft({
                                ...draft,
                                start: toIso(range?.from),
                                end: toIso(range?.to),
                            })
                        }
                    />
                ) : (
                    <Calendar
                        mode="single"
                        locale={pt}
                        captionLayout="dropdown"
                        startMonth={CALENDAR_START}
                        endMonth={CALENDAR_END}
                        defaultMonth={toDate(draft.start)}
                        selected={toDate(draft.start)}
                        onSelect={(date) =>
                            setDraft({ ...draft, start: toIso(date) })
                        }
                    />
                )}
            </div>

            <div className="px-3 py-2 flex justify-end border-t">
                <Button disabled={!canApply} onClick={() => commit(draft)}>
                    {labels.apply}
                </Button>
            </div>
        </div>
    );
}
