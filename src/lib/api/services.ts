import type { AddServiceData } from '@/types/service';

//service post api fetch
export const getAddServices = async (servicesData: Omit<AddServiceData, '_id'>) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/services`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(servicesData),
        });

        return res;
    } catch (error) {
        console.error('Error adding service:', error);
        throw error;
    }
};

//service get api fetch
export const getServiceProps = async (): Promise<AddServiceData[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/services`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch services');
        }

        const services: AddServiceData[] = await res.json();

        if (!Array.isArray(services)) {
            throw new Error('Invalid service list returned by the API');
        }

        return services;
    } catch (err) {
        console.log('Api fetching problem', err);
        throw err;
    }
};
