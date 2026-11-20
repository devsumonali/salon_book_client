import ManageServicesContent from '@/app/(dashboard)/_components/ManageServicesContent';
import { formatServicePrice } from '@/lib/service-display';
import { getServiceProps } from '@/lib/api/services';
import { FiCreditCard, FiFeather } from 'react-icons/fi';

export default async function ManageService() {
    const services = await getServiceProps();
    const activeCount = services.filter((service) => service.status === 'active').length;
    const averagePrice = services.length > 0
        ? services.reduce((total, service) => total + service.price, 0) / services.length
        : 0;

    return (
        <section className="-m-5 min-h-full bg-[#fbf9f6] p-5 sm:-m-6 sm:p-6 lg:min-h-dvh">
            <div className="mx-auto max-w-7xl">
                <header className="flex flex-wrap items-center justify-between gap-6">
                    <div className="min-w-0 flex-1 basis-80">
                        <p className="text-[10px] font-semibold tracking-[0.18em] text-brand">
                            ATELIER SERVICE MENU
                        </p>
                        <h1 className="mt-1.5 text-[32px] leading-tight tracking-tight">
                            Manage Salon Services
                        </h1>
                        <p className="mt-2 max-w-xl text-xs leading-6 text-muted">
                            Catalog management, pricing controls, and live booking availability
                            for your salon services.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-stretch gap-3">
                        <div className="flex min-w-32 items-center gap-3 rounded-xl border border-line/40 bg-panel px-4 py-3.5">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface text-brand">
                                <FiFeather aria-hidden="true" size={17} />
                            </span>
                            <div>
                                <p className="text-[10px] leading-4 text-muted">Active Offerings</p>
                                <p className="mt-0.5 text-lg font-semibold leading-6">{activeCount}</p>
                                <p className="text-[10px] text-subtle">Services</p>
                            </div>
                        </div>
                        <div className="flex min-w-32 items-center gap-3 rounded-xl border border-line/40 bg-panel px-4 py-3.5">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface text-brand">
                                <FiCreditCard aria-hidden="true" size={17} />
                            </span>
                            <div>
                                <p className="text-[10px] leading-4 text-muted">Avg. Service Price</p>
                                <p className="mt-0.5 text-lg font-semibold leading-6">
                                    {formatServicePrice(averagePrice)}
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                <ManageServicesContent services={services} />
            </div>
        </section>
    );
}
