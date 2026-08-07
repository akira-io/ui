import { FieldError } from '@/components/ui/field-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import { useId, type ReactNode } from 'react';

export interface SettingsFieldProps {
    id?: string;
    label: string;
    description?: string;
    error?: string;
    required?: boolean;
    className?: string;
    children: (fieldId: string) => ReactNode;
}

export function SettingsField({
    id,
    label,
    description,
    error,
    required,
    className,
    children,
    slotName = 'settings-field',
}: SettingsFieldProps & SlotNameProps) {
    const generated = useId();
    const fieldId = id ?? generated;

    return (
        <div
            data-invalid={error ? true : undefined}
            className={cn('space-y-2 py-1', className)}
            data-slot={slotName}
        >
            <Label htmlFor={fieldId}>
                {label}
                {required && (
                    <span
                        data-slot="settings-field-required"
                        aria-hidden="true"
                        className="text-destructive"
                    >
                        *
                    </span>
                )}
            </Label>

            {children(fieldId)}

            {description && (
                <p
                    data-slot="settings-field-description"
                    className="text-xs font-medium text-muted-foreground"
                >
                    {description}
                </p>
            )}

            <FieldError message={error} />
        </div>
    );
}

interface ControlProps<T> {
    id?: string;
    label: string;
    description?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    value: T;
    onChange: (value: T) => void;
    className?: string;
}

export type TextFieldProps = ControlProps<string> & {
    type?: 'text' | 'email' | 'url' | 'tel' | 'password';
};

export function TextField({
    type = 'text',
    value,
    onChange,
    disabled,
    placeholder,
    slotName = 'text-field',
    ...field
}: TextFieldProps & SlotNameProps) {
    return (
        <SettingsField {...field}>
            {(fieldId) => (
                <Input
                    id={fieldId}
                    type={type}
                    value={value}
                    disabled={disabled}
                    placeholder={placeholder}
                    aria-invalid={field.error ? true : undefined}
                    slotName={slotName}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}
        </SettingsField>
    );
}

export type NumberFieldProps = ControlProps<number | ''> & {
    min?: number;
    max?: number;
    step?: number;
};

export function NumberField({
    value,
    onChange,
    disabled,
    placeholder,
    min,
    max,
    step,
    slotName = 'number-field',
    ...field
}: NumberFieldProps & SlotNameProps) {
    return (
        <SettingsField {...field}>
            {(fieldId) => (
                <Input
                    id={fieldId}
                    type="number"
                    inputMode="decimal"
                    value={value === '' ? '' : String(value)}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    placeholder={placeholder}
                    aria-invalid={field.error ? true : undefined}
                    slotName={slotName}
                    onChange={(event) =>
                        onChange(
                            event.target.value === ''
                                ? ''
                                : event.target.valueAsNumber,
                        )
                    }
                />
            )}
        </SettingsField>
    );
}

export type DateFieldProps = ControlProps<string> & {
    min?: string;
    max?: string;
};

export function DateField({
    value,
    onChange,
    disabled,
    min,
    max,
    slotName = 'date-field',
    ...field
}: DateFieldProps & SlotNameProps) {
    return (
        <SettingsField {...field}>
            {(fieldId) => (
                <Input
                    id={fieldId}
                    type="date"
                    value={value}
                    min={min}
                    max={max}
                    disabled={disabled}
                    aria-invalid={field.error ? true : undefined}
                    slotName={slotName}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}
        </SettingsField>
    );
}

export interface SelectFieldOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export type SelectFieldProps = ControlProps<string> & {
    options: SelectFieldOption[];
};

export function SelectField({
    value,
    onChange,
    options,
    disabled,
    placeholder,
    slotName = 'select-field',
    ...field
}: SelectFieldProps & SlotNameProps) {
    return (
        <SettingsField {...field}>
            {(fieldId) => (
                <Select
                    value={value}
                    onValueChange={onChange}
                    disabled={disabled}
                >
                    <SelectTrigger
                        id={fieldId}
                        slotName={slotName}
                        aria-invalid={field.error ? true : undefined}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        </SettingsField>
    );
}
