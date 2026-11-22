import { getApiToken, requireUser } from '@/lib/auth-session';
import CustomerAppointmentsContent from '@/app/(dashboard)/_components/CustomerAppointmentsContent';
import { getBookingManageProps } from '@/lib/api/user/user';

export default async function MyAppointmentsCustomer() {
    await requireUser('user', '/dashboard/customer/my-appointments');

    const data = await getBookingManageProps(await getApiToken());
    const appointments = data.bookings.map((booking) => ({
        ...booking,
        id: booking._id,
        requestedAt: booking.createdAt,
    }));
    return <CustomerAppointmentsContent appointments={appointments} />;
}
