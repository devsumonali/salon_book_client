import type { AddServiceData } from '@/types/service';

// Admin service creation. The server action supplies the signed JWT.
export const getAddServices = async (servicesData: Omit<AddServiceData, '_id'>, token: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(servicesData),
    });
};

// Public services. Home requests active services; the service page shows all statuses.
export const getServiceProps = async (
    filters: {
        search?: string;
        category?: string | string[];
        sort?: string;
        status?: 'active' | 'inactive';
    } = {},
): Promise<AddServiceData[]> => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
        if (Array.isArray(value)) value.forEach((item) => params.append(key, item));
        else if (value) params.set(key, value);
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/services?${params}`, {
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch services');
    const services: AddServiceData[] = await res.json();
    if (!Array.isArray(services)) throw new Error('Invalid service list returned by the API');
    return services;
};

// Protected service details; the page handles a missing service with notFound().
export const getSingleService = async (
    id: string,
    token: string,
): Promise<AddServiceData | null> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/services/${encodeURIComponent(id)}`,
        {
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store',
        },
    );
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch service');
    return await res.json();
};
