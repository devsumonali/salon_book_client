import {
    LuFlower2,
    LuGem,
    LuHand,
    LuPaintbrush,
    LuPalette,
    LuScissors,
    LuSparkles,
    LuSprayCan,
} from 'react-icons/lu';

const categories = [
    { name: 'Haircut & Styling', description: '28 Master Stylists', icon: LuScissors },
    { name: 'Hair Coloring', description: '19 Balayage Artists', icon: LuPalette },
    { name: 'Hair Treatment', description: '14 Scalp Therapies', icon: LuSprayCan },
    { name: 'Facial & Skincare', description: '12 Estheticians', icon: LuSparkles },
    { name: 'Makeup & Lash Art', description: '16 Couture Artisans', icon: LuPaintbrush },
    { name: 'Manicure & Pedicure', description: '22 Nail Technicians', icon: LuHand },
    { name: 'Spa & Massage', description: '9 Holistic Healers', icon: LuFlower2 },
    { name: 'Bridal & Gala Packages', description: 'Full Bridal Atelier', icon: LuGem },
];

export default function ServiceCategories() {
    return (
        <section aria-labelledby="service-categories-title" className="bg-surface">
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                <header className="mx-auto max-w-2xl text-center">
                    <p className="text-[9px] font-semibold tracking-[0.14em] text-brand sm:text-[10px]">
                        EXPLORE ATELIER DISCIPLINES
                    </p>
                    <h2
                        id="service-categories-title"
                        className="mt-3 text-3xl leading-tight tracking-tight text-ink sm:text-4xl lg:text-[42px]"
                    >
                        Curated Service Categories
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-muted sm:text-sm">
                        Explore our salon disciplines, from everyday essentials to your next special
                        occasion.
                    </p>
                </header>

                <ul className="mt-8 grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 sm:mt-10 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                    {categories.map(({ name, description, icon: Icon }) => (
                        <li
                            key={name}
                            className="flex min-h-40 min-w-0 flex-col justify-between gap-6 rounded-2xl border border-line/40 bg-[#fcfaf7] p-4 shadow-xs sm:min-h-44 sm:p-6"
                        >
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fbe7df] text-brand">
                                <Icon aria-hidden="true" size={20} />
                            </span>
                            <div>
                                <h3 className="font-sans text-xs font-semibold leading-5 text-ink sm:text-sm">
                                    {name}
                                </h3>
                                <p className="mt-1 text-[10px] leading-4 text-subtle sm:text-[11px]">
                                    {description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
