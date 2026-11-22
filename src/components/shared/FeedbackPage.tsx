import Link from 'next/link';
import { FiAlertCircle, FiHome, FiRefreshCw, FiScissors } from 'react-icons/fi';

type FeedbackPageProps = {
    kind: 'not-found' | 'error';
    onRetry?: () => void;
};

export default function FeedbackPage({ kind, onRetry }: FeedbackPageProps) {
    const isNotFound = kind === 'not-found';
    const primaryButton =
        'inline-flex min-h-12 items-center justify-center gap-2 rounded-[13px] border border-brand bg-brand px-[22px] py-3 text-sm font-bold leading-normal text-white no-underline transition-colors duration-150 hover:border-brand-hover hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none';

    return (
        <main className="flex min-h-dvh items-center justify-center bg-surface px-5 py-10 leading-[1.65] text-ink [font-family:var(--font-manrope,Arial),sans-serif]">
            <div className="w-full max-w-150 text-center">
                <Link
                    href="/"
                    className="mb-7 inline-flex items-center gap-2.5 text-[28px] font-bold text-ink no-underline [font-family:var(--font-liberation-serif,Georgia),serif]"
                    aria-label="SalonBook home"
                >
                    <span className="flex size-10 items-center justify-center rounded-[14px] bg-brand text-white">
                        <FiScissors size={21} aria-hidden="true" />
                    </span>
                    <span>
                        Salon<span className="text-brand">Book</span>
                    </span>
                </Link>

                <section
                    className="rounded-3xl border border-line bg-white px-[clamp(20px,4vw,44px)] py-[clamp(28px,5vw,52px)] shadow-[0_12px_40px_-24px_rgb(32_42_52/24%)]"
                    aria-labelledby="feedback-title"
                >
                    <p className="m-0 text-[clamp(80px,14vw,112px)] leading-[1.1] font-bold tracking-[-0.06em] text-brand">
                        {isNotFound ? '404' : '500'}
                    </p>
                    <p className="mt-4.5 mb-3 text-xs font-bold tracking-[0.12em] text-subtle">
                        {isNotFound ? 'PAGE NOT FOUND' : 'SOMETHING WENT WRONG'}
                    </p>
                    <h1
                        id="feedback-title"
                        className="m-0 text-[clamp(30px,5vw,40px)] leading-[1.2] font-normal tracking-tight [font-family:var(--font-liberation-serif,Georgia),serif]"
                    >
                        {isNotFound ? 'A little off the path.' : "Let's try that again."}
                    </h1>
                    <p className="mt-5 text-base leading-[1.8] text-muted">
                        {isNotFound
                            ? 'The page or service you are looking for may have moved or is no longer available. Your next moment of care is still waiting.'
                            : "We couldn't load this page right now. Please try again in a moment, or head back to the homepage."}
                    </p>

                    <div className="mt-7 flex flex-wrap justify-center gap-3 max-[420px]:flex-col">
                        {onRetry ? (
                            <button type="button" onClick={onRetry} className={primaryButton}>
                                <FiRefreshCw size={17} aria-hidden="true" />
                                Try again
                            </button>
                        ) : (
                            <Link href="/" className={primaryButton}>
                                <FiHome size={17} aria-hidden="true" />
                                Back to home
                            </Link>
                        )}
                        <Link
                            href={isNotFound ? '/service' : '/'}
                            className="inline-flex min-h-12 items-center justify-center rounded-[13px] border border-line bg-white px-5.5 py-3 text-sm font-bold leading-normal text-ink no-underline transition-colors duration-150 hover:border-avatar hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none"
                        >
                            {isNotFound ? 'Browse services' : 'Back to home'}
                        </Link>
                    </div>
                    <p className="mt-6.5 flex items-center justify-center gap-2 border-t border-line pt-5.5 text-xs text-subtle">
                        <FiAlertCircle size={15} className="shrink-0" aria-hidden="true" />
                        {isNotFound
                            ? 'Check the address or explore our service menu.'
                            : 'If this keeps happening, please try again later.'}
                    </p>
                </section>
                <p className="mt-6 text-[13px] text-subtle">A little care. Beautiful moments.</p>
            </div>
        </main>
    );
}
