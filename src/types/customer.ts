import type { ServiceBookingData } from './checkout.data';

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
};

export type BookingManageData = {
    bookings: CustomerBooking[];
    total: number;
    page: number;
    totalPages: number;
};

export type BookingManageFilters = {
    status?: CustomerBooking['status'] | 'all';
    search?: string;
    page?: number;
    limit?: number;
};
