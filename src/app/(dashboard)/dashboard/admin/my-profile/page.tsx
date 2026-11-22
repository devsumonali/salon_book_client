import { getApiToken, requireUser } from '@/lib/auth-session';
import { getCustomerProfileProps } from '@/lib/api/user/user';
import CustomerProfileForm from '@/app/(dashboard)/_components/CustomerProfileForm';

export default async function AdminProfile() {
    await requireUser('admin');
    const profile = await getCustomerProfileProps(await getApiToken());
    return <CustomerProfileForm profile={profile} />;
}
