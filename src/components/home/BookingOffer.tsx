import { FiCalendar, FiSmartphone } from 'react-icons/fi';

export default function BookingOffer() {
    return (
        <section aria-labelledby="booking-offer-title" className="bg-[#fbf9f6]">
            <div className="mx-auto max-w-7xl px-5 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
                <div className="grid items-center gap-8 rounded-2xl border border-[#833d29] bg-linear-to-br from-[#a45237] via-[#94452f] to-[#873d29] p-5 text-[#fff9f2] shadow-xl shadow-ink/15 sm:rounded-3xl sm:p-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)] lg:gap-12 lg:p-12">
                    <div className="min-w-0">
                        <p className="inline-flex rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[8px] font-semibold tracking-[0.06em]">
                            FIRST APPOINTMENT PRIVILEGE
                        </p>
                        <h2
                            id="booking-offer-title"
                            className="mt-4 max-w-2xl text-3xl leading-[1.1] tracking-tight sm:text-4xl lg:text-[42px]"
                        >
                            Receive 15% Off Your Premier Atelier Booking
                        </h2>
                        <p className="mt-4 max-w-lg text-xs leading-6 text-white/90 sm:text-sm">
                            Explore our curated network of vetted artisans. Discover your next
                            ritual, connect with salon specialists, and make a little time for
                            yourself.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <button
                                type="button"
                                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/70 bg-[#fcfaf7] px-5 py-3 text-xs font-semibold text-ink shadow-sm"
                            >
                                <FiCalendar aria-hidden="true" size={15} />
                                Schedule With 15% Off
                            </button>
                            <button
                                type="button"
                                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/15 px-5 py-3 text-xs font-semibold text-white"
                            >
                                <FiSmartphone aria-hidden="true" size={15} />
                                Download App
                            </button>
                        </div>
                    </div>

                    <div className="w-full min-w-0 rounded-2xl border border-white/10 bg-white/10 p-5 text-center sm:p-6">
                        <label
                            htmlFor="booking-intro-code"
                            className="block text-[9px] font-semibold tracking-[0.12em] text-white"
                        >
                            INTRO CODE
                        </label>
                        <input
                            id="booking-intro-code"
                            type="text"
                            defaultValue="ATELIER15"
                            aria-describedby="booking-intro-code-hint"
                            className="mt-3 min-h-12 w-full min-w-0 rounded-lg border border-[#e7d8cc] bg-[#fcfaf7] px-3 py-3 text-center font-mono text-sm font-semibold tracking-[0.14em] text-brand uppercase shadow-xs"
                        />
                        <p
                            id="booking-intro-code-hint"
                            className="mx-auto mt-3 max-w-56 text-[10px] leading-5 text-white/90"
                        >
                            Your invitation to a little extra care on your first treatment
                            appointment.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
