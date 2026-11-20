'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useSession } from '@/lib/auth-client';
import { useSignOut } from '@/hooks/common';
import {
    dashboardNavigation,
    isDashboardLinkActive,
    type DashboardRole,
} from './dashboard-navigation';

type SidebarContentProps = {
    role: DashboardRole;
    onNavigate?: () => void;
};

function SidebarContent({ role, onNavigate }: SidebarContentProps) {
    const pathname = usePathname();
    const { handleSignOut, isSigningOut } = useSignOut();
    const isAdmin = role === 'admin';

    return (
        <div className="flex h-full min-h-0 flex-col bg-surface text-ink">
            <div className="flex items-start justify-between gap-3 px-5 pt-8 pb-9 lg:px-6">
                <Link href="/" onClick={onNavigate} className="min-w-0">
                    <span className="block font-serif text-2xl font-bold tracking-tight text-brand">
                        SalonBook
                    </span>
                    <span className="mt-1 block text-xs font-semibold tracking-[0.12em]">
                        {isAdmin ? 'ATELIER ADMIN' : 'MY ATELIER'}
                    </span>
                </Link>
                {onNavigate ? (
                    <button
                        type="button"
                        onClick={onNavigate}
                        aria-label="Close dashboard navigation"
                        className="-mt-1 -mr-2 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted hover:bg-brand-soft"
                    >
                        <FiX size={20} aria-hidden="true" />
                    </button>
                ) : (
                    <span className="mt-1 rounded-full bg-[#f9ded2] px-2.5 py-1 text-xs font-semibold text-brand">
                        {isAdmin ? 'Admin' : 'Customer'}
                    </span>
                )}
            </div>

            <nav aria-label="Dashboard navigation" className="min-h-0 flex-1 overflow-y-auto px-3">
                <ul className="space-y-1.5">
                    {dashboardNavigation[role].map(({ label, href, icon: Icon }) => {
                        const isActive = isDashboardLinkActive(pathname, href);

                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={onNavigate}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`flex min-h-11 items-center gap-3 rounded-lg px-3.5 py-3 text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-[#b65c3e] text-white shadow-sm'
                                            : 'text-[#493b33] hover:bg-brand-soft hover:text-brand'
                                    }`}
                                >
                                    <Icon size={17} className="shrink-0" aria-hidden="true" />
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="mt-auto px-3 pt-8 pb-5">
                <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-3.5 py-3 text-sm font-medium text-[#493b33] transition-colors hover:bg-brand-soft hover:text-brand disabled:cursor-wait disabled:opacity-60"
                >
                    <FiLogOut size={17} aria-hidden="true" />
                    {isSigningOut ? 'Logging out…' : 'Logout'}
                </button>
            </div>
        </div>
    );
}

export default function DashboardSideBar() {
    const { data: session, isPending } = useSession();
    const drawerRef = useRef<HTMLDialogElement>(null);
    const role: DashboardRole = session?.user.role === 'admin' ? 'admin' : 'user';

    return (
        <div className="lg:sticky lg:top-0 lg:h-dvh lg:w-62.5 lg:shrink-0">
            <div className="flex items-center justify-between border-b border-line bg-surface px-5 py-3 lg:hidden">
                <Link href="/dashboard" className="font-serif text-2xl font-bold text-brand">
                    SalonBook
                </Link>
                <button
                    type="button"
                    aria-label="Open dashboard navigation"
                    aria-haspopup="dialog"
                    aria-controls="dashboard-mobile-navigation"
                    disabled={isPending}
                    onClick={() => drawerRef.current?.showModal()}
                    className="flex size-11 cursor-pointer items-center justify-center rounded-lg text-ink hover:bg-brand-soft disabled:cursor-wait disabled:opacity-50"
                >
                    <FiMenu size={22} aria-hidden="true" />
                </button>
            </div>

            <aside className="hidden h-full border-r border-line lg:block">
                {isPending ? (
                    <div role="status" className="h-full bg-surface px-6 py-8 text-sm text-muted">
                        Loading dashboard menu…
                    </div>
                ) : (
                    <SidebarContent role={role} />
                )}
            </aside>

            <dialog
                ref={drawerRef}
                id="dashboard-mobile-navigation"
                aria-label="Dashboard menu"
                className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink/40"
            >
                <button
                    type="button"
                    aria-label="Close dashboard navigation"
                    tabIndex={-1}
                    onClick={() => drawerRef.current?.close()}
                    className="absolute inset-0 cursor-pointer"
                />
                <aside className="relative h-full w-72 max-w-[85vw] shadow-xl">
                    <SidebarContent role={role} onNavigate={() => drawerRef.current?.close()} />
                </aside>
            </dialog>
        </div>
    );
}
