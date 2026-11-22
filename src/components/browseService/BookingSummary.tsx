import Image from 'next/image';
import { FiCalendar, FiClock, FiScissors } from 'react-icons/fi';
import { formatServicePrice, serviceCategories } from '@/lib/service-display';
import { CheckoutBooking } from '@/types/checkout.data';

export default function BookingSummary({ booking }: { booking: CheckoutBooking }) {
    const { service, date, time } = booking;
    const category =
        serviceCategories[service.category as keyof typeof serviceCategories]?.label ||
        service.category;

    return (
        <section
            aria-labelledby="appointment-title"
            className="overflow-hidden rounded-2xl border border-line bg-panel shadow-card"
        >
            <div className="flex items-center gap-3 border-b border-line/70 px-5 py-5 sm:px-7">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft/70 text-brand">
                    <FiScissors aria-hidden="true" size={19} />
                </span>
                <h2 id="appointment-title" className="text-2xl">
                    Your appointment
                </h2>
            </div>

            <div className="p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-5">
                    <Image
                        src={service.image}
                        alt={service.name}
                        width={104}
                        height={112}
                        className="h-28 w-26 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1 basis-44">
                        <p className="text-sm font-medium text-brand">{category}</p>
                        <h3 className="mt-1.5 text-2xl leading-tight">{service.name}</h3>
                        <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                            <FiClock aria-hidden="true" size={15} />
                            {service.duration} minute session
                        </p>
                    </div>
                    <p className="font-serif text-3xl text-brand">
                        {formatServicePrice(service.price)}
                    </p>
                </div>

                <dl className="mt-6 grid gap-4 border-t border-line/70 pt-6 sm:grid-cols-[1.3fr_1fr]">
                    <div className="flex items-start gap-3 rounded-xl bg-surface p-4">
                        <FiCalendar
                            aria-hidden="true"
                            size={19}
                            className="mt-0.5 shrink-0 text-brand"
                        />
                        <div>
                            <dt className="text-sm text-muted">Booking date</dt>
                            <dd className="mt-1 text-base font-semibold leading-6">{date}</dd>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-surface p-4">
                        <FiClock
                            aria-hidden="true"
                            size={19}
                            className="mt-0.5 shrink-0 text-brand"
                        />
                        <div>
                            <dt className="text-sm text-muted">Preferred time</dt>
                            <dd className="mt-1 text-base font-semibold">{time}</dd>
                            <dd className="mt-1 text-xs text-subtle">Asia/Dhaka</dd>
                        </div>
                    </div>
                </dl>
            </div>
        </section>
    );
}
