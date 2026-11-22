import Link from 'next/link';
import { FiLock } from 'react-icons/fi';

export default function BlockedPage() {
    return (
        <section className="flex min-h-[65dvh] items-center justify-center bg-surface px-5 py-12">
            <div className="ui-card w-full max-w-xl px-6 py-12 text-center sm:p-12">
                <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                    <FiLock size={27} aria-hidden="true" />
                </span>
                <p className="page-kicker mt-6">ACCOUNT ACCESS</p>
                <h1 className="mt-3 text-4xl leading-tight tracking-tight">
                    Your account is blocked
                </h1>
                <p className="mt-4 text-base leading-7 text-muted">
                    Please contact the salon if you need help with your account.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <Link href="/" className="ui-button">
                        Back to home
                    </Link>
                    <Link href="/#salon-contact" className="ui-button-secondary">
                        Contact the salon
                    </Link>
                </div>
            </div>
        </section>
    );
}
