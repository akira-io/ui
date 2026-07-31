import { createContext, useContext } from 'react';

import type {
    DateFilterLabels,
    DateFilterOption,
    DateFilterValue,
} from '@/blocks/date-filter/types';

export type DateFilterPanel = 'root' | 'fixed' | 'relative';

export interface DateFilterContextValue {
    value: DateFilterValue;
    draft: DateFilterValue;
    labels: DateFilterLabels;
    presets: DateFilterOption[];
    operators: DateFilterOption[];
    units: DateFilterOption[];
    panel: DateFilterPanel;
    setDraft: (value: DateFilterValue) => void;
    openPanel: (panel: DateFilterPanel, seed: DateFilterValue) => void;
    backToRoot: () => void;
    commit: (value: DateFilterValue) => void;
}

const DateFilterContext = createContext<DateFilterContextValue | null>(null);

export const DateFilterProvider = DateFilterContext.Provider;

export function useDateFilter(): DateFilterContextValue {
    const context = useContext(DateFilterContext);

    if (context === null) {
        throw new Error('DateFilter parts must be used inside <DateFilter>.');
    }

    return context;
}
