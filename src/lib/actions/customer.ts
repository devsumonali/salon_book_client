'use server';

import { getApiToken } from '@/lib/auth-session';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { getAppointmentActionProps, getUpdateProfileProps } from '@/lib/api/user/user';
import { getBookingProps } from '@/lib/api/booking';
import type { ServiceBookingData } from '@/types/checkout.data';
import type { CustomerActionResult, CustomerProfileResult, CustomerProfileUpdate } from '@/types/customer';

export async function updateCustomerAppointment(
    id: string,
    action: 'cancel' | 'checkout',
): Promise<CustomerActionResult> {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session)
            return {
                error: 'Please sign in again',
            };
        if (!['cancel', 'checkout'].includes(action)) return { error: 'Invalid action' };
        const data = await getAppointmentActionProps(id, action, await getApiToken());
        revalidatePath('/dashboard', 'layout');
        return data;
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Unable to update appointment' };
    }
}

export async function requestCustomerAppointment(
    booking: Pick<ServiceBookingData, 'serviceId' | 'date' | 'time' | 'notes'>,
): Promise<CustomerActionResult> {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) return { error: 'Please sign in again' };

        const res = await getBookingProps(booking, await getApiToken());
        const data = await res.json();

        if (!res.ok) return { error: data.message || 'Unable to request appointment' };
        revalidatePath('/dashboard', 'layout');
        return { message: data.message as string };
    } catch {
        return { error: 'Unable to request appointment. Please try again.' };
    }
}

export async function updateCustomerProfile(profile: CustomerProfileUpdate): Promise<CustomerProfileResult> {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) return { error: 'Please sign in again' };
        const data = await getUpdateProfileProps(profile, await getApiToken());
        revalidatePath('/dashboard', 'layout');
        return data;
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Unable to update profile' };
    }
}
