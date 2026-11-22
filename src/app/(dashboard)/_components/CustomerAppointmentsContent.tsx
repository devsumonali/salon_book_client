'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
    FiCalendar,
    FiCheckCircle,
    FiChevronDown,
    FiChevronLeft,
    FiChevronRight,
    FiClock,
    FiCreditCard,
    FiEye,
    FiFileText,
    FiLock,
    FiPlus,
    FiSearch,
    FiXCircle,
} from 'react-icons/fi';
import { formatServicePrice, serviceCategories } from '@/lib/service-display';
import ServiceDialog from './ServiceDialog';
import {
    appointmentStatusStyles,
    formatAppointmentDate,
    formatAppointmentEvent,
    type AppointmentDisplayData,
} from './customer-appointment-demo';

type View = 'appointments' | 'history' | 'payments';
type DialogView = 'details' | 'cancel' | 'payment';
type StatusFilter = 'all' | AppointmentDisplayData['status'];
type PaymentFilter = 'all' | AppointmentDisplayData['paymentStatus'];
const pageSize = 4;

function StatusBadge({ status }: { status: AppointmentDisplayData['status'] }) {
    const style = appointmentStatusStyles[status];
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1.5 text-sm font-medium ${style.className}`}
        >
            {style.label}
        </span>
    );
}

function PaymentBadge({ status }: { status: AppointmentDisplayData['paymentStatus'] }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${status === 'paid' ? 'bg-[#eaf2e9] text-[#3f6344]' : 'bg-surface text-muted'}`}
        >
            {status === 'paid' && <FiCheckCircle size={14} aria-hidden="true" />}
            {status === 'paid' ? 'Paid' : 'Unpaid'}
        </span>
    );
}

