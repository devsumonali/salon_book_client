import Link from 'next/link';
import { getApiToken, requireUser } from '@/lib/auth-session';
import { getAdminOverviewProps } from '@/lib/api/admin';
import AdminPage from '@/app/(dashboard)/_components/admin/AdminPage';
import AdminAppointments from '@/app/(dashboard)/_components/admin/AdminAppointments';
import { money } from '@/app/(dashboard)/_components/admin/AdminUi';

export default async function AdminOverview() {
    await requireUser('admin');
    const data = await getAdminOverviewProps(await getApiToken());
    const cards = [
        ['Registered Customers', data.customers],
        ['Active Services', data.services],
        ['Appointment Requests', data.appointments],
        ['Pending Appointments', data.pending],
        ['Confirmed Appointments', data.confirmed],
        ['Successful Payments', data.payments],
    ] as const;
    return (
        <AdminPage
            title="Salon Overview"
            description="Your customers, bookings, and payments at a glance."
        >
            <dl className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                {cards.map(([label, count]) => (
                    <div key={label} className="rounded-2xl border border-line bg-panel p-5">
                        <dt className="text-sm text-muted">{label}</dt>
                        <dd className="mt-3 text-4xl font-semibold tabular-nums">{count}</dd>
                    </div>
                ))}
            </dl>
            <section className="rounded-2xl border border-brand/20 bg-brand-soft/50 p-5">
                <h2 className="text-2xl">Verified payment totals</h2>
                <div className="mt-3 flex flex-wrap gap-6">
                    {data.totals.length ? (
                        data.totals.map((total) => (
                            <p key={total._id} className="text-2xl font-semibold text-brand">
                                {money(total.amount, total._id)}
                            </p>
                        ))
                    ) : (
                        <p className="text-base text-muted">No successful payments yet.</p>
                    )}
                </div>
            </section>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl">Latest appointment requests</h2>
                <Link
                    href="/dashboard/admin/manage-appointments"
                    className="min-h-11 py-3 text-sm font-semibold text-brand underline underline-offset-4"
                >
                    View all appointments
                </Link>
            </div>
            <AdminAppointments appointments={data.recent} />
        </AdminPage>
    );
}
