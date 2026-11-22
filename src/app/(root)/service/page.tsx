import Link from 'next/link';
import { FiSearch, FiScissors, FiX } from 'react-icons/fi';
import { getServiceProps } from '@/lib/api/services';
import ServiceCard from '@/components/home/ServiceCard';
import ServiceCategoryFilter from '@/components/browseService/ServiceCategoryFilter';
import ServiceSort from '@/components/browseService/ServiceSort';

export default async function BrowseServicePage({
    searchParams,
}: {
    searchParams: Promise<{
        search?: string | string[];
        category?: string | string[];
        sort?: string;
    }>;
}) {
    const params = await searchParams;
    const search = typeof params.search === 'string' ? params.search.trim() : '';
    const categories = search
        ? []
        : (Array.isArray(params.category) ? params.category : [params.category || '']).filter(
              Boolean,
          );
    const filters = search ? { search } : { category: categories };
    const sort = ['price-asc', 'price-desc'].includes(params.sort || '') ? params.sort! : '';
    const services = await getServiceProps({ ...filters, sort });

    return (
        <section className="min-h-[70dvh] bg-surface pb-16 sm:pb-20">
            <div className="border-b border-line bg-[#fcfaf8]">
                <header className="site-container py-10 text-center sm:py-14">
                    <p className="page-kicker">THE SALONBOOK SERVICE MENU</p>
                    <h1 className="page-heading mt-4">Find your next moment of care.</h1>
                    <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-muted">
                        A fresh look, a little reset, or something just for you.
                        <br className="hidden sm:block" />
                        Explore our services and make time for yourself.
                    </p>
                </header>
            </div>
            <div className="site-container pt-7 sm:pt-9">
                <div className="ui-card p-4 sm:p-6">
                    <form
                        action="/service"
                        method="GET"
                        className="flex flex-wrap items-center gap-3"
                    >
                        {sort && <input type="hidden" name="sort" value={sort} />}
                        <label className="flex min-w-0 flex-1 basis-60 items-center gap-3 rounded-xl border border-line bg-surface/70 px-4 focus-within:border-brand focus-within:ring-3 focus-within:ring-brand/10">
                            <FiSearch
                                size={19}
                                aria-hidden="true"
                                className="shrink-0 text-muted"
                            />
                            <input
                                key={search}
                                name="search"
                                type="search"
                                aria-label="Search services"
                                defaultValue={search}
                                placeholder="Search for your favorite service..."
                                maxLength={120}
                                className="min-h-13 w-full min-w-0 bg-transparent text-base outline-none focus-visible:outline-none"
                            />
                        </label>
                        <button type="submit" className="ui-button min-h-13 px-7">
                            Search services
                        </button>
                        {(search || categories.length > 0) && (
                            <Link
                                href="/service"
                                className="inline-flex min-h-12 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-muted hover:bg-surface hover:text-brand"
                            >
                                <FiX size={16} aria-hidden="true" />
                                Clear filters
                            </Link>
                        )}
                    </form>
                    <ServiceCategoryFilter categories={categories} sort={sort} />
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-muted">
                        <span className="font-bold text-ink">{services.length}</span>{' '}
                        {services.length === 1 ? 'service' : 'services'} found
                        {search && <span> for &ldquo;{search}&rdquo;</span>}
                    </p>
                    <ServiceSort sort={sort} search={search} categories={categories} />
                </div>
                {services.length ? (
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                        {services.map((service) => (
                            <ServiceCard key={service._id} service={service} />
                        ))}
                    </div>
                ) : (
                    <div className="ui-card mt-6 px-5 py-16 text-center">
                        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                            <FiScissors size={27} aria-hidden="true" />
                        </span>
                        <h2 className="mt-6 text-3xl">No services found</h2>
                        <p className="mt-3 text-base text-muted">
                            Try another search or choose a different category.
                        </p>
                        <Link href="/service" className="ui-button-secondary mt-6">
                            View all services
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
