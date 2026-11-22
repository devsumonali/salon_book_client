import Link from 'next/link';
import { FiFacebook, FiInstagram, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import BrandLogo from './BrandLogo';

const links = [
    { label: 'Browse Services', href: '/service' },
    { label: 'Your Dashboard', href: '/dashboard' },
    { label: 'Skincare Services', href: '/service?category=skin-care' },
    { label: 'Sign In', href: '/sign-in' },
];

export default function Footer() {
    return (
        <footer className="bg-[#24322c] text-white">
            <div className="site-container pt-14 pb-6 sm:pt-16">
                <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.3fr_1fr]">
                    <div>
                        <Link href="/">
                            <BrandLogo light />
                        </Link>
                        <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
                            A little time for yourself. Discover thoughtful salon services and book
                            your next feel-good moment.
                        </p>
                        <div className="mt-6 flex gap-2.5">
                            {[
                                {
                                    icon: FiInstagram,
                                    href: 'https://instagram.com',
                                    label: 'Instagram',
                                },
                                {
                                    icon: FiFacebook,
                                    href: 'https://facebook.com',
                                    label: 'Facebook',
                                },
                                { icon: FiMail, href: 'mailto:info@salonbook.com', label: 'Email' },
                            ].map(({ icon: Icon, href, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    target={href.startsWith('https') ? '_blank' : undefined}
                                    rel={
                                        href.startsWith('https') ? 'noopener noreferrer' : undefined
                                    }
                                    className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                                >
                                    <Icon size={18} aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-sans text-sm font-bold text-white">
                            Explore SalonBook
                        </h3>
                        <ul className="mt-4 space-y-1">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="inline-flex min-h-10 items-center text-sm text-white/65 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div id="salon-contact" className="scroll-mt-28">
                        <h3 className="font-sans text-sm font-bold text-white">Come say hello</h3>
                        <div className="mt-5 space-y-4 text-sm leading-6 text-white/65">
                            <p className="flex gap-3">
                                <FiMapPin
                                    size={17}
                                    className="mt-1 shrink-0 text-[#d3b6a6]"
                                    aria-hidden="true"
                                />
                                <span>
                                    742 Evergreen Atelier,
                                    <br />
                                    Beverly Hills, CA
                                </span>
                            </p>
                            <Link
                                href="mailto:info@salonbook.com"
                                className="flex min-h-9 items-center gap-3 hover:text-white"
                            >
                                <FiMail
                                    size={17}
                                    className="shrink-0 text-[#d3b6a6]"
                                    aria-hidden="true"
                                />
                                <span className="wrap-anywhere">info@salonbook.com</span>
                            </Link>
                            <Link
                                href="tel:+15552345678"
                                className="flex min-h-9 items-center gap-3 hover:text-white"
                            >
                                <FiPhone size={17} className="text-[#d3b6a6]" aria-hidden="true" />
                                +1 (555) 234-5678
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-sans text-sm font-bold text-white">A time for you</h3>
                        <dl className="mt-5 space-y-3 text-sm text-white/65">
                            <div>
                                <dt className="text-white/85">Monday &ndash; Saturday</dt>
                                <dd className="mt-1">9:00 AM &ndash; 8:00 PM</dd>
                            </div>
                            <div>
                                <dt className="text-white/85">Sunday</dt>
                                <dd className="mt-1">10:00 AM &ndash; 6:00 PM</dd>
                            </div>
                        </dl>
                        <Link
                            href="/service"
                            className="mt-6 inline-flex min-h-11 items-center rounded-xl border border-white/20 bg-white/5 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                        >
                            Plan your next visit
                        </Link>
                    </div>
                </div>
                <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs leading-6 text-white/50">
                    <p>&copy; {new Date().getFullYear()} SalonBook. All rights reserved.</p>
                    <p>Thoughtful care. Beautiful moments.</p>
                </div>
            </div>
        </footer>
    );
}
