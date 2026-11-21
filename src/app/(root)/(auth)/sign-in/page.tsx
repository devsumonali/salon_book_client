import type { Metadata } from 'next';
import SignInForm from '@/components/auth/SignInForm';

export const metadata: Metadata = {
    title: 'Sign In | SalonBook',
};

export default async function SignInPage({
    searchParams,
}: {
    searchParams: Promise<{ callbackUrl?: string | string[] }>;
}) {
    const { callbackUrl } = await searchParams;
    const redirectUrl =
        typeof callbackUrl === 'string' &&
        callbackUrl.startsWith('/') &&
        !callbackUrl.startsWith('//') &&
        !/[\\\s]/.test(callbackUrl)
            ? callbackUrl
            : '/dashboard';

    return <SignInForm callbackUrl={redirectUrl} />;
}
