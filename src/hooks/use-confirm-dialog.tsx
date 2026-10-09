import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import {
    useCallback,
    useState,
    useSyncExternalStore,
    type ReactNode,
} from 'react';

export interface UseConfirmDialogOptions {
    title?: string;
    description?: string | ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: 'destructive' | 'default';
}

interface ConfirmRequest {
    isOpen: boolean;
    options: UseConfirmDialogOptions;
    onConfirm: (() => void) | null;
    onCancel: (() => void) | null;
}

interface ConfirmStore {
    read: () => ConfirmRequest;
    write: (request: Partial<ConfirmRequest>) => void;
    subscribe: (listener: () => void) => () => void;
}

function createConfirmStore(): ConfirmStore {
    let request: ConfirmRequest = {
        isOpen: false,
        options: {},
        onConfirm: null,
        onCancel: null,
    };
    const listeners = new Set<() => void>();

    return {
        read: () => request,
        write: (changes) => {
            request = { ...request, ...changes };
            listeners.forEach((listener) => listener());
        },
        subscribe: (listener) => {
            listeners.add(listener);

            return () => listeners.delete(listener);
        },
    };
}

function StoredConfirmDialog({ store }: { store: ConfirmStore }) {
    const request = useSyncExternalStore(
        store.subscribe,
        store.read,
        store.read,
    );

    return (
        <ConfirmDialog
            open={request.isOpen}
            onOpenChange={(isOpen) => store.write({ isOpen })}
            onConfirm={() => {
                request.onConfirm?.();
                store.write({ isOpen: false });
            }}
            onCancel={() => {
                request.onCancel?.();
                store.write({ isOpen: false });
            }}
            {...request.options}
        />
    );
}

export function useConfirmDialog() {
    const [store] = useState(createConfirmStore);

    const confirm = useCallback(
        (
            onConfirm: () => void,
            confirmOptions?: UseConfirmDialogOptions,
            onCancel?: () => void,
        ) => {
            store.write({
                isOpen: true,
                options: confirmOptions || {},
                onConfirm,
                onCancel: onCancel ?? null,
            });
        },
        [store],
    );

    const ConfirmDialogComponent = useCallback(
        () => <StoredConfirmDialog store={store} />,
        [store],
    );

    return { confirm, ConfirmDialog: ConfirmDialogComponent };
}
