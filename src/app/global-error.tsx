'use client';

import FeedbackPage from '@/components/shared/FeedbackPage';
import './globals.css';

// Root-layout errors need their own document and Tailwind styles.
export default function GlobalError({ retry }: { retry: () => void }) {
    return (
        <html lang="en">
            <head>
                <title>Something went wrong | SalonBook</title>
                <meta name="robots" content="noindex" />
            </head>
            <body className="m-0">
                <FeedbackPage kind="error" onRetry={retry} />
            </body>
        </html>
    );
}
