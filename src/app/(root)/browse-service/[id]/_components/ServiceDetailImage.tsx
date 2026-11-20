'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiScissors } from 'react-icons/fi';

type ServiceDetailImageProps = {
    image?: string;
    name: string;
    category: string;
};

export default function ServiceDetailImage({ image, name, category }: ServiceDetailImageProps) {
    const [failedImage, setFailedImage] = useState<string | null>(null);
    const imageUrl = image?.startsWith('https://') ? image : undefined;

    return (
        <div className="relative flex aspect-5/4 items-center justify-center overflow-hidden rounded-2xl border border-line bg-brand-soft/45 sm:aspect-6/5">
            {imageUrl && failedImage !== imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(min-width: 1280px) 675px, (min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                    onError={() => setFailedImage(imageUrl)}
                />
            ) : (
                <div className="flex flex-col items-center gap-4 px-6 text-center text-brand/70">
                    <FiScissors aria-hidden="true" size={48} strokeWidth={1} />
                    <p className="font-serif text-2xl">{name}</p>
                    <p className="text-sm">Service image unavailable</p>
                </div>
            )}
            <span className="absolute top-4 left-4 rounded-full border border-white/70 bg-panel/95 px-3 py-1.5 text-xs font-semibold tracking-wide text-brand uppercase sm:top-5 sm:left-5">
                The SalonBook experience
            </span>
            <span className="absolute bottom-4 left-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-lg bg-ink/75 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm sm:bottom-5 sm:left-5">
                <FiScissors aria-hidden="true" size={13} className="shrink-0" />
                <span className="truncate">{category}</span>
            </span>
        </div>
    );
}
