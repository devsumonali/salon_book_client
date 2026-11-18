import type Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

export type NavigationLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
    href: string;
};

export type ChildrenProps = {
    children: ReactNode;
};
