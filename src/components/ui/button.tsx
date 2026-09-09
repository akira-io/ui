import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import {
    buttonVariants,
    iconPadding,
    loadingPadding,
    spinnerSize,
    toneVariables,
    type ButtonSize,
    type ButtonTone,
} from '@/components/ui/button-variants';
import { Spinner, spinnerVariants } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

interface ButtonProps
    extends
        React.ComponentProps<'button'>,
        Omit<VariantProps<typeof buttonVariants>, 'toned'> {
    asChild?: boolean;
    tone?: ButtonTone;
    loading?: boolean;
    loadingLabel?: string;
    slotName?: string;
}

function Button({
    className,
    variant = 'default',
    size = 'default',
    tone,
    style,
    asChild = false,
    loading,
    loadingLabel = 'Loading',
    slotName = 'button',
    disabled,
    children,
    onClick,
    ...props
}: ButtonProps) {
    const isLoading = loading === true;
    const hasLoadingState = loading !== undefined;
    const resolvedSize: ButtonSize = size ?? 'default';
    const baseClasses = buttonVariants({
        variant,
        size: resolvedSize,
        toned: tone !== undefined,
    });
    const styles = tone ? { ...toneVariables(tone), ...style } : style;
    const classes = cn(
        baseClasses,
        iconPadding(resolvedSize, children),
        className,
    );
    const loadingClasses = cn(
        baseClasses,
        loadingPadding(resolvedSize),
        className,
    );

    if (asChild) {
        const Comp = asChild ? Slot : 'button';
        const mappedSpinnerSize = spinnerSize(resolvedSize);
        const slottedChild = React.isValidElement<
            React.HTMLAttributes<HTMLElement>
        >(children)
            ? children
            : undefined;
        const items = React.Children.toArray(slottedChild?.props.children);
        const first = items[0];
        const iconOnly = resolvedSize.startsWith('icon');
        const hasLeadingVisual =
            React.isValidElement(first) && (items.length > 1 || iconOnly);
        const leadingVisual = hasLeadingVisual ? first : undefined;
        const label = hasLeadingVisual ? items.slice(1) : items;
        const slottedChildren =
            hasLoadingState && slottedChild
                ? React.cloneElement(
                      slottedChild,
                      isLoading
                          ? {
                                onClick(event) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                },
                            }
                          : undefined,
                      <span
                          data-slot="button-content"
                          className="inline-flex items-center gap-[inherit]"
                      >
                          <span
                              data-slot="button-leading"
                              className={cn(
                                  'inline-grid shrink-0 place-items-center',
                                  spinnerVariants({ size: mappedSpinnerSize }),
                              )}
                          >
                              {isLoading ? (
                                  <Spinner
                                      size={mappedSpinnerSize}
                                      label={loadingLabel}
                                      className="size-full"
                                  />
                              ) : (
                                  leadingVisual
                              )}
                          </span>
                          <span data-slot="button-label">{label}</span>
                          {!hasLeadingVisual && !iconOnly && (
                              <span
                                  aria-hidden="true"
                                  data-slot="button-balance"
                                  className={spinnerVariants({
                                      size: mappedSpinnerSize,
                                  })}
                              />
                          )}
                      </span>,
                  )
                : children;

        return (
            <Comp
                {...props}
                data-slot={slotName}
                data-variant={variant}
                data-tone={tone}
                style={styles}
                data-size={resolvedSize}
                data-loading={isLoading || undefined}
                className={hasLoadingState ? loadingClasses : classes}
                disabled={disabled || isLoading}
                aria-busy={isLoading ? true : props['aria-busy']}
                aria-disabled={isLoading ? true : props['aria-disabled']}
                onClick={isLoading ? undefined : onClick}
            >
                {slottedChildren}
            </Comp>
        );
    }

    if (loading === undefined) {
        return (
            <button
                {...props}
                data-slot={slotName}
                data-variant={variant}
                data-tone={tone}
                style={styles}
                data-size={resolvedSize}
                className={classes}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </button>
        );
    }

    const items = React.Children.toArray(children);
    const first = items[0];
    const iconOnly = resolvedSize.startsWith('icon');
    const hasLeadingVisual =
        React.isValidElement(first) && (items.length > 1 || iconOnly);
    const leadingVisual = hasLeadingVisual ? first : undefined;
    const label = hasLeadingVisual ? items.slice(1) : items;
    const mappedSpinnerSize = spinnerSize(resolvedSize);

    return (
        <button
            {...props}
            data-slot={slotName}
            data-variant={variant}
            data-tone={tone}
            style={styles}
            data-size={resolvedSize}
            data-loading={isLoading || undefined}
            className={loadingClasses}
            disabled={disabled || isLoading}
            aria-busy={isLoading ? true : props['aria-busy']}
            onClick={onClick}
        >
            <span
                data-slot="button-content"
                className="inline-flex items-center gap-[inherit]"
            >
                <span
                    data-slot="button-leading"
                    className={cn(
                        'inline-grid shrink-0 place-items-center',
                        spinnerVariants({ size: mappedSpinnerSize }),
                    )}
                >
                    {isLoading ? (
                        <Spinner
                            size={mappedSpinnerSize}
                            label={loadingLabel}
                            className="size-full"
                        />
                    ) : (
                        leadingVisual
                    )}
                </span>
                <span data-slot="button-label">{label}</span>
                {!hasLeadingVisual && !iconOnly && (
                    <span
                        aria-hidden="true"
                        data-slot="button-balance"
                        className={spinnerVariants({
                            size: mappedSpinnerSize,
                        })}
                    />
                )}
            </span>
        </button>
    );
}

export { Button, buttonVariants, type ButtonProps, type ButtonTone };
