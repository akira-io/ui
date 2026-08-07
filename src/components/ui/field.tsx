import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import {
    FieldContext,
    useField,
    type FieldContextValue,
    type FieldOrientation,
} from '@/components/ui/field-context';
import { FieldError } from '@/components/ui/field-error';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface FieldLabels {
    requiredLabel: string;
}

interface FieldProps extends React.ComponentProps<'div'> {
    orientation?: FieldOrientation;
    error?: string;
    invalid?: boolean;
    required?: boolean;
}

export function Field({
    className,
    children,
    id,
    orientation = 'vertical',
    error,
    invalid,
    required = false,
    ...props
}: FieldProps) {
    const generatedId = React.useId();
    const fieldId = id ?? generatedId;
    const [hasDescription, setHasDescription] = React.useState(false);
    const isInvalid = invalid ?? Boolean(error);

    const field = React.useMemo<FieldContextValue>(
        () => ({
            controlId: fieldId,
            descriptionId: `${fieldId}-description`,
            errorId: `${fieldId}-error`,
            orientation,
            invalid: isInvalid,
            required,
            hasDescription,
            setHasDescription,
        }),
        [fieldId, orientation, isInvalid, required, hasDescription],
    );

    return (
        <FieldContext.Provider value={field}>
            <div
                data-slot="field"
                data-orientation={orientation}
                data-invalid={isInvalid ? 'true' : undefined}
                className={cn(
                    'group/field',
                    orientation === 'horizontal'
                        ? 'gap-x-4 gap-y-1 grid grid-cols-[1fr_auto] items-center'
                        : 'gap-2 flex flex-col',
                    className,
                )}
                {...props}
            >
                {children}
                <FieldError message={error} />
            </div>
        </FieldContext.Provider>
    );
}

export function FieldGroup({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="field-group"
            className={cn('gap-6 flex w-full flex-col', className)}
            {...props}
        />
    );
}

interface FieldLabelProps extends React.ComponentProps<typeof Label> {
    requiredLabel?: FieldLabels['requiredLabel'];
}

export function FieldLabel({
    className,
    children,
    requiredLabel = 'Required',
    ...props
}: FieldLabelProps) {
    const { controlId, invalid, required } = useField();

    return (
        <Label
            data-slot="field-label"
            htmlFor={controlId}
            className={cn(
                'gap-1 flex items-center group-data-[orientation=horizontal]/field:col-start-1 group-data-[orientation=horizontal]/field:row-start-1',
                invalid && 'text-destructive',
                className,
            )}
            {...props}
        >
            {children}
            {required ? (
                <>
                    <span
                        data-slot="field-required"
                        aria-hidden="true"
                        className="text-destructive"
                    >
                        *
                    </span>
                    <span className="sr-only">{requiredLabel}</span>
                </>
            ) : null}
        </Label>
    );
}

export function FieldDescription({
    className,
    ...props
}: React.ComponentProps<'p'>) {
    const { descriptionId, setHasDescription } = useField();

    React.useEffect(() => {
        setHasDescription(true);

        return () => setHasDescription(false);
    }, [setHasDescription]);

    return (
        <p
            id={descriptionId}
            data-slot="field-description"
            className={cn(
                'ml-1 text-xs font-medium text-muted-foreground group-data-[orientation=horizontal]/field:col-start-1 group-data-[orientation=horizontal]/field:row-start-2',
                className,
            )}
            {...props}
        />
    );
}

export function FieldControl({
    className,
    ...props
}: React.ComponentProps<typeof Slot>) {
    const {
        controlId,
        descriptionId,
        errorId,
        invalid,
        required,
        hasDescription,
    } = useField();

    const requiredProps: React.InputHTMLAttributes<HTMLElement> = required
        ? { required: true }
        : {};

    const describedBy = [
        hasDescription ? descriptionId : null,
        invalid ? errorId : null,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <Slot
            data-field-control="true"
            id={controlId}
            aria-describedby={describedBy || undefined}
            aria-invalid={invalid ? true : undefined}
            {...requiredProps}
            className={cn(
                'group-data-[orientation=horizontal]/field:col-start-2 group-data-[orientation=horizontal]/field:row-span-2 group-data-[orientation=horizontal]/field:row-start-1 group-data-[orientation=horizontal]/field:justify-self-end',
                className,
            )}
            {...props}
        />
    );
}
