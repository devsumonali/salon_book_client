import Link from 'next/link';
import { FiCalendar } from 'react-icons/fi';

export default function BookingOffer() {
    return <section className="bg-[#fbf9f6] px-5 py-12 sm:px-6 lg:px-8"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 rounded-3xl bg-brand p-7 text-white sm:p-10"><div><h2 className="text-3xl sm:text-4xl">Your next moment of care is waiting.</h2><p className="mt-3 max-w-xl text-base leading-7 text-white/90">Choose a service, request a time, and pay securely once your appointment is confirmed.</p></div><Link href="/service" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-panel px-5 text-sm font-semibold text-brand"><FiCalendar size={18} aria-hidden="true" />Explore Salon Services</Link></div></section>;
}
