'use server';

import { revalidatePath } from 'next/cache';
import { getApiToken } from '@/lib/auth-session';
import type { CustomerActionResult } from '@/types/customer';

// Confirm/cancel a booking. The Express API verifies admin permission again.
export async function updateAdminAppointment(
    id: string,
    action: 'confirm' | 'cancel',
): Promise<CustomerActionResult> {
    try {
        if (!['confirm', 'cancel'].includes(action)) return { error: 'Invalid action' };
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/appointments/${encodeURIComponent(id)}/${action}`,
            { method: 'PATCH', headers: { Authorization: `Bearer ${await getApiToken()}` } },
        );
        const data = await res.json();
        if (!res.ok) return { error: data.message || 'Failed to update appointment' };
        revalidatePath('/dashboard', 'layout');
        return { message: data.message };
    } catch {
        return { error: 'Unable to update appointment. Please try again.' };
    }
}

// Block/unblock a customer. IDs, role changes, and payment changes are not accepted.
export async function updateAdminUser(
    id: string,
    isBlocked: boolean,
): Promise<CustomerActionResult> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/users/${encodeURIComponent(id)}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await getApiToken()}`,
                },
                body: JSON.stringify({ isBlocked }),
            },
        );
        const data = await res.json();
        if (!res.ok) return { error: data.message || 'Failed to update customer' };
        revalidatePath('/dashboard', 'layout');
        return { message: data.message };
    } catch {
        return { error: 'Unable to update customer. Please try again.' };
    }
}
