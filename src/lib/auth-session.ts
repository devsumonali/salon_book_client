import 'server-only';
import { cache } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from './auth';

// Read fresh account data so a blocked user cannot keep using an old session.
export const getUserSession = cache(async () =>
    auth.api.getSession({
        headers: await headers(),
        query: { disableCookieCache: true },
    }),
);

export async function requireUser(role?: 'admin' | 'user', callbackUrl?: string) {
    const session = await getUserSession();
    if (!session)
        redirect(callbackUrl ? `/sign-in?${new URLSearchParams({ callbackUrl })}` : '/sign-in');
    if (session.user.isBlocked) redirect('/blocked');
    if (role && session.user.role !== role)
        redirect(`/dashboard/${session.user.role === 'admin' ? 'admin' : 'customer'}/overview`);
    return session;
}

// Keep the JWT on the Next.js server; never send the session token to Express.
export const getApiToken = cache(async () => {
    const session = await getUserSession();
    if (!session || session.user.isBlocked)
        throw new Error('Please sign in with an active account');
    const result = await auth.api.getToken({ headers: await headers() });
    return result.token;
});
