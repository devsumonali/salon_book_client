'use client';

export default function DashboardError({ reset }: { reset: () => void }) {
    return <div className="rounded-2xl border border-line bg-panel p-8 text-center"><h1 className="text-3xl">Unable to load dashboard data</h1><p className="mt-3 text-base text-muted">Please try again. If your login expired, sign in again.</p><button onClick={reset} className="mt-5 min-h-11 cursor-pointer rounded-lg bg-brand px-5 font-semibold text-white">Try again</button></div>;
}
