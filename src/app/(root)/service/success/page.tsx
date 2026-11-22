import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FiCalendar, FiCheck, FiClock, FiHeart, FiHome, FiInfo } from 'react-icons/fi';
import { getCheckoutSession } from '@/lib/api/booking';
import { auth } from '@/lib/auth';
import type { CheckoutSessionData } from '@/types/checkout.data';

export const metadata: Metadata = {
    title: 'Thank You | SalonBook',
    description: 'Thank you for choosing SalonBook for your next moment of self-care.',
};

const SuccessPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string | string[] }>;
}) => {
    const { session_id: sessionId } = await searchParams;
    let checkout: CheckoutSessionData | null = null;

    if (typeof sessionId === 'string' && /^cs_[a-zA-Z0-9_]+$/.test(sessionId)) {
        const session = await auth.api.getSession({ headers: await headers() });

        if (!session) {
            const callbackUrl = `/service/success?${new URLSearchParams({ session_id: sessionId })}`;
            redirect(`/sign-in?${new URLSearchParams({ callbackUrl })}`);
        }

        try {
            checkout = await getCheckoutSession(sessionId, session.session.token);
        } catch {
            checkout = null;
        }
    }

    const isPaid =
        checkout?.status === 'complete' &&
        (checkout.paymentStatus === 'paid' || checkout.paymentStatus === 'no_payment_required');
    const StatusIcon = isPaid ? FiCheck : checkout ? FiClock : FiInfo;
    const statusLabel = isPaid
        ? 'Payment successful'
        : checkout?.status === 'complete'
          ? 'Payment processing'
          : checkout?.status === 'expired'
            ? 'Checkout expired'
            : checkout
              ? 'Payment not completed'
              : 'Checkout details unavailable';
    const appointmentDate = checkout ? new Date(`${checkout.date}T00:00:00+06:00`) : null;
    const dateLabel =
        appointmentDate && !Number.isNaN(appointmentDate.getTime())
            ? appointmentDate.toLocaleDateString('en-US', {
                  timeZone: 'Asia/Dhaka',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
              })
            : checkout?.date;
    const total =
        checkout?.amountTotal != null && checkout.currency
            ? new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: checkout.currency.toUpperCase(),
              }).format(checkout.amountTotal / 100)
            : 'Unavailable';
    const details = checkout
        ? [
              { label: 'Service', value: checkout.serviceName },
              { label: 'Customer', value: checkout.name },
              { label: 'Email', value: checkout.email },
              { label: 'Appointment date', value: dateLabel },
              { label: 'Preferred time', value: `${checkout.time} (Asia/Dhaka)` },
              { label: 'Payment status', value: statusLabel },
          ]
        : [];

    return (
        <section
            aria-labelledby="success-title"
            className="flex min-h-[75dvh] items-center justify-center bg-surface px-5 py-12 sm:px-8 sm:py-20"
        >
            <div className="w-full max-w-5xl text-center">
                <p className="mb-6 text-sm font-semibold tracking-[0.2em] text-brand uppercase">
                    A little time, just for you
                </p>

                <div className="relative overflow-hidden rounded-3xl border border-line bg-panel px-6 py-10 shadow-[0_20px_70px_-35px_rgba(36,32,30,0.2)] sm:px-12 sm:py-12 lg:px-16">
                    <div
                        aria-hidden="true"
                        className={`absolute inset-x-0 top-0 h-1.5 ${isPaid ? 'bg-[#71846b]' : 'bg-brand'}`}
                    />
                    <div
                        aria-hidden="true"
                        className={`mx-auto flex size-24 items-center justify-center rounded-full border ring-8 ${isPaid ? 'border-[#dce6d6] bg-[#f3f7ef] text-[#4c6541] ring-[#f8faf5]' : 'border-brand/15 bg-brand-soft/60 text-brand ring-surface'}`}
                    >
                        <StatusIcon size={40} strokeWidth={1.5} />
                    </div>

                    <p
                        className={`mt-8 text-sm font-semibold tracking-widest uppercase ${isPaid ? 'text-[#4c6541]' : 'text-brand'}`}
                    >
                        {statusLabel}
                    </p>
                    <h1
                        id="success-title"
                        className="mx-auto mt-3 max-w-2xl text-4xl leading-tight tracking-tight sm:text-5xl"
                    >
                        {isPaid
                            ? 'A lovely moment awaits.'
                            : checkout
                              ? 'Your payment is not confirmed yet.'
                              : "Let's find your checkout."}
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">
                        {isPaid
                            ? 'Thank you for choosing SalonBook. We look forward to making your next moment of self-care feel special.'
                            : checkout
                              ? 'Review your checkout details and payment status below.'
                              : 'We could not load your checkout details. Please return to checkout and try again.'}
                    </p>

                    {checkout && (
                        <section
                            aria-labelledby="checkout-details-title"
                            className="mt-8 overflow-hidden rounded-2xl border border-line text-left"
                        >
                            <div className="border-b border-line bg-surface/70 px-5 py-4">
                                <h2 id="checkout-details-title" className="text-2xl">
                                    Your checkout details
                                </h2>
                            </div>
                            <dl className="grid gap-x-6 gap-y-5 px-5 py-6 sm:grid-cols-2">
                                {details.map(({ label, value }) => (
                                    <div key={label} className="min-w-0">
                                        <dt className="text-sm text-muted">{label}</dt>
                                        <dd className="mt-1.5 text-base font-semibold wrap-break-word">
                                            {value || 'Not provided'}
                                        </dd>
                                    </div>
                                ))}
                                {checkout.notes && (
                                    <div className="min-w-0 sm:col-span-2">
                                        <dt className="text-sm text-muted">Special requests</dt>
                                        <dd className="mt-1.5 text-base leading-7 wrap-break-word whitespace-pre-wrap">
                                            {checkout.notes}
                                        </dd>
                                    </div>
                                )}
                                <div className="min-w-0 border-t border-line pt-5 sm:col-span-2">
                                    <dt className="text-sm text-muted">Booking reference</dt>
                                    <dd className="mt-1.5 text-sm font-medium break-all">
                                        {checkout.bookingId}
                                    </dd>
                                </div>
                                <div className="min-w-0 sm:col-span-2">
                                    <dt className="text-sm text-muted">Checkout reference</dt>
                                    <dd className="mt-1.5 text-sm font-medium break-all">
                                        {checkout.id}
                                    </dd>
                                </div>
                            </dl>
                            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface/70 px-5 py-5">
                                <p className="text-base font-semibold">
                                    {isPaid ? 'Total paid' : 'Checkout total'}
                                </p>
                                <p className="font-serif text-3xl text-brand">{total}</p>
                            </div>
                        </section>
                    )}

                    {isPaid && (
                        <div className="mt-8 flex gap-3 rounded-2xl border border-line/70 bg-surface/70 p-5 text-left">
                            <FiHeart
                                aria-hidden="true"
                                size={20}
                                className="mt-0.5 shrink-0 text-brand"
                            />
                            <div>
                                <h2 className="font-sans text-base font-semibold">Before your visit</h2>
                                <p className="mt-1.5 text-base leading-7 text-muted">
                                    Keep your chosen date and time handy. Have a preference or special
                                    request? Share it with your stylist when you arrive.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        <Link
                            href="/dashboard/customer/my-appointments"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-hover"
                        >
                            <FiCalendar aria-hidden="true" size={18} />
                            My Appointments
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line px-5 py-3 text-base font-semibold text-ink transition-colors hover:bg-surface"
                        >
                            <FiHome aria-hidden="true" size={18} />
                            Back to home
                        </Link>
                    </div>
                </div>

                <p className="mt-6 text-sm leading-6 text-muted">
                    Good hair days. Quiet moments. A little care for you.
                </p>
            </div>
        </section>
    );
};

export default SuccessPage;
