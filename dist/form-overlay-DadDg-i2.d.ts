import * as React from 'react';
import { ReactNode } from 'react';
import { S as SlotNameProps } from './types-r3VHXAG2.js';

interface DangerZoneLabels {
    title: string;
    description: string;
    actionLabel: string;
    confirmTitle: string;
    confirmDescription: string;
    confirmText: string;
    cancelText: string;
    requiredValueLabel: string;
}
declare const dangerZoneLabels: DangerZoneLabels;
interface DangerZoneAction {
    id: string;
    title: string;
    description?: string;
    actionLabel?: string;
    confirmTitle?: string;
    confirmDescription?: string;
    confirmText?: string;
    cancelText?: string;
    requiredValue?: string;
    requiredValueLabel?: string;
    disabled?: boolean;
    onConfirm: () => void;
}
interface DangerZoneProps {
    title?: string;
    description?: string;
    actions: DangerZoneAction[];
    processing?: boolean;
    labels?: Partial<DangerZoneLabels>;
    footer?: ReactNode;
    className?: string;
}
declare function DangerZone({ title, description, actions, processing, labels, footer, className, slotName, }: DangerZoneProps & SlotNameProps): React.JSX.Element;

interface FormOverlayLabels {
    cancelLabel: string;
    saveLabel: string;
    savingLabel: string;
}
declare const formOverlayDefaultLabels: FormOverlayLabels;
type FormOverlayIntent = 'default' | 'destructive';
interface FormOverlayActionsProps {
    labels?: FormOverlayLabels;
    processing?: boolean;
    intent?: FormOverlayIntent;
    submit?: boolean;
    className?: string;
    onCancel: () => void;
    onSave?: () => void;
}
declare function FormOverlayActions({ labels, processing, intent, submit, className, onCancel, onSave, slotName, }: FormOverlayActionsProps & SlotNameProps): React.JSX.Element;

export { DangerZone as D, type FormOverlayIntent as F, type FormOverlayLabels as a, type DangerZoneAction as b, type DangerZoneLabels as c, type DangerZoneProps as d, FormOverlayActions as e, type FormOverlayActionsProps as f, dangerZoneLabels as g, formOverlayDefaultLabels as h };
