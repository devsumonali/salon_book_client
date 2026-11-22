import { getApiToken, requireUser } from '@/lib/auth-session';
import { getCustomerProps } from '@/lib/api/user/user';
import Link from 'next/link';
import {
    FiCalendar,
    FiCheckCircle,
    FiClock,
    FiHeart,
    FiPlus,
    FiScissors,
    FiXCircle,
} from 'react-icons/fi';

// Appointment status styles
const statusColors = {
    pending: 'bg-[#fff4df] text-[#8a5b17]',
    confirmed: 'bg-[#eaf2e9] text-[#3f6344]',
    cancelled: 'bg-[#faeae6] text-[#9b493f]',
};

// Format appointment date
const formatDate = (date: string, options: Intl.DateTimeFormatOptions) => {
    return new Date(`${date}T00:00:00+06:00`).toLocaleDateString('en-US', {
        ...options,
        timeZone: 'Asia/Dhaka',
    });
};

// Appointment status badge
const AppointmentStatus = ({ status }: { status: string }) => {
    const color = statusColors[status as keyof typeof statusColors] || 'bg-surface text-muted';

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1.5 text-sm font-medium capitalize ${color}`}
        >
            {status}
        </span>
    );
};

export default async function CustomerOverview() {
    // Check logged-in user
    const session = await requireUser('user', '/dashboard/customer/overview');

    // Fetch customer overview
    const customer = await getCustomerProps(await getApiToken());

    const {
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        cancelledAppointments,
        nextAppointment,
        recentAppointments,
    } = customer;

    // Statistics cards
    const cards = [
        {
            label: 'Total Appointment Requests',
            count: totalAppointments,
            description: 'All your appointment requests',
            icon: FiCalendar,
            color: 'bg-brand-soft/70 text-brand',
        },
        {
            label: 'Pending Appointments',
            count: pendingAppointments,
            description: 'Awaiting confirmation',
            icon: FiClock,
            color: 'bg-[#fff4df] text-[#8a5b17]',
        },
        {
            label: 'Confirmed Appointments',
            count: confirmedAppointments,
            description: 'Your visits are reserved',
            icon: FiCheckCircle,
            color: 'bg-[#eaf2e9] text-[#3f6344]',
        },
        {
            label: 'Cancelled Appointments',
            count: cancelledAppointments,
            description: 'Cancelled requests',
            icon: FiXCircle,
            color: 'bg-[#faeae6] text-[#9b493f]',
        },
    ];

    // Appointment chart data
    const chartData = [
        {
            label: 'Pending',
            count: pendingAppointments,
            color: '#a16b20',
        },
        {
            label: 'Confirmed',
            count: confirmedAppointments,
            color: '#58745c',
        },
        {
            label: 'Cancelled',
            count: cancelledAppointments,
            color: '#af6258',
        },
    ];

    const otherCount = Math.max(
        0,
        totalAppointments - pendingAppointments - confirmedAppointments - cancelledAppointments,
    );

    if (otherCount > 0) {
        chartData.push({
            label: 'Other',
            count: otherCount,
            color: '#82786f',
        });
    }

    // Circular chart gradient
    let percentage = 0;

    const chartGradient =
        totalAppointments > 0
            ? `conic-gradient(${chartData
                  .map((item) => {
                      const start = percentage;
                      percentage += (item.count / totalAppointments) * 100;

                      return `${item.color} ${start}% ${percentage}%`;
                  })
                  .join(', ')})`
            : 'var(--color-line)';

    return (
        <section
            aria-labelledby="overview-title"
            className="-m-5 min-h-full bg-[#fbf9f6] p-5 sm:-m-6 sm:p-6 lg:min-h-dvh lg:p-8"
        >
            <div className="mx-auto max-w-7xl space-y-7">
                {/* Header */}
                <header className="flex flex-wrap items-center justify-between gap-5">
                    <div className="min-w-0">
                        <p className="text-sm font-semibold tracking-[0.16em] text-brand">
                            YOUR PERSONAL ATELIER
                        </p>

                        <h1
                            id="overview-title"
                            className="mt-2 text-4xl tracking-tight sm:text-5xl"
                        >
                            A little time for you.
                        </h1>

                        <p className="mt-3 text-base leading-7 text-muted">
                            Welcome back
                            {session.user.name ? `, ${session.user.name}` : ''}. Here&apos;s a look
                            at your appointments.
                        </p>
                    </div>

                    <Link
                        href="/service"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-hover"
                    >
                        <FiPlus size={18} />
                        Book an Appointment
                    </Link>
                </header>

                {/* Statistics Cards */}
                <section aria-labelledby="summary-title">
                    <h2 id="summary-title" className="mb-4 font-sans text-base font-semibold">
                        Your appointment overview
                    </h2>

                    <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {cards.map((card, index) => {
                            const Icon = card.icon;

                            return (
                                <div
                                    key={card.label}
                                    className={`rounded-2xl border p-5 shadow-xs ${
                                        index === 0
                                            ? 'border-brand/20 bg-[#f4e7de]'
                                            : 'border-line/80 bg-panel'
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <dt className="max-w-40 text-sm font-medium leading-6 text-muted">
                                            {card.label}
                                        </dt>

                                        <span
                                            className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${card.color}`}
                                        >
                                            <Icon size={21} />
                                        </span>
                                    </div>

                                    <dd className="mt-5 text-4xl font-semibold tracking-tight tabular-nums">
                                        {card.count.toString().padStart(2, '0')}
                                    </dd>

                                    <p className="mt-2 text-sm leading-6 text-muted">
                                        {card.description}
                                    </p>
                                </div>
                            );
                        })}
                    </dl>
                </section>

                {/* Next Appointment & Chart */}
                <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                    {/* Next Appointment */}
                    <section
                        aria-labelledby="next-appointment-title"
                        className="flex flex-col overflow-hidden rounded-2xl border border-line/80 bg-panel shadow-xs"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/70 px-5 py-4 sm:px-6">
                            <h2 id="next-appointment-title" className="text-2xl">
                                Your next appointment
                            </h2>

                            {nextAppointment && (
                                <AppointmentStatus status={nextAppointment.status} />
                            )}
                        </div>

                        {nextAppointment ? (
                            <div className="flex-1 p-5 sm:p-6">
                                <div className="flex items-center gap-4">
                                    {/* Date Card */}
                                    <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl border border-brand/15 bg-brand-soft/50 text-brand">
                                        <span className="text-xs font-semibold tracking-wider uppercase">
                                            {formatDate(nextAppointment.date, { month: 'short' })}
                                        </span>

                                        <span className="font-serif text-3xl leading-8">
                                            {formatDate(nextAppointment.date, { day: 'numeric' })}
                                        </span>
                                    </div>

                                    {/* Service Details */}
                                    <div className="min-w-0">
                                        <p className="text-xs break-all text-muted">
                                            #{nextAppointment.id}
                                        </p>

                                        <h3 className="mt-1 text-2xl wrap-break-word">
                                            {nextAppointment.serviceName}
                                        </h3>

                                        <p className="mt-1 text-sm text-muted">
                                            Your next confirmed visit.
                                        </p>
                                    </div>
                                </div>

                                <dl className="mt-6 grid gap-4 border-t border-line/70 pt-5 sm:grid-cols-2">
                                    <div>
                                        <dt className="flex items-center gap-2 text-sm text-muted">
                                            <FiCalendar size={16} />
                                            Date
                                        </dt>

                                        <dd className="mt-2 text-sm font-semibold">
                                            <time dateTime={nextAppointment.date}>
                                                {formatDate(nextAppointment.date, {
                                                    weekday: 'long',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </time>
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="flex items-center gap-2 text-sm text-muted">
                                            <FiClock size={16} />
                                            Time &amp; duration
                                        </dt>

                                        <dd className="mt-2 text-sm font-semibold">
                                            {nextAppointment.time}

                                            {nextAppointment.duration !== null && (
                                                <span className="font-normal text-muted">
                                                    {' · '}
                                                    {nextAppointment.duration} minutes
                                                </span>
                                            )}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        ) : (
                            <div className="flex flex-1 flex-col items-center justify-center px-5 py-8 text-center">
                                <span className="flex size-12 items-center justify-center rounded-full bg-brand-soft/50 text-brand">
                                    <FiCalendar size={22} />
                                </span>

                                <h3 className="mt-4 text-2xl">
                                    No upcoming confirmed appointments
                                </h3>

                                <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                                    {pendingAppointments > 0
                                        ? 'Your pending requests will appear here once confirmed for an upcoming date.'
                                        : 'Book a service and make a little time for yourself.'}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/70 bg-surface/60 px-5 py-4 sm:px-6">
                            <p className="text-sm text-muted">Your next moment of self-care.</p>

                            <Link
                                href="/dashboard/customer/my-appointments"
                                className="inline-flex min-h-11 items-center rounded-lg border border-line bg-panel px-4 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft/50"
                            >
                                My Appointments
                            </Link>
                        </div>
                    </section>

                    {/* Appointment Chart */}
                    <section
                        aria-labelledby="breakdown-title"
                        className="rounded-2xl border border-line/80 bg-panel p-5 shadow-xs sm:p-6"
                    >
                        <h2 id="breakdown-title" className="text-2xl">
                            Appointments at a glance
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-muted">
                            {totalAppointments > 0
                                ? 'Every request, in one place.'
                                : 'Your appointment breakdown will appear after your first booking.'}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center justify-center gap-7 sm:justify-start">
                            {/* Circular Chart */}
                            <div
                                aria-hidden="true"
                                className="grid size-36 shrink-0 place-items-center rounded-full"
                                style={{
                                    background: chartGradient,
                                }}
                            >
                                <div className="flex size-27 flex-col items-center justify-center rounded-full bg-panel">
                                    <span className="text-3xl font-semibold tabular-nums">
                                        {totalAppointments}
                                    </span>

                                    <span className="mt-1 text-xs text-muted">Total requests</span>
                                </div>
                            </div>

                            {/* Chart Labels */}
                            <dl className="min-w-36 flex-1 space-y-4">
                                {chartData.map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex items-center justify-between gap-5 text-sm"
                                    >
                                        <dt className="flex items-center gap-2.5 text-muted">
                                            <span
                                                className="size-2.5 rounded-full"
                                                style={{
                                                    backgroundColor: item.color,
                                                }}
                                            />
                                            {item.label}
                                        </dt>

                                        <dd className="font-semibold tabular-nums">
                                            {item.count}

                                            <span className="ml-1 text-xs font-normal text-muted">
                                                (
                                                {totalAppointments > 0
                                                    ? Math.round(
                                                          (item.count / totalAppointments) * 1000,
                                                      ) / 10
                                                    : 0}
                                                %)
                                            </span>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div className="mt-6 flex items-start gap-3 rounded-xl bg-surface p-4">
                            <FiHeart size={18} className="mt-1 shrink-0 text-brand" />

                            <p className="text-sm leading-6 text-muted">
                                Make room for a little self-care. Your next favorite service is
                                waiting.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Recent Appointments */}
                <section
                    aria-labelledby="recent-appointments-title"
                    className="overflow-hidden rounded-2xl border border-line/80 bg-panel shadow-xs"
                >
                    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-6">
                        <div>
                            <h2 id="recent-appointments-title" className="text-2xl">
                                Recent appointment requests
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-muted">
                                A quick look at your latest bookings.
                            </p>
                        </div>

                        <Link
                            href="/dashboard/customer/my-appointments"
                            className="inline-flex min-h-11 items-center text-sm font-semibold text-brand underline-offset-4 hover:underline"
                        >
                            View All Appointments
                        </Link>
                    </div>

                    {recentAppointments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-160 text-left text-sm">
                                <caption className="sr-only">
                                    Your latest appointment requests with service, date, duration,
                                    and status.
                                </caption>

                                <thead className="border-y border-line/70 bg-surface/70 text-muted">
                                    <tr>
                                        <th scope="col" className="px-6 py-3.5 font-medium">
                                            Service
                                        </th>
                                        <th scope="col" className="px-5 py-3.5 font-medium">
                                            Appointment
                                        </th>
                                        <th scope="col" className="px-5 py-3.5 font-medium">
                                            Duration
                                        </th>
                                        <th scope="col" className="px-6 py-3.5 font-medium">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-line/70">
                                    {recentAppointments.map((appointment) => (
                                        <tr
                                            key={appointment.id}
                                            className="transition-colors hover:bg-surface/50"
                                        >
                                            <th scope="row" className="px-6 py-4 font-normal">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft/50 text-brand">
                                                        <FiScissors size={18} />
                                                    </span>

                                                    <div className="min-w-0">
                                                        <p className="font-semibold wrap-break-word">
                                                            {appointment.serviceName}
                                                        </p>

                                                        <p className="mt-1 text-xs break-all text-muted">
                                                            #{appointment.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </th>

                                            <td className="px-5 py-4">
                                                <time dateTime={appointment.date}>
                                                    {formatDate(appointment.date, {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </time>

                                                <p className="mt-1 text-xs text-muted">
                                                    {appointment.time}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4 text-muted">
                                                {appointment.duration !== null
                                                    ? `${appointment.duration} min`
                                                    : 'Unavailable'}
                                            </td>

                                            <td className="px-6 py-4">
                                                <AppointmentStatus status={appointment.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center border-t border-line/70 px-5 py-10 text-center">
                            <span className="flex size-12 items-center justify-center rounded-full bg-brand-soft/50 text-brand">
                                <FiScissors size={22} />
                            </span>

                            <h3 className="mt-4 text-2xl">No appointment requests yet</h3>

                            <p className="mt-2 text-sm leading-6 text-muted">
                                Your bookings will appear here once you request your first
                                appointment.
                            </p>

                            <Link
                                href="/service"
                                className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-brand underline underline-offset-4"
                            >
                                Explore services
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </section>
    );
}
