'use client';

import { signOut, useSession } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiGrid, FiLogOut } from 'react-icons/fi';

export default function UserMenu() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [openKey, setOpenKey] = useState<string | null>(null);
    const [failedImage, setFailedImage] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const user = session?.user;
    const currentKey = user ? `${user.id}:${pathname}` : null;
    const isOpen = currentKey !== null && openKey === currentKey;

    useEffect(() => {
        if (!isOpen) return;

        const closeOutside = (event: PointerEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) setOpenKey(null);
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpenKey(null);
                triggerRef.current?.focus();
            }
        };

        document.addEventListener('pointerdown', closeOutside);
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.removeEventListener('pointerdown', closeOutside);
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [isOpen]);

    if (isPending) {
        return (
            <div
                role="status"
                aria-label="Loading account"
                className="h-11 w-20 animate-pulse rounded-md bg-brand-soft"
            />
        );
    }

    // If the user is not logged in, show a login button
    if (!user) {
        return (
            <Link
                href="/sign-in"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft"
            >
                Login
            </Link>
        );
    }

    //Signout handler function
    const handleSignOut = async () => {
        await signOut();
        router.refresh();
        router.replace('/sign-in');
    };

    const userName = user.name.trim() || user.email;
    const initial = Array.from(userName)[0]?.toLocaleUpperCase() || 'U';

    return (
        <div
            ref={containerRef}
            className="relative"
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpenKey(null);
            }}
        >
            <button
                ref={triggerRef}
                type="button"
                aria-label={`Account options for ${userName}`}
                aria-expanded={isOpen}
                aria-controls="user-dropdown"
                onClick={() => setOpenKey(isOpen ? null : currentKey)}
                className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-brand-soft"
            >
                <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-avatar text-sm font-semibold text-brand">
                    {user.image && user.image !== failedImage ? (
                        <Image
                            src={user.image}
                            alt=""
                            width={36}
                            height={36}
                            unoptimized
                            onError={() => setFailedImage(user.image ?? null)}
                            className="size-9 object-cover"
                        />
                    ) : (
                        <span aria-hidden="true">{initial}</span>
                    )}
                </span>
                {/* Static display role; connect the actual user role later. */}
                <span className="text-xs font-medium text-muted">{user.role}</span>
                <FiChevronDown
                    aria-hidden="true"
                    size={15}
                    className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <div
                id="user-dropdown"
                hidden={!isOpen}
                className="absolute right-0 top-full z-10 mt-2 w-56 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-line bg-panel shadow-lg"
            >
                <p
                    className="truncate border-b border-line px-4 py-3 text-sm font-semibold text-ink"
                    title={userName}
                >
                    {userName}
                </p>
                <div className="p-1.5">
                    <Link
                        href="/dashboard"
                        onClick={() => setOpenKey(null)}
                        className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink transition-colors hover:bg-surface"
                    >
                        <FiGrid aria-hidden="true" size={16} />
                        Dashboard
                    </Link>
                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-brand transition-colors hover:bg-brand-soft"
                    >
                        <FiLogOut aria-hidden="true" size={16} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
