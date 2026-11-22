import type { CustomerBooking } from '@/types/customer';
import type { ServiceCategory } from '@/types/service';

export type AppointmentDisplayData = {
    id: string;
    service: {
        name: string;
        image: string;
        category: ServiceCategory;
        duration: number;
        price: number;
    };
    date: string;
    time: string;
    status: CustomerBooking['status'];
    paymentStatus: CustomerBooking['paymentStatus'];
    requestedAt: string;
    confirmedAt?: string;
    cancelledAt?: string;
    paidAt?: string;
    paymentReference?: string;
    notes: string;
    isPast: boolean;
};

// Design preview only. Replace these fixtures with API data when ready.
export const demoAppointments: AppointmentDisplayData[] = [
    {
        id: 'SB-1026',
        service: { name: 'Signature Haircut & Styling', image: '/images/appointments/hair-styling.jpg', category: 'hair-styling', duration: 60, price: 55 },
        date: '2026-11-25',
        time: '10:30 AM',
        status: 'confirmed',
        paymentStatus: 'unpaid',
        requestedAt: '2026-11-21T09:00:00+06:00',
        confirmedAt: '2026-11-21T10:15:00+06:00',
        notes: 'A soft, layered cut with a natural finish, please.',
        isPast: false,
    },
    {
        id: 'SB-1025',
        service: { name: 'Botanical Glow Facial', image: '/images/appointments/facial-care.jpg', category: 'skin-care', duration: 45, price: 65 },
        date: '2026-11-28',
        time: '02:00 PM',
        status: 'pending',
        paymentStatus: 'unpaid',
        requestedAt: '2026-11-20T14:30:00+06:00',
        notes: 'I have sensitive skin. Please use gentle products.',
        isPast: false,
    },
    {
        id: 'SB-1024',
        service: { name: 'Balayage & Color Refresh', image: '/images/appointments/hair-styling.jpg', category: 'hair-color', duration: 90, price: 120 },
        date: '2026-11-30',
        time: '11:00 AM',
        status: 'confirmed',
        paymentStatus: 'paid',
        requestedAt: '2026-11-19T10:00:00+06:00',
        confirmedAt: '2026-11-19T11:00:00+06:00',
        paidAt: '2026-11-19T11:20:00+06:00',
        paymentReference: 'pi_demo_1024',
        notes: 'Warm, natural highlights with a subtle blend.',
        isPast: false,
    },
    {
        id: 'SB-1023',
        service: { name: 'Classic Manicure', image: '/images/appointments/nail-care.jpg', category: 'nail-care', duration: 45, price: 35 },
        date: '2026-12-02',
        time: '03:00 PM',
        status: 'pending',
        paymentStatus: 'unpaid',
        requestedAt: '2026-11-18T15:00:00+06:00',
        notes: '',
        isPast: false,
    },
    {
        id: 'SB-1022',
        service: { name: 'Botanical Glow Facial', image: '/images/appointments/facial-care.jpg', category: 'skin-care', duration: 45, price: 65 },
        date: '2026-11-15',
        time: '01:30 PM',
        status: 'confirmed',
        paymentStatus: 'paid',
        requestedAt: '2026-11-10T09:00:00+06:00',
        confirmedAt: '2026-11-10T11:30:00+06:00',
        paidAt: '2026-11-11T10:00:00+06:00',
        paymentReference: 'pi_demo_1022',
        notes: '',
        isPast: true,
    },
    {
        id: 'SB-1021',
        service: { name: 'Restorative Body Ritual', image: '/images/appointments/wellness.jpg', category: 'wellness', duration: 60, price: 85 },
        date: '2026-11-10',
        time: '04:00 PM',
        status: 'cancelled',
        paymentStatus: 'unpaid',
        requestedAt: '2026-11-05T10:30:00+06:00',
        cancelledAt: '2026-11-08T12:00:00+06:00',
        notes: 'Prefer a light-pressure treatment.',
        isPast: true,
    },
];

export const appointmentStatusStyles = {
    pending: { label: 'Pending', className: 'bg-[#fff4df] text-[#8a5b17]' },
    confirmed: { label: 'Confirmed', className: 'bg-[#eaf2e9] text-[#3f6344]' },
    cancelled: { label: 'Cancelled', className: 'bg-[#faeae6] text-[#9b493f]' },
};

export function formatAppointmentDate(date: string) {
    return new Date(`${date}T00:00:00+06:00`).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Dhaka',
    });
}

export function formatAppointmentEvent(date: string) {
    return new Date(date).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Dhaka',
    });
}
