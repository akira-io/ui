import { ArrowLeftToLine, CalendarDays, ChevronLeft, X } from 'lucide-react';

import { useDateFilter } from '@/blocks/date-filter/context';
import {
    formatRangePreview,
    resolveRelativeRange,
} from '@/blocks/date-filter/range';
import type {
    DateFilterUnit,
    DateFilterValue,
} from '@/blocks/date-filter/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export function DateFilterRelativePanel() {
    const { draft, units, labels, setDraft, backToRoot, commit } =
        useDateFilter();

    const hasOffset = (draft.offset_amount ?? 0) > 0;

    return (
        <div className="w-96">
            <div className="gap-2 px-2 py-2 flex items-center border-b">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={backToRoot}
                    aria-label={labels.back}
                >
                    <ChevronLeft className="size-4" />
                </Button>
                <span className="text-sm font-medium">
                    {labels.relativeTitle}
                </span>
            </div>

            <div className="gap-3 p-3 flex flex-col">
                <div className="gap-2 flex items-center">
                    <span className="text-sm">{labels.latest}</span>
                    <Input
                        type="number"
                        min={1}
                        max={120}
                        value={draft.amount ?? 1}
                        onChange={(event) =>
                            setDraft({
                                ...draft,
                                amount: Number(event.target.value),
                            })
                        }
                        className="w-20"
                    />
                    <Select
                        value={draft.unit ?? 'month'}
                        onValueChange={(unit) =>
                            setDraft({ ...draft, unit: unit as DateFilterUnit })
                        }
                    >
                        <SelectTrigger className="flex-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {units.map((unit) => (
                                <SelectItem key={unit.value} value={unit.value}>
                                    {unit.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {!hasOffset && (
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={labels.startingAgo}
                            title={labels.startingAgo}
                            onClick={() =>
                                setDraft({
                                    ...draft,
                                    offset_amount: 1,
                                    offset_unit: draft.unit ?? 'month',
                                })
                            }
                        >
                            <ArrowLeftToLine className="size-4" />
                        </Button>
                    )}
                </div>

                {hasOffset && (
                    <div className="gap-2 flex items-center">
                        <span className="text-sm">{labels.startingAgo}</span>
                        <Input
                            type="number"
                            min={1}
                            max={120}
                            value={draft.offset_amount ?? 1}
                            onChange={(event) =>
                                setDraft({
                                    ...draft,
                                    offset_amount: Number(event.target.value),
                                })
                            }
                            className="w-20"
                        />
                        <Select
                            value={draft.offset_unit ?? draft.unit ?? 'month'}
                            onValueChange={(unit) =>
                                setDraft({
                                    ...draft,
                                    offset_unit: unit as DateFilterUnit,
                                })
                            }
                        >
                            <SelectTrigger className="flex-1">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {units.map((unit) => (
                                    <SelectItem
                                        key={unit.value}
                                        value={unit.value}
                                    >
                                        {unit.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={labels.removeOffset}
                            onClick={() =>
                                setDraft({
                                    ...draft,
                                    offset_amount: undefined,
                                    offset_unit: undefined,
                                })
                            }
                        >
                            <X className="size-4" />
                        </Button>
                    </div>
                )}

                <label className="text-sm flex items-center justify-between">
                    {labels.includeCurrent}
                    <Switch
                        checked={draft.include_current ?? false}
                        onCheckedChange={(checked) =>
                            setDraft({ ...draft, include_current: checked })
                        }
                    />
                </label>
            </div>

            <div className="gap-3 px-3 py-2 flex items-center justify-between border-t">
                <RangePreview draft={draft} />
                <Button
                    disabled={!draft.unit || !draft.amount || draft.amount < 1}
                    onClick={() => commit(draft)}
                >
                    {labels.apply}
                </Button>
            </div>
        </div>
    );
}

function RangePreview({ draft }: { draft: DateFilterValue }) {
    const range = resolveRelativeRange(
        draft.unit ?? 'month',
        draft.amount ?? 0,
        draft.include_current ?? false,
        new Date(),
        draft.offset_amount ?? 0,
        draft.offset_unit,
    );

    if (!range) {
        return <span />;
    }

    return (
        <span className="gap-2 text-sm flex items-center text-muted-foreground">
            <CalendarDays className="size-4" />
            {formatRangePreview(range)}
        </span>
    );
}
