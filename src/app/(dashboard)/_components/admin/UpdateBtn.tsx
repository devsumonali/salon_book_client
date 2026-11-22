'use client';

import type { AddServiceData } from '@/types/service';
import { useId, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit2 } from 'react-icons/fi';
import ServiceDialog from '../ServiceDialog';
import UpdateServiceForm from './UpdateServiceForm';

export default function UpdateBtn({ service }: { service: AddServiceData }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const id = useId();
    const [formVersion, setFormVersion] = useState(0);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isRefreshing, startRefresh] = useTransition();
    const router = useRouter();

    function openDialog() {
        setFormVersion((version) => version + 1);
        dialogRef.current?.showModal();
    }

    function handleSuccess() {
        startRefresh(() => router.refresh());
        dialogRef.current?.close();
    }

    return (
        <>
            <button
                type="button"
                aria-label={`Edit ${service.name}`}
                aria-haspopup="dialog"
                aria-controls={id}
                title="Edit service"
                onClick={openDialog}
                disabled={isUpdating || isRefreshing}
                className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-line bg-panel text-brand transition-colors hover:border-brand/30 hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <FiEdit2 aria-hidden="true" size={16} />
            </button>
            <ServiceDialog dialogRef={dialogRef} id={id} title="Update Service" busy={isUpdating}>
                <UpdateServiceForm
                    key={formVersion}
                    service={service}
                    onCancel={() => dialogRef.current?.close()}
                    onSuccess={handleSuccess}
                    onPendingChange={setIsUpdating}
                />
            </ServiceDialog>
        </>
    );
}
