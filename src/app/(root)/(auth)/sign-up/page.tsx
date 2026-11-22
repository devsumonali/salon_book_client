import type { Metadata } from 'next';
import SignUpForm from '@/components/auth/SignUpForm';

export const metadata: Metadata = {
    title: 'Create Account | SalonBook',
};

const SignUpPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ callbackUrl?: string | string[] }>;
}) => {
    const { callbackUrl } = await searchParams;
    // Return to the selected service; only allow a URL inside this website.
    const redirectUrl =
        typeof callbackUrl === 'string' &&
        callbackUrl.startsWith('/') &&
        !callbackUrl.startsWith('//') &&
        !/[\\\s]/.test(callbackUrl)
            ? callbackUrl
            : '/dashboard';

    return <SignUpForm callbackUrl={redirectUrl} />;
};

export default SignUpPage;
