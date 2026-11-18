'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';

export default function NavigationLink({
    href,
    className = '',
    children,
    ...props
}: Omit<ComponentProps<typeof Link>, 'href'> & { href: string }) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

    return (
        <Link
            {...props}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`rounded-md transition-colors ${
                isActive
                    ? 'bg-brand-soft text-brand'
                    : 'text-muted hover:bg-brand-soft hover:text-brand'
            } ${className}`}
        >
            {children}
        </Link>
    );
}
