import type { ChildrenProps } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight, FiFeather } from 'react-icons/fi';

export default function AuthLayout({ children }: ChildrenProps) {
    return (
        <section className="bg-surface px-5 py-6 sm:px-6 sm:py-10 lg:px-8">
            <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-line bg-[#fcfaf8] shadow-xl shadow-ink/10">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-[#f0ebe5] px-5 py-3 text-[10px] text-muted sm:px-7">
                    <span className="flex items-center gap-2">
                        <FiFeather aria-hidden="true" className="text-brand" />A little time for
                        yourself. A ritual made for you.
                    </span>
                    <span className="hidden text-[9px] tracking-widest sm:block">
                        MAISON SALONBOOK · BEAUTY & WELLNESS
                    </span>
                </div>

                <div className="grid lg:min-h-180 lg:grid-cols-[0.85fr_1.15fr]">
                    <aside className="relative isolate flex min-w-0 flex-col justify-between gap-10 overflow-hidden bg-[#211a15] px-5 py-9 text-[#fff8ef] sm:px-10 sm:py-12 lg:gap-16">
                        <Image
                            src="/images/salon-hero.jpg"
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 480px, 100vw"
                            className="-z-20 object-cover object-center"
                        />
                        <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#231b14]/75 via-[#231b14]/85 to-[#100c09]" />

                        <div>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.25em] text-[#edc5ae]"
                            >
                                <span aria-hidden="true" className="h-px w-7 bg-[#edc5ae]/60" />
                                MAISON SALONBOOK
                                <span
                                    aria-hidden="true"
                                    className="size-1.5 rounded-full bg-[#b65c3e]"
                                />
                            </Link>
                            <h2 className="mt-7 max-w-sm text-4xl leading-[1.08] sm:text-5xl lg:text-[46px]">
                                Artisanal Rituals &amp; Bespoke Beauty Wellness
                            </h2>
                            <p className="mt-5 max-w-sm text-sm leading-6 text-[#eee2d6]/80">
                                Enter our quiet digital atelier. Curated appointments, tailored
                                beauty consultations, and holistic rituals crafted around your
                                schedule.
                            </p>
                        </div>

                        <div className="hidden lg:block">
                            <div className="rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                                <FiFeather
                                    aria-hidden="true"
                                    className="mb-4 text-[#edc5ae]"
                                    size={22}
                                />
                                <p className="font-serif text-xl leading-7 italic">
                                    “Every appointment is treated as sculpted art. A moment to slow
                                    down, feel cared for, and leave renewed.”
                                </p>
                                <div className="mt-5 border-t border-white/15 pt-4">
                                    <p className="text-xs font-semibold">
                                        The SalonBook Philosophy
                                    </p>
                                    <p className="mt-1 text-[10px] text-[#eee2d6]/70">
                                        Thoughtful care. Personal beauty.
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/service"
                                className="mt-7 flex items-center justify-between text-xs text-[#edc5ae] transition-colors hover:text-white"
                            >
                                Explore our signature rituals
                                <FiArrowUpRight aria-hidden="true" size={16} />
                            </Link>
                        </div>
                    </aside>

                    <div className="flex min-w-0 flex-col justify-center px-5 py-9 sm:px-10 sm:py-12 xl:px-20">
                        {children}
                        <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 text-[10px] text-subtle">
                            <span>SalonBook · Your personal atelier</span>
                            <span className="flex items-center gap-1.5">
                                <FiFeather aria-hidden="true" /> Beauty, thoughtfully curated
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
