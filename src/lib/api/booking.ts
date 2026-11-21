import type { ServiceBookingData } from '@/types/checkout.data';

export const getBookingProps = async (bookingData: ServiceBookingData) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/create-checkout-session`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            },
        );

        return res;
    } catch (error) {
        console.error('Error adding service:', error);
        throw error;
    }
};
