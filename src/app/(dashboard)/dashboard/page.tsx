import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth-session';

const DashboardPage = async () => {
    const session = await requireUser();

    redirect(
        session.user.role === 'admin'
            ? '/dashboard/admin/overview'
            : '/dashboard/customer/overview',
    );
};

export default DashboardPage;
