import { FiCreditCard, FiLock } from 'react-icons/fi';
import { FaCcAmex, FaCcMastercard, FaCcVisa } from 'react-icons/fa';
import { formatServicePrice } from '@/lib/service-display';

export default function PaymentSummary({ price }: { price: number }) {
    return (
        <aside aria-labelledby="payment-title" className="min-w-0 lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_10px_40px_-20px_rgba(36,32,30,0.25)]">
                <div className="border-b border-line bg-brand-soft/50 px-5 py-6 sm:px-7">
                    <p className="text-sm font-medium text-brand">A little time, just for you</p>
                    <h2 id="payment-title" className="mt-2 text-3xl">
                        Booking summary
                    </h2>
                </div>

                <div className="p-5 sm:p-7">
                    <dl className="space-y-4 text-base">
                        <div className="flex items-center justify-between gap-4">
                            <dt className="text-muted">Service subtotal</dt>
                            <dd className="font-medium">{formatServicePrice(price)}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <dt className="text-muted">Booking fee</dt>
                            <dd className="font-medium">{formatServicePrice(0)}</dd>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                            <dt className="font-semibold">Total due today</dt>
                            <dd className="font-serif text-4xl text-brand">
                                {formatServicePrice(price)}
                            </dd>
                        </div>
                    </dl>

                    <div className="mt-7 rounded-xl border border-line bg-surface/70 p-4">
                        <div className="flex items-center gap-2.5">
                            <FiCreditCard
                                aria-hidden="true"
                                size={20}
                                className="shrink-0 text-brand"
                            />
                            <p className="text-base font-semibold">Pay with Stripe</p>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted">
                            Complete your payment on Stripe&apos;s checkout page.
                        </p>
                        <div
                            aria-label="Card payment options"
                            className="mt-3 flex items-center gap-3 text-3xl text-muted"
                        >
                            <FaCcVisa role="img" aria-label="Visa" />
                            <FaCcMastercard role="img" aria-label="Mastercard" />
                            <FaCcAmex role="img" aria-label="American Express" />
                        </div>
                    </div>

                    {/* Connect the Stripe checkout redirect here when payment is ready. */}
                    <button
                        type="button"
                        disabled
                        aria-describedby="payment-availability"
                        className="mt-6 flex min-h-13 w-full items-center justify-center gap-2.5 rounded-xl bg-brand px-5 py-3.5 text-base font-semibold text-white shadow-sm disabled:cursor-not-allowed"
                    >
                        <FiLock aria-hidden="true" size={17} />
                        Pay Now
                    </button>
                    <p
                        id="payment-availability"
                        className="mt-3 text-center text-sm leading-6 text-muted"
                    >
                        Payments are not available yet.
                    </p>
                </div>
            </div>

            <p className="mt-5 px-4 text-center text-sm leading-6 text-muted">
                Take a moment to check your appointment details before paying.
            </p>
        </aside>
    );
}
