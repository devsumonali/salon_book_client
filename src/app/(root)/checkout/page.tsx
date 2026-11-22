import type { Metadata } from 'next';

import CheckoutContent from '@/components/browseService/CheckoutContent';

export const metadata: Metadata = {
    title: 'Checkout | SalonBook',
    description: 'Review your salon appointment, booking details, and payment summary.',
};

const CheckoutPage = () => {
    return (
        <div className="flex min-h-dvh flex-1 flex-col bg-surface/70">
            <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8 sm:py-12">
                <div className="mt-5 flex flex-wrap items-start justify-between gap-6">
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <p className="text-sm font-semibold tracking-widest text-brand uppercase">
                                Your next moment of care
                            </p>
                        </div>
                        <h1 className="mt-3 text-4xl tracking-tight sm:text-5xl">
                            Review your booking
                        </h1>
                        <p className="mt-3 max-w-xl text-base leading-7 text-muted">
                            A little time for yourself, all planned out. Check your details below
                            before sending your appointment request.
                        </p>
                    </div>
                </div>

                <CheckoutContent />
            </main>

            <footer className="mt-6 border-t border-line px-5 py-6 text-center text-sm text-muted">
                SalonBook &middot; A little time, just for you.
            </footer>
        </div>
    );
};

export default CheckoutPage;
