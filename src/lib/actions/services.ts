import type { UpdateServiceData } from '@/types/service';

export const getUpdateService = async (id: string, serviceUpdateData: UpdateServiceData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/services/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceUpdateData),
        });

        if (!res.ok) {
            throw new Error('Failed to update service');
        }

        return await res.json();
    } catch (error) {
        console.log('Update API error:', error);
        throw error;
    }
};
