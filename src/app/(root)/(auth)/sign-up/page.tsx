import type { Metadata } from 'next';
import SignUpForm from '@/components/auth/SignUpForm';

export const metadata: Metadata = {
    title: 'Create Account | SalonBook',
};

const SignUpPage = () => {
    return <SignUpForm />;
};

export default SignUpPage;
