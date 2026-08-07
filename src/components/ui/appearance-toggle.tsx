import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useAppearance, type Appearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { LucideIcon } from '@/types';

export interface AppearanceToggleLabels {
    groupLabel: string;
    lightLabel: string;
    darkLabel: string;
    systemLabel: string;
}

export const appearanceToggleDefaultLabels: AppearanceToggleLabels = {
    groupLabel: 'Appearance',
    lightLabel: 'Light',
    darkLabel: 'Dark',
    systemLabel: 'System',
};

interface AppearanceOption {
    value: Appearance;
    icon: LucideIcon;
    label: (labels: AppearanceToggleLabels) => string;
}

const OPTIONS: AppearanceOption[] = [
    { value: 'light', icon: SunIcon, label: (labels) => labels.lightLabel },
    { value: 'dark', icon: MoonIcon, label: (labels) => labels.darkLabel },
    {
        value: 'system',
        icon: MonitorIcon,
        label: (labels) => labels.systemLabel,
    },
];

interface AppearanceToggleProps extends React.ComponentProps<'div'> {
    variant?: 'segmented' | 'menu';
    labels?: Partial<AppearanceToggleLabels>;
}

function AppearanceToggle({
    className,
    variant = 'segmented',
    labels: labelOverrides,
    ...props
}: AppearanceToggleProps) {
    const labels = useUiLabels(
        'appearanceToggle',
        appearanceToggleDefaultLabels,
        labelOverrides,
    );
    const { appearance, updateAppearance } = useAppearance();
    const current = OPTIONS.find((option) => option.value === appearance);
    const CurrentIcon = current?.icon ?? MonitorIcon;

    if (variant === 'menu') {
        return (
            <div
                data-slot="appearance-toggle"
                data-variant="menu"
                className={cn('inline-flex', className)}
                {...props}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            data-slot="appearance-toggle-trigger"
                            variant="ghost"
                            size="icon-sm"
                            aria-label={labels.groupLabel}
                        >
                            <CurrentIcon aria-hidden="true" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuRadioGroup
                            value={appearance}
                            onValueChange={(value) =>
                                updateAppearance(value as Appearance)
                            }
                        >
                            {OPTIONS.map((option) => (
                                <DropdownMenuRadioItem
                                    key={option.value}
                                    data-slot="appearance-toggle-item"
                                    value={option.value}
                                >
                                    <option.icon aria-hidden="true" />
                                    {option.label(labels)}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    }

    return (
        <div
            data-slot="appearance-toggle"
            data-variant="segmented"
            className={cn('inline-flex', className)}
            {...props}
        >
            <ToggleGroup
                type="single"
                size="sm"
                value={appearance}
                aria-label={labels.groupLabel}
                onValueChange={(value) => {
                    if (value) {
                        updateAppearance(value as Appearance);
                    }
                }}
            >
                {OPTIONS.map((option) => (
                    <ToggleGroupItem
                        key={option.value}
                        data-slot="appearance-toggle-item"
                        value={option.value}
                        aria-label={option.label(labels)}
                    >
                        <option.icon aria-hidden="true" />
                        <span>{option.label(labels)}</span>
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    );
}

export { AppearanceToggle, type AppearanceToggleProps };
