'use client';

export default function ServiceError({ reset }: { reset: () => void }) {
    return <section className="mx-auto max-w-2xl px-5 py-16 text-center"><h1 className="text-3xl">Unable to load services</h1><p className="mt-3 text-base text-muted">Please try again in a moment.</p><button onClick={reset} className="mt-5 min-h-11 cursor-pointer rounded-lg bg-brand px-5 font-semibold text-white">Try again</button></section>;
}
