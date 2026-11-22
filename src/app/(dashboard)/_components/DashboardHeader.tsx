'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome } from 'react-icons/fi';
import UserMenu from '@/components/shared/UserMenu';
import { dashboardNavigation, type DashboardRole } from './dashboard-navigation';

export default function DashboardHeader({ role }: { role: DashboardRole }) {
    const pathname = usePathname();
    const active = dashboardNavigation[role].find((item) => item.href === pathname);
    return (
        <header className="sticky top-0 z-20 hidden min-h-20 lg:flex items-center justify-between gap-4 border-b border-line bg-panel/95 px-5 backdrop-blur-xl sm:px-7 lg:px-10">
            <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">
                    {role === 'admin' ? 'Salon workspace' : 'Your personal space'}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted">
                    Dashboard <span className="px-1.5 text-line">/</span>{' '}
                    {active?.label || 'Overview'}
                </p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
                <Link
                    href="/"
                    className="hidden min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-muted hover:bg-surface hover:text-brand sm:inline-flex"
                >
                    <FiHome size={17} aria-hidden="true" />
                    Visit website
                </Link>
                <UserMenu />
            </div>
        </header>
    );
}
