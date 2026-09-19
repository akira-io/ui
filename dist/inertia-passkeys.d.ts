import * as React from 'react';
import { ReactNode } from 'react';
import { U as UrlLike, S as SlotNameProps } from './types-r3VHXAG2.js';
import { P as PasskeyLabelProps, a as Passkey } from './types-ClE3iWNv.js';
import { a as PasskeyListProps, c as PasskeyRegisterButtonProps, e as PasskeySignInButtonProps } from './sign-in-button-BImHcQyg.js';
import { RouteOverrides } from '@laravel/passkeys';
import 'lucide-react';

type PasskeyRoutes = RouteOverrides['routes'];
interface InertiaPasskeySignInButtonProps extends PasskeyLabelProps {
    routes?: PasskeyRoutes;
    redirectTo?: string;
    className?: string;
}
declare function InertiaPasskeySignInButton({ routes, redirectTo, labels, className, }: InertiaPasskeySignInButtonProps): React.FunctionComponentElement<PasskeySignInButtonProps & SlotNameProps>;
interface InertiaPasskeyRegisterButtonProps extends PasskeyLabelProps {
    routes?: PasskeyRoutes;
    className?: string;
}
declare function InertiaPasskeyRegisterButton({ routes, labels, className, }: InertiaPasskeyRegisterButtonProps): React.FunctionComponentElement<PasskeyRegisterButtonProps & SlotNameProps>;
interface InertiaPasskeyListProps extends PasskeyLabelProps {
    passkeys: Passkey[];
    destroyUrl: (passkey: Passkey) => UrlLike;
    children?: ReactNode;
    className?: string;
}
declare function InertiaPasskeyList({ passkeys, destroyUrl, children, labels, className, }: InertiaPasskeyListProps): React.FunctionComponentElement<PasskeyListProps & SlotNameProps>;

export { InertiaPasskeyList, type InertiaPasskeyListProps, InertiaPasskeyRegisterButton, type InertiaPasskeyRegisterButtonProps, InertiaPasskeySignInButton, type InertiaPasskeySignInButtonProps, type PasskeyRoutes };
