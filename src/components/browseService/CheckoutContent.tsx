'use client';

import { startTransition, useEffect, useState } from 'react';
import Link from 'next/link';
import type { CheckoutBooking, PendingBookingData } from '@/types/checkout.data';
import BookingSummary from './BookingSummary';
import CustomerDetails from './CustomerDetails';
import PaymentSummary from './PaymentSummary';

const CheckoutContent = () => {
    const [booking, setBooking] = useState<CheckoutBooking | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        startTransition(() => {
            const savedBooking = localStorage.getItem('pendingBooking');

            if (savedBooking) {
                try {
                    const data: PendingBookingData = JSON.parse(savedBooking);

                    if (data?.service) {
                        setBooking({
                            service: data.service,
                            date: new Date(`${data.date}T00:00:00`).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            }),
                            time: data.time,
                            customer: {
                                fullName: data.name,
                                email: data.email,
                                notes: data.notes,
                            },
                        });
                    }
                } catch {
                    setBooking(null);
                }
            }

            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <p role="status" className="mt-8 text-muted">
                Loading booking details...
            </p>
        );
    }

    if (!booking) {
        return (
            <div className="mt-8 rounded-2xl border border-line bg-panel p-6">
                <p className="text-base text-muted">
                    No booking details found. Please select a service first.
                </p>
                <Link
                    href="/service"
                    className="mt-4 inline-block font-semibold text-brand underline underline-offset-4"
                >
                    Browse services
                </Link>
            </div>
        );
    }

    return (
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)] lg:gap-8">
            <div className="min-w-0 space-y-6">
                <BookingSummary booking={booking} />
                <CustomerDetails customer={booking.customer} />
            </div>
            <PaymentSummary price={booking.service.price} />
        </div>
    );
};

export default CheckoutContent;
