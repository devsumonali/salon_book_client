import Link from 'next/link';
import { FiScissors } from 'react-icons/fi';

export default function NotFound() {
    return (
        <section className="flex min-h-[75dvh] items-center justify-center bg-surface px-5 py-12">
            <div className="ui-card w-full max-w-xl px-6 py-12 text-center sm:p-14">
                <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                    <FiScissors size={28} aria-hidden="true" />
                </span>
                <p className="page-kicker mt-6">404 - A little off the path</p>
                <h1 className="mt-3 text-4xl leading-tight tracking-tight">
                    We couldn&apos;t find that page.
                </h1>
                <p className="mt-4 text-base leading-7 text-muted">
                    The page or service may be unavailable. Let&apos;s find your next moment of
                    care.
                </p>
                <Link href="/service" className="ui-button mt-7">
                    Browse services
                </Link>
            </div>
        </section>
    );
}
