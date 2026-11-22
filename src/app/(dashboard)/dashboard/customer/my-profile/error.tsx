'use client';

export default function ProfileError({ reset }: { reset: () => void }) {
    return (
        <div className="rounded-2xl border border-line bg-panel p-8 text-center">
            <h1 className="text-3xl">Unable to load your profile</h1>
            <p className="mt-3 text-base text-muted">Please try again in a moment.</p>
            <button
                type="button"
                onClick={reset}
                className="mt-5 min-h-11 cursor-pointer rounded-lg bg-brand px-5 text-sm font-semibold text-white"
            >
                Try again
            </button>
        </div>
    );
}
