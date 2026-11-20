'use client';

import { getAddServices } from '@/lib/api/services';
import { AddServiceData } from '@/types/service';
import { useState, type SubmitEvent } from 'react';
import toast from 'react-hot-toast';

import { FiChevronDown, FiPlus, FiUploadCloud } from 'react-icons/fi';

const inputClass =
    'min-h-11 w-full min-w-0 rounded-lg border border-transparent bg-surface px-3.5 text-sm text-ink transition-colors placeholder:text-subtle focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10';
const labelClass = 'mb-2 block text-xs font-medium';

export default function AddServiceForm() {
    const [loading, isLoading] = useState('');

    const handleSubmitPost = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const servicesData: AddServiceData = {
            name: String(formData.get('name') || '').trim(),
            category: formData.get('category') as AddServiceData['category'],
            price: Number(formData.get('price')),
            duration: Number(formData.get('duration')),
            status: formData.get('status') as AddServiceData['status'],
            description: String(formData.get('description') || ''),
            image: String(formData.get('image')),
        };

        try {
            const res = await getAddServices(servicesData);

            if (res.ok) {
                isLoading(loading);
                toast.success('Service Added Successfuly');
                form.reset();
            } else {
                toast.error('Failed to add service!');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong!');
        }
    };
    return (
        <form
            onSubmit={handleSubmitPost}
            id="service-form"
            aria-label="Service details"
            className="mt-6"
        >
            <fieldset className="min-w-0 space-y-6 rounded-xl border border-line/70 bg-panel p-5 shadow-xs sm:p-9 lg:p-6 xl:p-9">
                <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
                    <div>
                        <label htmlFor="service-name" className={labelClass}>
                            Service Name <span className="text-brand">*</span>
                        </label>
                        <input
                            id="service-name"
                            name="name"
                            type="text"
                            placeholder="e.g. Botanical Keratin Treatment"
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="service-category" className={labelClass}>
                            Service Category <span className="text-brand">*</span>
                        </label>
                        <div className="relative">
                            <select
                                id="service-category"
                                name="category"
                                defaultValue=""
                                required
                                className={`${inputClass} cursor-pointer appearance-none pr-10`}
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>
                                <option value="hair-styling">Hair Styling</option>
                                <option value="hair-color">Hair Color</option>
                                <option value="skin-care">Skin Care</option>
                                <option value="nail-care">Nail Care</option>
                                <option value="wellness">Wellness</option>
                            </select>
                            <FiChevronDown
                                aria-hidden="true"
                                size={16}
                                className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-brand"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-3 sm:gap-3.5">
                    <div>
                        <label htmlFor="service-price" className={labelClass}>
                            Price (USD) <span className="text-brand">*</span>
                        </label>
                        <div className="relative">
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-lg text-brand"
                            >
                                $
                            </span>
                            <input
                                id="service-price"
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                required
                                className={`${inputClass} pl-8 text-base [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="service-duration" className={labelClass}>
                            Estimated Duration <span className="text-brand">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="service-duration"
                                name="duration"
                                type="number"
                                min="1"
                                step="1"
                                placeholder="e.g. 60"
                                aria-describedby="service-duration-unit"
                                required
                                className={`${inputClass} pr-16 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                            />
                            <span
                                id="service-duration-unit"
                                className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[10px] text-muted"
                            >
                                minutes
                            </span>
                        </div>
                    </div>

                    <fieldset className="min-w-0">
                        <legend className={labelClass}>Service Status</legend>
                        <div className="flex min-h-11 rounded-lg bg-surface p-1">
                            {['Active', 'Inactive'].map((status) => (
                                <label
                                    key={status}
                                    className="relative flex min-w-0 flex-1 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="status"
                                        value={status.toLowerCase()}
                                        className="peer sr-only"
                                    />
                                    <span className="flex w-full items-center justify-center rounded-md border border-transparent px-2 py-2 text-[10px] font-medium text-muted transition-colors peer-checked:border-brand-hover/40 peer-checked:bg-brand peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
                                        {status}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                </div>

                <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                        <label htmlFor="service-description" className="text-xs font-medium">
                            Description
                        </label>
                        <span id="service-description-hint" className="text-[10px] text-subtle">
                            Max. 300 characters
                        </span>
                    </div>
                    <textarea
                        id="service-description"
                        name="description"
                        placeholder="Describe the treatment, what's included, and what clients can expect."
                        maxLength={300}
                        rows={4}
                        aria-describedby="service-description-hint"
                        className={`${inputClass} block min-h-28 resize-y py-3.5 text-xs leading-6`}
                    />
                </div>

                <div>
                    <label htmlFor="service-image" className={labelClass}>
                        Service Image
                    </label>
                    <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-brand/25 bg-surface/35 px-4 py-6 text-center transition-colors hover:border-brand/50 hover:bg-brand-soft/20 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15">
                        <input
                            id="service-image"
                            name="image"
                            type="file"
                            accept="image/png,image/jpeg"
                            aria-describedby="service-image-hint"
                            className="sr-only"
                        />
                        <FiUploadCloud aria-hidden="true" size={26} className="mb-2 text-brand" />
                        <span className="text-xs font-medium">Upload Service Image</span>
                        <span className="mt-1 text-[11px] text-muted">
                            Choose your photo or{' '}
                            <span className="font-medium text-brand underline underline-offset-2">
                                click to browse
                            </span>
                        </span>
                        <span id="service-image-hint" className="mt-2 text-[10px] text-subtle">
                            PNG or JPG up to 2MB
                        </span>
                    </label>
                </div>

                <div className="flex justify-end border-t border-line/60 pt-5">
                    <button
                        type="submit"
                        className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-brand-hover/40 bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-hover sm:w-auto"
                    >
                        <FiPlus aria-hidden="true" size={17} />
                        {isLoading() ? 'Service Adding ...' : ' Add Service'}
                    </button>
                </div>
            </fieldset>
        </form>
    );
}