export default function CustomerAppointmentsContent({
    appointments,
}: {
    appointments: AppointmentDisplayData[];
}) {
    const [view, setView] = useState<View>('appointments');
    const [status, setStatus] = useState<StatusFilter>('all');
    const [payment, setPayment] = useState<PaymentFilter>('all');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<AppointmentDisplayData | null>(null);
    const [dialogView, setDialogView] = useState<DialogView>('details');
    const dialogRef = useRef<HTMLDialogElement>(null);

    const paidAppointments = appointments.filter(
        (appointment) => appointment.paymentStatus === 'paid',
    );
    const historicalAppointments = appointments.filter((appointment) => appointment.isPast);
    const summaryCards = [
        {
            label: 'All Appointments',
            count: appointments.length,
            icon: FiCalendar,
            color: 'bg-brand-soft/70 text-brand',
        },
        {
            label: 'Pending',
            count: appointments.filter((item) => item.status === 'pending').length,
            icon: FiClock,
            color: 'bg-[#fff4df] text-[#8a5b17]',
        },
        {
            label: 'Confirmed',
            count: appointments.filter((item) => item.status === 'confirmed').length,
            icon: FiCheckCircle,
            color: 'bg-[#eaf2e9] text-[#3f6344]',
        },
        {
            label: 'Cancelled',
            count: appointments.filter((item) => item.status === 'cancelled').length,
            icon: FiXCircle,
            color: 'bg-[#faeae6] text-[#9b493f]',
        },
    ];
    const views: { value: View; label: string; count: number }[] = [
        { value: 'appointments', label: 'All Appointments', count: appointments.length },
        { value: 'history', label: 'Appointment History', count: historicalAppointments.length },
        { value: 'payments', label: 'Payment History', count: paidAppointments.length },
    ];
    const source =
        view === 'payments'
            ? paidAppointments
            : view === 'history'
              ? historicalAppointments
              : appointments;
    const query = search.trim().toLowerCase();
    const filtered = source.filter((appointment) => {
        const category = serviceCategories[appointment.service.category].label;
        return (
            `${appointment.id} ${appointment.service.name} ${category} ${appointment.paymentReference ?? ''}`
                .toLowerCase()
                .includes(query) &&
            (view === 'payments' || status === 'all' || appointment.status === status) &&
            (view === 'payments' || payment === 'all' || appointment.paymentStatus === payment)
        );
    });
    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, pageCount);
    const start = (currentPage - 1) * pageSize;
    const visible = filtered.slice(start, start + pageSize);

    function changeView(nextView: View) {
        setView(nextView);
        setStatus('all');
        setPayment('all');
        setPage(1);
    }

    function openDialog(appointment: AppointmentDisplayData, nextView: DialogView) {
        setSelected(appointment);
        setDialogView(nextView);
        dialogRef.current?.showModal();
    }

    function clearFilters() {
        setSearch('');
        setStatus('all');
        setPayment('all');
        setPage(1);
    }

    return (
        <section
            aria-labelledby="appointments-title"
            className="-m-5 min-h-full bg-[#fbf9f6] p-5 sm:-m-6 sm:p-6 lg:min-h-dvh lg:p-8"
        >
            <div className="mx-auto max-w-7xl space-y-6">
                <header className="flex flex-wrap items-center justify-between gap-5">
                    <div>
                        <p className="text-sm font-semibold tracking-[0.16em] text-brand">
                            YOUR PERSONAL ATELIER
                        </p>
                        <h1
                            id="appointments-title"
                            className="mt-2 text-4xl tracking-tight sm:text-5xl"
                        >
                            My Appointments
                        </h1>
                        <p className="mt-3 text-base leading-7 text-muted">
                            Your visits, little rituals, and moments of care. All in one place.
                        </p>
                    </div>
                    <Link
                        href="/service"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-hover"
                    >
                        <FiPlus size={18} aria-hidden="true" />
                        Book an Appointment
                    </Link>
                </header>

                <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
                    <p>Keep track of every appointment, from request to your next visit.</p>
                    <span className="rounded-full border border-brand/15 bg-brand-soft/50 px-3 py-1 text-xs font-medium text-brand">
                        Design preview · Sample data
                    </span>
                </div>

                <dl className="grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-4">
                    {summaryCards.map(({ label, count, icon: Icon, color }, index) => (
                        <div
                            key={label}
                            className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 sm:p-5 ${index === 0 ? 'border-brand/20 bg-[#f4e7de]' : 'border-line/80 bg-panel'}`}
                        >
                            <div>
                                <dt className="text-sm leading-6 text-muted">{label}</dt>
                                <dd className="mt-2 text-3xl font-semibold tabular-nums">
                                    {String(count).padStart(2, '0')}
                                </dd>
                            </div>
                            <span
                                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${color}`}
                            >
                                <Icon size={20} aria-hidden="true" />
                            </span>
                        </div>
                    ))}
                </dl>

                <section
                    aria-label="Appointment records"
                    className="overflow-hidden rounded-2xl border border-line/80 bg-panel shadow-xs"
                >
                    <div
                        role="group"
                        aria-label="Choose appointment records"
                        className="flex gap-6 overflow-x-auto border-b border-line px-5 sm:px-6"
                    >
                        {views.map((tab) => (
                            <button
                                key={tab.value}
                                type="button"
                                aria-pressed={view === tab.value}
                                onClick={() => changeView(tab.value)}
                                className={`flex min-h-16 shrink-0 cursor-pointer items-center gap-2 border-b-2 px-0.5 text-sm font-semibold transition-colors ${view === tab.value ? 'border-brand text-brand' : 'border-transparent text-muted hover:text-brand'}`}
                            >
                                {tab.label}
                                <span
                                    className={`rounded-md px-2 py-0.5 text-xs ${view === tab.value ? 'bg-brand-soft/70' : 'bg-surface'}`}
                                >
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4 border-b border-line/70 bg-surface/35 p-4 sm:p-5">
                        <div className="flex flex-wrap items-center gap-3">
                            <label className="flex min-h-11 min-w-0 flex-1 basis-64 items-center gap-2.5 rounded-xl border border-line bg-panel px-3.5 focus-within:ring-2 focus-within:ring-brand/25">
                                <FiSearch
                                    size={18}
                                    aria-hidden="true"
                                    className="shrink-0 text-subtle"
                                />
                                <input
                                    type="search"
                                    aria-label="Search appointments"
                                    placeholder="Search service, category, or booking ID"
                                    value={search}
                                    onChange={(event) => {
                                        setSearch(event.target.value);
                                        setPage(1);
                                    }}
                                    className="min-h-11 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-subtle"
                                />
                            </label>
                            {view !== 'payments' && (
                                <div className="relative min-w-40">
                                    <select
                                        aria-label="Filter by payment status"
                                        value={payment}
                                        onChange={(event) => {
                                            setPayment(event.target.value as PaymentFilter);
                                            setPage(1);
                                        }}
                                        className="min-h-11 w-full cursor-pointer appearance-none rounded-xl border border-line bg-panel py-2 pr-10 pl-3.5 text-sm text-muted"
                                    >
                                        <option value="all">All payments</option>
                                        <option value="paid">Paid</option>
                                        <option value="unpaid">Unpaid</option>
                                    </select>
                                    <FiChevronDown
                                        aria-hidden="true"
                                        size={16}
                                        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted"
                                    />
                                </div>
                            )}
                        </div>
                        {view !== 'payments' ? (
                            <div
                                role="group"
                                aria-label="Filter by appointment status"
                                className="flex flex-wrap gap-2"
                            >
                                {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(
                                    (filter) => (
                                        <button
                                            key={filter}
                                            type="button"
                                            aria-pressed={status === filter}
                                            onClick={() => {
                                                setStatus(filter);
                                                setPage(1);
                                            }}
                                            className={`min-h-9 cursor-pointer rounded-full px-4 text-sm font-medium capitalize transition-colors ${status === filter ? 'bg-ink text-white' : 'border border-line bg-panel text-muted hover:border-brand/40 hover:text-brand'}`}
                                        >
                                            {filter === 'all' ? 'All statuses' : filter}
                                        </button>
                                    ),
                                )}
                            </div>
                        ) : (
                            <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
                                <FiCreditCard size={17} aria-hidden="true" />
                                {paidAppointments.length} successful payments
                                <span aria-hidden="true">·</span>
                                <span className="font-semibold text-ink">
                                    {formatServicePrice(
                                        paidAppointments.reduce(
                                            (sum, item) => sum + item.service.price,
                                            0,
                                        ),
                                    )}{' '}
                                    total paid
                                </span>
                            </p>
                        )}
                    </div>

                    <p aria-live="polite" className="sr-only">
                        {filtered.length} records found. Page {currentPage} of {pageCount}.
                    </p>

                    {visible.length === 0 ? (
                        <div className="flex flex-col items-center px-5 py-14 text-center">
                            <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft/50 text-brand">
                                <FiCalendar size={24} aria-hidden="true" />
                            </span>
                            <h2 className="mt-4 text-2xl">No matching records</h2>
                            <p className="mt-2 text-sm leading-6 text-muted">
                                Try another search or clear your filters.
                            </p>
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-4 min-h-11 cursor-pointer text-sm font-semibold text-brand underline underline-offset-4"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : view === 'payments' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-175 text-left text-sm">
                                <caption className="sr-only">
                                    Sample payment history for salon appointments
                                </caption>
                                <thead className="border-b border-line/60 bg-surface/60 text-muted">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-medium">
                                            Service &amp; reference
                                        </th>
                                        <th scope="col" className="px-4 py-4 font-medium">
                                            Payment date
                                        </th>
                                        <th scope="col" className="px-4 py-4 font-medium">
                                            Amount
                                        </th>
                                        <th scope="col" className="px-4 py-4 font-medium">
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-right font-medium"
                                        >
                                            Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-line/70">
                                    {visible.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <th scope="row" className="px-6 py-5 font-normal">
                                                <p className="font-semibold">
                                                    {appointment.service.name}
                                                </p>
                                                <p className="mt-1 text-xs text-muted">
                                                    {appointment.paymentReference}
                                                </p>
                                            </th>
                                            <td className="px-4 py-5">
                                                <p>
                                                    {formatAppointmentDate(
                                                        appointment.paidAt!.slice(0, 10),
                                                    )}
                                                </p>
                                                <p className="mt-1 text-xs text-muted">
                                                    Stripe · Card payment
                                                </p>
                                            </td>
                                            <td className="px-4 py-5 font-semibold">
                                                {formatServicePrice(appointment.service.price)}
                                            </td>
                                            <td className="px-4 py-5">
                                                <PaymentBadge status={appointment.paymentStatus} />
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openDialog(appointment, 'details')
                                                    }
                                                    aria-label={`View payment details for ${appointment.id}`}
                                                    className="inline-flex size-11 cursor-pointer items-center justify-center rounded-lg border border-line text-brand hover:bg-brand-soft/40"
                                                >
                                                    <FiFileText size={18} aria-hidden="true" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <ul className="divide-y divide-line/80">
                            {visible.map((appointment) => (
                                <li
                                    key={appointment.id}
                                    className="p-4 transition-colors hover:bg-surface/25 sm:p-6"
                                >
                                    <article aria-labelledby={`appointment-${appointment.id}`}>
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div className="flex min-w-0 flex-1 basis-64 items-center gap-4">
                                                <Image
                                                    src={appointment.service.image}
                                                    alt={appointment.service.name}
                                                    width={80}
                                                    height={80}
                                                    sizes="80px"
                                                    className="size-20 shrink-0 rounded-xl object-cover"
                                                />
                                                <div className="min-w-0">
                                                    <p className="text-xs font-medium tracking-wider text-subtle">
                                                        #{appointment.id}
                                                    </p>
                                                    <h2
                                                        id={`appointment-${appointment.id}`}
                                                        className="mt-1 text-xl leading-7 sm:text-2xl"
                                                    >
                                                        {appointment.service.name}
                                                    </h2>
                                                    <p className="mt-1 text-sm text-muted">
                                                        {
                                                            serviceCategories[
                                                                appointment.service.category
                                                            ].label
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <StatusBadge status={appointment.status} />
                                                <PaymentBadge status={appointment.paymentStatus} />
                                            </div>
                                        </div>
                                        <dl className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-surface/70 p-4 md:grid-cols-4">
                                            <div>
                                                <dt className="flex items-center gap-1.5 text-sm text-muted">
                                                    <FiCalendar size={15} aria-hidden="true" />
                                                    Date
                                                </dt>
                                                <dd className="mt-1.5 text-sm font-semibold">
                                                    <time dateTime={appointment.date}>
                                                        {formatAppointmentDate(appointment.date)}
                                                    </time>
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="flex items-center gap-1.5 text-sm text-muted">
                                                    <FiClock size={15} aria-hidden="true" />
                                                    Time
                                                </dt>
                                                <dd className="mt-1.5 text-sm font-semibold">
                                                    {appointment.time}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-muted">Duration</dt>
                                                <dd className="mt-1.5 text-sm font-semibold">
                                                    {appointment.service.duration} minutes
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-muted">
                                                    Service price
                                                </dt>
                                                <dd className="mt-1 text-lg font-semibold text-brand">
                                                    {formatServicePrice(appointment.service.price)}
                                                </dd>
                                            </div>
                                        </dl>
                                        <footer className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                            <p className="text-xs leading-6 text-muted">
                                                {appointment.status === 'cancelled'
                                                    ? 'This appointment was cancelled.'
                                                    : appointment.isPast
                                                      ? 'Past appointment · View your visit details below.'
                                                      : appointment.status === 'pending'
                                                        ? 'Awaiting confirmation from the salon.'
                                                        : appointment.paymentStatus === 'unpaid'
                                                          ? 'Your visit is confirmed. Payment is ready.'
                                                          : 'You’re all set. We look forward to your visit.'}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openDialog(appointment, 'details')
                                                    }
                                                    aria-label={`View details for ${appointment.id}`}
                                                    className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-line px-3.5 text-sm font-medium text-ink transition-colors hover:bg-surface"
                                                >
                                                    <FiEye size={16} aria-hidden="true" />
                                                    View Details
                                                </button>
                                                {appointment.status === 'pending' && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openDialog(appointment, 'cancel')
                                                        }
                                                        aria-label={`Cancel appointment ${appointment.id}`}
                                                        className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-[#e7c8c1] px-3.5 text-sm font-medium text-[#9b493f] transition-colors hover:bg-[#faeae6]"
                                                    >
                                                        <FiXCircle size={16} aria-hidden="true" />
                                                        Cancel Appointment
                                                    </button>
                                                )}
                                                {appointment.status === 'confirmed' &&
                                                    appointment.paymentStatus === 'unpaid' && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openDialog(appointment, 'payment')
                                                            }
                                                            aria-label={`Pay for appointment ${appointment.id}`}
                                                            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
                                                        >
                                                            <FiCreditCard
                                                                size={16}
                                                                aria-hidden="true"
                                                            />
                                                            Pay with Stripe
                                                        </button>
                                                    )}
                                            </div>
                                        </footer>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    )}

                    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line/70 bg-surface/40 px-5 py-4 sm:px-6">
                        <p className="text-sm text-muted">
                            Showing {filtered.length === 0 ? 0 : start + 1}–
                            {Math.min(start + pageSize, filtered.length)} of {filtered.length}{' '}
                            {view === 'payments' ? 'payments' : 'appointments'}
                        </p>
                        {pageCount > 1 && (
                            <nav
                                aria-label="Appointment pagination"
                                className="flex items-center gap-2"
                            >
                                <button
                                    type="button"
                                    aria-label="Previous page"
                                    disabled={currentPage === 1}
                                    onClick={() => setPage(currentPage - 1)}
                                    className="flex size-11 cursor-pointer items-center justify-center rounded-lg border border-line bg-panel text-brand hover:bg-brand-soft/40 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <FiChevronLeft size={18} aria-hidden="true" />
                                </button>
                                {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                                    (number) => (
                                        <button
                                            key={number}
                                            type="button"
                                            aria-label={`Page ${number}`}
                                            aria-current={
                                                currentPage === number ? 'page' : undefined
                                            }
                                            onClick={() => setPage(number)}
                                            className={`size-11 cursor-pointer rounded-lg text-sm font-semibold ${currentPage === number ? 'bg-brand text-white' : 'border border-line bg-panel text-muted hover:bg-brand-soft/40'}`}
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
                                    className="flex size-11 cursor-pointer items-center justify-center rounded-lg border border-line bg-panel text-brand hover:bg-brand-soft/40 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <FiChevronRight size={18} aria-hidden="true" />
                                </button>
                            </nav>
                        )}
                    </footer>
                </section>
                <p className="flex items-center justify-center gap-2 text-center text-sm leading-6 text-muted">
                    <FiLock size={15} aria-hidden="true" className="shrink-0" />A little care for
                    your time. A little peace of mind.
                </p>
            </div>

            <ServiceDialog
                dialogRef={dialogRef}
                id="customer-appointment-preview"
                title={
                    dialogView === 'cancel'
                        ? 'Cancel appointment'
                        : dialogView === 'payment'
                          ? 'Your payment'
                          : 'Appointment details'
                }
                compact={dialogView !== 'details'}
            >
                {selected && (
                    <div className="space-y-5">
                        <div className="flex items-center gap-4">
                            <Image
                                src={selected.service.image}
                                alt={selected.service.name}
                                width={72}
                                height={72}
                                sizes="72px"
                                className="size-18 rounded-xl object-cover"
                            />
                            <div>
                                <p className="text-xs font-medium text-subtle">#{selected.id}</p>
                                <h3 className="mt-1 text-2xl">{selected.service.name}</h3>
                                <p className="mt-1 text-sm text-muted">
                                    {serviceCategories[selected.service.category].label}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <StatusBadge status={selected.status} />
                            <PaymentBadge status={selected.paymentStatus} />
                        </div>
                        <dl className="grid grid-cols-2 gap-4 rounded-xl bg-surface p-4">
                            <div>
                                <dt className="text-sm text-muted">Appointment date</dt>
                                <dd className="mt-1.5 text-sm font-semibold">
                                    {formatAppointmentDate(selected.date)}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-muted">Time</dt>
                                <dd className="mt-1.5 text-sm font-semibold">{selected.time}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-muted">Duration</dt>
                                <dd className="mt-1.5 text-sm font-semibold">
                                    {selected.service.duration} minutes
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-muted">Service price</dt>
                                <dd className="mt-1.5 text-base font-semibold text-brand">
                                    {formatServicePrice(selected.service.price)}
                                </dd>
                            </div>
                        </dl>
                        {dialogView === 'details' ? (
                            <>
                                <div>
                                    <h3 className="font-sans text-sm font-semibold">
                                        Special requests
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-muted">
                                        {selected.notes || 'No special requests.'}
                                    </p>
                                </div>
                                <section
                                    aria-label="Appointment and payment timeline"
                                    className="border-t border-line pt-5"
                                >
                                    <h3 className="text-2xl">Appointment &amp; payment history</h3>
                                    <ol className="mt-4 space-y-4 border-l border-line pl-5">
                                        {[
                                            {
                                                label: 'Appointment requested',
                                                date: selected.requestedAt,
                                            },
                                            ...(selected.confirmedAt
                                                ? [
                                                      {
                                                          label: 'Appointment confirmed',
                                                          date: selected.confirmedAt,
                                                      },
                                                  ]
                                                : []),
                                            ...(selected.paidAt
                                                ? [
                                                      {
                                                          label: 'Payment received via Stripe',
                                                          date: selected.paidAt,
                                                      },
                                                  ]
                                                : []),
                                            ...(selected.cancelledAt
                                                ? [
                                                      {
                                                          label: 'Appointment cancelled',
                                                          date: selected.cancelledAt,
                                                      },
                                                  ]
                                                : []),
                                        ]
                                            .sort((a, b) => a.date.localeCompare(b.date))
                                            .map((event) => (
                                                <li key={event.label}>
                                                    <p className="text-sm font-semibold">
                                                        {event.label}
                                                    </p>
                                                    <time
                                                        dateTime={event.date}
                                                        className="mt-1 block text-xs text-muted"
                                                    >
                                                        {formatAppointmentEvent(event.date)}
                                                    </time>
                                                </li>
                                            ))}
                                    </ol>
                                    {selected.paymentReference && (
                                        <p className="mt-4 rounded-lg bg-surface p-3 text-xs break-all text-muted">
                                            Payment reference: {selected.paymentReference}
                                        </p>
                                    )}
                                </section>
                            </>
                        ) : dialogView === 'cancel' ? (
                            <div className="rounded-xl border border-[#e7c8c1] bg-[#faeae6]/50 p-4">
                                <p className="text-sm font-semibold text-[#9b493f]">
                                    Cancel this pending appointment?
                                </p>
                                <p className="mt-2 text-sm leading-6 text-muted">
                                    This is a design preview. Your appointment will stay unchanged.
                                </p>
                            </div>
                        ) : (
                            <div className="rounded-xl border border-brand/15 bg-brand-soft/40 p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-medium">Total to pay</p>
                                    <p className="text-2xl font-semibold text-brand">
                                        {formatServicePrice(selected.service.price)}
                                    </p>
                                </div>
                                <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                                    <FiLock size={15} aria-hidden="true" />
                                    Stripe checkout · Design preview
                                </p>
                                <p className="mt-2 text-sm leading-6 text-muted">
                                    No payment will be taken in this preview.
                                </p>
                            </div>
                        )}
                        <div className="flex flex-wrap justify-end gap-3 border-t border-line pt-5">
                            <button
                                type="button"
                                onClick={() => dialogRef.current?.close()}
                                className="min-h-11 cursor-pointer rounded-lg border border-line px-4 text-sm font-semibold hover:bg-surface"
                            >
                                {dialogView === 'cancel' ? 'Keep Appointment' : 'Close'}
                            </button>
                            {dialogView === 'cancel' && (
                                <button
                                    type="button"
                                    disabled
                                    className="min-h-11 cursor-not-allowed rounded-lg bg-[#9b493f] px-4 text-sm font-semibold text-white opacity-50"
                                >
                                    Confirm Cancellation · Preview
                                </button>
                            )}
                            {dialogView === 'payment' && (
                                <button
                                    type="button"
                                    disabled
                                    className="min-h-11 cursor-not-allowed rounded-lg bg-brand px-4 text-sm font-semibold text-white opacity-50"
                                >
                                    Continue to Stripe · Preview
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </ServiceDialog>
        </section>
    );
}
