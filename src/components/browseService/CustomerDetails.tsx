import { CheckoutBooking } from '@/types/checkout.data';
import { FiEdit3, FiMail, FiPhone, FiUser } from 'react-icons/fi';

export default function CustomerDetails({ customer }: { customer: CheckoutBooking['customer'] }) {
    const details = [
        { label: 'Full name', value: customer.fullName, icon: FiUser },
        { label: 'Email address', value: customer.email, icon: FiMail },
        ...(customer.phone
            ? [{ label: 'Phone number', value: customer.phone, icon: FiPhone }]
            : []),
    ];

    return (
        <section
            aria-labelledby="customer-title"
            className="rounded-2xl border border-line bg-panel"
        >
            <div className="flex items-center gap-3 border-b border-line/70 px-5 py-5 sm:px-7">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft/70 text-brand">
                    <FiUser aria-hidden="true" size={19} />
                </span>
                <h2 id="customer-title" className="text-2xl">
                    Your details
                </h2>
            </div>

            <div className="p-5 sm:p-7">
                <dl className="grid gap-x-7 gap-y-6 sm:grid-cols-2">
                    {details.map(({ label, value, icon: Icon }) => (
                        <div key={label} className="min-w-0">
                            <dt className="flex items-center gap-2 text-sm text-muted">
                                <Icon aria-hidden="true" size={15} className="text-brand" />
                                {label}
                            </dt>
                            <dd className="mt-2 wrap-break-word text-base font-medium">{value}</dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-6 border-t border-line/70 pt-6">
                    <h3 className="flex items-center gap-2 font-sans text-sm font-medium text-muted">
                        <FiEdit3 aria-hidden="true" size={15} className="text-brand" />
                        Special requests
                    </h3>
                    <p className="mt-3 rounded-xl bg-surface px-4 py-4 text-base leading-7 text-muted">
                        {customer.notes || 'No special requests.'}
                    </p>
                </div>
            </div>
        </section>
    );
}
