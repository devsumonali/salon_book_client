'use client';

export default function DashboardError({ reset }: { reset: () => void }) {
    return (
        <div className="dashboard-page">
            <section className="ui-card p-8 text-center">
                <h1 className="text-3xl">Unable to load dashboard data</h1>
                <p className="mt-3 text-base text-muted">
                    Please try again. If your login expired, sign in again.
                </p>
                <button onClick={reset} className="ui-button mt-5">
                    Try again
                </button>
            </section>
        </div>
    );
}
