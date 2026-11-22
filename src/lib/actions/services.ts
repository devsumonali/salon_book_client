'use server';

import type { AddServiceData, UpdateServiceData } from '@/types/service';
import { getApiToken } from '@/lib/auth-session';
import { getAddServices } from '@/lib/api/services';
import { revalidatePath } from 'next/cache';

export async function createAdminService(service: Omit<AddServiceData, '_id'>) {
    const res = await getAddServices(service, await getApiToken());
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add service');
    revalidatePath('/dashboard/admin/manage-services');
    revalidatePath('/service');
    revalidatePath('/');
    return data;
}

export const getUpdateService = async (id: string, serviceUpdateData: UpdateServiceData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/services/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getApiToken()}`,
            },
            body: JSON.stringify(serviceUpdateData),
        });

        if (!res.ok) {
            throw new Error('Failed to update service');
        }

        revalidatePath('/dashboard', 'layout');
        revalidatePath('/service');
        revalidatePath('/');
        return await res.json();
    } catch (error) {
        console.log('Update API error:', error);
        throw error;
    }
};

export const getDeleteService = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/services/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${await getApiToken()}` },
        });
        if (!res.ok) {
            throw new Error('Faild to update service');
        }
        revalidatePath('/dashboard', 'layout');
        revalidatePath('/service');
        revalidatePath('/');
        return await res.json();
    } catch (error) {
        console.log('update Api error:', error);
        throw error;
    }
};
