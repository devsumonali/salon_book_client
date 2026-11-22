'use client';

import { signIn } from '@/lib/auth-client';
import { handleGoogleSignIn } from '@/hooks/common';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';

const inputClass = 'ui-input pr-12 pl-11';
const iconClass = 'pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-brand/70';

export default function SignInForm({ callbackUrl = '/dashboard' }: { callbackUrl?: string }) {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    //form event handaler function
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const form = event.currentTarget;
            const formData = new FormData(form);
            const userData = Object.fromEntries(formData.entries());
            // console.log(userData);

            const { data: resData, error } = await signIn.email({
                email: userData.email as string,
                password: userData.password as string,
                rememberMe: true,
            });

            if (error) {
                toast.error(error.message || 'Sign in failed! Please try again.');
            } else {
                toast.success('User sign in successful! ' + 'User Name: ' + resData.user.name);
                form.reset();
                router.refresh();
                router.replace(callbackUrl);
            }
        } catch {
            toast.error('Unable to sign in. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <p className="text-sm font-bold tracking-[0.2em] text-brand">WELCOME TO SALONBOOK</p>
            <h1 className="mt-2 text-4xl tracking-tight">Welcome Back</h1>
            <p className="mt-2 text-sm leading-6 text-muted">
                Access your appointments and your next moment of care.
            </p>

            <nav
                aria-label="Account access"
                className="mt-6 flex rounded-xl border border-line bg-surface p-1 text-sm font-semibold"
            >
                <Link
                    href="/sign-in"
                    aria-current="page"
                    className="flex-1 rounded-xl bg-white px-3 py-2.5 text-center text-ink shadow-sm"
                >
                    Sign In
                </Link>
                <Link
                    href="/sign-up"
                    className="flex-1 rounded-xl px-3 py-2.5 text-center text-muted transition-colors hover:text-brand"
                >
                    Create Account
                </Link>
            </nav>

            <form aria-label="Sign in" className="mt-7 space-y-5" onSubmit={handleSubmit}>
                <button
                    type="button"
                    onClick={() => handleGoogleSignIn(callbackUrl)}
                    className="ui-button-secondary w-full"
                >
                    <FcGoogle aria-hidden="true" size={20} />
                    Continue with Google
                </button>

                <div className="flex items-center gap-3 text-sm tracking-wider text-muted">
                    <span aria-hidden="true" className="h-px flex-1 bg-line" />
                    OR SIGN IN WITH EMAIL
                    <span aria-hidden="true" className="h-px flex-1 bg-line" />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold tracking-wide"
                    >
                        EMAIL ADDRESS
                    </label>
                    <div className="relative">
                        <FiMail aria-hidden="true" className={iconClass} size={17} />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="name@domain.com"
                            required
                            className={inputClass}
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-semibold tracking-wide"
                    >
                        PASSWORD
                    </label>
                    <div className="relative">
                        <FiLock aria-hidden="true" className={iconClass} size={17} />
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            required
                            className={inputClass}
                        />
                        <button
                            type="button"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            aria-pressed={showPassword}
                            onClick={() => setShowPassword((visible) => !visible)}
                            className="absolute top-1/2 right-1 flex size-11 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:text-brand"
                        >
                            {showPassword ? (
                                <FiEyeOff aria-hidden="true" size={17} />
                            ) : (
                                <FiEye aria-hidden="true" size={17} />
                            )}
                        </button>
                    </div>
                </div>

                <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-muted">
                    <input
                        name="remember"
                        type="checkbox"
                        className="size-4 shrink-0 accent-brand"
                    />
                    Remember me on this device
                </label>

                <button type="submit" disabled={isSubmitting} className="ui-button w-full">
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm leading-6 text-muted">
                New to the Atelier?{' '}
                <Link href="/sign-up" className="font-semibold text-brand hover:underline">
                    Create Account
                </Link>
            </p>
        </>
    );
}
