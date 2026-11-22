'use client';

import type { NavigationLinkProps } from '@/types/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationLink({
    href,
    className = '',
    children,
    ...props
}: NavigationLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

    return (
        <Link
            {...props}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`rounded-xl transition-colors ${
                isActive
                    ? 'bg-brand-soft text-brand'
                    : 'text-muted hover:bg-brand-soft hover:text-brand'
            } ${className}`}
        >
            {children}
        </Link>
    );
}
