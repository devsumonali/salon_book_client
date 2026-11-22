import CustomerAppointmentsContent from '@/app/(dashboard)/_components/CustomerAppointmentsContent';
import { demoAppointments } from '@/app/(dashboard)/_components/customer-appointment-demo';

export default function MyAppointmentsCustomer() {
    return <CustomerAppointmentsContent appointments={demoAppointments} />;
}
