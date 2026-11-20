import {
    FiCalendar,
    FiCreditCard,
    FiEdit3,
    FiGrid,
    FiScissors,
    FiUser,
    FiUsers,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';

export type DashboardRole = 'admin' | 'user';

export type DashboardNavigationItem = {
    label: string;
    href: string;
    icon: IconType;
};

export const dashboardNavigation: Record<DashboardRole, DashboardNavigationItem[]> = {
    admin: [
        { label: 'Overview', href: '/dashboard/admin/overview', icon: FiGrid },
        { label: 'Manage Services', href: '/dashboard/admin/manage-services', icon: FiScissors },
        { label: 'Add Services', href: '/dashboard/admin/add-services', icon: FiEdit3 },
        {
            label: 'Manage Appointments',
            href: '/dashboard/admin/manage-appointments',
            icon: FiCalendar,
        },
        { label: 'Manage Users', href: '/dashboard/admin/manage-users', icon: FiUsers },
        { label: 'Transactions', href: '/dashboard/admin/transactions', icon: FiCreditCard },
        { label: 'My Profile', href: '/dashboard/admin/my-profile', icon: FiUser },
    ],
    user: [
        { label: 'Overview', href: '/dashboard/customer/overview', icon: FiGrid },
        { label: 'My Appointments', href: '/dashboard/customer/my-appointments', icon: FiCalendar },
        { label: 'My Profile', href: '/dashboard/customer/my-profile', icon: FiUser },
    ],
};

export function isDashboardLinkActive(pathname: string, href: string) {
    return pathname === href || (href !== '/dashboard' && pathname.startsWith(`${href}/`));
}
