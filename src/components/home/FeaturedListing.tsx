import { getServiceProps } from '@/lib/api/services';
import ServiceCard from './ServiceCard';
import Link from 'next/link';

const FeaturedListing = async () => {
    const services = await getServiceProps();
    const activeServices = services.filter((service) => service.status === 'active').slice(0, 6);

    return (
        <section aria-labelledby="featured-services-title" className="section-space bg-panel">
            <div className="site-container">
                <header className="mb-8 flex flex-wrap items-end justify-between gap-5 sm:mb-10">
                    <div>
                        <p className="page-kicker">THE SERVICE EDIT</p>
                        <h2 id="featured-services-title" className="section-heading mt-3">
                            Featured Salon Services
                        </h2>
                        <p className="mt-3 max-w-xl text-base leading-7 text-muted">
                            A little time for yourself. Discover the treatments that make it
                            special.
                        </p>
                    </div>
                    <Link href="/service" className="ui-button-secondary">
                        Explore all services
                    </Link>
                </header>

                {activeServices.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                        {activeServices.map((service) => (
                            <ServiceCard key={service._id} service={service} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-line bg-panel px-6 py-14 text-center">
                        <h3 className="text-2xl">Our service menu is being refreshed</h3>
                        <p className="mt-2 text-sm leading-6 text-muted">
                            No active services are available right now. Please check back soon.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedListing;
