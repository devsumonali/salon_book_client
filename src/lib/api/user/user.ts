import type {
    BookingManageData,
    CustomerOverviewData,
    CustomerProfileData,
    CustomerProfileUpdate,
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

export const getCustomerProfileProps = async (token: string): Promise<CustomerProfileData> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/customer/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to load profile');
    return await res.json();
};

export const getUpdateProfileProps = async (profile: CustomerProfileUpdate, token: string): Promise<{ message: string; profile: CustomerProfileData }> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/customer/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(profile),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update profile');
    return data;
};
