import type { CustomerBooking } from './customer';

export type AdminOverviewData = {
    customers: number;
    services: number;
    appointments: number;
    pending: number;
    confirmed: number;
    payments: number;
    totals: { _id: string; amount: number }[];
    recent: CustomerBooking[];
};

export type AdminUser = {
    _id: string;
    name: string;
    email: string;
    image?: string;
    phone?: string;
    isBlocked?: boolean;
    createdAt?: string;
};

export type AdminTransaction = {
    _id: string;
    appointmentId: string;
    customerId: string;
    customerName: string;
    customerEmail: string;
    serviceName: string;
    appointmentDate: string;
    amount: number;
    currency: string;
    stripeSessionId: string;
    paymentReference: string;
    status: 'paid' | 'failed';
    createdAt: string;
    appointment: CustomerBooking | null;
};
