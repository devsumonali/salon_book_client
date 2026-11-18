import Link from 'next/link';
import { FiInstagram, FiFacebook, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const quickLinks = [
    { label: 'Browse Services', href: '/browse-service' },
    { label: 'Master Stylists', href: '/stylists' },
    { label: 'Atelier Gift Cards', href: '/gift-cards' },
    { label: 'Treatment Pricing', href: '/browse-service' },
];

const policyLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cancellation Policy', href: '/cancellation-policy' },
];

const Footer = () => {
    return (
        <footer className="w-full shrink-0 border-t border-line bg-surface text-ink">
            <div className="mx-auto max-w-360 px-4 pt-12 pb-8 sm:px-6 lg:px-8 xl:px-12 xl:pt-20">
                {/* Main Footer */}
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-[3fr_2fr_3fr_2fr]">
                    {/* Brand Section */}
                    <div className="min-w-0">
                        <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
                            SalonBook
                        </Link>

                        <p className="mt-5 max-w-85 text-sm leading-7 text-muted">
                            An elevated salon atelier experience bridging bespoke artisanal wellness
                            with effortless, high-precision booking mechanics for discerning
                            clientele.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex items-center gap-3">
                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-panel text-ink shadow-sm transition-colors hover:bg-brand hover:text-panel"
                            >
                                <FiInstagram size={17} />
                            </Link>

                            <Link
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-panel text-ink shadow-sm transition-colors hover:bg-brand hover:text-panel"
                            >
                                <FiFacebook size={17} />
                            </Link>

                            <Link
                                href="mailto:info@salonbook.com"
                                aria-label="Email"
                                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-panel text-ink shadow-sm transition-colors hover:bg-brand hover:text-panel"
                            >
                                <FiMail size={17} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="min-w-0">
                        <h3 className="mb-4 text-lg font-bold">Quick Links</h3>

                        <ul className="space-y-1">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="inline-flex min-h-11 items-center px-3 py-2 text-sm text-muted transition-colors hover:text-brand"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Hours & Location */}
                    <div className="min-w-0">
                        <h3 className="mb-4 text-lg font-bold">Atelier Hours & Location</h3>

                        <div className="space-y-4 text-sm leading-6 text-muted">
                            <div>
                                <p>
                                    <span className="font-medium text-ink">Mon - Sat:</span> 9:00 AM
                                    - 8:00 PM
                                </p>
                                <p>
                                    <span className="font-medium text-ink">Sunday:</span> 10:00 AM -
                                    6:00 PM
                                </p>
                            </div>

                            <div className="flex items-start gap-2">
                                <FiMapPin className="mt-1 shrink-0" size={15} />
                                <p>742 Evergreen Atelier, Beverly Hills, CA</p>
                            </div>

                            <Link
                                href="mailto:info@salonbook.com"
                                className="flex min-h-11 items-center gap-2 text-brand hover:underline"
                            >
                                <FiMail size={15} className="shrink-0" />
                                <span className="min-w-0 wrap-anywhere">info@salonbook.com</span>
                            </Link>

                            <Link
                                href="tel:+15552345678"
                                className="flex min-h-11 items-center gap-2 hover:text-brand"
                            >
                                <FiPhone size={15} className="shrink-0" />
                                +1 (555) 234-5678
                            </Link>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="min-w-0">
                        <h3 className="mb-4 text-lg font-bold">Private Circle</h3>

                        <p className="mb-5 text-sm leading-6 text-muted">
                            Receive seasonal treatment collections and 15% off your premier booking.
                        </p>

                        {/* Static Newsletter UI */}
                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                aria-label="Email address"
                                className="h-11 w-full min-w-0 rounded-md border border-line bg-panel px-3 text-sm text-ink outline-none placeholder:text-subtle focus:border-brand"
                            />

                            <button
                                type="button"
                                className="h-11 w-full rounded-md bg-brand px-3 text-sm font-medium text-panel transition-colors hover:bg-brand-hover"
                            >
                                Join Atelier Circle
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-line pt-7 lg:flex-row xl:mt-16">
                    <p className="text-center text-xs text-muted lg:text-left">
                        © {new Date().getFullYear()} SalonBook Atelier Inc. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                        {policyLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="inline-flex min-h-11 items-center px-3 py-2 text-xs text-muted transition-colors hover:text-brand"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
