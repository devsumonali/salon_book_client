export default function DashboardLoading() {
    return (
        <div role="status" className="dashboard-page animate-pulse space-y-7">
            <span className="sr-only">Loading dashboard data...</span>
            <div className="space-y-3">
                <div className="h-3 w-32 rounded bg-line" />
                <div className="h-9 w-64 max-w-full rounded-lg bg-line" />
                <div className="h-4 w-80 max-w-full rounded bg-line/70" />
            </div>
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="ui-card h-40 p-5">
                        <div className="h-4 w-24 rounded bg-line" />
                        <div className="mt-7 h-8 w-14 rounded bg-line/70" />
                    </div>
                ))}
            </div>
            <div className="ui-card h-80 p-6">
                <div className="h-5 w-48 rounded bg-line" />
                <div className="mt-6 space-y-5">
                    {Array.from({ length: 4 }, (_, index) => (
                        <div key={index} className="h-9 rounded-lg bg-surface" />
                    ))}
                </div>
            </div>
        </div>
    );
}
