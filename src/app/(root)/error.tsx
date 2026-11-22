'use client';

export default function PageError({ retry }: { retry: () => void }) {
    return (
        <section className="ui-card mx-auto my-12 w-[calc(100%-2.5rem)] max-w-2xl px-6 py-12 text-center">
            <h1 className="text-3xl">Unable to load this page</h1>
            <p className="mt-3 text-base text-muted">Please try again in a moment.</p>
            <button onClick={retry} className="ui-button mt-5">
                Try again
            </button>
        </section>
    );
}
