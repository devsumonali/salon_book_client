'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { serviceCategories } from '@/lib/service-display';

export default function ServiceCategoryFilter({ categories, sort = '' }: { categories: string[]; sort?: string }) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    return (
        <form action="/service" method="GET" className="mt-5" aria-busy={pending} onChange={(event) => {
            const values = new FormData(event.currentTarget).getAll('category');
            const params = new URLSearchParams();
            if (sort) params.set('sort', sort);
            values.forEach(value => params.append('category', String(value)));
            startTransition(() => router.push(params.size ? `/service?${params}` : '/service', { scroll: false }));
        }}>
            <fieldset key={categories.join(',')} disabled={pending}>
                <legend className="text-sm font-semibold">Categories</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(serviceCategories).map(([value, details]) => (
                        <label key={value} className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border border-line px-3.5 py-2 text-sm text-muted transition-colors hover:border-brand/40 has-checked:border-brand/40 has-checked:bg-brand-soft/40 has-checked:text-brand">
                            <input type="checkbox" name="category" value={value} defaultChecked={categories.includes(value)} className="size-4 shrink-0 cursor-pointer accent-brand" />
                            {details.label}
                        </label>
                    ))}
                </div>
            </fieldset>
            <p role="status" className="mt-3 text-sm text-muted">{pending ? 'Updating services…' : 'Leave all categories unchecked to view every service.'}</p>
        </form>
    );
}
