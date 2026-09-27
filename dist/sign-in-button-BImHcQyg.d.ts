import * as React from 'react';
import { ReactNode } from 'react';
import { P as PasskeyLabelProps, a as Passkey } from './types-ClE3iWNv.js';
import { S as SlotNameProps } from './types-r3VHXAG2.js';

interface PasskeyListProps extends PasskeyLabelProps {
    passkeys: Passkey[];
    onDelete: (passkey: Passkey) => void | Promise<void>;
    children?: ReactNode;
    className?: string;
}
declare function PasskeyList({ passkeys, onDelete, children, labels, className, slotName, }: PasskeyListProps & SlotNameProps): React.JSX.Element;

interface PasskeyRegisterButtonProps extends PasskeyLabelProps {
    onRegister: (name: string) => void | Promise<void>;
    supported?: boolean;
    processing?: boolean;
    error?: string | null;
    defaultName?: string;
    className?: string;
}
declare function PasskeyRegisterButton({ onRegister, supported, processing, error, defaultName, labels, className, slotName, }: PasskeyRegisterButtonProps & SlotNameProps): React.JSX.Element;

interface PasskeySignInButtonProps extends PasskeyLabelProps {
    onSignIn: () => void | Promise<void>;
    supported?: boolean;
    processing?: boolean;
    error?: string | null;
    className?: string;
}
declare function PasskeySignInButton({ onSignIn, supported, processing, error, labels, className, slotName, }: PasskeySignInButtonProps & SlotNameProps): React.JSX.Element | null;

export { PasskeyList as P, type PasskeyListProps as a, PasskeyRegisterButton as b, type PasskeyRegisterButtonProps as c, PasskeySignInButton as d, type PasskeySignInButtonProps as e };
