'use client';

import type { AddServiceData, UpdateServiceData } from '@/types/service';
import { useState } from 'react';
import { FiCheck, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ServiceFormFields from './ServiceFormFields';
import { getUpdateService } from '@/lib/actions/services';
import { uploadImage } from '@/lib/api/upload';

type UpdateServiceFormProps = {
    service: AddServiceData;
    onCancel: () => void;
    onSuccess: () => void;
    onPendingChange: (isPending: boolean) => void;
};

export default function UpdateServiceForm({
    service,
    onCancel,
    onSuccess,
    onPendingChange,
}: UpdateServiceFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdateService = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting) return;

        const form = event.currentTarget;
        const formData = new FormData(form);

        const serviceUpdateData: UpdateServiceData = {
            name: String(formData.get('name') || '').trim(),
            category: formData.get('category') as AddServiceData['category'],
            price: Number(formData.get('price')),
            duration: Number(formData.get('duration')),
            status: formData.get('status') as AddServiceData['status'],
            description: String(formData.get('description') || ''),
        };

        setIsSubmitting(true);
        onPendingChange(true);

        try {
            const image = formData.get('image');

            if (image instanceof File && image.size > 0) {
                serviceUpdateData.image = await uploadImage(image);
            }

            const result = await getUpdateService(service._id, serviceUpdateData);

            if (result.matchedCount > 0) {
                toast.success('Service updated successfully!');
                onSuccess();
            }
        } catch (error) {
            console.log('Service update failed:', error);
            toast.error('Service update failed!');
        } finally {
            setIsSubmitting(false);
            onPendingChange(false);
        }
    };

    return (
        <form
            aria-label={`Update ${service.name}`}
            aria-busy={isSubmitting}
            onSubmit={handleUpdateService}
        >
            <fieldset disabled={isSubmitting} className="min-w-0 space-y-6 disabled:opacity-60">
                <ServiceFormFields service={service} />
            </fieldset>
            <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-line/60 pt-5">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="min-h-11 cursor-pointer rounded-lg border border-line bg-panel px-5 text-sm font-semibold text-muted transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-brand-hover/40 bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? (
                        <FiLoader aria-hidden="true" size={17} className="animate-spin" />
                    ) : (
                        <FiCheck aria-hidden="true" size={17} />
                    )}
                    {isSubmitting ? 'Updating...' : 'Update Service'}
                </button>
            </div>
        </form>
    );
}
