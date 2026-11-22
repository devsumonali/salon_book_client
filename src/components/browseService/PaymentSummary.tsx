'use client';

import { FiCalendar, FiLock } from 'react-icons/fi';
import { formatServicePrice } from '@/lib/service-display';
import { requestCustomerAppointment } from '@/lib/actions/customer';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function PaymentSummary({ price }: { price: number }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handlePayment = async () => {
        setIsLoading(true);
        try {
            const savedBooking = localStorage.getItem('pendingBooking');

            if (!savedBooking) {
                throw new Error('Booking details not found');
            }

            const bookingData = JSON.parse(savedBooking);
            const data = await requestCustomerAppointment(bookingData);

            if (data.error) throw new Error(data.error);

            localStorage.removeItem('pendingBooking');
            toast.success(data.message || 'Appointment requested');
            router.push('/dashboard/customer/my-appointments');
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Unable to request appointment');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <aside aria-labelledby="payment-title" className="min-w-0 lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_10px_40px_-20px_rgba(36,32,30,0.25)]">
                <div className="border-b border-line bg-brand-soft/50 px-5 py-6 sm:px-7">
                    <p className="text-sm font-medium text-brand">A little time, just for you</p>
                    <h2 id="payment-title" className="mt-2 text-3xl">
                        Booking summary
                    </h2>
                </div>

                <div className="p-5 sm:p-7">
                    <dl className="space-y-4 text-base">
                        <div className="flex items-center justify-between gap-4">
                            <dt className="text-muted">Service subtotal</dt>
                            <dd className="font-medium">{formatServicePrice(price)}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <dt className="text-muted">Booking fee</dt>
                            <dd className="font-medium">{formatServicePrice(0)}</dd>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                            <dt className="font-semibold">Service total</dt>
                            <dd className="font-serif text-4xl text-brand">
                                {formatServicePrice(price)}
                            </dd>
                        </div>
                    </dl>

                    <div className="mt-7 rounded-xl border border-line bg-surface/70 p-4">
                        <div className="flex items-center gap-2.5">
                            <FiCalendar
                                aria-hidden="true"
                                size={20}
                                className="shrink-0 text-brand"
                            />
                            <p className="text-base font-semibold">Request your appointment</p>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted">
                            Your request will be Pending. Once the salon confirms it, you can pay
                            securely through Stripe from My Appointments.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handlePayment}
                        disabled={isLoading}
                        className="mt-6 flex min-h-13 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-brand px-5 py-3.5 text-base font-semibold text-white shadow-sm disabled:cursor-not-allowed"
                    >
                        <FiLock aria-hidden="true" size={17} />
                        {isLoading ? 'Requesting...' : 'Request Appointment'}
                    </button>
                </div>
            </div>

            <p className="mt-5 px-4 text-center text-sm leading-6 text-muted">
                Check your details before sending your appointment request. No payment is taken now.
            </p>
        </aside>
    );
}
