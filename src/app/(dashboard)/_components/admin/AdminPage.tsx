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
        <section className="dashboard-page">
            <div className="mx-auto max-w-7xl space-y-6">
                <header>
                    <p className="text-sm font-semibold tracking-widest text-brand">
                        SALONBOOK ADMIN
                    </p>
                    <h1 className="mt-2 tracking-tight">{title}</h1>
                    <p className="mt-3 text-base leading-7 text-muted">{description}</p>
                </header>
                {children}
            </div>
        </section>
    );
}
