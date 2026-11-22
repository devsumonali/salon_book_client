'use client';

import type { AddServiceData } from '@/types/service';
import { useId, useRef, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import ServiceDialog from '../ServiceDialog';
import { getDeleteService } from '@/lib/actions/services';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function DeleteBtn({ service }: { service: AddServiceData }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const id = useId();

    const handleDeleteService = async (id: string) => {
        if (isDeleting) return;
        setIsDeleting(true);
        try {
            const afterDelete = await getDeleteService(id);

            if (afterDelete.deletedCount > 0) {
                toast.success('Service deleted successfully!');
                dialogRef.current?.close();
                router.refresh();
            } else {
                toast.error('Service not found!');
            }
        } catch (error) {
            console.log('Delete problem:', error);
            toast.error('Service delete failed!');
        } finally {
            setIsDeleting(false);
        }
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
                <p className="mt-2 wrap-break-word text-sm font-semibold text-ink">
                    {service.name}
                </p>
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
                        disabled={isDeleting}
                        onClick={() => handleDeleteService(service._id)}
                        className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
                    >
                        <FiTrash2 aria-hidden="true" size={16} />
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </ServiceDialog>
        </>
    );
}
