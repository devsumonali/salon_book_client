'use client';

import { signUp } from '@/lib/auth-client';
import { uploadImage } from '@/lib/api/upload';
import { handleGoogleSignIn } from '@/hooks/common';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { LuImage } from 'react-icons/lu';

const inputClass =
    'w-full min-w-0 rounded-xl border border-line bg-white py-3.5 pr-12 pl-11 text-sm text-ink placeholder:text-subtle/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15';
const iconClass = 'pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-brand/70';

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    // Track the upload and signup together so the submit button can show a loading state.
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Ignore another submission while the current upload or signup is still running.
        if (isSubmitting) return;

        const form = event.currentTarget;
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        // Read the file input using its name="image" attribute. This is a File, not a URL.
        const imageFile = formData.get('image');
        const password = String(userData.password || '');
        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            toast.error('Use at least 6 characters with an uppercase and a lowercase letter.');
            return;
        }
        setIsSubmitting(true);

        try {
            // Keep this undefined when no photo is selected because the photo is optional.
            let imageUrl: string | undefined;

            // Only upload when the form contains a real file with some content.
            if (imageFile instanceof File && imageFile.size > 0) {
                imageUrl = await uploadImage(imageFile);
            }

            // The server assigns the default 'user' role; role input is disabled in auth.ts.
            const { data: resData, error } = await signUp.email({
                name: userData.name as string,
                email: userData.email as string,
                password: userData.password as string,
                ...(imageUrl ? { image: imageUrl } : {}),
            });

            if (error) {
                toast.error(error.message || 'Sign up failed! Please try again.');
                return;
            }

            toast.success('User registration successful! ' + 'User Name: ' + resData.user.name);
            form.reset();
            router.refresh();
            router.push('/dashboard');
        } catch (error) {
            // Show upload, network or unexpected signup errors without reloading the page.
            toast.error(
                error instanceof Error ? error.message : 'Sign up failed! Please try again.',
            );
        } finally {
            // Always re-enable the submit button, whether the request succeeded or failed.
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <p className="text-[10px] font-bold tracking-[0.2em] text-brand">ATELIER PORTAL</p>
            <h1 className="mt-2 text-4xl tracking-tight">Begin Your Ritual</h1>
            <p className="mt-2 text-sm leading-6 text-muted">
                Create your profile for a more personal beauty experience.
            </p>

            <nav
                aria-label="Account access"
                className="mt-6 flex rounded-full border border-line bg-[#f0ebe5] p-1 text-xs font-semibold"
            >
                <Link
                    href="/sign-in"
                    className="flex-1 rounded-full px-3 py-2.5 text-center text-muted transition-colors hover:text-brand"
                >
                    Sign In
                </Link>
                <Link
                    href="/sign-up"
                    aria-current="page"
                    className="flex-1 rounded-full bg-white px-3 py-2.5 text-center text-ink shadow-sm"
                >
                    Create Account
                </Link>
            </nav>

            <form aria-label="Create account" className="mt-7 space-y-5" onSubmit={handleSubmit}>
                <button
                    type="button"
                    onClick={() => handleGoogleSignIn()}
                    className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm font-medium transition-colors hover:bg-surface"
                >
                    <FcGoogle aria-hidden="true" size={20} />
                    Continue with Google
                </button>

                <div className="flex items-center gap-3 text-[10px] tracking-wider text-muted">
                    <span aria-hidden="true" className="h-px flex-1 bg-line" />
                    OR REGISTER WITH EMAIL
                    <span aria-hidden="true" className="h-px flex-1 bg-line" />
                </div>

                <div>
                    <label
                        htmlFor="full-name"
                        className="mb-2 block text-[10px] font-semibold tracking-wide"
                    >
                        FULL NAME
                    </label>
                    <div className="relative">
                        <FiUser aria-hidden="true" className={iconClass} size={17} />
                        <input
                            id="full-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Your full name"
                            required
                            maxLength={100}
                            className={inputClass}
                        />
                    </div>
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
                {/* Optional file picker: name="image" connects it to formData.get('image').
                    The accept attribute guides the file picker; the server also checks the file type and size. */}
                <div>
                    <label
                        htmlFor="profile-image"
                        className="mb-2 flex items-center justify-between gap-3 text-[10px] font-semibold tracking-wide"
                    >
                        PROFILE PHOTO
                        <span className="font-normal tracking-normal text-subtle">Optional</span>
                    </label>
                    <div className="relative">
                        <LuImage aria-hidden="true" className={iconClass} size={17} />
                        <input
                            id="profile-image"
                            type="file"
                            name="image"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            aria-describedby="profile-image-hint"
                            className="block w-full min-w-0 cursor-pointer rounded-xl border border-line bg-white py-2.5 pr-3 pl-11 text-xs text-muted transition-colors file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-brand-soft file:px-3 file:py-2 file:text-xs file:font-semibold file:text-brand hover:border-brand/40 hover:file:bg-avatar focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15"
                        />
                    </div>
                    <p id="profile-image-hint" className="mt-2 text-xs text-subtle">
                        JPG, PNG, WebP or GIF. Maximum 2 MB.
                    </p>
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-[10px] font-semibold tracking-wide"
                    >
                        PASSWORD
                    </label>
                    <div className="relative">
                        <FiLock className={iconClass} size={17} />
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            placeholder="Create a password"
                            required
                            minLength={6}
                            pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            aria-describedby="password-hint"
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
                    <p id="password-hint" className="mt-2 text-xs text-subtle">
                        Use at least 6 characters, including uppercase and lowercase letters.
                    </p>
                </div>

                {/* Disable repeated clicks and announce the loading state while uploading or signing up. */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="flex min-h-12 cursor-pointer w-full items-center justify-center gap-2 rounded-xl border border-brand bg-[#b65c3e] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? 'Creating your account...' : 'Create My Account'}
                    <FiArrowRight aria-hidden="true" size={17} />
                </button>
            </form>

            <p className="mt-6 text-center text-xs leading-6 text-muted">
                Already have an Atelier profile?{' '}
                <Link href="/sign-in" className="font-semibold text-brand hover:underline">
                    Sign In
                </Link>
            </p>
        </>
    );
}
