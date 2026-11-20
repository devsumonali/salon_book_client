'use client';

import { formatServicePrice, serviceCategories } from '@/lib/service-display';
import type { AddServiceData } from '@/types/service';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FiArrowUpRight, FiClock, FiScissors, FiX } from 'react-icons/fi';

type ServiceCardProps = {
    service: AddServiceData;
};

export default function ServiceCard({ service }: ServiceCardProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [imageError, setImageError] = useState(false);
    const category = serviceCategories[service.category]?.label || service.category;
    const imageUrl = service.image?.startsWith('https://') ? service.image : undefined;
    const dialogId = `service-details-${service._id}`;

    return (
        <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-line/70 bg-panel shadow-xs transition-[box-shadow,border-color] duration-300 hover:border-brand/25 hover:shadow-lg hover:shadow-ink/5">
            <div className="relative flex aspect-5/3 items-center justify-center overflow-hidden bg-brand-soft/35">
                {imageUrl && !imageError ? (
                    <Image
                        src={imageUrl}
                        alt={service.name}
                        fill
                        sizes="(min-width: 1280px) 384px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-brand/60">
                        <FiScissors aria-hidden="true" size={32} />
                        <p className="text-xs">Service image unavailable</p>
                    </div>
                )}
                <span className="absolute top-3 left-3 max-w-[calc(100%-1.5rem)] truncate rounded-full border border-white/60 bg-panel/95 px-2.5 py-1 text-[9px] font-semibold tracking-[0.04em] text-ink uppercase shadow-xs">
                    {category}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-5 lg:p-6">
                <div className="flex items-start justify-between gap-3">
                    <h3
                        title={service.name}
                        className="line-clamp-2 min-w-0 text-xl font-semibold leading-6 tracking-tight"
                    >
                        {service.name}
                    </h3>
                    <p className="shrink-0 pt-0.5 text-sm font-semibold text-brand">
                        {formatServicePrice(service.price)}
                    </p>
                </div>

                <p className="mt-3 line-clamp-2 min-h-12 text-xs leading-6 text-muted">
                    {service.description || 'Contact our team for treatment details.'}
                </p>

                <p className="mt-4 flex items-center gap-1.5 text-[11px] text-subtle">
                    <FiClock aria-hidden="true" size={13} className="shrink-0 text-brand/70" />
                    {service.duration} mins
                </p>

                <div className="mt-auto pt-6">
                    <button
                        type="button"
                        aria-label={`View details for ${service.name}`}
                        aria-haspopup="dialog"
                        aria-controls={dialogId}
                        onClick={() => dialogRef.current?.showModal()}
                        className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#edeae5] px-4 py-3 text-xs font-semibold text-ink transition-colors hover:bg-brand hover:text-white"
                    >
                        View Details
                        <FiArrowUpRight aria-hidden="true" size={15} />
                    </button>
                </div>
            </div>

            <dialog
                ref={dialogRef}
                id={dialogId}
                aria-labelledby={`${dialogId}-title`}
                className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2.5rem)] max-w-xl overflow-y-auto rounded-2xl border border-line bg-panel p-0 text-ink shadow-2xl backdrop:bg-ink/50"
            >
                <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-brand-soft/35">
                    {imageUrl && !imageError ? (
                        <Image
                            src={imageUrl}
                            alt={service.name}
                            fill
                            sizes="(min-width: 576px) 576px, 100vw"
                            className="object-contain"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <FiScissors aria-hidden="true" size={36} className="text-brand/60" />
                    )}
                    <button
                        type="button"
                        aria-label="Close service details"
                        onClick={() => dialogRef.current?.close()}
                        className="absolute top-3 right-3 flex size-10 cursor-pointer items-center justify-center rounded-full border border-line bg-panel text-ink shadow-sm transition-colors hover:bg-brand-soft"
                    >
                        <FiX aria-hidden="true" size={19} />
                    </button>
                </div>
                <div className="p-5 sm:p-7">
                    <p className="text-[10px] font-semibold tracking-wide text-brand uppercase">
                        {category}
                    </p>
                    <h2
                        id={`${dialogId}-title`}
                        className="mt-2 text-3xl leading-tight tracking-tight"
                    >
                        {service.name}
                    </h2>
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-line/70 py-4">
                        <p className="text-lg font-semibold text-brand">
                            {formatServicePrice(service.price)}
                        </p>
                        <p className="flex items-center gap-2 text-xs text-muted">
                            <FiClock aria-hidden="true" size={15} />
                            {service.duration} mins
                        </p>
                    </div>
                    <p className="mt-5 whitespace-pre-line text-sm leading-7 text-muted">
                        {service.description || 'Contact our team for treatment details.'}
                    </p>
                </div>
            </dialog>
        </article>
    );
}
