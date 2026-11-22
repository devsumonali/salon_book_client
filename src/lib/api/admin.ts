import type { AdminOverviewData, AdminTransaction, AdminUser } from '@/types/admin';
import type { CustomerBooking } from '@/types/customer';
import type { AddServiceData } from '@/types/service';

// Admin-only GET APIs. The backend checks the JWT and current database role.
export async function getAdminOverviewProps(token: string): Promise<AdminOverviewData> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/overview`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to load admin overview');
    return res.json();
}

export async function getAdminAppointmentsProps(token: string): Promise<CustomerBooking[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/appointments`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to load appointments');
    return res.json();
}

export async function getAdminUsersProps(token: string): Promise<AdminUser[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to load customers');
    return res.json();
}

export async function getAdminTransactionsProps(token: string): Promise<AdminTransaction[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/transactions`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to load transactions');
    return res.json();
}

export async function getAdminServicesProps(token: string): Promise<AddServiceData[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/services`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to load services');
    return res.json();
}
