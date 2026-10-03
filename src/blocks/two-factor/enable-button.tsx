import {
    twoFactorLabels,
    type TwoFactorLabelProps,
} from '@/blocks/two-factor/types';
import { Button } from '@/components/ui/button';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { ShieldCheck } from 'lucide-react';

export interface TwoFactorEnableButtonProps extends TwoFactorLabelProps {
    onEnable: () => void;
    processing?: boolean;
    className?: string;
}

export function TwoFactorEnableButton({
    onEnable,
    processing = false,
    labels,
    className,
    slotName = 'two-factor-enable',
}: TwoFactorEnableButtonProps & SlotNameProps) {
    const text = useUiLabels('twoFactor', twoFactorLabels, labels);

    return (
        <Button
            type="button"
            loading={processing}
            onClick={onEnable}
            className={className}
            slotName={slotName}
        >
            <ShieldCheck />
            {text.enableLabel}
        </Button>
    );
}
