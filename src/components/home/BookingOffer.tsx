import Link from 'next/link';
import { FiCalendar, FiScissors } from 'react-icons/fi';

export default function BookingOffer() {
    return (
        <section className="bg-panel pb-16 sm:pb-20">
            <div className="site-container">
                <div className="relative isolate flex flex-wrap items-center justify-between gap-7 overflow-hidden rounded-3xl bg-[#293b34] px-6 py-10 text-white sm:px-12 sm:py-12">
                    <FiScissors
                        className="pointer-events-none absolute -right-10 -bottom-12 -z-10 size-64 -rotate-12 text-white/[0.035]"
                        aria-hidden="true"
                    />
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold tracking-[0.12em] text-[#d8e5ce]">
                            MAKE SOME TIME FOR YOU
                        </p>
                        <h2 className="mt-3 text-3xl leading-tight tracking-tight sm:text-4xl">
                            Your next feel-good moment starts here.
                        </h2>
                        <p className="mt-4 max-w-xl text-base leading-7 text-white/75">
                            Choose your service, find your moment, and let us take care of the rest.
                        </p>
                    </div>
                    <Link href="/service" className="ui-button-secondary shrink-0 border-white/10">
                        <FiCalendar size={18} aria-hidden="true" />
                        Explore Salon Services
                    </Link>
                </div>
            </div>
        </section>
    );
}
