import { getApiToken, requireUser } from '@/lib/auth-session';
import { getAdminUsersProps } from '@/lib/api/admin';
import AdminPage from '@/app/(dashboard)/_components/admin/AdminPage';
import AdminUsers from '@/app/(dashboard)/_components/admin/AdminUsers';

export default async function ManageUsers() {
    await requireUser('admin');
    const users = await getAdminUsersProps(await getApiToken());
    return (
        <AdminPage
            title="Manage Customers"
            description="View customer information and control access to protected features."
        >
            <AdminUsers users={users} />
        </AdminPage>
    );
}
