'use client';

import { signIn } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';

const inputClass =
    'w-full min-w-0 rounded-xl border border-line bg-white py-3.5 pr-12 pl-11 text-sm text-ink placeholder:text-subtle/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15';
const iconClass = 'pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-brand/70';

export default function SignInForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
            router.push('/');
        }
    }

    return (
        <>
            <p className="text-[10px] font-bold tracking-[0.2em] text-brand">ATELIER PORTAL</p>
            <h1 className="mt-2 text-4xl tracking-tight">Welcome Back</h1>
            <p className="mt-2 text-sm leading-6 text-muted">
                Access your appointments and your next moment of care.
            </p>

            <nav
                aria-label="Account access"
                className="mt-6 flex rounded-full border border-line bg-[#f0ebe5] p-1 text-xs font-semibold"
            >
                <Link
                    href="/sign-in"
                    aria-current="page"
                    className="flex-1 rounded-full bg-white px-3 py-2.5 text-center text-ink shadow-sm"
                >
                    Sign In
                </Link>
                <Link
                    href="/sign-up"
                    className="flex-1 rounded-full px-3 py-2.5 text-center text-muted transition-colors hover:text-brand"
                >
                    Create Account
                </Link>
            </nav>

            <form aria-label="Sign in" className="mt-7 space-y-5" onSubmit={handleSubmit}>
                <button
                    type="button"
                    onClick={() =>
                        setMessage('Google sign-in is not connected yet. Please try again later.')
                    }
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm font-medium transition-colors hover:bg-surface"
                >
                    <FcGoogle aria-hidden="true" size={20} />
                    Continue with Google
                </button>

                <div className="flex items-center gap-3 text-[10px] tracking-wider text-muted">
                    <span aria-hidden="true" className="h-px flex-1 bg-line" />
                    OR SIGN IN WITH EMAIL
                    <span aria-hidden="true" className="h-px flex-1 bg-line" />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-[10px] font-semibold tracking-wide"
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
                        className="mb-2 block text-[10px] font-semibold tracking-wide"
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

                <label className="flex w-fit cursor-pointer items-center gap-2 text-xs text-muted">
                    <input
                        name="remember"
                        type="checkbox"
                        className="size-4 shrink-0 accent-brand"
                    />
                    Remember me on this device
                </label>

                <button
                    type="submit"
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-brand bg-[#b65c3e] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand"
                >
                    Sign In to Atelier
                    <FiArrowRight aria-hidden="true" size={17} />
                </button>
                {message && (
                    <p
                        role="status"
                        className="rounded-lg bg-brand-soft px-3 py-2 text-xs leading-5 text-brand"
                    >
                        {message}
                    </p>
                )}
            </form>

            <p className="mt-6 text-center text-xs leading-6 text-muted">
                New to the Atelier?{' '}
                <Link href="/sign-up" className="font-semibold text-brand hover:underline">
                    Create Account
                </Link>
            </p>
        </>
    );
}
