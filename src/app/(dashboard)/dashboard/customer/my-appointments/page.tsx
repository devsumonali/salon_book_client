import CustomerAppointmentsContent from '@/app/(dashboard)/_components/CustomerAppointmentsContent';
import { getBookingManageProps } from '@/lib/api/user/user';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MyAppointmentsCustomer() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect('/sign-in?callbackUrl=%2Fdashboard%2Fcustomer%2Fmy-appointments');
    const data = await getBookingManageProps(session.session.token);
    const appointments = data.bookings.map(booking => ({ ...booking, id: booking._id, requestedAt: booking.createdAt }));
    return <CustomerAppointmentsContent appointments={appointments} />;
}
