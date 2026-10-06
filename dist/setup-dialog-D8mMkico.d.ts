import * as React from 'react';
import { f as TwoFactorLabelProps, h as TwoFactorQrProps } from './types-DBcYPBXw.js';
import { S as SlotNameProps } from './types-CTEMbVhK.js';

interface TwoFactorSetupDialogProps extends TwoFactorLabelProps, TwoFactorQrProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    enabled?: boolean;
    manualSetupKey?: string | null;
    recoveryCodes?: string[];
    errors?: string | string[] | null;
    onConfirm: (code: string) => void | Promise<void>;
    onRequestSetupData?: () => void | Promise<void>;
    onRegenerateRecoveryCodes?: () => void | Promise<void>;
    onCompleted?: () => void;
    className?: string;
}
declare function TwoFactorSetupDialog({ open, onOpenChange, enabled, qrCode, qrCodeSvg, manualSetupKey, recoveryCodes, errors, onConfirm, onRequestSetupData, onRegenerateRecoveryCodes, onCompleted, labels, className, slotName, }: TwoFactorSetupDialogProps & SlotNameProps): React.JSX.Element;

export { TwoFactorSetupDialog as T, type TwoFactorSetupDialogProps as a };
