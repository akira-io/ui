import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export interface LocalizedField {
    name: string;
    label: string;
    type?: 'text' | 'textarea';
    rows?: number;
}

export interface LocalizedFieldsProps {
    locales: string[];
    localeLabels?: Record<string, string>;
    fields: LocalizedField[];
    values: Record<string, Record<string, string>>;
    onChange: (field: string, locale: string, value: string) => void;
    errors?: Record<string, string>;
    defaultLocale?: string;
    className?: string;
}

export function LocalizedFields({
    locales,
    localeLabels,
    fields,
    values,
    onChange,
    errors,
    defaultLocale,
    className,
}: LocalizedFieldsProps) {
    return (
        <Tabs
            defaultValue={defaultLocale ?? locales[0]}
            className={cn('w-full', className)}
        >
            <TabsList className="mb-4 rounded-xl bg-zinc-100 p-1 dark:bg-white/5 flex h-auto w-full justify-start overflow-x-auto">
                {locales.map((locale) => (
                    <TabsTrigger
                        key={locale}
                        value={locale}
                        className="px-4 py-2 font-bold rounded-lg"
                    >
                        {localeLabels?.[locale] ?? locale.toUpperCase()}
                    </TabsTrigger>
                ))}
            </TabsList>

            {locales.map((locale) => (
                <TabsContent key={locale} value={locale} className="mt-0">
                    <div className="gap-4 lg:grid-cols-2 grid">
                        {fields.map((field) => {
                            const fieldId = `${field.name}-${locale}`;
                            const error = errors?.[`${field.name}.${locale}`];
                            const value = values[field.name]?.[locale] ?? '';

                            return (
                                <div key={field.name} className="space-y-2">
                                    <Label htmlFor={fieldId}>
                                        {field.label}
                                    </Label>
                                    {field.type === 'textarea' ? (
                                        <Textarea
                                            id={fieldId}
                                            rows={field.rows ?? 4}
                                            value={value}
                                            onChange={(event) =>
                                                onChange(
                                                    field.name,
                                                    locale,
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    ) : (
                                        <Input
                                            id={fieldId}
                                            value={value}
                                            onChange={(event) =>
                                                onChange(
                                                    field.name,
                                                    locale,
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    )}
                                    {error && (
                                        <p className="text-xs font-bold text-red-500">
                                            {error}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    );
}
