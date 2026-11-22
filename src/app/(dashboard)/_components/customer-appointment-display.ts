import type { CustomerBooking } from '@/types/customer';

export type AppointmentDisplayData = CustomerBooking & { id: string; requestedAt: string };

export const appointmentStatusStyles = {
    pending: { label: 'Pending', className: 'bg-[#fff4df] text-[#8a5b17]' },
    confirmed: { label: 'Confirmed', className: 'bg-[#eaf2e9] text-[#3f6344]' },
    cancelled: { label: 'Cancelled', className: 'bg-[#faeae6] text-[#9b493f]' },
};

export function formatAppointmentDate(date: string) {
    const value = new Date(`${date}T00:00:00+06:00`);
    return Number.isNaN(value.getTime()) ? 'Date unavailable' : value.toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Dhaka',
    });
}

export function formatAppointmentEvent(date: string) {
    return new Date(date).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Dhaka',
    });
}

export function formatAppointmentPrice(appointment: AppointmentDisplayData) {
    const amount = appointment.paymentStatus === 'paid' ? appointment.amountPaid ?? appointment.service.price : appointment.service.price;
    return amount === null ? 'Unavailable' : new Intl.NumberFormat('en-US', {
        style: 'currency', currency: appointment.currency || 'USD',
    }).format(amount);
}
