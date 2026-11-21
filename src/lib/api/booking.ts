import type { CheckoutSessionData, ServiceBookingData } from '@/types/checkout.data';

export const getBookingProps = async (bookingData: ServiceBookingData) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/create-checkout-session`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
