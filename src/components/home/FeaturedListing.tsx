import { getServiceProps } from '@/lib/api/services';
import ServiceCard from './ServiceCard';

const FeaturedListing = async () => {
    const services = await getServiceProps();
    const activeServices = services.filter((service) => service.status === 'active').slice(0, 6);

    return (
        <section aria-labelledby="featured-services-title" className="bg-[#fbf9f6]">
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                <header className="mb-8 sm:mb-10">
                    <p className="flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.16em] text-brand">
                        <span aria-hidden="true" className="h-px w-7 bg-brand" />
                        CURATED SALON RITUALS
                    </p>
                    <h2
                        id="featured-services-title"
                        className="mt-3 text-3xl leading-tight tracking-tight text-ink sm:text-4xl lg:text-[42px]"
                    >
                        Featured Salon Services
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
                        A little time for yourself. Discover the treatments that make it special.
                    </p>
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
