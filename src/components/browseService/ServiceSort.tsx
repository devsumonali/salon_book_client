'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function ServiceSort({
    sort,
    search,
    categories,
}: {
    sort: string;
    search: string;
    categories: string[];
}) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    return (
        <div className="relative">
            <select
                aria-label="Sort services by price"
                value={sort}
                disabled={pending}
                onChange={(event) => {
                    const params = new URLSearchParams();
                    if (search) params.set('search', search);
                    else categories.forEach((category) => params.append('category', category));
                    if (event.target.value) params.set('sort', event.target.value);
                    startTransition(() =>
                        router.push(params.size ? `/service?${params}` : '/service', {
                            scroll: false,
                        }),
                    );
                }}
                className="min-h-11 cursor-pointer appearance-none rounded-xl border border-line bg-panel py-2 pr-10 pl-4 text-sm font-medium text-ink shadow-soft disabled:opacity-60"
            >
                <option value="">Newest services</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
            </select>
            <FiChevronDown
                aria-hidden="true"
                size={15}
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted"
            />
        </div>
    );
}
