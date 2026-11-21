'use client';

import { authClient, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

//signout function
export const useSignOut = () => {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    async function handleSignOut() {
        if (isSigningOut) return;

        setIsSigningOut(true);

        try {
            const { error } = await signOut();

            if (error) {
                toast.error(error.message || 'Could not sign out. Please try again.');
                return;
            }

            router.refresh();
            router.replace('/sign-in');
        } catch {
            toast.error('Could not sign out. Please try again.');
        } finally {
            setIsSigningOut(false);
        }
    }

    return { handleSignOut, isSigningOut };
};

export const handleGoogleSignIn = async (callbackURL?: string) => {
    try {
        const { error } = await authClient.signIn.social({
            provider: 'google',
            callbackURL,
        });

        if (error) {
            toast.error(error.message || 'Google sign-in failed. Please try again.');
        }
    } catch {
        toast.error('Google sign-in failed. Please try again.');
    }
};
