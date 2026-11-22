import Link from 'next/link';
import { LuScissors, LuPalette, LuSparkles, LuHand, LuFlower2 } from 'react-icons/lu';
import { getServiceProps } from '@/lib/api/services';
import { serviceCategories } from '@/lib/service-display';

const icons = {
    'hair-styling': LuScissors,
    'hair-color': LuPalette,
    'skin-care': LuSparkles,
    'nail-care': LuHand,
    wellness: LuFlower2,
};

export default async function ServiceCategories() {
    const services = await getServiceProps();
    return (
        <section
            aria-labelledby="service-categories-title"
            className="section-space border-y border-line/70 bg-surface"
        >
            <div className="site-container">
                <header className="mx-auto max-w-xl text-center">
                    <p className="page-kicker">Find your kind of care</p>
                    <h2 id="service-categories-title" className="section-heading mt-3">
                        A ritual for every mood.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-muted">
                        From a fresh new look to a well-deserved pause. Where would you like to
                        start?
                    </p>
                </header>
                <ul className="mt-9 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
                    {Object.entries(serviceCategories).map(([value, details]) => {
                        const Icon = icons[value as keyof typeof icons];
                        const count = services.filter(
                            (service) => service.category === value,
                        ).length;
                        return (
                            <li key={value}>
                                <Link
                                    href={'/service?category=' + value}
                                    className="ui-card group flex h-full flex-col items-center px-4 py-7 text-center transition-shadow hover:shadow-lift"
                                >
                                    <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                                        <Icon size={26} aria-hidden="true" />
                                    </span>
                                    <h3 className="mt-5 font-sans text-sm font-bold leading-6">
                                        {details.label}
                                    </h3>
                                    <p className="mt-1.5 text-sm text-muted">
                                        {count} {count === 1 ? 'service' : 'services'}
                                    </p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
