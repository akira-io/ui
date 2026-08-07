import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { compactRadius } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SharedUser } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: SharedUser;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();

    return (
        <>
            <Avatar
                className={cn(
                    compactRadius,
                    'group-data-[collapsible=icon]:size-10',
                )}
            >
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback
                    className={cn(compactRadius, 'bg-muted text-foreground')}
                >
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div
                data-slot="user-info-identity"
                className="text-sm leading-tight grid flex-1 text-left group-data-[collapsible=icon]:hidden"
            >
                <span className="font-medium truncate">{user.name}</span>
                {showEmail && (
                    <span className="text-xs truncate text-muted-foreground">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
