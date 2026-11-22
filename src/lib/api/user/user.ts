import type {
    BookingManageData,
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
): Promise<BookingManageData> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/customer/appointments`,
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

export const getAppointmentActionProps = async (id: string, action: 'cancel' | 'checkout', token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/customer/appointments/${encodeURIComponent(id)}/${action}`, {
        method: action === 'cancel' ? 'PATCH' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
    });
    const data: { message?: string; url?: string } = await res.json();
    if (!res.ok) throw new Error(data.message || 'Unable to update appointment');
    return data;
};
