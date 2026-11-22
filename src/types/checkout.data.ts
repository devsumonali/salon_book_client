export type ServiceBookingData = {
    serviceId: string;
    date: string;
    time: string;
    notes: string;
    userId: string;
    name: string;
    email: string;
};

export type CheckoutBooking = {
    service: {
        name: string;
        category: string;
        image: string;
        duration: number;
        price: number;
    };
    date: string;
    time: string;
    customer: {
        fullName: string;
        email: string;
        phone?: string;
        notes: string;
    };
};

export type PendingBookingData = ServiceBookingData & {
    service: CheckoutBooking['service'];
};

export type CheckoutSessionData = {
    id: string;
    bookingId: string;
    name: string;
    email: string;
    serviceName: string;
    date: string;
    time: string;
    notes?: string;
    amountTotal: number | null;
    currency: string | null;
    paymentStatus: 'paid' | 'unpaid' | 'no_payment_required';
    appointmentPaymentStatus: 'paid' | 'unpaid';
    status: 'open' | 'complete' | 'expired' | null;
};

