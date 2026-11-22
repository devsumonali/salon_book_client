'use client';

export default function AppointmentsError({ retry }: { retry: () => void }) {
    return (
        <div className="dashboard-page">
            <section className="ui-card p-8 text-center">
                <h1 className="text-3xl">Unable to load your appointments</h1>
                <p className="mt-3 text-base text-muted">Please try again in a moment.</p>
                <button onClick={retry} className="ui-button mt-5">
                    Try again
                </button>
            </section>
        </div>
    );
}
