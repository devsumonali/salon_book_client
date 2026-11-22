import { getApiToken, requireUser } from '@/lib/auth-session';
import { getCustomerProfileProps } from '@/lib/api/user/user';
import CustomerProfileForm from '@/app/(dashboard)/_components/CustomerProfileForm';

export default async function CustomerProfile() {
    await requireUser('user', '/dashboard/customer/my-profile');

    const profile = await getCustomerProfileProps(await getApiToken());
    return <CustomerProfileForm profile={profile} />;
}
