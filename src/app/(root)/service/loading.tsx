export default function ServiceLoading() {
    return (
        <div role="status" className="site-container section-space animate-pulse">
            <span className="sr-only">Loading salon services...</span>
            <div className="mx-auto h-10 w-96 max-w-full rounded-lg bg-line" />
            <div className="mx-auto mt-4 h-5 w-72 max-w-full rounded bg-line/70" />
            <div className="ui-card mt-10 h-36" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="ui-card overflow-hidden p-3">
                        <div className="aspect-[1.65] rounded-xl bg-line/60" />
                        <div className="m-3 h-6 w-2/3 rounded bg-line" />
                        <div className="m-3 h-4 w-5/6 rounded bg-line/60" />
                        <div className="m-3 mt-6 h-11 rounded-xl bg-surface" />
                    </div>
                ))}
            </div>
        </div>
    );
}
