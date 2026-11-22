'use client';

import { formatServicePrice, serviceCategories } from '@/lib/service-display';
import type { AddServiceData } from '@/types/service';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiClock, FiScissors } from 'react-icons/fi';

export default function ServiceCard({ service }: { service: AddServiceData }) {
    const [imageError, setImageError] = useState(false);
    const category = serviceCategories[service.category]?.label || service.category;
    const imageUrl = service.image?.startsWith('https://') ? service.image : undefined;
    return (
        <article className="ui-card group flex h-full min-w-0 flex-col overflow-hidden transition-shadow duration-200 hover:shadow-lift">
            <div className="relative m-2.5 mb-0 flex aspect-[1.65] items-center justify-center overflow-hidden rounded-[14px] bg-brand-soft">
                {imageUrl && !imageError ? (
                    <Image
                        src={imageUrl}
                        alt={service.name}
                        fill
                        sizes="(min-width: 1280px) 384px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-brand/70">
                        <FiScissors size={32} aria-hidden="true" />
                        <p className="text-sm">Service image unavailable</p>
                    </div>
                )}
                <span className="absolute top-3 left-3 max-w-[calc(100%-1.5rem)] truncate rounded-full border border-white/60 bg-panel/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">
                    {category}
                </span>
            </div>
            <div className="flex flex-1 flex-col p-5 lg:p-6">
                <h3 className="line-clamp-2 text-2xl leading-7 tracking-tight" title={service.name}>
                    {service.name}
                </h3>
                <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-muted">
                    {service.description || 'Contact our team for treatment details.'}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                    <p className="flex items-center gap-1.5 text-sm text-muted">
                        <FiClock size={15} aria-hidden="true" />
                        {service.duration} mins
                    </p>
                    <p className="text-lg font-bold tracking-tight text-brand">
                        {formatServicePrice(service.price)}
                    </p>
                </div>
                <div className="mt-auto pt-5">
                    <Link href={'/services/' + service._id} className="ui-button-secondary w-full">
                        View Details
                    </Link>
                </div>
            </div>
        </article>
    );
}
