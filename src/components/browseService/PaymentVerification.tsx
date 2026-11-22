'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyCheckoutPayment } from '@/lib/actions/customer';

export default function PaymentVerification({ sessionId }: { sessionId: string }) {
    const router = useRouter();
    const [attempt, setAttempt] = useState(0);
    const [busy, setBusy] = useState(true);
    const [message, setMessage] = useState('Verifying your payment and updating your appointment...');

    // Stripe redirects here after checkout; this POST also handles delayed webhooks.
    useEffect(() => {
        let active = true;
        verifyCheckoutPayment(sessionId)
            .then((result) => {
                if (!active) return;
                if (result.error) setMessage(result.error);
                else if (result.paid) router.refresh();
                else setMessage('Your payment is still processing. Please check again shortly.');
            })
            .catch(() => {
                if (active) setMessage('Unable to verify payment. Please check again.');
            })
            .finally(() => {
                if (active) setBusy(false);
            });
        return () => {
            active = false;
        };
    }, [sessionId, router, attempt]);

    return (
        <div className="mt-6 rounded-2xl border border-line bg-surface p-4" role="status">
            <p className="text-sm text-muted">{message}</p>
            {!busy && (
                <button
                    type="button"
                    className="ui-button-secondary mt-3"
                    onClick={() => {
                        setBusy(true);
                        setMessage('Verifying your payment and updating your appointment...');
                        setAttempt((value) => value + 1);
                    }}
                >
                    Check payment again
                </button>
            )}
        </div>
    );
}
