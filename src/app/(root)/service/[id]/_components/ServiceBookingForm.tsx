'use client';

import { authClient } from '@/lib/auth-client';
import { formatServicePrice } from '@/lib/service-display';
import type { AddServiceData } from '@/types/service';
import type { PendingBookingData } from '@/types/checkout.data';
import { useId, useState, useTransition, type SubmitEvent } from 'react';
import {
    FiCalendar,
    FiChevronLeft,
    FiChevronRight,
    FiClock,
    FiEdit3,
    FiLoader,
    FiLock,
} from 'react-icons/fi';
import { useRouter } from 'next/navigation';

type ServiceBookingFormProps = Pick<AddServiceData, 'price' | 'duration' | 'status'> & {
    serviceName: string;
    serviceCategory: string;
    serviceImage: string;
    today: string;
    id: string;
};

const preferredTimes = ['09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '05:00 PM'];
const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function parseDate(value: string) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function dateKey(year: number, month: number, day: number) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function ServiceBookingForm({
    serviceName,
    serviceCategory,
    serviceImage,
    price,
    duration,
    status,
    today,
    id,
}: ServiceBookingFormProps) {
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const [isLoading, startTransition] = useTransition();
    const formId = useId();
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState('11:00 AM');
    const [visibleMonth, setVisibleMonth] = useState(() => {
        const date = parseDate(today);
        return new Date(date.getFullYear(), date.getMonth(), 1);
    });

    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const monthLabel = visibleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const firstWeekday = (visibleMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
    const currentMonth = parseDate(today);
    const canGoBack =
        year > currentMonth.getFullYear() ||
        (year === currentMonth.getFullYear() && month > currentMonth.getMonth());
    const selectedDateLabel = parseDate(selectedDate).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    const handleServiceBooking = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            !session?.user ||
            session.user.role !== 'user' ||
            session.user.isBlocked ||
            status === 'inactive' ||
            isLoading
        )
            return;

        const form = e.currentTarget;
        const formData = new FormData(form);

        const bookingData: PendingBookingData = {
            serviceId: id,
            date: selectedDate,
            time: selectedTime,
            notes: String(formData.get('notes') || ''),
            userId: session.user.id,
            name: session.user.name,
            email: session.user.email,
            service: {
                name: serviceName,
                category: serviceCategory,
                image: serviceImage,
                duration,
                price,
            },
        };
        localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
        startTransition(() => {
            router.push(`/checkout?bookingId=${id}`);
        });
    };

    return (
        <form
            aria-labelledby={`${formId}-title`}
            onSubmit={handleServiceBooking}
            className="ui-card overflow-hidden"
        >
            <div className="border-b border-line/70 bg-brand-soft/60 px-5 py-6 sm:px-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-semibold tracking-widest text-brand uppercase">
                        Session reservation
                    </p>
                    <span className="rounded-full bg-panel/80 px-2.5 py-1 text-xs text-brand">
                        Just for you
                    </span>
                </div>
                <h2 id={`${formId}-title`} className="mt-3 text-2xl leading-tight sm:text-3xl">
                    Request Your Appointment
                </h2>
                <p className="mt-2 truncate text-sm text-muted" title={serviceName}>
                    {serviceName}
                </p>
                <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-line/60 bg-panel/85 p-3.5">
                    <FiLock aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-brand" />
                    <p className="text-sm leading-5 text-muted">
                        Your next moment of self-care starts here. Choose a date and time that works
                        for you.
                    </p>
                </div>
            </div>

            <div className="space-y-6 px-5 py-6 sm:px-6">
                <fieldset>
                    <legend className="mb-3 flex w-full flex-wrap items-center justify-between gap-2 text-sm font-semibold">
                        <span className="inline-flex items-center gap-2">
                            <FiCalendar aria-hidden="true" size={15} className="text-brand" />
                            Select a date
                        </span>
                        <span className="text-sm font-medium text-brand">{selectedDateLabel}</span>
                    </legend>
                    <input type="hidden" name="date" value={selectedDate} />
                    <div className="rounded-xl bg-surface p-3 sm:p-4">
                        <div className="mb-2 flex items-center justify-between gap-2">
                            <p aria-live="polite" className="text-sm font-semibold">
                                {monthLabel}
                            </p>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    aria-label="Previous month"
                                    disabled={!canGoBack}
                                    onClick={() => setVisibleMonth(new Date(year, month - 1, 1))}
                                    className="flex size-11 cursor-pointer items-center justify-center rounded-lg text-brand transition-colors hover:bg-brand-soft disabled:cursor-not-allowed disabled:text-subtle/40"
                                >
                                    <FiChevronLeft aria-hidden="true" size={15} />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Next month"
                                    onClick={() => setVisibleMonth(new Date(year, month + 1, 1))}
                                    className="flex size-11 cursor-pointer items-center justify-center rounded-lg text-brand transition-colors hover:bg-brand-soft"
                                >
                                    <FiChevronRight aria-hidden="true" size={15} />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 text-center">
                            {weekdays.map((day) => (
                                <span key={day} className="py-2 text-xs font-semibold text-muted">
                                    {day}
                                </span>
                            ))}
                            {Array.from({ length: cellCount }, (_, index) => {
                                const day = index - firstWeekday + 1;
                                if (day < 1 || day > daysInMonth)
                                    return <span key={`empty-${index}`} />;
                                const value = dateKey(year, month, day);
                                const isSelected = value === selectedDate;
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        disabled={value < today}
                                        aria-label={new Date(year, month, day).toLocaleDateString(
                                            'en-US',
                                            { dateStyle: 'full' },
                                        )}
                                        aria-pressed={isSelected}
                                        aria-current={value === today ? 'date' : undefined}
                                        onClick={() => setSelectedDate(value)}
                                        className={`m-0.5 flex min-h-10 cursor-pointer items-center justify-center rounded-lg text-sm transition-colors disabled:cursor-not-allowed disabled:text-subtle/40 ${isSelected ? 'bg-brand font-semibold text-white shadow-sm' : 'text-ink enabled:hover:bg-brand-soft'}`}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend className="mb-3 inline-flex items-center gap-2 text-sm font-semibold">
                        <FiClock aria-hidden="true" size={15} className="text-brand" />
                        Choose your time
                    </legend>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5">
                        {preferredTimes.map((time) => (
                            <label key={time} className="relative cursor-pointer">
                                <input
                                    type="radio"
                                    name="time"
                                    value={time}
                                    checked={selectedTime === time}
                                    onChange={() => setSelectedTime(time)}
                                    className="peer sr-only"
                                />
                                <span className="flex min-h-11 items-center justify-center rounded-xl border border-line bg-surface px-1.5 py-2 text-sm font-semibold transition-colors peer-checked:border-brand/40 peer-checked:bg-brand-soft peer-checked:text-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:border-brand/30">
                                    {time}
                                </span>
                            </label>
                        ))}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted">
                        Preferred times are subject to confirmation.
                    </p>
                </fieldset>

                <div>
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <label
                            htmlFor={`${formId}-notes`}
                            className="inline-flex items-center gap-2 text-sm font-semibold"
                        >
                            <FiEdit3 aria-hidden="true" size={15} className="text-brand" />
                            Special requests
                        </label>
                        <span className="text-xs text-subtle">Optional</span>
                    </div>
                    <textarea
                        id={`${formId}-notes`}
                        name="notes"
                        rows={3}
                        maxLength={1000}
                        placeholder="Tell us about your preferences or anything you would like us to know…"
                        className="block w-full resize-y rounded-xl border border-transparent bg-surface p-3.5 text-sm leading-6 text-ink placeholder:text-subtle focus:border-brand/40"
                    />
                </div>

                <div className="rounded-xl bg-surface p-4">
                    <dl className="space-y-3 text-sm">
                        <div className="flex items-center justify-between gap-4">
                            <dt className="text-muted">Service subtotal</dt>
                            <dd className="font-medium">{formatServicePrice(price)}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <dt className="text-muted">Session duration</dt>
                            <dd>{duration} mins</dd>
                        </div>
                        <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
                            <dt className="font-semibold">Service total</dt>
                            <dd className="text-lg font-semibold text-brand">
                                {formatServicePrice(price)}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={status === 'inactive' || isLoading}
                        aria-busy={isLoading}
                        aria-describedby={`${formId}-booking-note`}
                        className="ui-button w-full"
                    >
                        {isLoading ? (
                            <FiLoader aria-hidden="true" size={16} className="animate-spin" />
                        ) : (
                            <FiCalendar aria-hidden="true" size={16} />
                        )}
                        {status === 'inactive'
                            ? 'Service currently unavailable'
                            : isLoading
                              ? 'Processing...'
                              : 'Submit Appointment Request'}
                    </button>
                </div>
            </div>
        </form>
    );
}
