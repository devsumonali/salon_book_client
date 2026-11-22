import type { Metadata } from 'next';
import FeedbackPage from '@/components/shared/FeedbackPage';

export const metadata: Metadata = {
    title: 'Page Not Found | SalonBook',
    description: 'The page or salon service you are looking for is unavailable.',
};

export default function NotFound() {
    return <FeedbackPage kind="not-found" />;
}
