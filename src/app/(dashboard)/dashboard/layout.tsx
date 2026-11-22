import type { ChildrenProps } from '@/types/types';
import DashboardSideBar from '../_components/DashboardSideBar';
import { requireUser } from '@/lib/auth-session';
import DashboardHeader from '../_components/DashboardHeader';

export default async function DashboardLayout({ children }: ChildrenProps) {
    const session = await requireUser();
    return (
        <div className="min-h-dvh bg-surface lg:flex">
            <DashboardSideBar />
            <div className="min-w-0 flex-1">
                <DashboardHeader role={session.user.role === 'admin' ? 'admin' : 'user'} />
                <main className="min-w-0">{children}</main>
            </div>
        </div>
    );
}
