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

// Counts come from active database services; each category opens a working filtered URL.
export default async function ServiceCategories() {
    const services = await getServiceProps();
    return (
        <section aria-labelledby="service-categories-title" className="bg-surface">
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-20">
                <header className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold tracking-widest text-brand">
                        EXPLORE OUR SALON
                    </p>
                    <h2 id="service-categories-title" className="mt-3 text-3xl sm:text-4xl">
                        Salon Service Categories
                    </h2>
                    <p className="mt-3 text-base leading-7 text-muted">
                        Find a service for your next moment of care.
                    </p>
                </header>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {Object.entries(serviceCategories).map(([value, details]) => {
                        const Icon = icons[value as keyof typeof icons];
                        const count = services.filter(
                            (service) => service.category === value,
                        ).length;
                        return (
                            <li key={value}>
                                <Link
                                    href={`/service?category=${value}`}
                                    className="flex h-full min-h-40 flex-col justify-between gap-5 rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-brand/40 hover:bg-brand-soft/30"
                                >
                                    <Icon size={24} aria-hidden="true" className="text-brand" />
                                    <div>
                                        <h3 className="font-sans text-sm font-semibold">
                                            {details.label}
                                        </h3>
                                        <p className="mt-2 text-sm text-muted">
                                            {count} {count === 1 ? 'service' : 'services'}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
