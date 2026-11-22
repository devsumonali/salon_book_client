import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getCustomerProfileProps } from '@/lib/api/user/user';
import CustomerProfileForm from '@/app/(dashboard)/_components/CustomerProfileForm';

export default async function CustomerProfile() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) redirect('/sign-in?callbackUrl=%2Fdashboard%2Fcustomer%2Fmy-profile');

    const profile = await getCustomerProfileProps(session.session.token);
    return;
    <CustomerProfileForm profile={profile} />;
}
