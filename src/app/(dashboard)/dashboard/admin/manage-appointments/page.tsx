import { getApiToken, requireUser } from '@/lib/auth-session';
import { getAdminAppointmentsProps } from '@/lib/api/admin';
import AdminPage from '@/app/(dashboard)/_components/admin/AdminPage';
import AdminAppointments from '@/app/(dashboard)/_components/admin/AdminAppointments';

export default async function ManageAppointments() {
    await requireUser('admin');
    const appointments = await getAdminAppointmentsProps(await getApiToken());
    return (
        <AdminPage
            title="Manage Appointments"
            description="Review all requests, confirm pending visits, and manage cancellations."
        >
            <AdminAppointments appointments={appointments} />
        </AdminPage>
    );
}
