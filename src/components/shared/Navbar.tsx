'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import NavigationLink from './NavigationLink';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Services', href: '/browse-service' },
    { label: 'About', href: '/about' },
];

const Navbar = () => {
    const pathname = usePathname();
    const [openPathname, setOpenPathname] = useState<string | null>(null);
    const isMenuOpen = openPathname === pathname;
    const headerRef = useRef<HTMLElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isMenuOpen) return;

        const desktop = window.matchMedia('(min-width: 1024px)');
        const closeOnDesktop = () => {
            if (desktop.matches) setOpenPathname(null);
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpenPathname(null);
                toggleRef.current?.focus();
            }
        };
        const closeOutside = (event: PointerEvent) => {
            if (!headerRef.current?.contains(event.target as Node)) setOpenPathname(null);
        };

        desktop.addEventListener('change', closeOnDesktop);
        document.addEventListener('keydown', closeOnEscape);
        document.addEventListener('pointerdown', closeOutside);
        return () => {
            desktop.removeEventListener('change', closeOnDesktop);
            document.removeEventListener('keydown', closeOnEscape);
            document.removeEventListener('pointerdown', closeOutside);
        };
    }, [isMenuOpen]);

    return (
        <header
            ref={headerRef}
            className="sticky top-0 z-50 w-full shrink-0 border-b border-line bg-surface"
        >
            <div className="mx-auto flex min-h-18 w-full max-w-360 items-center justify-between gap-3 px-4 sm:min-h-20 sm:px-6 lg:gap-6 lg:px-8 xl:px-12">
                <Link
                    href="/"
                    onClick={() => setOpenPathname(null)}
                    className="shrink-0 font-serif text-xl font-bold tracking-tight text-ink sm:text-2xl"
                >
                    SalonBook
                </Link>

                <nav
                    aria-label="Main navigation"
                    className="hidden items-center gap-1 lg:flex xl:gap-2"
                >
                    {navLinks.map((link) => (
                        <NavigationLink
                            key={link.href}
                            href={link.href}
                            className="px-4 py-3 text-sm font-medium"
                        >
                            {link.label}
                        </NavigationLink>
                    ))}
                </nav>

                <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                    <Link
                        href="/browse-service"
                        className="hidden min-h-11 items-center justify-center gap-2 rounded-md bg-brand px-4 py-3 text-xs font-semibold text-panel transition-colors hover:bg-brand-hover sm:flex"
                    >
                        <FiCalendar size={16} aria-hidden="true" />
                        <span>Book Appointment</span>
                    </Link>
                    <div>
                        <Link href={'/sign-in'}>Sign In</Link>
                        <Link href={'/sign-up'}>Sign Up</Link>
                    </div>
                </div>
            </div>

            {/* mobile navigation  */}
            <nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                hidden={!isMenuOpen}
                className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-line bg-surface px-4 py-4 sm:px-6 lg:hidden"
            >
                <div className="mx-auto flex max-w-360 flex-col gap-1">
                    {navLinks.map((link) => (
                        <NavigationLink
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpenPathname(null)}
                            className="px-3 py-3 text-sm font-medium"
                        >
                            {link.label}
                        </NavigationLink>
                    ))}
                    <Link
                        href="/browse-service"
                        onClick={() => setOpenPathname(null)}
                        className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand px-4 py-3 text-sm font-semibold text-panel transition-colors hover:bg-brand-hover sm:hidden"
                    >
                        <FiCalendar size={17} aria-hidden="true" />
                        Book Appointment
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
