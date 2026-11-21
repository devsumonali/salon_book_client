'use client';

import type { ReactNode, RefObject } from 'react';
import { FiX } from 'react-icons/fi';

type ServiceDialogProps = {
    dialogRef: RefObject<HTMLDialogElement | null>;
    id: string;
    title: string;
    children: ReactNode;
    compact?: boolean;
    busy?: boolean;
};

export default function ServiceDialog({
    dialogRef,
    id,
    title,
    children,
    compact = false,
    busy = false,
}: ServiceDialogProps) {
    return (
        <dialog
            ref={dialogRef}
            id={id}
            aria-labelledby={`${id}-title`}
            aria-busy={busy}
            onCancel={(event) => {
                if (busy) event.preventDefault();
            }}
            className={`fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl border border-line bg-panel p-5 text-ink shadow-xl backdrop:bg-ink/50 sm:p-6 ${compact ? 'max-w-md' : 'max-w-2xl'}`}
        >
            <header className="mb-5 flex items-center justify-between gap-4 border-b border-line/60 pb-4">
                <h2 id={`${id}-title`} className="text-2xl tracking-tight">
                    {title}
                </h2>
                <button
                    type="button"
                    aria-label="Close dialog"
                    onClick={() => dialogRef.current?.close()}
                    disabled={busy}
                    className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <FiX aria-hidden="true" size={20} />
                </button>
            </header>
            {children}
        </dialog>
    );
}
