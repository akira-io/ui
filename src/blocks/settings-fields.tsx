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
}: SettingsFieldProps) {
    const generated = useId();
    const fieldId = id ?? generated;

    return (
        <div
            data-slot="settings-field"
            data-invalid={error ? true : undefined}
            className={cn('space-y-2 py-1', className)}
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
    ...field
}: TextFieldProps) {
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
                    data-slot="text-field"
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
    ...field
}: NumberFieldProps) {
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
                    data-slot="number-field"
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
    ...field
}: DateFieldProps) {
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
                    data-slot="date-field"
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
    ...field
}: SelectFieldProps) {
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
                        data-slot="select-field"
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
