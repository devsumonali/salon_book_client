'use client';

import type { AddServiceData } from '@/types/service';
import Image from 'next/image';
import { useState } from 'react';
import { FiClock, FiScissors } from 'react-icons/fi';
import { formatServicePrice, serviceCategories } from '@/lib/service-display';
import UpdateBtn from './UpdateBtn';
import DeleteBtn from './DeleteBtn';

type ManageServiceCardProps = {
    service: AddServiceData;
};

export default function ManageServiceCard({ service }: ManageServiceCardProps) {
    const [imageError, setImageError] = useState(false);
    const category = serviceCategories[service.category];
    const isActive = service.status === 'active';
    const hasImage = service.image?.startsWith('https://') && !imageError;

    return (
        <li className="grid grid-cols-2 items-center gap-x-4 gap-y-4 px-4 py-5 transition-colors hover:bg-surface/40 sm:px-5 xl:grid-cols-[minmax(0,1fr)_136px_88px_100px_80px_96px] xl:gap-x-4 xl:py-6">
            <div className="col-span-2 flex min-w-0 items-center gap-3 xl:col-span-1">
                <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-line/70 bg-brand-soft/40">
                    {hasImage ? (
                        <Image
                            src={service.image!}
                            alt={service.name}
                            fill
                            unoptimized
                            sizes="48px"
                            className="object-cover"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <FiScissors aria-hidden="true" size={20} className="text-brand/65" />
                    )}
                </div>
                <div className="min-w-0">
                    <h2
                        title={service.name}
                        className={`truncate text-lg leading-6 tracking-tight ${isActive ? 'text-ink' : 'text-muted'}`}
                    >
                        {service.name}
                    </h2>
                    <p className="mt-1 truncate text-sm leading-5 text-subtle">
                        {service.description || 'No description provided.'}
                    </p>
                </div>
            </div>

            <div className="min-w-0">
                <span className="mb-1.5 block text-sm font-medium text-subtle xl:sr-only">
                    Category
                </span>
                <span
                    className={`inline-block max-w-full rounded px-2 py-1 text-sm leading-4 ${category?.badgeClass || 'bg-surface text-muted'}`}
                >
                    {category?.label || service.category}
                </span>
            </div>

            <div>
                <span className="mb-1.5 block text-sm font-medium text-subtle xl:sr-only">
                    Duration
                </span>
                <p className="flex items-center gap-1.5 whitespace-nowrap text-xs text-muted">
                    <FiClock aria-hidden="true" size={13} className="shrink-0" />
                    {service.duration} mins
                </p>
            </div>

            <div>
                <span className="mb-1.5 block text-sm font-medium text-subtle xl:sr-only">
                    Pricing
                </span>
                <p className={`text-base font-medium ${isActive ? 'text-ink' : 'text-muted'}`}>
                    {formatServicePrice(service.price)}
                </p>
                <p className="mt-0.5 text-sm text-subtle">Per service</p>
            </div>

            <div>
                <span className="mb-1.5 block text-sm font-medium text-subtle xl:sr-only">
                    Status
                </span>
                <span
                    className={`inline-flex rounded-lg px-2.5 py-1.5 text-sm font-semibold ${isActive ? 'bg-sage-soft text-sage' : 'bg-surface text-muted'}`}
                >
                    {isActive ? 'Active' : 'Inactive'}
                </span>
            </div>

            <div className="col-span-2 flex items-center justify-end gap-2 xl:col-span-1">
                <UpdateBtn service={service} />
                <DeleteBtn service={service} />
            </div>
        </li>
    );
}
