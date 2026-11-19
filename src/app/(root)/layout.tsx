import type { ChildrenProps } from '@/types/types';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function SiteLayout({ children }: ChildrenProps) {
    return (
        <>
            <Navbar />
            <main className="min-w-0 flex-1">{children}</main>
            <Footer />
        </>
    );
}
