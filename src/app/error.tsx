'use client';

import FeedbackPage from '@/components/shared/FeedbackPage';

// Catches page errors and errors from nested layouts, including the dashboard layout.
export default function ErrorPage({ retry }: { retry: () => void }) {
    return <FeedbackPage kind="error" onRetry={retry} />;
}
