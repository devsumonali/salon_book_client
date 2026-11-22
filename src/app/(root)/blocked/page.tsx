import Link from 'next/link';

export default function BlockedPage() {
    return (
        <section className="mx-auto max-w-2xl px-5 py-20 text-center">
            <h1 className="text-4xl">Your account is blocked</h1>
            <p className="mt-4 text-base leading-7 text-muted">
                Please contact the salon if you need help with your account.
            </p>
            <Link
                href="/"
                className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-brand px-5 font-semibold text-white"
            >
                Back to home
            </Link>
        </section>
    );
}
