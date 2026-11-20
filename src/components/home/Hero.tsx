import Form from 'next/form';
import Image from 'next/image';
import Link from 'next/link';
import {
    FiArrowRight,
    FiAward,
    FiCalendar,
    FiCheckCircle,
    FiCreditCard,
    FiFeather,
    FiMessageSquare,
    FiSearch,
    FiShield,
    FiStar,
} from 'react-icons/fi';

const trustItems = [
    { icon: FiStar, title: '4.98 Salon Rating', description: '2,400+ verified guests' },
    { icon: FiShield, title: 'Verified Stylists', description: 'Master guild credentials' },
    {
        icon: FiCreditCard,
        title: 'Stripe Protection',
        description: 'Zero hidden booking surcharges',
    },
    {
        icon: FiMessageSquare,
        title: 'Instant SMS Confirmation',
        description: 'Automated calendar sync',
    },
];

const Hero = () => {
    return (
        <section
            aria-labelledby="hero-title"
            className="relative isolate overflow-hidden bg-surface"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 -left-40 -z-10 size-120 rounded-full bg-brand-soft/60 blur-3xl"
            />

            <div className="mx-auto max-w-360 px-5 pt-12 pb-12 sm:px-6 sm:pt-16 sm:pb-16 lg:px-8 lg:pt-14 lg:pb-20 xl:px-12">
                <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-10 xl:gap-12">
                    <div className="min-w-0">
                        <p className="inline-flex items-center gap-2 rounded-full bg-panel/80 px-4 py-2 text-[10px] font-semibold tracking-wide text-ink sm:text-xs">
                            <span
                                aria-hidden="true"
                                className="size-2 shrink-0 rounded-full bg-brand"
                            />
                            ATELIER APPOINTMENTS NOW OPEN
                        </p>

                        <h1
                            id="hero-title"
                            className="mt-6 text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[clamp(2.75rem,4vw,3.75rem)]"
                        >
                            Indulge in Artful Hair, Skin{' '}
                            <span className="sm:block">&amp; Wellness Rituals</span>
                        </h1>

                        <p className="mt-6 max-w-xl text-sm leading-7 text-muted sm:text-base">
                            Discover premier salon artisans, explore tailored beauty treatments,
                            <span className="sm:block">
                                {' '}
                                and effortlessly book confirmed appointments in real-time.
                            </span>
                        </p>

                        <Form
                            action="/browse-service"
                            aria-label="Find salon services"
                            className="mt-8 grid min-w-0 gap-3 rounded-2xl bg-panel p-3 shadow-lg shadow-ink/5 sm:grid-cols-2 xl:mt-10 xl:grid-cols-[1fr_1.1fr_1.25fr_auto]"
                        >
                            <label className="flex min-w-0 items-center gap-3 rounded-lg bg-surface px-3 py-3 focus-within:ring-2 focus-within:ring-brand">
                                <FiSearch
                                    aria-hidden="true"
                                    className="shrink-0 text-brand"
                                    size={19}
                                />
                                <span className="min-w-0 flex-1">
                                    <span className="block text-[11px] font-medium tracking-wide text-muted">
                                        Treatment
                                    </span>
                                    <input
                                        name="treatment"
                                        type="search"
                                        placeholder="e.g. Balayage"
                                        className="block w-full min-w-0 bg-transparent py-0.5 text-xs text-ink outline-none placeholder:text-subtle"
                                    />
                                </span>
                            </label>

                            <label className="flex min-w-0 items-center gap-3 rounded-lg bg-surface px-3 py-3 focus-within:ring-2 focus-within:ring-brand">
                                <FiFeather
                                    aria-hidden="true"
                                    className="shrink-0 text-brand"
                                    size={19}
                                />
                                <span className="min-w-0 flex-1">
                                    <span className="block text-[11px] font-medium tracking-wide text-muted">
                                        Discipline
                                    </span>
                                    <select
                                        name="discipline"
                                        defaultValue=""
                                        className="block w-full min-w-0 cursor-pointer bg-transparent py-0.5 text-xs text-ink outline-none"
                                    >
                                        <option value="">All Rituals</option>
                                        <option value="hair">Hair</option>
                                        <option value="skin">Skin</option>
                                        <option value="wellness">Wellness</option>
                                    </select>
                                </span>
                            </label>

                            <label className="flex min-w-0 items-center gap-3 rounded-lg bg-surface px-3 py-3 focus-within:ring-2 focus-within:ring-brand">
                                <FiCalendar
                                    aria-hidden="true"
                                    className="shrink-0 text-brand"
                                    size={19}
                                />
                                <span className="min-w-0 flex-1">
                                    <span className="block text-[11px] font-medium tracking-wide text-muted">
                                        Preferred Date
                                    </span>
                                    <input
                                        name="date"
                                        type="date"
                                        className="block w-full min-w-0 bg-transparent py-0.5 text-xs text-ink outline-none"
                                    />
                                </span>
                            </label>

                            <button
                                type="submit"
                                className="flex min-h-14 items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold whitespace-nowrap text-panel transition-colors hover:bg-brand-hover"
                            >
                                Find Services <FiArrowRight aria-hidden="true" size={18} />
                            </button>
                        </Form>
                    </div>

                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                        <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-brand-soft shadow-2xl shadow-ink/20">
                            <Image
                                src="/images/salon-hero.jpg"
                                alt="A smiling hairstylist styling a guest's hair in a sunlit salon"
                                fill
                                preload
                                sizes="(min-width: 1440px) 518px, (min-width: 1024px) 38vw, (min-width: 560px) 512px, calc(100vw - 32px)"
                                className="object-cover object-[58%_center]"
                            />
                        </div>

                        <div className="absolute -top-5 left-3 flex max-w-[calc(100%-1.5rem)] items-center gap-3 rounded-2xl bg-panel px-4 py-3 shadow-lg shadow-ink/10 sm:-left-5 sm:px-5">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-brand">
                                <FiAward aria-hidden="true" size={20} />
                            </span>
                            <div className="text-xs leading-5">
                                <p className="font-semibold text-ink">Top 1% Artisans</p>
                                <p className="text-muted">Vetted Beverly Hills Guild</p>
                            </div>
                        </div>

                        <div className="absolute right-3 bottom-4 left-3 flex items-center gap-3 rounded-xl border border-panel/60 bg-surface/95 p-3 shadow-lg shadow-ink/10 sm:right-5 sm:bottom-5 sm:left-5 sm:p-4">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-avatar text-brand">
                                <FiCheckCircle aria-hidden="true" size={20} />
                            </span>
                            <div className="min-w-0 flex-1 text-xs leading-5">
                                <p className="font-semibold text-ink">Available Today</p>
                                <p className="text-muted">3 slots with Senior Colorist</p>
                            </div>
                            <Link
                                href="/browse-service"
                                className="inline-flex min-h-11 shrink-0 items-center px-1 text-xs font-semibold text-brand hover:underline sm:px-2"
                            >
                                Reserve
                            </Link>
                        </div>
                    </div>
                </div>

                <ul
                    aria-label="Why book with SalonBook"
                    className="mt-12 grid gap-6 rounded-2xl border border-line/40 bg-line/30 p-5 sm:grid-cols-2 sm:p-6 lg:mt-16 lg:grid-cols-4 lg:gap-5 xl:mt-18"
                >
                    {trustItems.map(({ icon: Icon, title, description }) => (
                        <li key={title} className="flex min-w-0 items-center gap-3">
                            <Icon aria-hidden="true" size={22} className="shrink-0 text-brand" />
                            <div className="min-w-0 text-xs leading-5">
                                <p className="font-semibold text-ink">{title}</p>
                                <p className="text-muted">{description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Hero;
