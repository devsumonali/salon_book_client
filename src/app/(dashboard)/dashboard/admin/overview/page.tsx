import Link from 'next/link';
import {
    FiCalendar,
    FiCheckCircle,
    FiClock,
    FiCreditCard,
    FiScissors,
    FiUsers,
} from 'react-icons/fi';
import { getApiToken, requireUser } from '@/lib/auth-session';
import { getAdminOverviewProps } from '@/lib/api/admin';
import AdminPage from '@/app/(dashboard)/_components/admin/AdminPage';
import AdminAppointments from '@/app/(dashboard)/_components/admin/AdminAppointments';
import { money } from '@/app/(dashboard)/_components/admin/AdminUi';

export default async function AdminOverview() {
    await requireUser('admin');
    const data = await getAdminOverviewProps(await getApiToken());
    const cards = [
        {
            label: 'Registered Customers',
            count: data.customers,
            icon: FiUsers,
            color: 'bg-blue-50 text-blue-700',
        },
        {
            label: 'Active Services',
            count: data.services,
            icon: FiScissors,
            color: 'bg-brand-soft text-brand',
        },
        {
            label: 'Appointment Requests',
            count: data.appointments,
            icon: FiCalendar,
            color: 'bg-violet-50 text-violet-700',
        },
        {
            label: 'Pending Appointments',
            count: data.pending,
            icon: FiClock,
            color: 'bg-amber-50 text-amber-700',
        },
        {
            label: 'Confirmed Appointments',
            count: data.confirmed,
            icon: FiCheckCircle,
            color: 'bg-sage-soft text-sage',
        },
        {
            label: 'Successful Payments',
            count: data.payments,
            icon: FiCreditCard,
            color: 'bg-emerald-50 text-emerald-700',
        },
    ];
    return (
        <AdminPage
            title="Salon Overview"
            description="A clear view of your salon. Everything you need, all in one place."
        >
            <dl className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                {cards.map(({ label, count, icon: Icon, color }) => (
                    <div key={label} className="ui-card flex flex-col p-4 sm:p-6">
                        <div className="flex flex-wrap-reverse items-center justify-between gap-3">
                            <dt className="text-sm font-medium leading-6 text-muted">{label}</dt>
                            <span
                                className={
                                    'flex size-11 shrink-0 items-center justify-center rounded-xl ' +
                                    color
                                }
                            >
                                <Icon size={21} aria-hidden="true" />
                            </span>
                        </div>
                        <dd className="mt-auto pt-5 text-4xl font-bold tracking-tight tabular-nums">
                            {count}
                        </dd>
                    </div>
                ))}
            </dl>
            <section className="flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-[#293b34] p-6 text-white shadow-card sm:p-7">
                <div className="flex items-center gap-4">
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-[#d8e5ce]">
                        <FiCreditCard size={23} aria-hidden="true" />
                    </span>
                    <div>
                        <h2 className="text-white">Verified payment totals</h2>
                        <p className="mt-1 text-sm text-white/65">
                            Successful payments, grouped by currency.
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-6">
                    {data.totals.length ? (
                        data.totals.map((total) => (
                            <p key={total._id} className="text-3xl font-bold tracking-tight">
                                {money(total.amount, total._id)}
                            </p>
                        ))
                    ) : (
                        <p className="text-sm text-white/75">No successful payments yet.</p>
                    )}
                </div>
            </section>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <h2>Latest appointment requests</h2>
                <Link
                    href="/dashboard/admin/manage-appointments"
                    className="inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-bold text-brand hover:bg-brand-soft"
                >
                    View all appointments
                </Link>
            </div>
            <AdminAppointments appointments={data.recent} />
        </AdminPage>
    );
}
