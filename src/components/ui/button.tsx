import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import {
    Spinner,
    spinnerVariants,
    type SpinnerProps,
} from '@/components/ui/spinner';
import { controlFill, focusRing, glassControl } from '@/lib/language';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    `inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 aria-invalid:ring-destructive/20 aria-invalid:border-destructive ${focusRing}`,
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]',
                destructive:
                    'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/40',
                outline: `${glassControl} ${controlFill} hover:bg-accent hover:text-accent-foreground`,
                secondary: `${glassControl} bg-secondary/80 text-secondary-foreground hover:bg-secondary`,
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-11 px-4 has-[>svg]:px-3',
                sm: 'h-9 gap-1.5 rounded-xl px-3 has-[>svg]:px-2.5',
                lg: 'h-12 px-6 has-[>svg]:px-5 text-base',
                icon: 'size-11',
                'icon-sm': 'size-9 rounded-xl',
                'icon-lg': 'size-12',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

interface ButtonProps
    extends
        React.ComponentProps<'button'>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    loadingLabel?: string;
}

function spinnerSize(size: ButtonSize): SpinnerProps['size'] {
    if (size === 'sm' || size === 'icon-sm') return 'sm';
    if (size === 'lg' || size === 'icon-lg') return 'lg';
    return 'default';
}

function loadingPadding(size: ButtonSize): string | undefined {
    if (size === 'sm') return 'px-2.5';
    if (size === 'lg') return 'px-5';
    if (size === 'default') return 'px-3';
    return undefined;
}

function Button({
    className,
    variant = 'default',
    size = 'default',
    asChild = false,
    loading,
    loadingLabel = 'Loading',
    disabled,
    children,
    onClick,
    ...props
}: ButtonProps) {
    const isLoading = loading === true;
    const hasLoadingState = loading !== undefined;
    const resolvedSize: ButtonSize = size ?? 'default';
    const baseClasses = buttonVariants({ variant, size: resolvedSize });
    const classes = cn(baseClasses, className);
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
                data-slot="button"
                data-variant={variant}
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
                data-slot="button"
                data-variant={variant}
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
            data-slot="button"
            data-variant={variant}
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

export { Button, buttonVariants, type ButtonProps };
