import type { ChildrenProps } from '@/types/types';
import DashboardSideBar from '../_components/DashboardSideBar';

export default function DashboardLayout({ children }: ChildrenProps) {
    return (
        <div className="min-h-dvh lg:flex">
            <DashboardSideBar />
            <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
        </div>
    );
}
