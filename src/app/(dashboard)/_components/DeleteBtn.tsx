'use client';

import type { AddServiceData } from '@/types/service';
import { useId, useRef } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import ServiceDialog from './ServiceDialog';

export default function DeleteBtn({ service }: { service: AddServiceData }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const id = useId();

    const handleDeleteService = () => {
        // TODO: Connect the delete action here using service._id.
    };

    return (
        <>
            <button
                type="button"
                aria-label={`Delete ${service.name}`}
                aria-haspopup="dialog"
                aria-controls={id}
                title="Delete service"
                onClick={() => dialogRef.current?.showModal()}
                className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-red-200 bg-panel text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
            >
                <FiTrash2 aria-hidden="true" size={16} />
            </button>
            <ServiceDialog dialogRef={dialogRef} id={id} title="Delete Service" compact>
                <p className="text-sm leading-6 text-muted">
                    Are you sure you want to delete this item?
                </p>
                <p className="mt-2 break-words text-sm font-semibold text-ink">{service.name}</p>
                <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-line/60 pt-5">
                    <button
                        type="button"
                        onClick={() => dialogRef.current?.close()}
                        className="min-h-11 cursor-pointer rounded-lg border border-line bg-panel px-5 text-sm font-semibold text-muted transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteService}
                        className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
                    >
                        <FiTrash2 aria-hidden="true" size={16} />
                        Delete
                    </button>
                </div>
            </ServiceDialog>
        </>
    );
}
