import type { AddServiceData } from '@/types/service';

export const getAddServices = async (servicesData: AddServiceData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/services`, {
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
