import type { ChildrenProps } from '@/types/types';
import DashboardSideBar from '../_components/DashboardSideBar';
import { requireUser } from '@/lib/auth-session';

export default async function DashboardLayout({ children }: ChildrenProps) {
    await requireUser();
    return (
        <div className="min-h-dvh lg:flex">
            <DashboardSideBar />
            <main className="min-w-0 flex-1 p-5 sm:p-6">{children}</main>
        </div>
    );
}
