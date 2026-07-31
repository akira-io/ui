export type DateFilterMode = 'all' | 'preset' | 'fixed' | 'relative';

export type DateFilterOperator = 'between' | 'before' | 'on' | 'after';

export type DateFilterUnit = 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface DateFilterValue {
    mode: DateFilterMode;
    preset?: string;
    operator?: DateFilterOperator;
    start?: string;
    end?: string;
    unit?: DateFilterUnit;
    amount?: number;
    include_current?: boolean;
    offset_amount?: number;
    offset_unit?: DateFilterUnit;
}

export interface DateFilterOption {
    value: string;
    label: string;
}

export interface DateFilterLabels {
    all: string;
    fixed: string;
    relative: string;
    relativeTitle: string;
    apply: string;
    back: string;
    latest: string;
    ago: string;
    includeCurrent: string;
    startingAgo: string;
    removeOffset: string;
    fallback: string;
}

export const DEFAULT_PRESETS: DateFilterOption[] = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'previous_week', label: 'Previous week' },
    { value: 'previous_7_days', label: 'Last 7 days' },
    { value: 'previous_30_days', label: 'Last 30 days' },
    { value: 'previous_month', label: 'Previous month' },
    { value: 'previous_3_months', label: 'Last 3 months' },
    { value: 'previous_12_months', label: 'Last 12 months' },
];

export const DEFAULT_OPERATORS: DateFilterOption[] = [
    { value: 'between', label: 'Between' },
    { value: 'before', label: 'Before' },
    { value: 'on', label: 'On' },
    { value: 'after', label: 'After' },
];

export const DEFAULT_UNITS: DateFilterOption[] = [
    { value: 'day', label: 'days' },
    { value: 'week', label: 'weeks' },
    { value: 'month', label: 'months' },
    { value: 'quarter', label: 'quarters' },
    { value: 'year', label: 'years' },
];

export const DEFAULT_LABELS: DateFilterLabels = {
    all: 'All time',
    fixed: 'Fixed range...',
    relative: 'Relative range...',
    relativeTitle: 'Relative range',
    apply: 'Apply filter',
    back: 'Back',
    latest: 'Last',
    ago: 'offset',
    includeCurrent: 'Include current period',
    startingAgo: 'Starting',
    removeOffset: 'Remove offset',
    fallback: 'Date',
};
