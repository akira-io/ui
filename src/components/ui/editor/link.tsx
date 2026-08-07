import { Link2 } from 'lucide-react';
import { useId, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useEditorContext } from '@/components/ui/editor/context';
import { isSafeEditorUrl } from '@/components/ui/editor/extensions';
import { EditorControl } from '@/components/ui/editor/toolbar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface EditorLinkProps {
    label?: string;
    className?: string;
}

export function EditorLink({ label, className }: EditorLinkProps) {
    const { editor, labels, editable } = useEditorContext();
    const [open, setOpen] = useState(false);
    const [href, setHref] = useState('');
    const attached = editor.isActive('link');
    const fieldId = useId();

    function openDialog() {
        setHref(editor.getAttributes('link').href ?? '');
        setOpen(true);
    }

    function apply() {
        if (!isSafeEditorUrl(href)) {
            return;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: href.trim() })
            .run();

        setOpen(false);
    }

    function remove() {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        setOpen(false);
    }

    return (
        <>
            <EditorControl
                label={label ?? labels.linkLabel}
                icon={Link2}
                pressed={attached}
                disabled={!editable}
                onActivate={openDialog}
                className={className}
            />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent data-slot="editor-link-dialog">
                    <DialogHeader>
                        <DialogTitle>{labels.linkDialogTitle}</DialogTitle>
                        <DialogDescription>
                            {labels.linkDialogDescription}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="gap-2 flex flex-col">
                        <Label htmlFor={fieldId}>{labels.linkUrlLabel}</Label>
                        <Input
                            id={fieldId}
                            data-slot="editor-link-url"
                            value={href}
                            placeholder={labels.linkUrlPlaceholder}
                            onChange={(event) => setHref(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    apply();
                                }
                            }}
                        />
                    </div>
                    <DialogFooter>
                        {attached && (
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={remove}
                            >
                                {labels.linkRemoveLabel}
                            </Button>
                        )}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            {labels.linkCancelLabel}
                        </Button>
                        <Button
                            type="button"
                            onClick={apply}
                            disabled={href.trim() === ''}
                        >
                            {labels.linkApplyLabel}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
