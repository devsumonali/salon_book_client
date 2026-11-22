import type { ReactNode } from 'react';

export default function AdminPage({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <section className="-m-5 min-h-full bg-[#fbf9f6] p-5 sm:-m-6 sm:p-6 lg:min-h-dvh lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <header>
                    <p className="text-sm font-semibold tracking-widest text-brand">
                        SALONBOOK ADMIN
                    </p>
                    <h1 className="mt-2 text-4xl tracking-tight">{title}</h1>
                    <p className="mt-3 text-base leading-7 text-muted">{description}</p>
                </header>
                {children}
            </div>
        </section>
    );
}
