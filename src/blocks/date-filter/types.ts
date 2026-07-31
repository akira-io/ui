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
    { value: 'today', label: 'Hoje' },
    { value: 'yesterday', label: 'Ontem' },
    { value: 'previous_week', label: 'Semana anterior' },
    { value: 'previous_7_days', label: 'Últimos 7 dias' },
    { value: 'previous_30_days', label: 'Últimos 30 dias' },
    { value: 'previous_month', label: 'Mês anterior' },
    { value: 'previous_3_months', label: 'Últimos 3 meses' },
    { value: 'previous_12_months', label: 'Últimos 12 meses' },
];

export const DEFAULT_OPERATORS: DateFilterOption[] = [
    { value: 'between', label: 'Entre' },
    { value: 'before', label: 'Antes de' },
    { value: 'on', label: 'Em' },
    { value: 'after', label: 'Depois de' },
];

export const DEFAULT_UNITS: DateFilterOption[] = [
    { value: 'day', label: 'dias' },
    { value: 'week', label: 'semanas' },
    { value: 'month', label: 'meses' },
    { value: 'quarter', label: 'trimestres' },
    { value: 'year', label: 'anos' },
];

export const DEFAULT_LABELS: DateFilterLabels = {
    all: 'Todo o período',
    fixed: 'Intervalo fixo...',
    relative: 'Intervalo relativo...',
    relativeTitle: 'Intervalo relativo',
    apply: 'Aplicar filtro',
    back: 'Voltar',
    latest: 'Últimos',
    ago: 'há',
    includeCurrent: 'Incluir período atual',
    startingAgo: 'A começar há',
    removeOffset: 'Remover deslocamento',
    fallback: 'Data',
};
