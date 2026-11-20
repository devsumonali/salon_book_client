import { LuLeaf, LuShieldCheck, LuUserRoundCheck } from 'react-icons/lu';

const features = [
    {
        title: 'Master Stylist Matching',
        description:
            'Find the right artisan for your next ritual, with thoughtful care shaped around your individual style.',
        note: 'PRECISION PAIRINGS',
        icon: LuUserRoundCheck,
    },
    {
        title: 'Transparent Pricing',
        description:
            'Explore clear treatment details and upfront prices, so you can choose your next moment of care with confidence.',
        note: 'NO HIDDEN EXTRAS',
        icon: LuShieldCheck,
    },
    {
        title: 'Organic & Clean Products',
        description:
            'Thoughtfully chosen ingredients and nourishing treatments bring a gentle touch to your salon experience.',
        note: 'THOUGHTFUL CARE',
        icon: LuLeaf,
    },
];

export default function SalonDifference() {
    return (
        <section aria-labelledby="salon-difference-title" className="bg-[#fbf9f6]">
            <div className="mx-auto grid max-w-7xl gap-8 px-5 pt-12 pb-10 sm:px-6 sm:pt-16 sm:pb-12 lg:grid-cols-[0.85fr_1.3fr] lg:items-center lg:gap-10 lg:px-8 lg:pt-20 lg:pb-16">
                <header className="max-w-md">
                    <p className="text-[10px] font-semibold tracking-[0.14em] text-brand">
                        A MORE CONSIDERED SALON EXPERIENCE
                    </p>
                    <h2
                        id="salon-difference-title"
                        className="mt-3 text-3xl leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-[42px]"
                    >
                        The SalonBook <span className="lg:block">Difference</span>
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-muted">
                        A thoughtful approach to beauty, bringing together skilled artisans,
                        personal care, and a booking experience that feels effortless.
                    </p>
                </header>

                <ul className="grid gap-4 sm:grid-cols-3">
                    {features.map(({ title, description, note, icon: Icon }) => (
                        <li
                            key={title}
                            className="flex min-w-0 flex-col rounded-2xl border border-line/40 bg-panel p-5 shadow-xs lg:p-6"
                        >
                            <span className="flex size-11 items-center justify-center rounded-xl bg-[#f6eae4] text-brand">
                                <Icon aria-hidden="true" size={22} />
                            </span>
                            <h3 className="mt-5 font-sans text-sm font-semibold leading-6 text-ink">
                                {title}
                            </h3>
                            <p className="mt-2 text-xs leading-6 text-muted">{description}</p>
                            <p className="mt-auto pt-5 text-[9px] font-semibold tracking-[0.08em] text-brand">
                                {note}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
