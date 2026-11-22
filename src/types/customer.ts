import type { ServiceBookingData } from './checkout.data';

export type CustomerActionResult = {
    error?: string;
    message?: string;
    url?: string;
};

export type CustomerProfileData = {
    id: string;
    name: string;
    email: string;
    image: string;
    phone: string;
    createdAt: string | null;
    emailVerified: boolean;
};

export type CustomerProfileUpdate = Partial<Pick<CustomerProfileData, 'name' | 'image' | 'phone'>>;

export type CustomerProfileResult = {
    message?: string;
    error?: string;
    profile?: CustomerProfileData;
};

export type CustomerAppointment = {
    id: string;
    serviceName: string;
    date: string;
    time: string;
    duration: number | null;
    status: string;
};

export type CustomerOverviewData = {
    totalAppointments: number;
    pendingAppointments: number;
    confirmedAppointments: number;
    cancelledAppointments: number;
    nextAppointment: CustomerAppointment | null;
    recentAppointments: CustomerAppointment[];
};
// The appointments endpoint returns booking documents, not overview summaries.
export type CustomerBooking = Omit<ServiceBookingData, 'email'> & {
    _id: string;
    userEmail: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentStatus: 'unpaid' | 'paid';
    createdAt: string;
    confirmedAt?: string;
    cancelledAt?: string;
    paidAt?: string;
    paymentReference?: string;
    amountPaid?: number;
    currency?: string;
    isPast: boolean;
    service: {
        name: string;
        image: string;
        category: string;
        price: number | null;
        duration: number | null;
    };
};

export type BookingManageData = {
    bookings: CustomerBooking[];
    total: number;
    page: number;
    totalPages: number;
};
