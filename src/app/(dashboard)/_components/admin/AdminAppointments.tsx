'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { CustomerBooking } from '@/types/customer';
import { updateAdminAppointment } from '@/lib/actions/admin';
import { serviceCategories } from '@/lib/service-display';
import ServiceDialog from '../ServiceDialog';
import { formatAppointmentDate } from '../customer-appointment-display';
import { AdminBadge, buttonClass, eventDate, money, tableClass } from './AdminUi';

export default function AdminAppointments({ appointments }: { appointments: CustomerBooking[] }) {
    const [selected, setSelected] = useState<CustomerBooking | null>(null);
    const [action, setAction] = useState<'details' | 'confirm' | 'cancel'>('details');
    const [busy, setBusy] = useState(false);
    const dialog = useRef<HTMLDialogElement>(null);
    const router = useRouter();

    function open(booking: CustomerBooking, next: typeof action) {
        setSelected(booking);
        setAction(next);
        dialog.current?.showModal();
    }

    async function handleUpdate() {
        if (!selected || action === 'details' || busy) return;
        setBusy(true);
        try {
            const result = await updateAdminAppointment(selected._id, action);
            if (result.error) {
                toast.error(result.error);
                return;
            }
            toast.success(result.message || 'Appointment updated');
            dialog.current?.close();
            router.refresh();
        } catch {
            toast.error('Unable to update appointment');
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <div className="overflow-x-auto rounded-2xl border border-line bg-panel shadow-card">
                <table className={tableClass}>
                    <caption className="sr-only">All customer appointment requests</caption>
                    <thead className="bg-surface text-muted">
                        <tr>
                            <th scope="col">Customer</th>
                            <th scope="col">Service</th>
                            <th scope="col">Date &amp; time</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                        {appointments.map((booking) => (
                            <tr key={booking._id}>
                                <td>
                                    <p className="font-semibold">{booking.name}</p>
                                    <p className="mt-1 text-xs text-muted">{booking.userEmail}</p>
                                </td>
                                <td>
                                    <p className="font-semibold">{booking.service.name}</p>
                                    <p className="mt-1 text-xs text-muted">
                                        Requested {eventDate(booking.createdAt)}
                                    </p>
                                </td>
                                <td>
                                    <p>{formatAppointmentDate(booking.date)}</p>
                                    <p className="mt-1 text-muted">{booking.time}</p>
                                </td>
                                <td>
                                    {booking.service.price !== null
                                        ? money(booking.service.price)
                                        : 'Unavailable'}
                                </td>
                                <td>
                                    <AdminBadge value={booking.status} />
                                </td>
                                <td>
                                    <AdminBadge value={booking.paymentStatus} />
                                </td>
                                <td>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            className={buttonClass}
                                            onClick={() => open(booking, 'details')}
                                        >
                                            Details
                                        </button>
                                        {booking.status === 'pending' && (
                                            <button
                                                className={buttonClass}
                                                onClick={() => open(booking, 'confirm')}
                                            >
                                                Confirm
                                            </button>
                                        )}
                                        {booking.status !== 'cancelled' && (
                                            <button
                                                className={`${buttonClass} text-red-800`}
                                                onClick={() => open(booking, 'cancel')}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!appointments.length && (
                    <p className="p-10 text-center text-base text-muted">
                        No appointment requests yet.
                    </p>
                )}
            </div>
            <ServiceDialog
                dialogRef={dialog}
                id="admin-appointment"
                title={
                    action === 'details'
                        ? 'Appointment details'
                        : action === 'confirm'
                          ? 'Confirm appointment'
                          : 'Cancel appointment'
                }
                busy={busy}
            >
                {selected && (
                    <div className="space-y-5">
                        <h3 className="text-2xl">{selected.service.name}</h3>
                        <div className="flex gap-2">
                            <AdminBadge value={selected.status} />
                            <AdminBadge value={selected.paymentStatus} />
                        </div>
                        <dl className="grid gap-5 rounded-xl bg-surface p-5 sm:grid-cols-2">
                            {[
                                ['Customer', selected.name],
                                ['Email', selected.userEmail],
                                [
                                    'Category',
                                    serviceCategories[
                                        selected.service.category as keyof typeof serviceCategories
                                    ]?.label ||
                                        selected.service.category ||
                                        'Unavailable',
                                ],
                                ['Date', formatAppointmentDate(selected.date)],
                                ['Time', selected.time],
                                [
                                    'Duration',
                                    selected.service.duration !== null
                                        ? `${selected.service.duration} minutes`
                                        : 'Unavailable',
                                ],
                                [
                                    'Service price',
                                    selected.service.price !== null
                                        ? money(selected.service.price)
                                        : 'Unavailable',
                                ],
                                ['Requested', eventDate(selected.createdAt)],
                                ['Confirmed', eventDate(selected.confirmedAt)],
                                ['Cancelled', eventDate(selected.cancelledAt)],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <dt className="text-sm text-muted">{label}</dt>
                                    <dd className="mt-1 text-sm font-semibold wrap-break-word">
                                        {value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        <div>
                            <p className="text-sm font-semibold">Customer message</p>
                            <p className="mt-2 text-base leading-7 text-muted">
                                {selected.notes || 'No additional message.'}
                            </p>
                        </div>
                        <p className="text-xs break-all text-muted">Booking ID: {selected._id}</p>
                        {action === 'cancel' && (
                            <p className="rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-800">
                                Cancel this request? Payment records remain unchanged. Paid
                                appointments are not refunded automatically.
                            </p>
                        )}
                        {action === 'confirm' && (
                            <p className="text-base text-muted">
                                Confirm this request and allow the customer to pay through Stripe?
                            </p>
                        )}
                        <div className="flex justify-end gap-3 border-t border-line pt-5">
                            <button
                                type="button"
                                disabled={busy}
                                className={buttonClass}
                                onClick={() => dialog.current?.close()}
                            >
                                Close
                            </button>
                            {action !== 'details' && (
                                <button
                                    type="button"
                                    disabled={busy}
                                    onClick={handleUpdate}
                                    className="min-h-11 cursor-pointer rounded-lg bg-brand px-5 text-sm font-semibold text-white disabled:opacity-50"
                                >
                                    {busy
                                        ? 'Saving…'
                                        : action === 'confirm'
                                          ? 'Confirm Appointment'
                                          : 'Cancel Appointment'}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </ServiceDialog>
        </>
    );
}
