export type ServiceBookingData = {
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

