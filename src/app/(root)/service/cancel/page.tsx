import type { Metadata } from 'next';
import Link from 'next/link';
import { FiCreditCard, FiInfo, FiLock, FiX } from 'react-icons/fi';

export const metadata: Metadata = {
    title: 'Checkout Cancelled | SalonBook',
    description: 'Return to your booking or explore more salon services when you are ready.',
};

const CancelPage = () => {
    return (
        <section
            aria-labelledby="cancel-title"
            className="flex min-h-[75dvh] items-center justify-center bg-surface px-5 py-12 sm:px-8 sm:py-20"
        >
            <div className="w-full max-w-5xl text-center">
                <p className="mb-6 text-sm font-semibold tracking-[0.2em] text-brand uppercase">
                    Your moment can wait
                </p>

                <div className="relative overflow-hidden rounded-3xl border border-line bg-panel px-6 py-10 shadow-[0_20px_70px_-35px_rgba(36,32,30,0.2)] sm:px-12 sm:py-12 lg:px-16">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-1.5 bg-brand"
                    />
                    <div
                        aria-hidden="true"
                        className="mx-auto flex size-24 items-center justify-center rounded-full border border-brand/15 bg-brand-soft/60 ring-8 ring-surface"
                    >
                        <FiX size={38} strokeWidth={1.5} className="text-brand" />
                    </div>

                    <p className="mt-8 text-sm font-semibold tracking-widest text-brand uppercase">
                        Checkout cancelled
                    </p>
                    <h1
                        id="cancel-title"
                        className="mx-auto mt-3 max-w-2xl text-4xl leading-tight tracking-tight sm:text-5xl"
                    >
                        A little more time to decide?
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">
                        You left checkout before completing your payment. Take your time and
                        return to your booking whenever you&apos;re ready.
                    </p>

                    <div className="mt-8 flex gap-3 rounded-2xl border border-line/70 bg-surface/70 p-5 text-left">
                        <FiInfo
                            aria-hidden="true"
                            size={20}
                            className="mt-0.5 shrink-0 text-brand"
                        />
                        <div>
                            <h2 className="font-sans text-base font-semibold">Ready to continue?</h2>
                            <p className="mt-1.5 text-base leading-7 text-muted">
                                Head back to checkout to review your appointment details, or
                                explore our services to find your next favourite treatment.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        <Link
                            href="/checkout"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-hover"
                        >
                            <FiCreditCard aria-hidden="true" size={18} />
                            Return to checkout
                        </Link>
                        <Link
                            href="/service"
                            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line px-5 py-3 text-base font-semibold text-ink transition-colors hover:bg-surface"
                        >
                            Browse services
                        </Link>
                    </div>
                </div>

                <p className="mt-6 flex items-center justify-center gap-2 text-sm leading-6 text-muted">
                    <FiLock aria-hidden="true" size={14} className="shrink-0" />
                    Secure checkout with Stripe
                </p>
            </div>
        </section>
    );
};

export default CancelPage;
