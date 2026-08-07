import {
    Sidebar,
    SidebarFooter,
    SidebarProvider,
} from '@/components/ui/sidebar';
import { NavUser } from '@/shells/nav-user';
import type { SharedUser } from '@/types';

export const user: SharedUser = {
    name: 'Ana Lima',
    email: 'ana@nosferry.com',
    avatar: '',
};

export function CollapsedUserRow({ open = false }: { open?: boolean }) {
    return (
        <SidebarProvider defaultOpen={open}>
            <Sidebar collapsible="icon" variant="inset">
                <SidebarFooter>
                    <NavUser
                        user={user}
                        settingsHref="/settings"
                        logoutHref="/logout"
                    />
                </SidebarFooter>
            </Sidebar>
        </SidebarProvider>
    );
}

export function partClasses(slot: string): string[] {
    const found = document.querySelector(`[data-slot="${slot}"]`);

    if (!found) {
        throw new Error(`the user row renders no ${slot}`);
    }

    return (found.getAttribute('class') ?? '').split(/\s+/).filter(Boolean);
}
