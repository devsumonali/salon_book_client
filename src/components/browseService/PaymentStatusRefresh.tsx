'use client';

import { useEffect, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentStatusRefresh() {
    const router = useRouter();
    const attempts = useRef(0);
    const [refreshing, startTransition] = useTransition();

    // Read again after the previous response finishes. Only the webhook writes payment data.
    useEffect(() => {
        if (refreshing || attempts.current >= 10) return;
        const timer = setTimeout(() => {
            attempts.current += 1;
            startTransition(() => router.refresh());
        }, 3000);
        return () => clearTimeout(timer);
    }, [refreshing, router]);

    return (
        <div className="mt-6 rounded-2xl border border-line bg-surface p-4" role="status">
            <p className="text-sm text-muted">
                Your payment is processing. Please wait or refresh the status.
            </p>
            <button
                type="button"
                disabled={refreshing}
                className="ui-button-secondary mt-3"
                onClick={() => {
                    attempts.current = 0;
                    startTransition(() => router.refresh());
                }}
            >
                {refreshing ? 'Checking...' : 'Refresh status'}
            </button>
        </div>
    );
}
