import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const manrope = Manrope({
    variable: '--font-manrope',
    subsets: ['latin'],
});

const liberationSerif = localFont({
    src: [
        {
            path: './fonts/liberation-serif/LiberationSerif-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/liberation-serif/LiberationSerif-Italic.ttf',
            weight: '400',
            style: 'italic',
        },
        {
            path: './fonts/liberation-serif/LiberationSerif-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: './fonts/liberation-serif/LiberationSerif-BoldItalic.ttf',
            weight: '700',
            style: 'italic',
        },
    ],
    variable: '--font-liberation-serif',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Salon Appointment Booking Platform',
    description:
        'A salon appointment booking platform that allows users to easily book appointments with their favorite salons and stylists.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${manrope.variable} ${liberationSerif.variable} h-full antialiased`}
        >
            <body suppressHydrationWarning className="flex min-h-dvh flex-col">
                {children}

                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            border: '1px solid #e8ebee',
                            borderRadius: '16px',
                            padding: '14px 18px',
                            fontSize: '14px',
                            color: '#252b31',
                            boxShadow: 'var(--shadow-card)',
                        },
                        success: { iconTheme: { primary: '#617660', secondary: '#ffffff' } },
                        error: { iconTheme: { primary: '#a24e38', secondary: '#ffffff' } },
                    }}
                />
            </body>
        </html>
    );
}
