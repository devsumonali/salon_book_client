import Form from 'next/form';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiCheck, FiHeart, FiSearch, FiShield } from 'react-icons/fi';

const benefits = [
    {
        icon: FiCalendar,
        title: 'A time that suits you',
        description: 'Simple appointment requests',
    },
    {
        icon: FiHeart,
        title: 'Care, made personal',
        description: 'Services for your everyday rituals',
    },
    {
        icon: FiShield,
        title: 'Book with confidence',
        description: 'Clear pricing. Secure Stripe payments.',
    },
];

export default function Hero() {
    return (
        <section aria-labelledby="hero-title" className="relative overflow-hidden bg-[#fcfaf8]">
            <div className="site-container pt-10 pb-8 sm:pt-14 lg:pt-16">
                <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-14">
                    <div className="max-w-xl py-2 lg:py-6">
                        <p className="page-kicker inline-flex items-center gap-2.5 rounded-full border border-brand/10 bg-brand-soft/70 px-4 py-2">
                            <FiHeart size={14} aria-hidden="true" /> Beauty, on your terms
                        </p>
                        <h1
                            id="hero-title"
                            className="mt-6 text-[clamp(2.75rem,5.2vw,4.75rem)] leading-[1.06] tracking-[-0.045em] text-ink"
                        >
                            A little care.
                            <br />A beautiful <span className="italic text-brand">you.</span>
                        </h1>
                        <p className="mt-6 max-w-md text-base leading-8 text-muted sm:text-lg">
                            Discover your next favorite salon ritual. Beautiful hair, glowing skin,
                            and a moment that is entirely yours.
                        </p>
                        <Form
                            action="/service"
                            aria-label="Find salon services"
                            className="mt-8 flex flex-col gap-2 rounded-2xl border border-line bg-panel p-2 shadow-card sm:flex-row"
                        >
                            <label className="flex min-h-12 min-w-0 flex-1 items-center gap-3 px-3">
                                <FiSearch
                                    size={19}
                                    className="shrink-0 text-brand"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">Search salon services</span>
                                <input
                                    name="search"
                                    type="search"
                                    placeholder="What are you looking for?"
                                    className="w-full min-w-0 bg-transparent text-base outline-none placeholder:text-subtle"
                                />
                            </label>
                            <button type="submit" className="ui-button shrink-0">
                                Find your service
                            </button>
                        </Form>
                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                            <span className="inline-flex items-center gap-1.5">
                                <FiCheck className="text-sage" aria-hidden="true" /> Upfront pricing
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <FiCheck className="text-sage" aria-hidden="true" /> Pay after
                                confirmation
                            </span>
                        </div>
                    </div>
                    <div className="relative mx-auto w-full max-w-xl pb-7 pl-4 sm:pl-7">
                        <div
                            className="absolute top-7 right-5 bottom-0 left-0 rounded-[2rem] bg-[#e9e2d8]"
                            aria-hidden="true"
                        />
                        <div className="relative aspect-[1.05] overflow-hidden rounded-[1.75rem] bg-brand-soft shadow-lift lg:aspect-[0.98]">
                            <Image
                                src="/images/salon-hero.jpg"
                                alt="A hairstylist caring for a guest in a bright, welcoming salon"
                                fill
                                preload
                                sizes="(min-width: 1024px) 560px, (min-width: 640px) 550px, 90vw"
                                className="object-cover object-[58%_center]"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/65 to-transparent px-6 pt-20 pb-20 text-white">
                                <p className="text-sm font-medium text-white/85">
                                    YOUR EVERYDAY ESCAPE
                                </p>
                                <p className="mt-1 font-serif text-3xl">
                                    Feel good. Look like you.
                                </p>
                            </div>
                        </div>
                        <div className="absolute right-3 -bottom-1 flex items-center gap-3 rounded-2xl border border-line/70 bg-panel px-4 py-3.5 shadow-lift sm:right-7 sm:px-5">
                            <span className="flex size-11 items-center justify-center rounded-xl bg-sage-soft text-sage">
                                <FiCalendar size={21} aria-hidden="true" />
                            </span>
                            <div>
                                <p className="text-sm font-bold">Your next moment of care</p>
                                <Link
                                    href="/service"
                                    className="text-sm text-muted underline decoration-line underline-offset-4 hover:text-brand"
                                >
                                    Explore our salon services
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <ul
                    aria-label="Why book with SalonBook"
                    className="mt-12 grid divide-y divide-line rounded-2xl border border-line/80 bg-panel px-6 shadow-soft sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mt-14"
                >
                    {benefits.map(({ icon: Icon, title, description }) => (
                        <li
                            key={title}
                            className="flex items-center gap-3 py-5 sm:justify-center sm:px-4 lg:py-6"
                        >
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                                <Icon size={20} aria-hidden="true" />
                            </span>
                            <div>
                                <p className="text-sm font-bold">{title}</p>
                                <p className="mt-0.5 text-xs leading-5 text-muted">{description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
