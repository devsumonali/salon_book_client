'use client';

import { createAdminService } from '@/lib/actions/services';
import { uploadImage } from '@/lib/api/upload';
import { AddServiceData } from '@/types/service';
import { useRouter } from 'next/navigation';
import { useState, type SubmitEvent } from 'react';
import toast from 'react-hot-toast';

import { FiPlus } from 'react-icons/fi';
import ServiceFormFields from './ServiceFormFields';

export default function AddServiceForm() {
    const [isloading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmitPost = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isloading) return;
        const form = event.currentTarget;
        const formData = new FormData(form);

        const servicesData: Omit<AddServiceData, '_id'> = {
            name: String(formData.get('name') || '').trim(),
            category: formData.get('category') as AddServiceData['category'],
            price: Number(formData.get('price')),
            duration: Number(formData.get('duration')),
            status: formData.get('status') as AddServiceData['status'],
            description: String(formData.get('description') || ''),
        };

        const startTime = Date.now();
        setIsLoading(true);

        try {
            const imageFile = formData.get('image');

            if (!(imageFile instanceof File) || imageFile.size === 0) {
                toast.error('Please select an image.');
                return;
            }

            //image uploaded function call
            servicesData.image = await uploadImage(imageFile);

            //getaddservice api function call
            const res = await createAdminService(servicesData);

            if (res.insertedId) {
                toast.success('Service Added Successfuly');
                form.reset();
                router.push('/dashboard/admin/manage-services');
            } else {
                toast.error('Failed to add service!');
            }
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : 'Failed to add service');
        } finally {
            const remainingTime = 1000 - (Date.now() - startTime);

            if (remainingTime > 0) {
                await new Promise((resolve) => {
                    setTimeout(resolve, remainingTime);
                });
            }

            setIsLoading(false);
        }
    };
    return (
        <form
            onSubmit={handleSubmitPost}
            id="service-form"
            aria-label="Service details"
            className="mt-6"
        >
            <fieldset className="min-w-0 space-y-6 rounded-xl border border-line/70 bg-panel p-5 shadow-card sm:p-9 lg:p-6 xl:p-9">
                <ServiceFormFields />

                <div className="flex justify-end border-t border-line/60 pt-5">
                    <button
                        type="submit"
                        disabled={isloading}
                        className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-brand-hover/40 bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-hover sm:w-auto"
                    >
                        <FiPlus aria-hidden="true" size={17} />
                        {isloading ? 'Service Adding ...' : ' Add Service'}
                    </button>
                </div>
            </fieldset>
        </form>
    );
}
