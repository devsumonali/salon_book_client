import type { CheckoutSessionData, ServiceBookingData } from '@/types/checkout.data';

export const getBookingProps = async (bookingData: Pick<ServiceBookingData, 'serviceId' | 'date' | 'time' | 'notes'>, token: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/customer/appointments`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                cache: 'no-store',
                body: JSON.stringify(bookingData),
            },
        );

        return res;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

export const getCheckoutSession = async (
    sessionId: string,
    token: string,
): Promise<CheckoutSessionData> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/checkout-session/${encodeURIComponent(sessionId)}`,
        {
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store',
        },
    );

    if (!res.ok) {
        throw new Error('Unable to load checkout details');
    }

    return res.json();
};
