'use client';

import type { AddServiceData, ServiceCategory } from '@/types/service';
import Link from 'next/link';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiPlusCircle, FiScissors, FiSearch } from 'react-icons/fi';
import ManageServiceCard from './ManageServiceCard';
import { serviceCategories } from '@/lib/service-display';

type ManageServicesContentProps = {
    services: AddServiceData[];
};

type StatusFilter = 'all' | AddServiceData['status'];

const pageSize = 4;

export default function ManageServicesContent({ services }: ManageServicesContentProps) {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<StatusFilter>('all');
    const [category, setCategory] = useState<ServiceCategory | 'all'>('all');
    const [page, setPage] = useState(1);

    const activeCount = services.filter((service) => service.status === 'active').length;
    const inactiveCount = services.filter((service) => service.status === 'inactive').length;
    const statusFilters: { value: StatusFilter; label: string; count: number }[] = [
        { value: 'all', label: 'All', count: services.length },
        { value: 'active', label: 'Active', count: activeCount },
        { value: 'inactive', label: 'Inactive', count: inactiveCount },
    ];

    const filteredServices = services.filter((service) => {
        const text = `${service.name} ${service.description} ${serviceCategories[service.category]?.label || service.category}`;
        return (
            text.toLowerCase().includes(search.trim().toLowerCase()) &&
            (status === 'all' || service.status === status) &&
            (category === 'all' || service.category === category)
        );
    });

    const pageCount = Math.ceil(filteredServices.length / pageSize);
    const currentPage = Math.min(page, Math.max(1, pageCount));
    const startIndex = (currentPage - 1) * pageSize;
    const visibleServices = filteredServices.slice(startIndex, startIndex + pageSize);

    function clearFilters() {
        setSearch('');
        setStatus('all');
        setCategory('all');
        setPage(1);
    }

    return (
        <div className="mt-6 space-y-5">
            <section
                aria-label="Service filters"
                className="rounded-2xl border border-line bg-panel p-4 shadow-card sm:p-4"
            >
                <div className="flex flex-wrap items-center gap-3">
                    <label className="flex min-h-11 min-w-0 basis-56 grow items-center gap-2.5 rounded-lg bg-surface px-3.5 focus-within:ring-2 focus-within:ring-brand/30">
                        <FiSearch aria-hidden="true" size={15} className="shrink-0 text-subtle" />
                        <input
                            type="search"
                            aria-label="Search services"
                            placeholder="Filter by service name, category, or description…"
                            value={search}
                            onChange={(event) => {
                                setSearch(event.currentTarget.value);
                                setPage(1);
                            }}
                            className="min-h-11 w-full min-w-0 bg-transparent text-sm text-ink placeholder:text-subtle focus:outline-none"
                        />
                    </label>

                    <div
                        role="group"
                        aria-label="Filter by service status"
                        className="flex min-h-11 items-center rounded-lg bg-surface p-1"
                    >
                        {statusFilters.map((filter) => (
                            <button
                                key={filter.value}
                                type="button"
                                aria-pressed={status === filter.value}
                                onClick={() => {
                                    setStatus(filter.value);
                                    setPage(1);
                                }}
                                className={`min-h-9 cursor-pointer whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors ${status === filter.value ? 'bg-panel text-ink shadow-xs' : 'text-muted hover:text-brand'}`}
                            >
                                {filter.label} ({filter.count})
                            </button>
                        ))}
                    </div>

                    <Link
                        href="/dashboard/admin/add-services"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-brand-hover/40 bg-brand px-4 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-hover"
                    >
                        <FiPlusCircle aria-hidden="true" size={16} />
                        Add New Service
                    </Link>
                </div>

                <div
                    role="group"
                    aria-label="Filter by service category"
                    className="mt-3 flex flex-wrap gap-2"
                >
                    <button
                        type="button"
                        aria-pressed={category === 'all'}
                        onClick={() => {
                            setCategory('all');
                            setPage(1);
                        }}
                        className={`min-h-8 cursor-pointer rounded-full px-3 text-sm font-medium transition-colors ${category === 'all' ? 'bg-ink text-white' : 'bg-surface text-muted hover:bg-brand-soft'}`}
                    >
                        All Categories
                    </button>
                    {(Object.keys(serviceCategories) as ServiceCategory[]).map((value) => (
                        <button
                            key={value}
                            type="button"
                            aria-pressed={category === value}
                            onClick={() => {
                                setCategory(value);
                                setPage(1);
                            }}
                            className={`min-h-8 cursor-pointer rounded-full px-3 text-sm font-medium transition-colors ${category === value ? 'bg-brand-soft text-brand' : 'bg-surface text-muted hover:bg-brand-soft'}`}
                        >
                            {serviceCategories[value].label}
                        </button>
                    ))}
                </div>
            </section>

            <section
                aria-label="Salon service catalog"
                className="overflow-hidden rounded-xl border border-line/50 bg-panel shadow-xs"
            >
                <div
                    aria-hidden="true"
                    className="hidden items-center gap-x-4 bg-surface px-5 py-4 text-sm font-semibold tracking-[0.04em] text-muted xl:grid xl:grid-cols-[minmax(0,1fr)_136px_88px_100px_80px_96px]"
                >
                    <span>SERVICE DETAILS</span>
                    <span>CATEGORY</span>
                    <span>DURATION</span>
                    <span>PRICING</span>
                    <span>STATUS</span>
                    <span className="text-right">ACTIONS</span>
                </div>

                <div aria-live="polite" aria-atomic="true" className="sr-only">
                    {filteredServices.length} services found. Page {currentPage} of{' '}
                    {Math.max(1, pageCount)}.
                </div>

                {visibleServices.length > 0 ? (
                    <ul className="divide-y divide-line/40">
                        {visibleServices.map((service) => (
                            <ManageServiceCard key={service._id} service={service} />
                        ))}
                    </ul>
                ) : (
                    <div className="flex min-h-64 flex-col items-center justify-center px-5 py-12 text-center">
                        <span className="flex size-12 items-center justify-center rounded-full bg-brand-soft/50 text-brand">
                            <FiScissors aria-hidden="true" size={21} />
                        </span>
                        <h2 className="mt-4 text-2xl">
                            {services.length === 0
                                ? 'Your service menu starts here'
                                : 'No matching services'}
                        </h2>
                        <p className="mt-2 text-xs leading-6 text-muted">
                            {services.length === 0
                                ? 'Add your first salon service to build your booking catalog.'
                                : 'Try a different search or clear your filters.'}
                        </p>
                        {services.length === 0 ? (
                            <Link
                                href="/dashboard/admin/add-services"
                                className="mt-4 text-xs font-semibold text-brand underline underline-offset-4"
                            >
                                Add your first service
                            </Link>
                        ) : (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-4 cursor-pointer text-xs font-semibold text-brand underline underline-offset-4"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                )}

                <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line/40 bg-surface/60 px-4 py-4 sm:px-5">
                    <p className="text-sm leading-5 text-muted">
                        Showing {filteredServices.length === 0 ? 0 : startIndex + 1}–
                        {Math.min(startIndex + pageSize, filteredServices.length)} of{' '}
                        {filteredServices.length} services
                    </p>

                    {pageCount > 1 && (
                        <nav
                            aria-label="Service pagination"
                            className="flex flex-wrap items-center gap-1.5"
                        >
                            <button
                                type="button"
                                aria-label="Previous page"
                                disabled={currentPage === 1}
                                onClick={() => setPage(currentPage - 1)}
                                className="flex size-9 cursor-pointer items-center justify-center rounded-lg bg-panel text-brand transition-colors hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <FiChevronLeft aria-hidden="true" size={15} />
                            </button>
                            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                                (number) => (
                                    <button
                                        key={number}
                                        type="button"
                                        aria-label={`Page ${number}`}
                                        aria-current={currentPage === number ? 'page' : undefined}
                                        onClick={() => setPage(number)}
                                        className={`flex size-9 cursor-pointer items-center justify-center rounded-lg text-xs font-medium transition-colors ${currentPage === number ? 'bg-brand text-white' : 'bg-panel text-ink hover:bg-brand-soft'}`}
                                    >
                                        {number}
                                    </button>
                                ),
                            )}
                            <button
                                type="button"
                                aria-label="Next page"
                                disabled={currentPage === pageCount}
                                onClick={() => setPage(currentPage + 1)}
                                className="flex size-9 cursor-pointer items-center justify-center rounded-lg bg-panel text-brand transition-colors hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <FiChevronRight aria-hidden="true" size={15} />
                            </button>
                        </nav>
                    )}
                </footer>
            </section>
        </div>
    );
}
