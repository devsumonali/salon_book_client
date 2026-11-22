'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FiCamera, FiCheckCircle, FiMail, FiPhone, FiSave, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useSession } from '@/lib/auth-client';
import { uploadImage } from '@/lib/api/upload';
import { updateCustomerProfile } from '@/lib/actions/customer';
import type { CustomerProfileData } from '@/types/customer';

const inputClass = 'ui-input mt-2';

export default function CustomerProfileForm({ profile }: { profile: CustomerProfileData }) {
    const [name, setName] = useState(profile.name);
    const [phone, setPhone] = useState(profile.phone);
    const [image, setImage] = useState(profile.image);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [failedImage, setFailedImage] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const { refetch } = useSession();
    const router = useRouter();
    const photo = preview || image;
    const initials =
        name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0])
            .join('')
            .toUpperCase() || 'SB';

    useEffect(
        () => () => {
            if (preview) URL.revokeObjectURL(preview);
        },
        [preview],
    );

    function resetForm() {
        setName(profile.name);
        setPhone(profile.phone);
        setImage(profile.image);
        setFile(null);
        setPreview(null);
        if (fileRef.current) fileRef.current.value = '';
    }

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (busy) return;
        if (!name.trim()) {
            toast.error('Please enter your name');
            return;
        }
        setBusy(true);
        try {
            const imageUrl = file ? await uploadImage(file) : image;
            const result = await updateCustomerProfile({
                name: name.trim(),
                phone: phone.trim(),
                image: imageUrl,
            });
            if (result.error || !result.profile) {
                toast.error(result.error || 'Unable to update profile');
                return;
            }
            setName(result.profile.name);
            setPhone(result.profile.phone);
            setImage(result.profile.image);
            setFile(null);
            setPreview(null);
            if (fileRef.current) fileRef.current.value = '';
            toast.success(result.message || 'Profile updated');
            await refetch({ query: { disableCookieCache: true } });
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Unable to update profile');
        } finally {
            setBusy(false);
        }
    }

    return (
        <section aria-labelledby="profile-title" className="dashboard-page">
            <div className="mx-auto max-w-6xl">
                <header>
                    <p className="text-sm font-semibold tracking-[0.16em] text-brand">
                        YOUR ACCOUNT
                    </p>
                    <h1 id="profile-title" className="mt-2 tracking-tight">
                        My Profile
                    </h1>
                    <p className="mt-3 text-base leading-7 text-muted">
                        A few details that make your SalonBook experience yours.
                    </p>
                </header>

                <form onSubmit={handleSubmit} aria-busy={busy} className="mt-8">
                    <fieldset
                        disabled={busy}
                        className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] disabled:opacity-75"
                    >
                        <legend className="sr-only">Update your personal information</legend>
                        <section
                            aria-labelledby="photo-title"
                            className="rounded-2xl border border-line bg-panel shadow-card p-6 text-center sm:p-8"
                        >
                            <h2 id="photo-title" className="text-2xl">
                                Your profile photo
                            </h2>
                            <div className="relative mx-auto mt-6 flex size-32 items-center justify-center overflow-hidden rounded-full border-4 border-panel bg-brand-soft text-3xl font-semibold text-brand ring-1 ring-line">
                                {photo && photo !== failedImage ? (
                                    <Image
                                        src={photo}
                                        alt="Your profile photo"
                                        fill
                                        unoptimized
                                        sizes="128px"
                                        className="object-cover"
                                        onError={() => setFailedImage(photo)}
                                    />
                                ) : (
                                    <span aria-label="Profile initials">{initials}</span>
                                )}
                            </div>
                            <p className="mt-5 text-xl font-semibold wrap-break-word">
                                {name || 'Your name'}
                            </p>
                            <p className="mt-1 text-sm wrap-break-word text-muted">
                                {profile.email}
                            </p>
                            <div className="mt-5 flex flex-wrap justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => fileRef.current?.click()}
                                    aria-controls="customer-profile-image"
                                    className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-line px-4 text-sm font-semibold text-brand hover:bg-brand-soft/40 disabled:cursor-wait"
                                >
                                    <FiCamera size={17} aria-hidden="true" />
                                    Change Photo
                                </button>
                                <input
                                    ref={fileRef}
                                    id="customer-profile-image"
                                    aria-label="Choose profile photo"
                                    tabIndex={-1}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    aria-describedby="profile-photo-hint"
                                    className="sr-only"
                                    onChange={(event) => {
                                        const selected = event.target.files?.[0];
                                        if (!selected) return;
                                        if (
                                            ![
                                                'image/jpeg',
                                                'image/png',
                                                'image/webp',
                                                'image/gif',
                                            ].includes(selected.type) ||
                                            selected.size === 0 ||
                                            selected.size > 2 * 1024 * 1024
                                        ) {
                                            toast.error(
                                                'Choose a JPG, PNG, WebP or GIF image, up to 2 MB.',
                                            );
                                            event.target.value = '';
                                            return;
                                        }
                                        setFile(selected);
                                        setPreview(URL.createObjectURL(selected));
                                    }}
                                />
                                {photo && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFile(null);
                                            setPreview(null);
                                            setImage('');
                                            if (fileRef.current) fileRef.current.value = '';
                                        }}
                                        className="min-h-11 cursor-pointer rounded-lg px-3 text-sm text-muted hover:bg-surface"
                                    >
                                        Remove Photo
                                    </button>
                                )}
                            </div>
                            <p
                                id="profile-photo-hint"
                                className="mt-3 text-xs leading-6 text-muted"
                            >
                                JPG, PNG, WebP or GIF. Maximum 2 MB.
                                <br />
                                Your photo is saved when you select Save Changes.
                            </p>
                            {file && (
                                <p className="mt-2 text-xs wrap-break-word text-brand">
                                    Selected: {file.name}
                                </p>
                            )}
                            {profile.createdAt && (
                                <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
                                    Member since{' '}
                                    {new Date(profile.createdAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        year: 'numeric',
                                        timeZone: 'Asia/Dhaka',
                                    })}
                                </p>
                            )}
                        </section>

                        <section
                            aria-labelledby="personal-information-title"
                            className="overflow-hidden rounded-2xl border border-line bg-panel shadow-card"
                        >
                            <div className="border-b border-line px-5 py-5 sm:px-7">
                                <h2 id="personal-information-title" className="text-2xl">
                                    Personal Information
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-muted">
                                    Keep your name, contact details, and photo up to date.
                                </p>
                            </div>
                            <div className="space-y-6 p-5 sm:p-7">
                                <div>
                                    <label
                                        htmlFor="customer-profile-name"
                                        className="flex items-center gap-2 text-sm font-semibold"
                                    >
                                        <FiUser
                                            size={17}
                                            aria-hidden="true"
                                            className="text-brand"
                                        />
                                        Full name
                                    </label>
                                    <input
                                        id="customer-profile-name"
                                        name="name"
                                        autoComplete="name"
                                        required
                                        maxLength={100}
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="customer-profile-email"
                                        className="flex items-center gap-2 text-sm font-semibold"
                                    >
                                        <FiMail
                                            size={17}
                                            aria-hidden="true"
                                            className="text-brand"
                                        />
                                        Email address
                                    </label>
                                    <input
                                        id="customer-profile-email"
                                        type="email"
                                        readOnly
                                        value={profile.email}
                                        aria-describedby="profile-email-hint"
                                        className={`${inputClass} bg-surface text-muted`}
                                    />
                                    <p
                                        id="profile-email-hint"
                                        className="mt-2 flex items-center gap-1.5 text-sm text-muted"
                                    >
                                        {profile.emailVerified && (
                                            <FiCheckCircle
                                                size={14}
                                                aria-hidden="true"
                                                className="text-[#3f6344]"
                                            />
                                        )}
                                        {profile.emailVerified ? 'Verified email address. ' : ''}
                                        Your sign-in email is read-only.
                                    </p>
                                </div>
                                <div>
                                    <label
                                        htmlFor="customer-profile-phone"
                                        className="flex items-center gap-2 text-sm font-semibold"
                                    >
                                        <FiPhone
                                            size={17}
                                            aria-hidden="true"
                                            className="text-brand"
                                        />
                                        Phone number{' '}
                                        <span className="font-normal text-muted">(optional)</span>
                                    </label>
                                    <input
                                        id="customer-profile-phone"
                                        name="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        maxLength={25}
                                        placeholder="+880 1XXXXXXXXX"
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-end gap-3 border-t border-line bg-surface/40 px-5 py-5 sm:px-7">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="min-h-12 cursor-pointer rounded-xl border border-line bg-panel px-5 text-sm font-semibold hover:bg-surface disabled:cursor-wait"
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-hover disabled:cursor-wait"
                                >
                                    <FiSave size={17} aria-hidden="true" />
                                    {busy ? 'Saving Changes…' : 'Save Changes'}
                                </button>
                            </div>
                        </section>
                    </fieldset>
                </form>
            </div>
        </section>
    );
}
