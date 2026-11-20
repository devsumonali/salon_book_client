import AddServiceForm from '@/app/(dashboard)/_components/AddServiceForm';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

export default function AddServices() {
    return (
        <section className="-m-5 min-h-full bg-[#fbf9f6] p-5 sm:-m-6 sm:p-6 lg:min-h-dvh">
            <div className="mx-auto max-w-6xl">
                <header className="border-b border-line/60 pb-6">
                    <nav aria-label="Breadcrumb" className="mb-1 text-xs">
                        <ol className="flex flex-wrap items-center gap-2">
                            <li>
                                <Link
                                    href="/dashboard/admin/manage-services"
                                    className="transition-colors hover:text-brand"
                                >
                                    Manage Services
                                </Link>
                            </li>
                            <li aria-hidden="true">
                                <FiChevronRight size={13} className="text-subtle" />
                            </li>
                            <li aria-current="page">Add New Service</li>
                        </ol>
                    </nav>

                    <div className="flex flex-wrap items-start justify-between gap-5">
                        <div>
                            <h1 className="text-[32px] leading-tight tracking-tight">
                                Add New Service
                            </h1>
                            <p className="mt-2 text-sm text-muted">
                                Create a new salon service for your booking catalog.
                            </p>
                        </div>
                    </div>
                </header>

                <AddServiceForm />
            </div>
        </section>
    );
}
