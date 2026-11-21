import { getSingleService } from '@/lib/api/services';
import { formatServicePrice, serviceCategories } from '@/lib/service-display';
import type { AddServiceData } from '@/types/service';
import Link from 'next/link';
import { FiChevronRight, FiClock, FiHome, FiScissors } from 'react-icons/fi';
import ServiceDetailImage from './_components/ServiceDetailImage';
import ServiceBookingForm from './_components/ServiceBookingForm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>;
}

const ServiceSinglePage = async ({ params }: Props) => {
    const { id } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        const callbackUrl = `/service/${encodeURIComponent(id)}`;
        redirect(`/sign-in?${new URLSearchParams({ callbackUrl })}`);
    }

    const service: AddServiceData = await getSingleService(id);

    const category = serviceCategories[service.category];
    const today = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Dhaka',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date());

    return (
        <div className="bg-[#fbf9f6]">
            <div className="border-b border-line/70 bg-surface/70">
                <div className="mx-auto flex w-full max-w-360 flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-6 lg:px-8 xl:px-12">
                    <nav aria-label="Breadcrumb" className="min-w-0">
                        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-6 text-muted sm:text-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-1.5 hover:text-brand"
                                >
                                    <FiHome aria-hidden="true" size={13} />
                                    Home
                                </Link>
                            </li>
                            <li aria-hidden="true">
                                <FiChevronRight size={12} />
                            </li>
                            <li>
                                <Link href="/service" className="hover:text-brand">
                                    Browse Services
                                </Link>
                            </li>
                            <li aria-hidden="true">
                                <FiChevronRight size={12} />
                            </li>
                            <li
                                aria-current="page"
                                className="font-semibold wrap-break-word text-ink"
                            >
                                {service.name}
                            </li>
                        </ol>
                    </nav>
                    <span className="inline-flex items-center gap-2 rounded-full border border-line/70 bg-panel px-3 py-1.5 text-xs font-medium text-brand">
                        <FiScissors aria-hidden="true" size={12} />A little time, just for you
                    </span>
                </div>
            </div>

            <div className="mx-auto grid w-full max-w-360 items-start gap-8 px-5 py-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)] lg:gap-10 lg:px-8 lg:py-12 xl:px-12">
                <div className="min-w-0 space-y-6">
                    <ServiceDetailImage
                        image={service.image}
                        name={service.name}
                        category={category?.label || service.category}
                    />

                    <article className="rounded-2xl border border-line/60 bg-panel p-6 sm:p-8">
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                            <span
                                className={`rounded-full px-3 py-1.5 font-semibold ${category?.badgeClass || 'bg-brand-soft text-brand'}`}
                            >
                                {category?.label || service.category}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-muted">
                                <FiClock aria-hidden="true" size={13} />
                                {service.duration} mins
                            </span>
                        </div>

                        <div className="mt-5 flex flex-wrap items-start justify-between gap-5">
                            <h1 className="min-w-0 flex-1 basis-56 text-3xl leading-tight tracking-tight wrap-break-word sm:text-4xl">
                                {service.name}
                            </h1>
                            <div className="shrink-0 lg:text-right">
                                <p className="text-xs font-medium tracking-wider text-subtle uppercase">
                                    Full session
                                </p>
                                <p className="mt-1 font-serif text-3xl text-brand">
                                    {formatServicePrice(service.price)}
                                </p>
                            </div>
                        </div>

                        <div className="mt-7 border-t border-line/70 pt-6">
                            <h2 className="text-xl">About this service</h2>
                            <p className="mt-3 text-base leading-8 wrap-break-word whitespace-pre-line text-muted">
                                {service.description ||
                                    'Contact our team for more details about this service.'}
                            </p>
                        </div>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            <div className="flex items-start gap-3 rounded-xl bg-surface p-4">
                                <FiClock
                                    aria-hidden="true"
                                    size={18}
                                    className="mt-0.5 shrink-0 text-brand"
                                />
                                <div>
                                    <p className="text-sm font-semibold">Time for your treatment</p>
                                    <p className="mt-1 text-sm text-muted">
                                        {service.duration} minutes per session
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-xl bg-surface p-4">
                                <FiScissors
                                    aria-hidden="true"
                                    size={18}
                                    className="mt-0.5 shrink-0 text-brand"
                                />
                                <div>
                                    <p className="text-sm font-semibold">Service category</p>
                                    <p className="mt-1 text-sm text-muted">
                                        {category?.label || service.category}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>

                <aside aria-label="Appointment booking" className="min-w-0 lg:sticky lg:top-28">
                    <ServiceBookingForm
                        serviceName={service.name}
                        serviceCategory={category?.label || service.category}
                        serviceImage={service.image || '/images/salon-hero.jpg'}
                        price={service.price}
                        duration={service.duration}
                        status={service.status}
                        today={today}
                        id={service._id}
                    />
                </aside>
            </div>
        </div>
    );
};

export default ServiceSinglePage;
