import Link from 'next/link';
import { FiSearch, FiScissors } from 'react-icons/fi';
import { getServiceProps } from '@/lib/api/services';
import ServiceCard from '@/components/home/ServiceCard';
import ServiceCategoryFilter from '@/components/browseService/ServiceCategoryFilter';
import ServiceSort from '@/components/browseService/ServiceSort';

export default async function BrowseServicePage({ searchParams }: {
    searchParams: Promise<{ search?: string | string[]; category?: string | string[]; sort?: string }>;
}) {
    const params = await searchParams;
    const search = typeof params.search === 'string' ? params.search.trim() : '';
    const categories = search ? [] : (Array.isArray(params.category) ? params.category : [params.category || '']).filter(Boolean);
    const filters = search ? { search, status: 'active' as const } : { category: categories, status: 'active' as const };
    const sort = ['price-asc', 'price-desc'].includes(params.sort || '') ? params.sort! : '';
    const services = await getServiceProps({ ...filters, sort });

    return (
        <section className="bg-[#fbf9f6]">
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
                <header className="max-w-2xl">
                    <p className="text-sm font-semibold tracking-widest text-brand">THE SALONBOOK SERVICE MENU</p>
                    <h1 className="mt-3 text-4xl sm:text-5xl">Find your next moment of care.</h1>
                    <p className="mt-4 text-base leading-7 text-muted">Explore our services and choose a little time for yourself.</p>
                </header>
                <div className="mt-8 rounded-2xl border border-line bg-panel p-4 sm:p-5">
                    <form action="/service" method="GET" className="flex flex-wrap items-center gap-3">
                    {sort && <input type="hidden" name="sort" value={sort} />}
                    <label className="flex min-w-0 flex-1 basis-64 items-center gap-3 rounded-xl border border-line px-4">
                        <FiSearch size={18} aria-hidden="true" className="shrink-0 text-muted" />
                        <input key={search} name="search" type="search" aria-label="Search services" defaultValue={search} placeholder="Search services…" maxLength={120} className="min-h-12 w-full min-w-0 bg-transparent text-base outline-none" />
                    </label>
                    <button type="submit" className="min-h-12 cursor-pointer rounded-xl bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-hover">Search</button>
                    {(search || categories.length > 0) && <Link href="/service" className="inline-flex min-h-12 items-center px-2 text-sm font-semibold text-brand underline underline-offset-4">Clear filters</Link>}
                    </form>
                    <ServiceCategoryFilter categories={categories} sort={sort} />
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-muted">{services.length} {services.length === 1 ? 'service' : 'services'} found</p><ServiceSort sort={sort} search={search} categories={categories} /></div>
                {services.length ? (
                    <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{services.map(service => <ServiceCard key={service._id} service={service} />)}</div>
                ) : (
                    <div className="mt-5 rounded-2xl border border-line bg-panel p-12 text-center">
                        <FiScissors size={30} aria-hidden="true" className="mx-auto text-brand" />
                        <h2 className="mt-4 text-3xl">No services found</h2>
                        <p className="mt-3 text-base text-muted">Try another search or choose a different category.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
