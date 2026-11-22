import type {
    BookingManageData,
    BookingManageFilters,
    CustomerOverviewData,
} from '@/types/customer';

export const getCustomerProps = async (token: string): Promise<CustomerOverviewData> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/customer/overview`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch customer overview');
        }

        const data: CustomerOverviewData = await res.json();

        return data;
    } catch (error) {
        console.error('Customer overview error:', error);
        throw error;
    }
};
export const getBookingManageProps = async (
    token: string,
    filters: BookingManageFilters = {},
): Promise<BookingManageData> => {
    try {
        const params = new URLSearchParams();

        for (const [key, value] of Object.entries(filters)) {
            if (value !== undefined) {
                params.set(key, String(value));
            }
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/customer/appointments?${params.toString()}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: 'no-store',
            },
        );

        if (!res.ok) {
            throw new Error('Failed to fetch appointments');
        }

        return await res.json();
    } catch (error) {
        console.error('Customer appointments error:', error);
        throw error;
    }
};
