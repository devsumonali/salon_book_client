'use client';

import { useSession } from '@/lib/auth-client';
import { useSignOut } from '@/hooks/common';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { FiHome, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import BrandLogo from '@/components/shared/BrandLogo';
import UserMenu from '@/components/shared/UserMenu';
import {
    dashboardNavigation,
    isDashboardLinkActive,
    type DashboardRole,
} from './dashboard-navigation';

function SidebarContent({
    role,
    name,
    email,
    onNavigate,
}: {
    role: DashboardRole;
    name?: string;
    email?: string;
    onNavigate?: () => void;
}) {
    const pathname = usePathname();
    const { handleSignOut, isSigningOut } = useSignOut();
    return (
        <div className="flex h-full min-h-0 flex-col bg-panel">
            <div className="flex min-h-20 items-center justify-between gap-2 border-b border-line px-6">
                <Link href="/" onClick={onNavigate}>
                    <BrandLogo />
                </Link>
                {onNavigate && (
                    <button
                        type="button"
                        onClick={onNavigate}
                        aria-label="Close dashboard navigation"
                        className="flex size-10 shrink-0 items-center justify-center rounded-xl text-muted hover:bg-surface"
                    >
                        <FiX size={20} aria-hidden="true" />
                    </button>
                )}
            </div>
            <div className="px-7 pt-7 pb-3">
                <p className="text-xs font-semibold tracking-[0.12em] text-subtle">
                    {role === 'admin' ? 'SALON MANAGEMENT' : 'MY SALONBOOK'}
                </p>
            </div>
            <nav aria-label="Dashboard navigation" className="min-h-0 flex-1 overflow-y-auto px-4">
                <ul className="space-y-1.5">
                    {dashboardNavigation[role].map(({ label, href, icon: Icon }) => {
                        const isActive = isDashboardLinkActive(pathname, href);
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={onNavigate}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={
                                        'flex min-h-12 items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ' +
                                        (isActive
                                            ? 'bg-brand-soft text-brand'
                                            : 'text-muted hover:bg-surface hover:text-ink')
                                    }
                                >
                                    <Icon size={19} className="shrink-0" aria-hidden="true" />
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <Link
                    href="/"
                    onClick={onNavigate}
                    className="mt-6 flex min-h-12 items-center gap-3 rounded-xl border-t border-line px-3.5 py-3 text-sm font-medium text-muted hover:bg-surface"
                >
                    <FiHome size={18} aria-hidden="true" />
                    Back to website
                </Link>
            </nav>
            <div className="m-4 mt-7 rounded-2xl border border-line bg-surface/70 p-3.5">
                <div className="flex items-center gap-2.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-sm font-bold text-brand">
                        {name?.trim()[0]?.toUpperCase() || 'S'}
                    </span>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{name || 'SalonBook'}</p>
                        <p className="truncate text-xs text-muted">
                            {email ||
                                (role === 'admin' ? 'Admin workspace' : 'Your personal space')}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-line bg-panel px-3 text-sm font-semibold text-muted transition-colors hover:border-brand/20 hover:text-brand"
                >
                    <FiLogOut size={16} aria-hidden="true" />
                    {isSigningOut ? 'Signing out...' : 'Sign out'}
                </button>
            </div>
        </div>
    );
}

export default function DashboardSideBar() {
    const { data: session, isPending } = useSession();
    const drawerRef = useRef<HTMLDialogElement>(null);
    const role: DashboardRole = session?.user.role === 'admin' ? 'admin' : 'user';
    const account = { role, name: session?.user.name, email: session?.user.email };
    return (
        <div className="lg:sticky lg:top-0 lg:h-dvh lg:w-64 lg:shrink-0">
            <div className="flex min-h-20 items-center justify-between gap-3 border-b border-line bg-panel px-4 sm:px-6 lg:hidden">
                <Link href="/dashboard">
                    <BrandLogo />
                </Link>
                <div className="flex items-center gap-2">
                    <UserMenu />
                    <button
                        type="button"
                        aria-label="Open dashboard navigation"
                        aria-haspopup="dialog"
                        aria-controls="dashboard-mobile-navigation"
                        disabled={isPending}
                        onClick={() => drawerRef.current?.showModal()}
                        className="flex size-11 items-center justify-center rounded-xl border border-line text-ink hover:bg-surface"
                    >
                        <FiMenu size={21} aria-hidden="true" />
                    </button>
                </div>
            </div>
            <aside className="hidden h-full border-r border-line lg:block">
                {isPending ? (
                    <div role="status" className="h-full bg-panel px-6 py-8 text-sm text-muted">
                        Loading dashboard menu...
                    </div>
                ) : (
                    <SidebarContent {...account} />
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
                <aside className="relative h-full w-72 max-w-[88vw] shadow-lift">
                    <SidebarContent {...account} onNavigate={() => drawerRef.current?.close()} />
                </aside>
            </dialog>
        </div>
    );
}
