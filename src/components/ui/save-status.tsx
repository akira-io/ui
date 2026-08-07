import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import { Check, TriangleAlert } from 'lucide-react';
import * as React from 'react';

export type SaveStatusState = 'idle' | 'saving' | 'saved' | 'error';

export interface SaveStatusLabels {
    error: string;
    idle: string;
    saved: string;
    saving: string;
}

export const saveStatusLabels: SaveStatusLabels = {
    error: 'Your changes could not be saved',
    idle: 'Changes are saved automatically',
    saved: 'Saved',
    saving: 'Saving',
};

export const SAVED_DURATION = 2000;

export interface SaveStatusProps extends React.ComponentProps<'div'> {
    status: SaveStatusState;
    message?: string;
    showIdle?: boolean;
    savedDuration?: number;
    labels?: Partial<SaveStatusLabels>;
}

function SaveStatus({
    status,
    message,
    showIdle = false,
    savedDuration = SAVED_DURATION,
    labels,
    className,
    ...props
}: SaveStatusProps) {
    const text = useUiLabels('saveStatus', saveStatusLabels, labels);
    const [faded, setFaded] = React.useState(false);

    React.useEffect(() => {
        if (status !== 'saved' || savedDuration <= 0) {
            setFaded(false);

            return;
        }

        setFaded(false);
        const timer = setTimeout(() => setFaded(true), savedDuration);

        return () => clearTimeout(timer);
    }, [status, savedDuration, message]);

    const hidden = status === 'saved' && faded;

    return (
        <div
            {...props}
            data-slot="save-status"
            data-state={status}
            data-faded={hidden || undefined}
            role="status"
            aria-live="polite"
            aria-hidden={hidden || undefined}
            className={cn(
                'gap-2 text-xs font-medium min-h-5 flex items-center transition-opacity duration-300',
                hidden ? 'opacity-0' : 'opacity-100',
                className,
            )}
        >
            {status === 'idle' && showIdle && (
                <span
                    data-slot="save-status-idle"
                    className="text-muted-foreground"
                >
                    {text.idle}
                </span>
            )}

            {status === 'saving' && (
                <span
                    data-slot="save-status-saving"
                    className="gap-2 flex items-center text-muted-foreground"
                >
                    <Spinner size="sm" label="" aria-hidden="true" />
                    {text.saving}
                </span>
            )}

            {status === 'saved' && (
                <span
                    data-slot="save-status-saved"
                    className="gap-2 flex items-center text-success"
                >
                    <Check aria-hidden="true" className="size-3.5" />
                    {text.saved}
                </span>
            )}

            {status === 'error' && (
                <span
                    data-slot="save-status-error"
                    className="gap-2 flex items-center text-destructive"
                >
                    <TriangleAlert aria-hidden="true" className="size-3.5" />
                    {message ?? text.error}
                </span>
            )}
        </div>
    );
}

export { SaveStatus };
