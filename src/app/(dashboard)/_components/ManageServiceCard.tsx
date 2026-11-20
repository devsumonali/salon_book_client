'use client';

import type { ServiceData } from '@/types/service';
import Image from 'next/image';
import { useState } from 'react';
import { FiClock, FiScissors } from 'react-icons/fi';
import { formatServicePrice, serviceCategories } from './service-display';

type ManageServiceCardProps = {
    service: ServiceData;
};

export default function ManageServiceCard({ service }: ManageServiceCardProps) {
    const [imageError, setImageError] = useState(false);
    const category = serviceCategories[service.category];
    const isActive = service.status === 'active';
    const hasImage = service.image?.startsWith('https://') && !imageError;

    return (
        <li className="grid grid-cols-2 items-center gap-x-4 gap-y-4 px-4 py-5 transition-colors hover:bg-surface/40 sm:px-5 md:grid-cols-[minmax(0,1fr)_136px_88px_100px_62px] md:gap-x-4 md:py-6">
            <div className="col-span-2 flex min-w-0 items-center gap-3 md:col-span-1">
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
                    <p className="mt-1 truncate text-[11px] leading-5 text-subtle">
                        {service.description || 'No description provided.'}
                    </p>
                </div>
            </div>

            <div className="min-w-0">
                <span className="mb-1.5 block text-[10px] font-medium text-subtle md:sr-only">
                    Category
                </span>
                <span className={`inline-block max-w-full rounded px-2 py-1 text-[10px] leading-4 ${category?.badgeClass || 'bg-surface text-muted'}`}>
                    {category?.label || service.category}
                </span>
            </div>

            <div>
                <span className="mb-1.5 block text-[10px] font-medium text-subtle md:sr-only">
                    Duration
                </span>
                <p className="flex items-center gap-1.5 whitespace-nowrap text-xs text-muted">
                    <FiClock aria-hidden="true" size={13} className="shrink-0" />
                    {service.duration} mins
                </p>
            </div>

            <div>
                <span className="mb-1.5 block text-[10px] font-medium text-subtle md:sr-only">
                    Pricing
                </span>
                <p className={`text-base font-medium ${isActive ? 'text-ink' : 'text-muted'}`}>
                    {formatServicePrice(service.price)}
                </p>
                <p className="mt-0.5 text-[10px] text-subtle">Per service</p>
            </div>

            <div>
                <span className="mb-1.5 block text-[10px] font-medium text-subtle md:sr-only">
                    Status
                </span>
                <span
                    role="img"
                    aria-label={isActive ? 'Active service' : 'Inactive service'}
                    title={isActive ? 'Active' : 'Inactive'}
                    className={`flex h-5 w-9 items-center rounded-full border p-0.5 ${isActive ? 'justify-end border-brand-hover/40 bg-brand' : 'justify-start border-line bg-[#efede9]'}`}
                >
                    <span className="size-3.5 rounded-full bg-white shadow-xs" />
                </span>
            </div>
        </li>
    );
}
